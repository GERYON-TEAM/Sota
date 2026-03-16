import re
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories import UserRepository, SpecialistProfileRepository
from app.core.security import hash_password, verify_password, create_token
from app.core.config import settings
from app.core.exceptions import AuthenticationError, AlreadyExistsError, ForbiddenError
from app.schemas.auth_schemas import RegisterRequest


class AuthService:
    def __init__(self, db: AsyncSession):
        self.user_repo = UserRepository(db)
        self.profile_repo = SpecialistProfileRepository(db)

    async def register(self, data: RegisterRequest):
        # валидация email
        if not re.match(r"[^@]+@[^@]+\.[^@]+", data.email):
            raise AlreadyExistsError(detail="Некорректный email")

        # валидация пароля
        if len(data.password) < 8:
            raise AlreadyExistsError(detail="Пароль должен быть минимум 8 символов")

        if len(data.password) > 128:
            raise AlreadyExistsError(detail="Пароль слишком длинный")

        if not re.search(r"[A-Za-z]", data.password):
            raise AlreadyExistsError(detail="Пароль должен содержать хотя бы одну букву")

        if not re.search(r"[0-9]", data.password):
            raise AlreadyExistsError(detail="Пароль должен содержать хотя бы одну цифру")

        if not re.search(r"[^A-Za-z0-9]", data.password):
            raise AlreadyExistsError(detail="Пароль должен содержать хотя бы один спецсимвол")

        # валидация роли
        if data.role not in ["customer", "specialist", "validator"]:
            raise AlreadyExistsError(detail="Роль должна быть customer, specialist или validator")

        if data.role == "specialist":
            if data.level not in ["junior", "middle", "senior"]:
                raise AlreadyExistsError(detail="Уровень должен быть junior, middle или senior")

        # проверяем что email свободен
        existing = await self.user_repo.get_by_email(data.email)
        if existing:
            raise AlreadyExistsError(detail="Пользователь с таким email уже существует")

        # создаём пользователя
        password_hashed = hash_password(data.password)
        user = await self.user_repo.create({
            "email": data.email,
            "password_hash": password_hashed,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "middle_name": data.middle_name,
            "role": data.role,
            "level": data.level,
        })

        # если specialist — создаём профиль
        if data.role == "specialist":
            await self.profile_repo.create({
                "user_id": user.id,
                "level": data.level,
            })

        return user

    async def login(self, email: str, password: str):
        user = await self.user_repo.get_by_email(email)

        if not user:
            raise AuthenticationError(detail="Неверный email или пароль")

        if user.status == "blocked":
            raise ForbiddenError(detail="Аккаунт заблокирован")

        if not verify_password(password, user.password_hash):
            raise AuthenticationError(detail="Неверный email или пароль")

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

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": user,
        }
