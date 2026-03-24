from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPAuthorizationCredentials
from app.schemas.auth_schemas import (
    RegisterRequest, VerifyEmailRequest, Verify2FARequest,
    ChangeEmailRequest, ProfileUpdateRequest, PasswordResetRequest,
    ChangePasswordRequest, Enable2FARequest, Confirm2FARequest, Disable2FARequest,
    RefreshRequest, LoginRequest,
)
from app.api.deps import get_auth_service, get_current_user, get_optional_current_user, oauth2_scheme
from app.services.auth_service import AuthService
from app.db.models import User
from app.core.limiter import limiter

router = APIRouter()


@router.post("/register", status_code=201)
@limiter.limit("5/minute")
async def register(
    body: RegisterRequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    user = await auth_service.register(
        body,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    return {"message": "Регистрация прошла успешно, подтвердите email.", "user_id": str(user.id)}


@router.post("/verify-email")
async def verify_email(
    body: VerifyEmailRequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    user = await auth_service.verify_email(
        body.token,
        ip_address=request.client.host if request.client else None,
    )
    return {"message": "Email подтвержден", "email": user.email}


@router.post("/2fa/verify")
@limiter.limit("5/minute")
async def verify_2fa(
    body: Verify2FARequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    result = await auth_service.verify_2fa(
        body.session_id,
        body.code,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    return result


@router.post("/logout")
async def logout(
    request: Request,
    user: User = Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.logout(
        user,
        credentials.credentials,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    return {"message": "Выход выполнен успешно"}


@router.post("/refresh")
async def refresh(
    body: RefreshRequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    result = await auth_service.refresh(
        body.refresh_token,
        ip_address=request.client.host if request.client else None,
    )
    return result


@router.post("/password-reset-request")
@limiter.limit("3/minute")
async def password_reset_request(
    body: PasswordResetRequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.password_reset_request(
        body.email,
        ip_address=request.client.host if request.client else None,
    )
    return {"message": "Инструкции по восстановлению пароля отправлены на ваш e-mail"}


@router.get("/me")
async def get_me(
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.get_me(user)


@router.patch("/profile")
async def update_profile(
    body: ProfileUpdateRequest,
    request: Request,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    result = await auth_service.update_profile(
        user,
        body,
        ip_address=request.client.host if request.client else None,
    )
    return {"message": "Профиль обновлен", "user": result}


@router.post("/change-email")
@limiter.limit("3/minute")
async def change_email(
    body: ChangeEmailRequest,
    request: Request,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.change_email(
        user,
        body.new_email,
        body.password,
        ip_address=request.client.host if request.client else None,
    )
    return {
        "message": "Запрос на смену email отправлен. Подтвердите через оба email.",
        "verification_required": True,
    }


@router.get("/check-permission")
async def check_permission(
    resource: str,
    action: str,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.check_permission(user, resource, action)


@router.post("/2fa/enable")
@limiter.limit("5/minute")
async def enable_2fa(
    body: Enable2FARequest,
    request: Request,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.enable_2fa(
        user,
        body.password,
        ip_address=request.client.host if request.client else None,
    )


@router.post("/2fa/confirm")
@limiter.limit("5/minute")
async def confirm_2fa(
    body: Confirm2FARequest,
    request: Request,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.confirm_2fa(
        user,
        body.code,
        ip_address=request.client.host if request.client else None,
    )


@router.post("/2fa/disable")
@limiter.limit("5/minute")
async def disable_2fa(
    body: Disable2FARequest,
    request: Request,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.disable_2fa(
        user,
        body.password,
        ip_address=request.client.host if request.client else None,
    )
    return {"message": "Двухфакторная аутентификация отключена"}


@router.get("/login-history")
async def get_login_history(
    action: Optional[str] = None,
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    parsed_from = datetime.fromisoformat(from_date) if from_date else None
    parsed_to = datetime.fromisoformat(to_date) if to_date else None

    return await auth_service.get_login_history(
        user,
        action=action,
        from_date=parsed_from,
        to_date=parsed_to,
        limit=limit,
        offset=offset,
    )


@router.get("/sessions")
async def get_sessions(
    limit: int = 20,
    offset: int = 0,
    user: User = Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.get_sessions(
        user,
        credentials.credentials,
        limit=limit,
        offset=offset,
    )


@router.delete("/sessions/{session_id}")
async def delete_session(
    session_id: str,
    request: Request,
    user: User = Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.delete_session(
        user,
        session_id,
        credentials.credentials,
        ip_address=request.client.host if request.client else None,
    )
    return {"message": "Сессия завершена"}


@router.post("/change-password")
@limiter.limit("5/minute")
async def change_password(
    body: ChangePasswordRequest,
    request: Request,
    user: Optional[User] = Depends(get_optional_current_user),
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.change_password(
        user,
        body,
        ip_address=request.client.host if request.client else None,
    )
    return {"message": "Пароль успешно изменен"}


@router.post("/login")
@limiter.limit("10/minute")
async def login(
    body: LoginRequest,
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    result = await auth_service.login(
        body.email,
        body.password,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )

    if result.get("two_factor_required"):
        return {
            "two_factor_required": True,
            "message": "Требуется код двухфакторной аутентификации",
            "session_id": result["session_id"],
            "user": {
                "id": str(result["user"].id),
                "email": result["user"].email,
                "first_name": result["user"].first_name,
                "last_name": result["user"].last_name,
            },
        }

    return {
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"],
        "token_type": result["token_type"],
        "expires_in": result["expires_in"],
        "user": {
            "id": str(result["user"].id),
            "email": result["user"].email,
            "first_name": result["user"].first_name,
            "last_name": result["user"].last_name,
            "role": result["user"].role,
            "level": result["user"].level,
        },
    }
