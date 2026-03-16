from fastapi import APIRouter, Depends, Query, Request

from app.db.models import User
from app.api.deps import get_current_user, get_specialist_service
from app.services.specialist_service import SpecialistService
from app.schemas.specialist_schemas import (
    DashboardResponse,
    ProfileResponse,
    ProfileUpdateRequest,
    ProfileUpdateResponse,
    SpecialistProjectsResponse,
    ProjectVisibilityRequest,
    ProjectVisibilityResponse,
    InvitationsListResponse,
    InvitationActionRequest,
    InvitationActionResponse,
    ReviewsListResponse,
    ReviewItem,
    CreateReviewRequest,
    CreateReviewResponse,
    UpdateReviewRequest,
    UpdateReviewResponse,
)
from app.core.exceptions import ForbiddenError
from app.core.limiter import limiter

router = APIRouter()


@router.get("/me/dashboard", response_model=DashboardResponse)
@limiter.limit("30/minute")
async def get_dashboard(
    request: Request,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    if current_user.role != "specialist":
        raise ForbiddenError(detail="Доступ только для специалистов")

    return await specialist_service.get_dashboard(current_user.id)


@router.get("/me/profile", response_model=ProfileResponse)
@limiter.limit("30/minute")
async def get_profile(
    request: Request,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    if current_user.role != "specialist":
        raise ForbiddenError(detail="Доступ только для специалистов")

    return await specialist_service.get_profile(current_user.id)


@router.patch("/me/profile", response_model=ProfileUpdateResponse)
@limiter.limit("30/minute")
async def update_profile(
    request: Request,
    body: ProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    if current_user.role != "specialist":
        raise ForbiddenError(detail="Доступ только для специалистов")

    data = body.model_dump(exclude_unset=True)
    return await specialist_service.update_profile(current_user.id, data)


@router.get("/me/invitations", response_model=InvitationsListResponse)
@limiter.limit("30/minute")
async def get_invitations(
    request: Request,
    status: str = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    if current_user.role != "specialist":
        raise ForbiddenError(detail="Доступ только для специалистов")

    return await specialist_service.get_invitations(current_user.id, status, page, limit)


@router.patch("/me/invitations/{invitation_id}", response_model=InvitationActionResponse)
@limiter.limit("30/minute")
async def handle_invitation(
    request: Request,
    invitation_id: str,
    body: InvitationActionRequest,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    if current_user.role != "specialist":
        raise ForbiddenError(detail="Доступ только для специалистов")

    return await specialist_service.handle_invitation(
        current_user.id, invitation_id, body.action, body.rejection_reason
    )


@router.get("/{specialist_id}/reviews", response_model=ReviewsListResponse)
@limiter.limit("30/minute")
async def get_reviews(
    request: Request,
    specialist_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    return await specialist_service.get_reviews(specialist_id, page, limit)


@router.post("/{specialist_id}/reviews", response_model=CreateReviewResponse, status_code=201)
@limiter.limit("30/minute")
async def create_review(
    request: Request,
    specialist_id: str,
    body: CreateReviewRequest,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    return await specialist_service.create_review(
        specialist_id, current_user.id, body.project_id, body.rating, body.review_text
    )


@router.get("/{specialist_id}/reviews/{review_id}", response_model=ReviewItem)
@limiter.limit("30/minute")
async def get_review(
    request: Request,
    specialist_id: str,
    review_id: str,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    return await specialist_service.get_review(specialist_id, review_id)


@router.patch("/{specialist_id}/reviews/{review_id}", response_model=UpdateReviewResponse)
@limiter.limit("30/minute")
async def update_review(
    request: Request,
    specialist_id: str,
    review_id: str,
    body: UpdateReviewRequest,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    data = body.model_dump(exclude_unset=True)
    return await specialist_service.update_review(
        specialist_id, review_id, current_user.id, data
    )


@router.get("/{specialist_id}/projects", response_model=SpecialistProjectsResponse)
@limiter.limit("30/minute")
async def get_specialist_projects(
    request: Request,
    specialist_id: str,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    return await specialist_service.get_specialist_projects(specialist_id, current_user.id)


@router.patch("/{specialist_id}/projects/{project_id}/visibility", response_model=ProjectVisibilityResponse)
@limiter.limit("30/minute")
async def update_project_visibility(
    request: Request,
    specialist_id: str,
    project_id: str,
    body: ProjectVisibilityRequest,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    return await specialist_service.update_project_visibility(
        specialist_id, project_id, body.is_visible_in_portfolio, current_user.id
    )


@router.get("/{specialist_id}", response_model=ProfileResponse)
@limiter.limit("30/minute")
async def get_public_profile(
    request: Request,
    specialist_id: str,
    current_user: User = Depends(get_current_user),
    specialist_service: SpecialistService = Depends(get_specialist_service),
):
    return await specialist_service.get_public_profile(specialist_id)
