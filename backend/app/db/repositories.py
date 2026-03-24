from typing import Optional, List
from datetime import datetime
from sqlalchemy import select, func, delete, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repository import BaseRepository
from app.db.models import (
    User, SpecialistProfile, SpecialistInvitation,
    SpecialistProjectHistory, SpecialistReview, Project,
    SpecialistSkill, SpecialistPdp, ProjectRequiredSkill,
    Session, AuditLog, Role, Permission, LoginAttempt, TwoFactorBackupCode,
)


class UserRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, User)

    async def get_by_email(self, email: str) -> Optional[User]:
        query = select(self.model).where(self.model.email == email)
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_by_verification_token(self, token: str) -> Optional[User]:
        query = select(self.model).where(self.model.email_verification_token == token)
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_by_reset_token(self, token: str) -> Optional[User]:
        query = select(self.model).where(self.model.password_reset_token == token)
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_list(
        self,
        role: Optional[str],
        status: Optional[str],
        search: Optional[str],
        limit: int,
        offset: int,
    ) -> dict:
        base = select(self.model)
        if role:
            base = base.where(self.model.role == role)
        if status:
            base = base.where(self.model.status == status)
        if search:
            pattern = f"%{search}%"
            base = base.where(
                (self.model.email.ilike(pattern))
                | (self.model.first_name.ilike(pattern))
                | (self.model.last_name.ilike(pattern))
            )

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}


class SessionRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Session)

    async def get_by_refresh_token(self, refresh_token: str) -> Optional[Session]:
        query = select(self.model).where(
            self.model.refresh_token == refresh_token,
            self.model.is_active == True,
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_by_access_token(self, access_token: str) -> Optional[Session]:
        query = select(self.model).where(
            self.model.access_token == access_token,
            self.model.is_active == True,
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def get_active_by_user(self, user_id: str) -> List:
        query = (
            select(self.model)
            .where(self.model.user_id == user_id, self.model.is_active == True)
            .order_by(self.model.created_at.desc())
        )
        result = await self.db.execute(query)
        return result.scalars().all()

    async def get_active_by_user_paginated(self, user_id: str, limit: int, offset: int) -> dict:
        base = select(self.model).where(
            self.model.user_id == user_id,
            self.model.is_active == True,
        )

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}

    async def deactivate(self, session_id: str) -> None:
        query = (
            update(self.model)
            .where(self.model.id == session_id)
            .values(is_active=False)
        )
        await self.db.execute(query)
        await self.db.commit()

    async def deactivate_all_by_user(self, user_id: str) -> int:
        query = (
            update(self.model)
            .where(self.model.user_id == user_id, self.model.is_active == True)
            .values(is_active=False)
        )
        result = await self.db.execute(query)
        await self.db.commit()
        return result.rowcount


class AuditLogRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, AuditLog)

    async def get_by_user(self, user_id: str, action: Optional[str], page: int, limit: int) -> dict:
        base = select(self.model).where(self.model.user_id == user_id)
        if action:
            base = base.where(self.model.action == action)

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        offset = (page - 1) * limit
        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}

    async def get_audit_log(
        self,
        user_id: Optional[str],
        action: Optional[str],
        entity_type: Optional[str],
        from_date: Optional[datetime],
        to_date: Optional[datetime],
        limit: int,
        offset: int,
    ) -> dict:
        base = select(self.model)
        if user_id:
            base = base.where(self.model.user_id == user_id)
        if action:
            base = base.where(self.model.action == action)
        if entity_type:
            base = base.where(self.model.entity_type == entity_type)
        if from_date:
            base = base.where(self.model.created_at >= from_date)
        if to_date:
            base = base.where(self.model.created_at <= to_date)

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}

    async def get_login_history(
        self,
        user_id: str,
        action: Optional[str],
        from_date: Optional[datetime],
        to_date: Optional[datetime],
        limit: int,
        offset: int,
    ) -> dict:
        auth_actions = ["login_success", "login_failed", "logout"]
        base = select(self.model).where(
            self.model.user_id == user_id,
            self.model.action.in_(auth_actions),
        )
        if action:
            base = base.where(self.model.action == action)
        if from_date:
            base = base.where(self.model.created_at >= from_date)
        if to_date:
            base = base.where(self.model.created_at <= to_date)

        count_query = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        items_query = base.order_by(self.model.created_at.desc()).offset(offset).limit(limit)
        items_result = await self.db.execute(items_query)
        items = items_result.scalars().all()

        return {"items": items, "total": total}

    async def count_by_entity(self, entity_id: str, action: str) -> int:
        query = select(func.count(self.model.id)).where(
            self.model.entity_id == entity_id,
            self.model.action == action,
        )
        result = await self.db.execute(query)
        return result.scalar()


class RoleRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Role)

    async def get_by_name(self, name: str) -> Optional[Role]:
        query = select(self.model).where(self.model.name == name)
        result = await self.db.execute(query)
        return result.scalars().first()


class PermissionRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Permission)

    async def get_by_role(self, role_id: str) -> List:
        query = select(self.model).where(self.model.role_id == role_id)
        result = await self.db.execute(query)
        return result.scalars().all()

    async def check_permission(self, role_id: str, resource: str, action: str) -> bool:
        query = select(self.model).where(
            self.model.role_id == role_id,
            self.model.resource == resource,
            self.model.action == action,
            self.model.can_perform == True,
        )
        result = await self.db.execute(query)
        return result.scalars().first() is not None


class LoginAttemptRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, LoginAttempt)

    async def get_recent_failed(self, email: str, since: datetime) -> int:
        query = select(func.count(self.model.id)).where(
            self.model.email == email,
            self.model.success == False,
            self.model.created_at >= since,
        )
        result = await self.db.execute(query)
        return result.scalar()


class TwoFactorBackupCodeRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, TwoFactorBackupCode)

    async def get_unused_by_user(self, user_id: str) -> List:
        query = select(self.model).where(
            self.model.user_id == user_id,
            self.model.is_used == False,
        )
        result = await self.db.execute(query)
        return result.scalars().all()

    async def delete_by_user(self, user_id: str) -> None:
        query = delete(self.model).where(self.model.user_id == user_id)
        await self.db.execute(query)


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

    async def mark_expired(self, specialist_id: str) -> int:
        query = (
            update(self.model)
            .where(
                self.model.specialist_id == specialist_id,
                self.model.status == "pending",
                self.model.expires_at < datetime.utcnow(),
            )
            .values(status="expired", updated_at=datetime.utcnow())
        )
        result = await self.db.execute(query)
        await self.db.commit()
        return result.rowcount


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

    async def get_completed_count(self, specialist_id: str) -> int:
        query = select(func.count(self.model.id)).where(
            self.model.specialist_id == specialist_id,
            self.model.status == "completed",
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

    async def get_unique_reviewer_count(self, specialist_id: str) -> int:
        query = select(func.count(func.distinct(self.model.reviewer_id))).where(
            self.model.specialist_id == specialist_id
        )
        result = await self.db.execute(query)
        return result.scalar()

    async def get_breakdown(self, specialist_id: str) -> dict:
        query = (
            select(self.model.rating, func.count(self.model.id))
            .where(self.model.specialist_id == specialist_id)
            .group_by(self.model.rating)
        )
        result = await self.db.execute(query)
        breakdown = {str(i): 0 for i in range(1, 6)}
        for rating, count in result.all():
            breakdown[str(rating)] = count
        return breakdown


class SpecialistSkillRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SpecialistSkill)

    async def get_by_specialist_id(self, specialist_id: str) -> List:
        query = (
            select(self.model)
            .where(self.model.specialist_id == specialist_id)
            .order_by(self.model.created_at.desc())
        )
        result = await self.db.execute(query)
        return result.scalars().all()

    async def delete_by_specialist_id(self, specialist_id: str) -> None:
        query = delete(self.model).where(self.model.specialist_id == specialist_id)
        await self.db.execute(query)

    async def bulk_create(self, items: list) -> List:
        objects = [self.model(**data) for data in items]
        self.db.add_all(objects)
        await self.db.flush()
        for obj in objects:
            await self.db.refresh(obj)
        return objects


class SpecialistPdpRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SpecialistPdp)

    async def get_by_specialist_id(self, specialist_id: str) -> List:
        query = (
            select(self.model)
            .where(self.model.specialist_id == specialist_id)
            .order_by(self.model.created_at.desc())
        )
        result = await self.db.execute(query)
        return result.scalars().all()

    async def get_by_id_and_specialist(self, goal_id: str, specialist_id: str):
        query = select(self.model).where(
            self.model.id == goal_id,
            self.model.specialist_id == specialist_id,
        )
        result = await self.db.execute(query)
        return result.scalars().first()


class ProjectRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Project)


class ProjectRequiredSkillRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        super().__init__(db, ProjectRequiredSkill)

    async def get_by_project_id(self, project_id: str) -> List:
        query = select(self.model).where(self.model.project_id == project_id)
        result = await self.db.execute(query)
        return result.scalars().all()
