from typing import Optional, List
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repository import BaseRepository
from app.db.models import (
    User, SpecialistProfile, SpecialistInvitation,
    SpecialistProjectHistory, SpecialistReview, Project,
)


class UserRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, User)

    async def get_by_email(self, email: str) -> Optional[User]:
        query = select(self.model).where(self.model.email == email)
        result = await self.db.execute(query)
        return result.scalars().first()


class SpecialistProfileRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SpecialistProfile)

    async def get_by_user_id(self, user_id: str) -> Optional[SpecialistProfile]:
        query = select(self.model).where(self.model.user_id == user_id)
        result = await self.db.execute(query)
        return result.scalars().first()


class SpecialistInvitationRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SpecialistInvitation)

    async def get_pending_stats(self, specialist_id: str):
        query = select(
            func.count(self.model.id).label("pending_count"),
            func.max(self.model.created_at).label("last_received_at"),
        ).where(
            self.model.specialist_id == specialist_id,
            self.model.status == "pending",
        )
        result = await self.db.execute(query)
        return result.first()

    async def get_list(
        self, specialist_id: str, status: Optional[str], page: int, limit: int
    ) -> dict:
        base = select(self.model).where(self.model.specialist_id == specialist_id)
        if status:
            base = base.where(self.model.status == status)

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        offset = (page - 1) * limit
        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}

    async def get_by_id_and_specialist(self, invitation_id: str, specialist_id: str):
        query = select(self.model).where(
            self.model.id == invitation_id,
            self.model.specialist_id == specialist_id,
        )
        result = await self.db.execute(query)
        return result.scalars().first()


class SpecialistProjectHistoryRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SpecialistProjectHistory)

    async def get_active_count(self, specialist_id: str) -> int:
        query = select(func.count(self.model.id)).where(
            self.model.specialist_id == specialist_id,
            self.model.status == "in_progress",
        )
        result = await self.db.execute(query)
        return result.scalar()

    async def get_last_completed_date(self, specialist_id: str):
        query = select(func.max(self.model.end_date)).where(
            self.model.specialist_id == specialist_id,
            self.model.status == "completed",
        )
        result = await self.db.execute(query)
        return result.scalar()

    async def get_projects_with_title(self, specialist_id: str, only_visible: bool = True) -> List:
        query = select(
            self.model.project_id,
            self.model.project_role,
            self.model.status,
            self.model.start_date,
            self.model.end_date,
            self.model.is_visible_in_portfolio,
            Project.title.label("project_title"),
        ).join(
            Project, self.model.project_id == Project.id
        ).where(
            self.model.specialist_id == specialist_id,
        )

        if only_visible:
            query = query.where(self.model.is_visible_in_portfolio == True)

        result = await self.db.execute(query)
        return result.all()

    async def get_by_specialist_and_project(self, specialist_id: str, project_id: str):
        query = select(self.model).where(
            self.model.specialist_id == specialist_id,
            self.model.project_id == project_id,
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_role_in_project(self, specialist_id: str, project_id: str) -> Optional[str]:
        query = select(self.model.project_role).where(
            self.model.specialist_id == specialist_id,
            self.model.project_id == project_id,
        )
        result = await self.db.execute(query)
        return result.scalar()


class SpecialistReviewRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SpecialistReview)

    async def get_list(self, specialist_id: str, page: int, limit: int) -> dict:
        base = select(self.model).where(self.model.specialist_id == specialist_id)

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        offset = (page - 1) * limit
        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}

    async def get_by_id_and_specialist(self, review_id: str, specialist_id: str):
        query = select(self.model).where(
            self.model.id == review_id,
            self.model.specialist_id == specialist_id,
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_stats(self, specialist_id: str) -> dict:
        query = select(
            func.count(self.model.id).label("total"),
            func.avg(self.model.rating).label("avg_rating"),
        ).where(self.model.specialist_id == specialist_id)
        result = await self.db.execute(query)
        row = result.first()
        return {"total": row.total, "avg_rating": float(row.avg_rating) if row.avg_rating else 0.0}
