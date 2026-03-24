from typing import Optional
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import async_session
from app.db.models import User
from app.db.repositories import UserRepository
from app.core.security import decode_token
from app.core.exceptions import AuthenticationError
from app.services.auth_service import AuthService
from app.services.specialist_service import SpecialistService
from app.services.project_service import ProjectService

oauth2_scheme = HTTPBearer()
oauth2_scheme_optional = HTTPBearer(auto_error=False)


async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    token = credentials.credentials
    try:
        payload = decode_token(token)
        user_id = payload.get("sub")
        token_type = payload.get("type")

        if not user_id or token_type != "access":
            raise JWTError()
    except JWTError:
        raise AuthenticationError(detail="Невалидный токен")

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(user_id)

    if not user or user.status != "active":
        raise AuthenticationError(detail="Пользователь не найден или неактивен")

    return user


async def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(oauth2_scheme_optional),
    db: AsyncSession = Depends(get_db),
) -> Optional[User]:
    if not credentials:
        return None
    token = credentials.credentials
    try:
        payload = decode_token(token)
        user_id = payload.get("sub")
        token_type = payload.get("type")
        if not user_id or token_type != "access":
            raise JWTError()
    except JWTError:
        raise AuthenticationError(detail="Невалидный токен")

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(user_id)

    if not user or user.status != "active":
        raise AuthenticationError(detail="Пользователь не найден или неактивен")

    return user


async def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    return AuthService(db)


async def get_specialist_service(db: AsyncSession = Depends(get_db)) -> SpecialistService:
    return SpecialistService(db)


async def get_project_service(db: AsyncSession = Depends(get_db)) -> ProjectService:
    return ProjectService(db)
