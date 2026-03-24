from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, Request
from app.api.deps import get_auth_service, get_current_user
from app.schemas.auth_schemas import ChangeRoleRequest, ChangeStatusRequest
from app.services.auth_service import AuthService
from app.db.models import User
from app.core.exceptions import ForbiddenError

router = APIRouter()


def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise ForbiddenError(detail="Доступ только для администратора")
    return user


@router.get("/users")
async def get_users(
    role: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    user: User = Depends(require_admin),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.get_users(
        role=role,
        status=status,
        search=search,
        limit=limit,
        offset=offset,
    )


@router.get("/users/{user_id}")
async def get_user(
    user_id: str,
    user: User = Depends(require_admin),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.get_user_by_id(user_id)


@router.patch("/users/{user_id}/role")
async def change_user_role(
    user_id: str,
    body: ChangeRoleRequest,
    request: Request,
    user: User = Depends(require_admin),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.change_user_role(
        user,
        user_id,
        body,
        ip_address=request.client.host if request.client else None,
    )


@router.patch("/users/{user_id}/status")
async def change_user_status(
    user_id: str,
    body: ChangeStatusRequest,
    request: Request,
    user: User = Depends(require_admin),
    auth_service: AuthService = Depends(get_auth_service),
):
    return await auth_service.change_user_status(
        user,
        user_id,
        body,
        ip_address=request.client.host if request.client else None,
    )


@router.get("/audit-log")
async def get_audit_log(
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    entity_type: Optional[str] = None,
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    limit: int = 100,
    offset: int = 0,
    user: User = Depends(require_admin),
    auth_service: AuthService = Depends(get_auth_service),
):
    parsed_from = datetime.fromisoformat(from_date) if from_date else None
    parsed_to = datetime.fromisoformat(to_date) if to_date else None

    return await auth_service.get_audit_log(
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        from_date=parsed_from,
        to_date=parsed_to,
        limit=limit,
        offset=offset,
    )
