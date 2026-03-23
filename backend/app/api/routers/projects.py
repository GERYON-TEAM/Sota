from fastapi import APIRouter, Depends, Request

from app.db.models import User
from app.api.deps import get_current_user, get_project_service
from app.services.project_service import ProjectService
from app.schemas.project_schemas import MatchResponse
from app.core.limiter import limiter

router = APIRouter()


@router.get("/{project_id}/match", response_model=MatchResponse)
@limiter.limit("30/minute")
async def get_project_match(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    return await project_service.get_match(project_id, current_user.id)
