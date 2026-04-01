import math
from datetime import datetime
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import ProjectArtifact, Project, ProjectPhase
from app.core.exceptions import NotFoundError, UnprocessableError


class ValidatorService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_queue(self, page: int, limit: int) -> dict:
        base = (
            select(ProjectArtifact, Project.title.label("project_title"))
            .join(Project, ProjectArtifact.project_id == Project.id)
            .where(ProjectArtifact.status == "pending")
            .order_by(ProjectArtifact.created_at.desc())
        )

        count_q = select(func.count()).select_from(base.subquery())
        count_result = await self.db.execute(count_q)
        total = count_result.scalar()

        offset = (page - 1) * limit
        items_q = base.offset(offset).limit(limit)
        items_result = await self.db.execute(items_q)
        rows = items_result.all()

        items = []
        for row in rows:
            artifact = row[0]
            project_title = row[1]

            phase_title = None
            if artifact.phase_id:
                phase_q = select(ProjectPhase.title).where(ProjectPhase.id == artifact.phase_id)
                phase_result = await self.db.execute(phase_q)
                phase_title = phase_result.scalar()

            items.append({
                "id": artifact.id,
                "project_id": artifact.project_id,
                "project_title": project_title,
                "phase_id": artifact.phase_id,
                "phase_title": phase_title,
                "name": artifact.name,
                "description": artifact.description,
                "file_url": artifact.file_url,
                "artifact_type": artifact.artifact_type,
                "status": artifact.status,
                "created_by": artifact.created_by,
                "created_at": artifact.created_at.isoformat() if artifact.created_at else None,
            })

        return {
            "items": items,
            "pagination": {
                "total": total,
                "page": page,
                "limit": limit,
                "pages": math.ceil(total / limit) if total else 0,
            },
        }

    async def get_item(self, artifact_id: str) -> dict:
        q = (
            select(ProjectArtifact, Project.title.label("project_title"))
            .join(Project, ProjectArtifact.project_id == Project.id)
            .where(ProjectArtifact.id == artifact_id)
        )
        result = await self.db.execute(q)
        row = result.first()

        if not row:
            raise NotFoundError("Артефакт не найден")

        artifact = row[0]
        project_title = row[1]

        phase_title = None
        phase_number = None
        if artifact.phase_id:
            phase_q = select(ProjectPhase.title, ProjectPhase.phase_number).where(
                ProjectPhase.id == artifact.phase_id
            )
            phase_result = await self.db.execute(phase_q)
            phase_row = phase_result.first()
            if phase_row:
                phase_title = phase_row[0]
                phase_number = phase_row[1]

        return {
            "id": artifact.id,
            "project_id": artifact.project_id,
            "project_title": project_title,
            "phase_id": artifact.phase_id,
            "phase_title": phase_title,
            "phase_number": phase_number,
            "name": artifact.name,
            "description": artifact.description,
            "file_url": artifact.file_url,
            "artifact_type": artifact.artifact_type,
            "status": artifact.status,
            "created_by": artifact.created_by,
            "created_at": artifact.created_at.isoformat() if artifact.created_at else None,
        }

    async def approve(self, artifact_id: str) -> dict:
        q = select(ProjectArtifact).where(ProjectArtifact.id == artifact_id)
        result = await self.db.execute(q)
        artifact = result.scalars().first()

        if not artifact:
            raise NotFoundError("Артефакт не найден")

        if artifact.status != "pending":
            raise UnprocessableError("Артефакт уже обработан")

        artifact.status = "approved"
        artifact.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(artifact)

        return {
            "message": "Артефакт одобрен",
            "artifact_id": artifact.id,
            "status": artifact.status,
            "updated_at": artifact.updated_at.isoformat(),
        }

    async def reject(self, artifact_id: str, reason: str) -> dict:
        q = select(ProjectArtifact).where(ProjectArtifact.id == artifact_id)
        result = await self.db.execute(q)
        artifact = result.scalars().first()

        if not artifact:
            raise NotFoundError("Артефакт не найден")

        if artifact.status != "pending":
            raise UnprocessableError("Артефакт уже обработан")

        artifact.status = "rejected"
        artifact.description = f"{artifact.description or ''}\n\nПричина отклонения: {reason}".strip()
        artifact.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(artifact)

        return {
            "message": "Артефакт отклонён",
            "artifact_id": artifact.id,
            "status": artifact.status,
            "updated_at": artifact.updated_at.isoformat(),
        }
