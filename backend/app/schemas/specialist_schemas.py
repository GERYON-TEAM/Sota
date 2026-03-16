from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr


class ProfileInfo(BaseModel):
    id: str
    name: str
    level: str
    level_progress_percent: int
    rating: float
    total_reviews: int
    total_completed_projects: int
    is_public: bool


class InvitationsInfo(BaseModel):
    pending_count: int
    last_received_at: Optional[str] = None


class ProjectsInfo(BaseModel):
    active_count: int
    last_completed_at: Optional[str] = None


class DashboardResponse(BaseModel):
    profile: ProfileInfo
    invitations: InvitationsInfo
    projects: ProjectsInfo


class ProfileUpdateRequest(BaseModel):
    bio: Optional[str] = Field(None, max_length=500)
    contact_email: Optional[EmailStr] = None
    github_url: Optional[str] = Field(None, max_length=500)
    telegram_handle: Optional[str] = Field(None, max_length=100)
    profile_photo_url: Optional[str] = Field(None, max_length=500)
    is_public: Optional[bool] = None
    contact_email_public: Optional[bool] = None
    github_url_public: Optional[bool] = None
    telegram_handle_public: Optional[bool] = None


class ProfileUpdateResponse(BaseModel):
    id: str
    updated_fields: List[str]
    updated_at: str
    message: str


class SpecialistProjectItem(BaseModel):
    project_id: str
    project_title: str
    project_role: str
    status: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_visible_in_portfolio: bool


class SpecialistProjectsResponse(BaseModel):
    projects: List[SpecialistProjectItem]


class ProjectVisibilityRequest(BaseModel):
    is_visible_in_portfolio: bool


class ProjectVisibilityResponse(BaseModel):
    message: str
    specialist_id: str
    project_id: str
    is_visible_in_portfolio: bool
    updated_at: str


class InvitationItem(BaseModel):
    id: str
    project_id: str
    proposed_role: Optional[str] = None
    proposed_salary: Optional[float] = None
    match_percentage: int
    status: str
    expires_at: str
    created_at: str


class PaginationInfo(BaseModel):
    total: int
    page: int
    limit: int
    pages: int


class InvitationsListResponse(BaseModel):
    invitations: List[InvitationItem]
    pagination: PaginationInfo


class InvitationActionRequest(BaseModel):
    action: str = Field(..., pattern="^(accept|reject)$")
    rejection_reason: Optional[str] = Field(None, max_length=500)


class InvitationActionResponse(BaseModel):
    invitation_id: str
    status: str
    message: str
    updated_at: str


class ReviewItem(BaseModel):
    id: str
    project_id: str
    rating: int
    review_text: str
    reviewer_id: str
    created_at: str


class ReviewsListResponse(BaseModel):
    reviews: List[ReviewItem]
    pagination: PaginationInfo


class CreateReviewRequest(BaseModel):
    project_id: str
    rating: int = Field(..., ge=1, le=5)
    review_text: str = Field(..., min_length=10, max_length=500)


class CreateReviewResponse(BaseModel):
    review_id: str
    specialist_id: str
    project_id: str
    rating: int
    review_text: str
    created_at: str
    message: str


class UpdateReviewRequest(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    review_text: Optional[str] = Field(None, min_length=10, max_length=500)


class UpdateReviewResponse(BaseModel):
    review_id: str
    specialist_id: str
    project_id: str
    rating: int
    review_text: str
    updated_at: str
    message: str


class ProfileResponse(BaseModel):
    id: str
    level: str
    level_progress_percent: int
    rating: float
    total_reviews: int
    bio: Optional[str] = None
    profile_photo_url: Optional[str] = None
    is_public: bool
    contact_email: Optional[str] = None
    github_url: Optional[str] = None
    telegram_handle: Optional[str] = None
    years_of_experience: Optional[int] = None
    total_completed_projects: int
    created_at: str
    updated_at: str
