from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Depends, Query, Request

from app.db.models import User
from app.api.deps import get_current_user, get_project_service
from app.services.project_service import ProjectService
from app.schemas.project_schemas import (
    MatchResponse, ProjectListResponse, ProjectDetailResponse,
    ProjectArchiveResponse, ProjectStatisticsResponse, PortfolioSummaryResponse,
    ProjectResponsesListResponse, ResponseActionRequest, ResponseActionResponse,
    ProjectPhasesListResponse, PhaseUpdateRequest, PhaseUpdateResponse,
    ProjectTimelineResponse,
)
from app.core.limiter import limiter
from app.core.exceptions import ForbiddenError

router = APIRouter()


@router.get("", response_model=ProjectListResponse)
@limiter.limit("100/minute")
async def get_projects(
    request: Request,
    status: Optional[str] = Query(None),
    project_type: Optional[str] = Query(None),
    total_budget: Optional[float] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    sort_order: Optional[str] = Query("desc"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.get_projects(
        customer_id=current_user.id,
        status=status,
        project_type=project_type,
        total_budget=total_budget,
        start_date=start_date,
        end_date=end_date,
        search=search,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        limit=limit,
    )


@router.get("/portfolio/summary", response_model=PortfolioSummaryResponse)
@limiter.limit("100/minute")
async def get_portfolio_summary(
    request: Request,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.get_portfolio_summary(current_user.id)


@router.get("/{project_id}/statistics", response_model=ProjectStatisticsResponse)
@limiter.limit("100/minute")
async def get_project_statistics(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.get_project_statistics(project_id, current_user.id)


@router.patch("/{project_id}/archive", response_model=ProjectArchiveResponse)
@limiter.limit("100/minute")
async def archive_project(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.archive_project(project_id, current_user.id)


@router.get("/{project_id}/responses", response_model=ProjectResponsesListResponse)
@limiter.limit("100/minute")
async def get_project_responses(
    request: Request,
    project_id: str,
    status: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    sort_order: Optional[str] = Query("desc"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.get_project_responses(
        project_id=project_id,
        customer_id=current_user.id,
        status=status,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        limit=limit,
    )


@router.get("/{project_id}/phases", response_model=ProjectPhasesListResponse)
@limiter.limit("100/minute")
async def get_project_phases(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    return await project_service.get_project_phases(
        project_id=project_id,
        user_id=current_user.id,
        user_role=current_user.role,
    )


@router.get("/{project_id}/timeline", response_model=ProjectTimelineResponse)
@limiter.limit("100/minute")
async def get_project_timeline(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    return await project_service.get_project_timeline(
        project_id=project_id,
        user_id=current_user.id,
        user_role=current_user.role,
    )


@router.patch("/{project_id}/phases/{phase_id}", response_model=PhaseUpdateResponse)
@limiter.limit("100/minute")
async def update_phase(
    request: Request,
    project_id: str,
    phase_id: str,
    body: PhaseUpdateRequest,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.update_phase(
        project_id=project_id,
        phase_id=phase_id,
        customer_id=current_user.id,
        start_date=body.start_date,
        end_date=body.end_date,
        budget=body.budget,
        status=body.status,
        progress_percent=body.progress_percent,
    )


@router.patch("/{project_id}/responses/{response_id}", response_model=ResponseActionResponse)
@limiter.limit("100/minute")
async def handle_response_action(
    request: Request,
    project_id: str,
    response_id: str,
    body: ResponseActionRequest,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.handle_response_action(
        project_id=project_id,
        response_id=response_id,
        customer_id=current_user.id,
        action=body.action,
        rejection_reason=body.rejection_reason,
    )


@router.get("/{project_id}", response_model=ProjectDetailResponse)
@limiter.limit("100/minute")
async def get_project_detail(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    if current_user.role != "customer":
        raise ForbiddenError(detail="Доступно только для заказчиков")

    return await project_service.get_project_detail(project_id, current_user.id)


@router.get("/{project_id}/match", response_model=MatchResponse)
@limiter.limit("30/minute")
async def get_project_match(
    request: Request,
    project_id: str,
    current_user: User = Depends(get_current_user),
    project_service: ProjectService = Depends(get_project_service),
):
    return await project_service.get_match(project_id, current_user.id)
