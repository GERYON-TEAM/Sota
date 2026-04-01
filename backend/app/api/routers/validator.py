from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import User
from app.api.deps import get_db, get_current_user, get_validator_service
from app.services.validator_service import ValidatorService
from app.core.exceptions import ForbiddenError
from app.core.limiter import limiter
from app.schemas.validator_schemas import (
    ValidatorQueueListResponse,
    ValidatorQueueDetailResponse,
    ApproveRequest,
    RejectRequest,
    ValidatorActionResponse,
)

router = APIRouter()


def require_validator(user: User):
    if user.role != "validator":
        raise ForbiddenError("Доступно только для валидаторов")


@router.get("/queue", response_model=ValidatorQueueListResponse)
@limiter.limit("100/minute")
async def get_queue(
    request: Request,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    user: User = Depends(get_current_user),
    service: ValidatorService = Depends(get_validator_service),
):
    require_validator(user)
    return await service.get_queue(page, limit)


@router.get("/queue/{artifact_id}", response_model=ValidatorQueueDetailResponse)
@limiter.limit("100/minute")
async def get_queue_item(
    request: Request,
    artifact_id: str,
    user: User = Depends(get_current_user),
    service: ValidatorService = Depends(get_validator_service),
):
    require_validator(user)
    return await service.get_item(artifact_id)


@router.patch("/queue/{artifact_id}/approve", response_model=ValidatorActionResponse)
@limiter.limit("30/minute")
async def approve_item(
    request: Request,
    artifact_id: str,
    body: ApproveRequest = None,
    user: User = Depends(get_current_user),
    service: ValidatorService = Depends(get_validator_service),
):
    require_validator(user)
    return await service.approve(artifact_id)


@router.patch("/queue/{artifact_id}/reject", response_model=ValidatorActionResponse)
@limiter.limit("30/minute")
async def reject_item(
    request: Request,
    artifact_id: str,
    body: RejectRequest = ...,
    user: User = Depends(get_current_user),
    service: ValidatorService = Depends(get_validator_service),
):
    require_validator(user)
    return await service.reject(artifact_id, body.reason)
