from typing import Optional, List
from pydantic import BaseModel


class MatchResponse(BaseModel):
    project_id: str
    specialist_id: str
    match_percentage: int
    skills_match: float
    level_match: float
    rating_match: float
    match_source: str
    ml_engine_version: Optional[str] = None
    calculated_at: str


class ProjectListItem(BaseModel):
    id: str
    title: str
    description: str
    status: str
    project_type: Optional[str] = None
    total_budget: Optional[float] = None
    spent_budget: Optional[float] = None
    progress_percent: int
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_overdue: bool
    responses_count: int
    specialist_id: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class PaginationInfo(BaseModel):
    total: int
    page: int
    limit: int
    pages: int


class ProjectListResponse(BaseModel):
    projects: List[ProjectListItem]
    pagination: PaginationInfo


class AttachmentItem(BaseModel):
    name: str
    url: Optional[str] = None
    size: Optional[int] = None


class PhaseItem(BaseModel):
    id: str
    phase_number: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    budget: Optional[float] = None
    progress_percent: Optional[int] = None
    deliverables: Optional[list] = None


class TeamMemberItem(BaseModel):
    id: str
    name: Optional[str] = None
    avatar: Optional[str] = None
    rating: Optional[float] = None
    role: Optional[str] = None
    level: Optional[str] = None


class ProjectDetailResponse(BaseModel):
    id: str
    title: str
    description: str
    project_type: Optional[str] = None
    goals: Optional[str] = None
    target_audience: Optional[str] = None
    status: str
    total_budget: Optional[float] = None
    spent_budget: Optional[float] = None
    plan_id: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    actual_end_date: Optional[str] = None
    flexible_deadline: bool
    tech_and_roles_preferences: Optional[str] = None
    estimated_size: Optional[str] = None
    features: Optional[list] = None
    complexity: Optional[str] = None
    attachments: List[AttachmentItem]
    team: List[TeamMemberItem]
    phases: List[PhaseItem]
    responses_count: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    published_at: Optional[str] = None
    completed_at: Optional[str] = None
    archived_at: Optional[str] = None


class ProjectArchiveResponse(BaseModel):
    message: str
    project_id: str
    status: str
    archived_at: str


class ProjectStatisticsResponse(BaseModel):
    total_budget: Optional[float] = None
    spent_budget: Optional[float] = None
    remaining_budget: Optional[float] = None
    overall_progress: int
    phases_completed: int
    phases_total: int
    responses_count: int
    responses_pending: int
    responses_accepted: int
    responses_rejected: int
    average_proposed_price: Optional[float] = None
    time_elapsed_days: int
    time_remaining_days: Optional[int] = None
    is_overdue: bool


class ResponseSpecialistInfo(BaseModel):
    id: str
    name: str
    avatar: Optional[str] = None
    rating: float
    level: str
    experience_years: Optional[int] = None


class ResponseItem(BaseModel):
    id: str
    specialist: ResponseSpecialistInfo
    status: str
    created_at: str


class ProjectResponsesListResponse(BaseModel):
    responses: List[ResponseItem]
    pagination: PaginationInfo


class PhaseListItem(BaseModel):
    id: str
    phase_number: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    budget: Optional[float] = None
    progress_percent: Optional[int] = None
    deliverables: Optional[list] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class ProjectPhasesListResponse(BaseModel):
    phases: List[PhaseListItem]


class PhaseUpdateRequest(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    budget: Optional[float] = None
    status: Optional[str] = None
    progress_percent: Optional[int] = None


class PhaseUpdateResponse(BaseModel):
    message: str
    phase_id: str
    updated_fields: List[str]
    project_progress: int
    updated_at: str


class TimelinePhaseItem(BaseModel):
    id: str
    phase_number: Optional[int] = None
    title: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    duration_days: int
    status: Optional[str] = None
    progress_percent: int
    is_critical: bool
    is_delayed: bool
    dependencies: List[str]


class ProjectTimelineResponse(BaseModel):
    project_start: Optional[str] = None
    project_end: Optional[str] = None
    project_duration_days: int
    phases: List[TimelinePhaseItem]
    critical_path: List[str]


class ResponseActionRequest(BaseModel):
    action: str
    rejection_reason: Optional[str] = None


class ResponseActionResponse(BaseModel):
    message: str
    response_id: str
    response_status: str
    project_status: str
    specialist_id: Optional[str] = None
    updated_at: str


class ProjectsByStatus(BaseModel):
    draft: int = 0
    plan_generated: int = 0
    plan_approved: int = 0
    payment_pending: int = 0
    payment_completed: int = 0
    team_matching: int = 0
    in_progress: int = 0
    completed: int = 0
    archived: int = 0
    cancelled: int = 0


class BudgetByCategoryItem(BaseModel):
    category: str
    total_budget: float
    projects_count: int


class MonthlySpendingItem(BaseModel):
    month: str
    total_spent: float
    projects_count: int


class PortfolioSummaryResponse(BaseModel):
    total_projects: int
    total_invested: float
    total_spent: float
    average_budget: float
    projects_by_status: ProjectsByStatus
    budget_by_category: List[BudgetByCategoryItem]
    monthly_spending: List[MonthlySpendingItem]
