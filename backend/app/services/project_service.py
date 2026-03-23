import logging
from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories import (
    ProjectRepository,
    ProjectRequiredSkillRepository,
    SpecialistProfileRepository,
    SpecialistSkillRepository,
    UserRepository,
)
from app.core.exceptions import NotFoundError, ForbiddenError

logger = logging.getLogger(__name__)

LEVEL_ORDER = {"junior": 1, "middle": 2, "senior": 3}


class ProjectService:
    def __init__(self, db: AsyncSession):
        self.project_repo = ProjectRepository(db)
        self.required_skill_repo = ProjectRequiredSkillRepository(db)
        self.profile_repo = SpecialistProfileRepository(db)
        self.skill_repo = SpecialistSkillRepository(db)
        self.user_repo = UserRepository(db)

    async def get_match(self, project_id: str, user_id: str) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            required_skills = await self.required_skill_repo.get_by_project_id(project_id)
            specialist_skills = await self.skill_repo.get_by_specialist_id(profile.id)

            skills_match = self._calculate_skills_match(required_skills, specialist_skills)
            level_match = self._calculate_level_match(
                project.required_level, profile.level
            )
            rating_match = self._calculate_rating_match(float(profile.rating))

            match_percentage = round(
                skills_match * 0.5 + level_match * 0.3 + rating_match * 0.2
            )
            match_percentage = min(100, max(0, match_percentage))

            now = datetime.utcnow()

            return {
                "project_id": str(project.id),
                "specialist_id": str(profile.id),
                "match_percentage": match_percentage,
                "skills_match": round(skills_match, 1),
                "level_match": round(level_match, 1),
                "rating_match": round(rating_match, 1),
                "match_source": "fallback",
                "ml_engine_version": None,
                "calculated_at": now.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_match")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    def _calculate_skills_match(self, required_skills, specialist_skills) -> float:
        if not required_skills:
            return 100.0

        spec_map = {s.skill_name.lower(): s.proficiency for s in specialist_skills}

        total_score = 0.0
        for req in required_skills:
            spec_prof = spec_map.get(req.skill_name.lower(), 0)
            if spec_prof >= req.min_proficiency:
                total_score += 100.0
            elif spec_prof > 0:
                total_score += (spec_prof / req.min_proficiency) * 100.0

        return total_score / len(required_skills)

    def _calculate_level_match(self, required_level: str, specialist_level: str) -> float:
        req = LEVEL_ORDER.get(required_level, 1)
        spec = LEVEL_ORDER.get(specialist_level, 1)

        if spec >= req:
            return 100.0
        if spec == req - 1:
            return 50.0
        return 0.0

    def _calculate_rating_match(self, rating: float) -> float:
        return (rating / 5.0) * 100.0
