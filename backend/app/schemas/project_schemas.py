from typing import Optional
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
