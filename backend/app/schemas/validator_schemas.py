from typing import Optional, List
from pydantic import BaseModel, Field


class ValidatorQueueItem(BaseModel):
    id: str
    project_id: str
    project_title: str
    phase_id: Optional[str] = None
    phase_title: Optional[str] = None
    name: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    artifact_type: Optional[str] = None
    status: str
    created_by: str
    created_at: str


class PaginationInfo(BaseModel):
    total: int
    page: int
    limit: int
    pages: int


class ValidatorQueueListResponse(BaseModel):
    items: List[ValidatorQueueItem]
    pagination: PaginationInfo


class ValidatorQueueDetailResponse(BaseModel):
    id: str
    project_id: str
    project_title: str
    phase_id: Optional[str] = None
    phase_title: Optional[str] = None
    phase_number: Optional[int] = None
    name: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    artifact_type: Optional[str] = None
    status: str
    created_by: str
    created_at: str


class ApproveRequest(BaseModel):
    comment: Optional[str] = Field(None, max_length=500)


class RejectRequest(BaseModel):
    reason: str = Field(..., min_length=1, max_length=500)


class ValidatorActionResponse(BaseModel):
    message: str
    artifact_id: str
    status: str
    updated_at: str
