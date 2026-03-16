from fastapi import APIRouter, Depends
from app.schemas.auth_schemas import RegisterRequest, LoginRequest
from app.api.deps import get_auth_service
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register")
async def register(
    body: RegisterRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    user = await auth_service.register(body)
    return {"message": "Регистрация прошла успешно, проверьте email.", "user_id": str(user.id)}


@router.post("/login")
async def login(
    body: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    result = await auth_service.login(body.email, body.password)
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
