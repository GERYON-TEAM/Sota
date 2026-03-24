import re
import io
import json
import uuid
import base64
import secrets
import string
import logging
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
import pyotp
import qrcode
from app.core.redis import redis_client
from app.db.repositories import (
    UserRepository, SpecialistProfileRepository,
    AuditLogRepository, SessionRepository, LoginAttemptRepository,
    TwoFactorBackupCodeRepository, RoleRepository, PermissionRepository,
)
from app.core.security import hash_password, verify_password, create_token, decode_token
from app.core.config import settings
from app.core.exceptions import (
    AuthenticationError, AlreadyExistsError, ForbiddenError,
    NotFoundError, ConflictError, GoneError, LockedError,
)
from app.schemas.auth_schemas import RegisterRequest

logger = logging.getLogger(__name__)

MAX_FAILED_ATTEMPTS = 5
LOCKOUT_MINUTES = 15
MAX_2FA_ATTEMPTS = 3


class AuthService:
    def __init__(self, db: AsyncSession):
        self.user_repo = UserRepository(db)
        self.profile_repo = SpecialistProfileRepository(db)
        self.audit_repo = AuditLogRepository(db)
        self.session_repo = SessionRepository(db)
        self.login_attempt_repo = LoginAttemptRepository(db)
        self.backup_code_repo = TwoFactorBackupCodeRepository(db)
        self.role_repo = RoleRepository(db)
        self.permission_repo = PermissionRepository(db)

    async def register(self, data: RegisterRequest, ip_address: str = None, user_agent: str = None):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", data.email):
            raise AlreadyExistsError(detail="Некорректный email")

        self._validate_password(data.password)

        if data.role not in ["customer", "specialist", "validator"]:
            raise AlreadyExistsError(detail="Роль должна быть customer, specialist или validator")

        if data.role == "specialist":
            if data.level not in ["junior", "middle", "senior"]:
                raise AlreadyExistsError(detail="Уровень должен быть junior, middle или senior")

        existing = await self.user_repo.get_by_email(data.email)
        if existing:
            raise AlreadyExistsError(detail="Пользователь с таким email уже существует")

        verification_token = str(uuid.uuid4())
        password_hashed = hash_password(data.password)

        user = await self.user_repo.create({
            "email": data.email,
            "password_hash": password_hashed,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "middle_name": data.middle_name,
            "role": data.role,
            "level": data.level,
            "status": "pending",
            "email_verification_token": verification_token,
            "email_verification_expires_at": datetime.utcnow() + timedelta(hours=48),
        })

        if data.role == "specialist":
            await self.profile_repo.create({
                "user_id": user.id,
                "level": data.level,
            })

        logger.info(f"Email verification token for {user.email}: {verification_token}")

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "register",
            "ip_address": ip_address,
        })

        return user

    async def verify_email(self, token: str, ip_address: str = None):
        if not token:
            raise AlreadyExistsError(detail="Токен отсутствует")

        user = await self.user_repo.get_by_verification_token(token)
        if not user:
            raise AlreadyExistsError(detail="Невалидный токен")

        if user.email_verified:
            raise ConflictError(detail="Email уже подтверждён")

        if user.email_verification_expires_at and user.email_verification_expires_at < datetime.utcnow():
            raise GoneError(detail="Токен истёк")

        await self.user_repo.update(user.id, {
            "email_verified": True,
            "email_verification_token": None,
            "email_verification_expires_at": None,
            "status": "active",
            "updated_at": datetime.utcnow(),
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "email_verified",
            "ip_address": ip_address,
        })

        return user

    async def login(self, email: str, password: str, ip_address: str = None, user_agent: str = None):
        user = await self.user_repo.get_by_email(email)

        if not user:
            await self._log_login_attempt(email, ip_address, False, "invalid_email")
            raise AuthenticationError(detail="Неверный email или пароль")

        if user.status == "blocked":
            await self._log_login_attempt(email, ip_address, False, "account_blocked")
            raise ForbiddenError(detail="Аккаунт заблокирован")

        if not user.email_verified:
            await self._log_login_attempt(email, ip_address, False, "email_not_verified")
            raise ForbiddenError(detail="Email не подтверждён")

        if user.locked_until and user.locked_until > datetime.utcnow():
            await self._log_login_attempt(email, ip_address, False, "account_locked")
            raise LockedError(detail="Аккаунт временно заблокирован")

        if not verify_password(password, user.password_hash):
            await self._handle_failed_login(user, email, ip_address, user_agent)
            raise AuthenticationError(detail="Неверный email или пароль")

        await self.user_repo.update(user.id, {
            "failed_login_attempts": 0,
            "last_failed_attempt": None,
            "locked_until": None,
            "last_login_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        })

        await self._log_login_attempt(email, ip_address, True, None)

        if user.two_factor_enabled:
            session = await self.session_repo.create({
                "user_id": user.id,
                "device_info": user_agent,
                "ip_address": ip_address,
                "expires_at": datetime.utcnow() + timedelta(minutes=5),
                "is_active": False,
            })

            await self.audit_repo.create({
                "user_id": user.id,
                "user_email": user.email,
                "action": "login_2fa_pending",
                "ip_address": ip_address,
                "details": json.dumps({"user_agent": user_agent}),
            })

            return {
                "two_factor_required": True,
                "session_id": session.id,
                "user": user,
            }

        access_token = create_token(
            str(user.id),
            settings.ACCESS_TOKEN_EXPIRE_MINUTES,
            token_type="access",
        )
        refresh_token = create_token(
            str(user.id),
            settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60,
            token_type="refresh",
        )

        session = await self.session_repo.create({
            "user_id": user.id,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "device_info": user_agent,
            "ip_address": ip_address,
            "last_activity_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
            "is_active": True,
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "login_success",
            "ip_address": ip_address,
            "details": json.dumps({"user_agent": user_agent}),
        })

        return {
            "two_factor_required": False,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": user,
        }

    async def verify_2fa(self, session_id: str, code: str, ip_address: str = None, user_agent: str = None):
        session = await self.session_repo.get_by_id(session_id)
        if not session:
            raise NotFoundError(detail="Временная сессия не найдена")

        if session.expires_at and session.expires_at < datetime.utcnow():
            raise GoneError(detail="Временная сессия истекла")

        failed_count = await self.audit_repo.count_by_entity(session_id, "2fa_verify_failed")
        if failed_count >= MAX_2FA_ATTEMPTS:
            raise ForbiddenError(detail="Превышено количество попыток ввода кода")

        user = await self.user_repo.get_by_id(session.user_id)
        if not user:
            raise NotFoundError(detail="Пользователь не найден")

        code_valid = False

        if user.two_factor_secret:
            totp = pyotp.TOTP(user.two_factor_secret)
            if totp.verify(code, valid_window=1):
                code_valid = True

        if not code_valid:
            backup_codes = await self.backup_code_repo.get_unused_by_user(user.id)
            for bc in backup_codes:
                if verify_password(code, bc.code_hash):
                    await self.backup_code_repo.update(bc.id, {
                        "is_used": True,
                        "used_at": datetime.utcnow(),
                    })
                    code_valid = True
                    break

        if not code_valid:
            await self.audit_repo.create({
                "user_id": user.id,
                "user_email": user.email,
                "action": "2fa_verify_failed",
                "entity_id": session_id,
                "entity_type": "session",
                "ip_address": ip_address,
                "details": json.dumps({"user_agent": user_agent}),
            })
            raise AuthenticationError(detail="Неверный код 2FA")

        access_token = create_token(
            str(user.id),
            settings.ACCESS_TOKEN_EXPIRE_MINUTES,
            token_type="access",
        )
        refresh_token = create_token(
            str(user.id),
            settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60,
            token_type="refresh",
        )

        await self.session_repo.update(session.id, {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "is_active": True,
            "last_activity_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "login_success",
            "entity_id": session_id,
            "entity_type": "session",
            "ip_address": ip_address,
            "details": json.dumps({"user_agent": user_agent}),
        })

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        }

    async def logout(self, user, access_token: str, ip_address: str = None, user_agent: str = None):
        session = await self.session_repo.get_by_access_token(access_token)
        if not session:
            raise NotFoundError(detail="Сессия не найдена")

        await self.session_repo.update(session.id, {
            "is_active": False,
            "refresh_token": None,
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "logout",
            "entity_id": session.id,
            "entity_type": "session",
            "ip_address": ip_address,
            "details": json.dumps({"user_agent": user_agent}),
        })

    async def refresh(self, refresh_token: str, ip_address: str = None):
        try:
            payload = decode_token(refresh_token)
            if payload.get("type") != "refresh":
                raise AuthenticationError(detail="Невалидный refresh токен")
        except Exception:
            raise AuthenticationError(detail="Невалидный refresh токен")

        session = await self.session_repo.get_by_refresh_token(refresh_token)
        if not session:
            raise NotFoundError(detail="Сессия не найдена")

        user = await self.user_repo.get_by_id(session.user_id)
        if not user or user.status == "blocked":
            raise ForbiddenError(detail="Аккаунт заблокирован")

        new_access_token = create_token(
            str(user.id),
            settings.ACCESS_TOKEN_EXPIRE_MINUTES,
            token_type="access",
        )
        new_refresh_token = create_token(
            str(user.id),
            settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60,
            token_type="refresh",
        )

        await self.session_repo.update(session.id, {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "last_activity_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "token_refresh",
            "entity_id": session.id,
            "entity_type": "session",
            "ip_address": ip_address,
        })

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "Bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        }

    async def get_me(self, user):
        permissions = []
        role = await self.role_repo.get_by_name(user.role)
        if role:
            perms = await self.permission_repo.get_by_role(role.id)
            permissions = [
                {
                    "resource": p.resource,
                    "action": p.action,
                    "can_perform": p.can_perform,
                }
                for p in perms
            ]

        return {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "middle_name": user.middle_name,
            "role": user.role,
            "level": user.level,
            "email_verified": user.email_verified,
            "two_factor_enabled": user.two_factor_enabled,
            "permissions": permissions,
        }

    async def update_profile(self, user, data, ip_address: str = None):
        update_data = data.model_dump(exclude_unset=True)

        if not update_data:
            raise AlreadyExistsError(detail="Нет данных для обновления")

        update_data["updated_at"] = datetime.utcnow()
        updated_user = await self.user_repo.update(user.id, update_data)

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "profile_update",
            "ip_address": ip_address,
        })

        return {
            "first_name": updated_user.first_name,
            "last_name": updated_user.last_name,
            "middle_name": updated_user.middle_name,
        }

    async def change_email(self, user, new_email: str, password: str, ip_address: str = None):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", new_email):
            raise AlreadyExistsError(detail="Некорректный формат email")

        if not verify_password(password, user.password_hash):
            raise AlreadyExistsError(detail="Неверный пароль")

        existing = await self.user_repo.get_by_email(new_email)
        if existing:
            raise ConflictError(detail="Этот email уже занят")

        token_old = str(uuid.uuid4())
        token_new = str(uuid.uuid4())

        await self.user_repo.update(user.id, {
            "pending_email": new_email,
            "email_change_token_old": token_old,
            "email_change_token_new": token_new,
            "email_change_expires_at": datetime.utcnow() + timedelta(hours=24),
            "updated_at": datetime.utcnow(),
        })

        logger.info(f"Email change for {user.email}: old_token={token_old}, new_token={token_new}")

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "email_change_request",
            "ip_address": ip_address,
        })

    async def enable_2fa(self, user, password: str, ip_address: str = None):
        if user.two_factor_enabled:
            raise ConflictError(detail="2FA уже включена")

        if not verify_password(password, user.password_hash):
            raise AuthenticationError(detail="Неверный пароль")

        secret = pyotp.random_base32()
        totp = pyotp.TOTP(secret)
        uri = totp.provisioning_uri(user.email, issuer_name="Sota")

        qr = qrcode.make(uri)
        buffer = io.BytesIO()
        qr.save(buffer, format="PNG")
        qr_base64 = base64.b64encode(buffer.getvalue()).decode()
        qr_code_url = f"data:image/png;base64,{qr_base64}"

        backup_codes = []
        backup_code_hashes = []
        for _ in range(5):
            part1 = "".join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(4))
            part2 = "".join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(4))
            code = f"{part1}-{part2}"
            backup_codes.append(code)
            backup_code_hashes.append(hash_password(code))

        await redis_client.setex(
            f"2fa_setup:{user.id}",
            600,
            json.dumps({"secret": secret, "backup_codes": backup_codes, "backup_code_hashes": backup_code_hashes}),
        )

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "2fa_enable_start",
            "ip_address": ip_address,
        })

        return {
            "secret": secret,
            "qr_code_url": qr_code_url,
            "backup_codes": backup_codes,
        }

    async def confirm_2fa(self, user, code: str, ip_address: str = None):
        if user.two_factor_enabled:
            raise ConflictError(detail="2FA уже включена")

        raw = await redis_client.get(f"2fa_setup:{user.id}")
        if not raw:
            raise GoneError(detail="Процесс включения 2FA не найден или истёк")

        setup_data = json.loads(raw)
        secret = setup_data["secret"]

        totp = pyotp.TOTP(secret)
        if not totp.verify(code, valid_window=1):
            raise ForbiddenError(detail="Неверный код 2FA")

        await self.user_repo.update(user.id, {
            "two_factor_enabled": True,
            "two_factor_secret": secret,
            "updated_at": datetime.utcnow(),
        })

        await self.backup_code_repo.delete_by_user(user.id)
        for code_hash in setup_data["backup_code_hashes"]:
            await self.backup_code_repo.create({
                "user_id": user.id,
                "code_hash": code_hash,
            })

        await redis_client.delete(f"2fa_setup:{user.id}")

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "2fa_enabled",
            "ip_address": ip_address,
        })

        return {
            "message": "Двухфакторная аутентификация включена",
            "backup_codes": setup_data["backup_codes"],
        }

    async def get_audit_log(self, user_id=None, action=None, entity_type=None, from_date=None, to_date=None, limit=100, offset=0):
        result = await self.audit_repo.get_audit_log(
            user_id, action, entity_type, from_date, to_date, limit, offset,
        )

        logs = []
        for entry in result["items"]:
            logs.append({
                "id": entry.id,
                "user_id": entry.user_id,
                "user_email": entry.user_email,
                "action": entry.action,
                "entity_type": entry.entity_type,
                "entity_id": entry.entity_id,
                "ip_address": entry.ip_address,
                "created_at": entry.created_at.isoformat() if entry.created_at else None,
                "details": self._parse_details(entry.details),
            })

        return {
            "logs": logs,
            "total": result["total"],
            "limit": limit,
            "offset": offset,
        }

    async def change_user_status(self, admin_user, target_user_id: str, data, ip_address: str = None):
        if data.status not in ["active", "blocked"]:
            raise AlreadyExistsError(detail="Статус должен быть active или blocked")

        target = await self.user_repo.get_by_id(target_user_id)
        if not target:
            raise NotFoundError(detail="Пользователь не найден")

        if target.role == "admin":
            raise ConflictError(detail="Нельзя изменить статус администратора")

        if data.status == "blocked":
            await self.session_repo.deactivate_all_by_user(target.id)

        await self.user_repo.update(target.id, {
            "status": data.status,
            "updated_at": datetime.utcnow(),
        })

        await self.audit_repo.create({
            "user_id": admin_user.id,
            "user_email": admin_user.email,
            "action": "account_blocked" if data.status == "blocked" else "account_unblocked",
            "entity_id": target.id,
            "entity_type": "user",
            "details": json.dumps({"reason": data.reason, "new_status": data.status}) if data.reason else None,
            "ip_address": ip_address,
        })

        return {
            "message": "Статус пользователя обновлен",
            "user_id": str(target.id),
            "status": data.status,
        }

    async def change_user_role(self, admin_user, target_user_id: str, data, ip_address: str = None):
        target = await self.user_repo.get_by_id(target_user_id)
        if not target:
            raise NotFoundError(detail="Пользователь не найден")

        if data.role not in ["customer", "specialist", "validator"]:
            raise AlreadyExistsError(detail="Роль должна быть customer, specialist или validator")

        if data.role == "specialist":
            if not data.level:
                raise AlreadyExistsError(detail="Для роли specialist необходимо указать level")
            if data.level not in ["junior", "middle", "senior"]:
                raise AlreadyExistsError(detail="Уровень должен быть junior, middle или senior")
        else:
            if data.level:
                raise ConflictError(detail="Уровень указывается только для роли specialist")

        old_role = target.role
        old_level = target.level
        new_level = data.level if data.role == "specialist" else None

        await self.user_repo.update(target.id, {
            "role": data.role,
            "level": new_level,
            "updated_at": datetime.utcnow(),
        })

        if data.role == "specialist":
            existing_profile = await self.profile_repo.get_by_user_id(target.id)
            if not existing_profile:
                await self.profile_repo.create({
                    "user_id": target.id,
                    "level": new_level,
                })

        await self.audit_repo.create({
            "user_id": admin_user.id,
            "user_email": admin_user.email,
            "action": "role_change",
            "entity_id": target.id,
            "entity_type": "user",
            "ip_address": ip_address,
            "details": json.dumps({
                "old_role": old_role,
                "new_role": data.role,
                "old_level": old_level,
                "new_level": new_level,
                "changed_by": str(admin_user.id),
            }),
        })

        return {
            "message": "Роль обновлена",
            "user_id": str(target.id),
            "old_role": old_role,
            "new_role": data.role,
            "old_level": old_level,
            "new_level": new_level,
        }

    async def get_user_by_id(self, user_id: str):
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise NotFoundError(detail="Пользователь не найден")

        active_sessions = await self.session_repo.get_active_by_user(user.id)

        return {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "middle_name": user.middle_name,
            "role": user.role,
            "level": user.level,
            "status": user.status,
            "email_verified": user.email_verified,
            "two_factor_enabled": user.two_factor_enabled,
            "failed_login_attempts": user.failed_login_attempts,
            "locked_until": user.locked_until.isoformat() if user.locked_until else None,
            "last_login_at": user.last_login_at.isoformat() if user.last_login_at else None,
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "updated_at": user.updated_at.isoformat() if user.updated_at else None,
            "active_sessions_count": len(active_sessions),
        }

    async def get_users(self, role: str = None, status: str = None, search: str = None, limit: int = 50, offset: int = 0):
        result = await self.user_repo.get_list(role, status, search, limit, offset)

        users = []
        for u in result["items"]:
            users.append({
                "id": str(u.id),
                "email": u.email,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "role": u.role,
                "status": u.status,
                "email_verified": u.email_verified,
                "created_at": u.created_at.isoformat() if u.created_at else None,
            })

        return {
            "users": users,
            "total": result["total"],
            "limit": limit,
            "offset": offset,
        }

    async def check_permission(self, user, resource: str, action: str):
        role = await self.role_repo.get_by_name(user.role)
        allowed = False
        if role:
            allowed = await self.permission_repo.check_permission(role.id, resource, action)

        return {
            "allowed": allowed,
            "resource": resource,
            "action": action,
        }

    async def disable_2fa(self, user, password: str, ip_address: str = None):
        if not user.two_factor_enabled:
            raise ConflictError(detail="2FA уже отключена")

        if not verify_password(password, user.password_hash):
            raise ForbiddenError(detail="Неверный пароль")

        await self.user_repo.update(user.id, {
            "two_factor_enabled": False,
            "two_factor_secret": None,
            "updated_at": datetime.utcnow(),
        })

        await self.backup_code_repo.delete_by_user(user.id)

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "2fa_disabled",
            "ip_address": ip_address,
        })

    async def get_login_history(self, user, action: str = None, from_date=None, to_date=None, limit: int = 50, offset: int = 0):
        result = await self.audit_repo.get_login_history(
            user.id, action, from_date, to_date, limit, offset,
        )

        history = []
        for entry in result["items"]:
            details_parsed = self._parse_details(entry.details)
            user_agent = details_parsed.get("user_agent") if isinstance(details_parsed, dict) else None
            history.append({
                "id": entry.id,
                "action": entry.action,
                "ip_address": entry.ip_address,
                "user_agent": user_agent,
                "created_at": entry.created_at.isoformat() if entry.created_at else None,
                "details": details_parsed,
            })

        return {
            "history": history,
            "total": result["total"],
            "limit": limit,
            "offset": offset,
        }

    async def get_sessions(self, user, access_token: str, limit: int = 20, offset: int = 0):
        result = await self.session_repo.get_active_by_user_paginated(user.id, limit, offset)

        sessions = []
        for s in result["items"]:
            sessions.append({
                "id": s.id,
                "device_info": s.device_info,
                "session_name": s.session_name,
                "ip_address": s.ip_address,
                "created_at": s.created_at.isoformat() if s.created_at else None,
                "last_activity_at": s.last_activity_at.isoformat() if s.last_activity_at else None,
                "is_current": s.access_token == access_token,
            })

        return {"sessions": sessions, "total": result["total"]}

    async def delete_session(self, user, session_id: str, access_token: str, ip_address: str = None):
        session = await self.session_repo.get_by_id(session_id)
        if not session:
            raise NotFoundError(detail="Сессия не найдена")

        if session.user_id != user.id:
            raise ForbiddenError(detail="Нельзя завершить чужую сессию")

        await self.session_repo.update(session.id, {
            "is_active": False,
            "refresh_token": None,
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "session_terminated",
            "entity_id": session.id,
            "entity_type": "session",
            "ip_address": ip_address,
        })

    async def change_password(self, user, data, ip_address: str = None):
        if data.reset_token:
            target_user = await self.user_repo.get_by_reset_token(data.reset_token)
            if not target_user:
                raise AuthenticationError(detail="Невалидный токен восстановления")

            if target_user.password_reset_expires_at and target_user.password_reset_expires_at < datetime.utcnow():
                raise GoneError(detail="Токен восстановления истёк")

            if target_user.status == "blocked":
                raise ForbiddenError(detail="Аккаунт заблокирован")

            self._validate_password(data.new_password)

            await self.user_repo.update(target_user.id, {
                "password_hash": hash_password(data.new_password),
                "password_reset_token": None,
                "password_reset_expires_at": None,
                "failed_login_attempts": 0,
                "updated_at": datetime.utcnow(),
            })

            await self.audit_repo.create({
                "user_id": target_user.id,
                "user_email": target_user.email,
                "action": "password_change",
                "ip_address": ip_address,
            })
            return

        if not user:
            raise AuthenticationError(detail="Требуется авторизация или токен восстановления")

        if not data.old_password:
            raise AlreadyExistsError(detail="Укажите текущий пароль")

        if user.status == "blocked":
            raise ForbiddenError(detail="Аккаунт заблокирован")

        if not verify_password(data.old_password, user.password_hash):
            raise AuthenticationError(detail="Неверный текущий пароль")

        self._validate_password(data.new_password)

        await self.user_repo.update(user.id, {
            "password_hash": hash_password(data.new_password),
            "failed_login_attempts": 0,
            "updated_at": datetime.utcnow(),
        })

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "password_change",
            "ip_address": ip_address,
        })

    async def password_reset_request(self, email: str, ip_address: str = None):
        user = await self.user_repo.get_by_email(email)
        if not user:
            return

        reset_token = str(uuid.uuid4())

        await self.user_repo.update(user.id, {
            "password_reset_token": reset_token,
            "password_reset_expires_at": datetime.utcnow() + timedelta(hours=24),
            "updated_at": datetime.utcnow(),
        })

        logger.info(f"Password reset token for {user.email}: {reset_token}")

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": user.email,
            "action": "password_reset_request",
            "ip_address": ip_address,
        })

    async def _handle_failed_login(self, user, email: str, ip_address: str = None, user_agent: str = None):
        attempts = (user.failed_login_attempts or 0) + 1
        update_data = {
            "failed_login_attempts": attempts,
            "last_failed_attempt": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        if attempts >= MAX_FAILED_ATTEMPTS:
            update_data["locked_until"] = datetime.utcnow() + timedelta(minutes=LOCKOUT_MINUTES)

        await self.user_repo.update(user.id, update_data)
        await self._log_login_attempt(email, ip_address, False, "invalid_password")

        await self.audit_repo.create({
            "user_id": user.id,
            "user_email": email,
            "action": "login_failed",
            "ip_address": ip_address,
            "details": json.dumps({"user_agent": user_agent}),
        })

    def _parse_details(self, details_str):
        if not details_str:
            return None
        try:
            return json.loads(details_str)
        except (json.JSONDecodeError, TypeError):
            return details_str

    def _validate_password(self, password: str):
        if len(password) < 8:
            raise AlreadyExistsError(detail="Пароль должен быть минимум 8 символов")
        if len(password) > 128:
            raise AlreadyExistsError(detail="Пароль слишком длинный")
        if not re.search(r"[A-Z]", password):
            raise AlreadyExistsError(detail="Пароль должен содержать хотя бы одну заглавную букву")
        if not re.search(r"[0-9]", password):
            raise AlreadyExistsError(detail="Пароль должен содержать хотя бы одну цифру")
        if not re.search(r"[^A-Za-z0-9]", password):
            raise AlreadyExistsError(detail="Пароль должен содержать хотя бы один спецсимвол")

    async def _log_login_attempt(self, email: str, ip_address: str, success: bool, reason_failure: str = None):
        await self.login_attempt_repo.create({
            "email": email,
            "ip_address": ip_address,
            "success": success,
            "reason_failure": reason_failure,
        })
