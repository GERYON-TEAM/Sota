import logging
import math
from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories import (
    ProjectRepository,
    ProjectRequiredSkillRepository,
    SpecialistProfileRepository,
    SpecialistSkillRepository,
    SpecialistProjectHistoryRepository,
    UserRepository,
    ProjectPhaseRepository,
    ProjectResponseRepository,
    ProjectPlanRepository,
    ProjectArtifactRepository,
    ProjectAuditLogRepository,
)
from app.core.exceptions import NotFoundError, ForbiddenError, ConflictError, UnprocessableError

logger = logging.getLogger(__name__)

LEVEL_ORDER = {"junior": 1, "middle": 2, "senior": 3}


class ProjectService:
    def __init__(self, db: AsyncSession):
        self.project_repo = ProjectRepository(db)
        self.required_skill_repo = ProjectRequiredSkillRepository(db)
        self.profile_repo = SpecialistProfileRepository(db)
        self.skill_repo = SpecialistSkillRepository(db)
        self.user_repo = UserRepository(db)
        self.phase_repo = ProjectPhaseRepository(db)
        self.response_repo = ProjectResponseRepository(db)
        self.plan_repo = ProjectPlanRepository(db)
        self.artifact_repo = ProjectArtifactRepository(db)
        self.audit_repo = ProjectAuditLogRepository(db)
        self.history_repo = SpecialistProjectHistoryRepository(db)
        self.db = db

    async def get_projects(
        self,
        customer_id: str,
        status: Optional[str] = None,
        project_type: Optional[str] = None,
        total_budget: Optional[float] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        search: Optional[str] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
        page: int = 1,
        limit: int = 20,
    ) -> dict:
        try:
            if sort_by not in ("created_at", "total_budget", "end_date"):
                sort_by = "created_at"
            if sort_order not in ("asc", "desc"):
                sort_order = "desc"
            if limit > 100:
                limit = 100
            if page < 1:
                page = 1

            result = await self.project_repo.get_customer_projects(
                customer_id=customer_id,
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

            projects = []
            now = datetime.utcnow()

            for p in result["items"]:
                progress = await self.phase_repo.get_avg_progress(p.id)
                responses_count = await self.response_repo.count_by_project(p.id)

                is_overdue = False
                if p.end_date and p.end_date < now and p.status not in ("completed", "archived"):
                    is_overdue = True

                description = p.description or ""
                if len(description) > 150:
                    description = description[:150]

                projects.append({
                    "id": str(p.id),
                    "title": p.title,
                    "description": description,
                    "status": p.status,
                    "project_type": p.project_type,
                    "total_budget": float(p.total_budget) if p.total_budget else None,
                    "spent_budget": float(p.spent_budget) if p.spent_budget else None,
                    "progress_percent": progress,
                    "start_date": p.start_date.isoformat() if p.start_date else None,
                    "end_date": p.end_date.isoformat() if p.end_date else None,
                    "is_overdue": is_overdue,
                    "responses_count": responses_count,
                    "specialist_id": str(p.specialist_id) if p.specialist_id else None,
                    "created_at": p.created_at.isoformat() if p.created_at else None,
                    "updated_at": p.updated_at.isoformat() if p.updated_at else None,
                })

            total = result["total"]
            pages = math.ceil(total / limit) if limit > 0 else 0

            return {
                "projects": projects,
                "pagination": {
                    "total": total,
                    "page": page,
                    "limit": limit,
                    "pages": pages,
                },
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_projects")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_project_detail(self, project_id: str, customer_id: str) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            if project.customer_id != customer_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")

            phases = await self.phase_repo.get_by_project_id(project_id)
            responses_count = await self.response_repo.count_by_project(project_id)
            plan = await self.plan_repo.get_by_project_id(project_id)
            attachments_raw = await self.artifact_repo.get_project_attachments(project_id)

            phases_list = []
            for ph in phases:
                phases_list.append({
                    "id": str(ph.id),
                    "phase_number": ph.phase_number,
                    "title": ph.title,
                    "description": ph.description,
                    "status": ph.status,
                    "start_date": ph.start_date.isoformat() if ph.start_date else None,
                    "end_date": ph.end_date.isoformat() if ph.end_date else None,
                    "budget": float(ph.budget) if ph.budget else None,
                    "progress_percent": ph.progress_percent,
                    "deliverables": ph.deliverables,
                })

            attachments = []
            for a in attachments_raw:
                attachments.append({
                    "name": a.name,
                    "url": a.file_url,
                    "size": None,
                })

            features = None
            if project.tech_and_roles_preferences_processed:
                processed = project.tech_and_roles_preferences_processed
                if isinstance(processed, dict):
                    features = processed.get("features")

            team = []
            if project.specialist_id:
                profile = await self.profile_repo.get_by_id(project.specialist_id)
                if profile:
                    user = await self.user_repo.get_by_id(profile.user_id)
                    role = await self.history_repo.get_role_in_project(
                        project.specialist_id, project_id
                    )
                    team.append({
                        "id": str(profile.id),
                        "name": f"{user.first_name} {user.last_name}".strip() if user else None,
                        "avatar": profile.profile_photo_url,
                        "rating": float(profile.rating) if profile.rating else None,
                        "role": role or "specialist",
                        "level": profile.level,
                    })

            return {
                "id": str(project.id),
                "title": project.title,
                "description": project.description or "",
                "project_type": project.project_type,
                "goals": project.goals,
                "target_audience": project.target_audience,
                "status": project.status,
                "total_budget": float(project.total_budget) if project.total_budget else None,
                "spent_budget": float(project.spent_budget) if project.spent_budget else None,
                "plan_id": str(plan.id) if plan else None,
                "start_date": project.start_date.isoformat() if project.start_date else None,
                "end_date": project.end_date.isoformat() if project.end_date else None,
                "actual_end_date": project.actual_end_date.isoformat() if project.actual_end_date else None,
                "flexible_deadline": project.flexible_deadline or False,
                "tech_and_roles_preferences": project.tech_and_roles_preferences,
                "estimated_size": project.estimated_size,
                "features": features,
                "complexity": project.complexity,
                "attachments": attachments,
                "team": team,
                "phases": phases_list,
                "responses_count": responses_count,
                "created_at": project.created_at.isoformat() if project.created_at else None,
                "updated_at": project.updated_at.isoformat() if project.updated_at else None,
                "published_at": project.published_at.isoformat() if project.published_at else None,
                "completed_at": project.completed_at.isoformat() if project.completed_at else None,
                "archived_at": project.archived_at.isoformat() if project.archived_at else None,
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_project_detail")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_portfolio_summary(self, customer_id: str) -> dict:
        try:
            summary = await self.project_repo.get_portfolio_summary(customer_id)
            status_counts = await self.project_repo.get_count_by_status(customer_id)
            budget_by_category = await self.project_repo.get_budget_by_category(customer_id)
            monthly_spending = await self.project_repo.get_monthly_spending(customer_id)

            all_statuses = [
                "draft", "plan_generated", "plan_approved", "payment_pending",
                "payment_completed", "team_matching", "in_progress", "completed",
                "archived", "cancelled",
            ]
            projects_by_status = {s: status_counts.get(s, 0) for s in all_statuses}

            return {
                "total_projects": summary["total"],
                "total_invested": summary["total_invested"],
                "total_spent": summary["total_spent"],
                "average_budget": summary["avg_budget"],
                "projects_by_status": projects_by_status,
                "budget_by_category": budget_by_category,
                "monthly_spending": monthly_spending,
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_portfolio_summary")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_project_statistics(self, project_id: str, customer_id: str) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            if project.customer_id != customer_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")

            overall_progress = await self.phase_repo.get_avg_progress(project_id)
            phase_stats = await self.phase_repo.get_phase_stats(project_id)
            response_stats = await self.response_repo.get_stats_by_project(project_id)

            total_budget = float(project.total_budget) if project.total_budget else None
            spent_budget = float(project.spent_budget) if project.spent_budget else None
            remaining_budget = None
            if total_budget is not None and spent_budget is not None:
                remaining_budget = total_budget - spent_budget

            now = datetime.utcnow()
            time_elapsed_days = (now - project.created_at).days if project.created_at else 0

            time_remaining_days = None
            is_overdue = False
            if project.end_date:
                delta = (project.end_date - now).days
                time_remaining_days = delta
                if delta < 0 and project.status not in ("completed", "archived"):
                    is_overdue = True

            return {
                "total_budget": total_budget,
                "spent_budget": spent_budget,
                "remaining_budget": remaining_budget,
                "overall_progress": overall_progress,
                "phases_completed": phase_stats["completed"],
                "phases_total": phase_stats["total"],
                "responses_count": response_stats["total"],
                "responses_pending": response_stats["pending"],
                "responses_accepted": response_stats["accepted"],
                "responses_rejected": response_stats["rejected"],
                "average_proposed_price": response_stats["avg_price"],
                "time_elapsed_days": time_elapsed_days,
                "time_remaining_days": time_remaining_days,
                "is_overdue": is_overdue,
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_project_statistics")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def archive_project(self, project_id: str, customer_id: str) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            if project.customer_id != customer_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")

            if project.status != "completed":
                raise ConflictError(detail="Архивировать можно только завершённый проект")

            now = datetime.utcnow()

            await self.project_repo.update(project_id, {
                "status": "archived",
                "archived_at": now,
                "updated_at": now,
            })

            await self.audit_repo.create({
                "project_id": project_id,
                "user_id": customer_id,
                "action_type": "project_archived",
                "action_description": f"Проект «{project.title}» архивирован",
                "changed_fields": {"status": {"old": "completed", "new": "archived"}},
            })

            await self.db.commit()

            return {
                "message": "Проект успешно архивирован",
                "project_id": str(project_id),
                "status": "archived",
                "archived_at": now.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в archive_project")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def _check_project_access(self, project_id: str, user_id: str, user_role: str):
        project = await self.project_repo.get_by_id(project_id)
        if not project:
            raise NotFoundError(detail="Проект не найден")

        if user_role == "customer":
            if project.customer_id != user_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")
        elif user_role == "specialist":
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile or project.specialist_id != profile.id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")
        else:
            raise ForbiddenError(detail="Нет доступа к этому проекту")

        return project

    async def get_project_phases(self, project_id: str, user_id: str, user_role: str) -> dict:
        try:
            await self._check_project_access(project_id, user_id, user_role)

            phases_raw = await self.phase_repo.get_by_project_id(project_id)

            phases = []
            for ph in phases_raw:
                phases.append({
                    "id": str(ph.id),
                    "phase_number": ph.phase_number,
                    "title": ph.title,
                    "description": ph.description,
                    "status": ph.status,
                    "start_date": ph.start_date.isoformat() if ph.start_date else None,
                    "end_date": ph.end_date.isoformat() if ph.end_date else None,
                    "budget": float(ph.budget) if ph.budget else None,
                    "progress_percent": ph.progress_percent or 0,
                    "deliverables": ph.deliverables or [],
                    "created_at": ph.created_at.isoformat() if ph.created_at else None,
                    "updated_at": ph.updated_at.isoformat() if ph.updated_at else None,
                })

            return {"phases": phases}

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_project_phases")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_project_timeline(self, project_id: str, user_id: str, user_role: str) -> dict:
        try:
            project = await self._check_project_access(project_id, user_id, user_role)

            phases_raw = await self.phase_repo.get_by_project_id(project_id)

            phase_id_by_number = {}
            for ph in phases_raw:
                if ph.phase_number is not None:
                    phase_id_by_number[ph.phase_number] = str(ph.id)

            now = datetime.utcnow()
            phases = []
            critical_path = []

            for ph in phases_raw:
                start = ph.start_date
                end = ph.end_date

                duration_days = 0
                if start and end:
                    duration_days = (end - start).days

                is_delayed = False
                if end and end < now and ph.status != "completed":
                    is_delayed = True

                dependencies = []
                if ph.phase_number and ph.phase_number > 1:
                    prev_id = phase_id_by_number.get(ph.phase_number - 1)
                    if prev_id:
                        dependencies.append(prev_id)

                phase_id = str(ph.id)
                is_critical = True
                critical_path.append(phase_id)

                phases.append({
                    "id": phase_id,
                    "phase_number": ph.phase_number,
                    "title": ph.title,
                    "start_date": start.isoformat() if start else None,
                    "end_date": end.isoformat() if end else None,
                    "duration_days": duration_days,
                    "status": ph.status,
                    "progress_percent": ph.progress_percent or 0,
                    "is_critical": is_critical,
                    "is_delayed": is_delayed,
                    "dependencies": dependencies,
                })

            project_start = project.start_date
            project_end = project.end_date

            if not project_start and phases_raw:
                dates = [ph.start_date for ph in phases_raw if ph.start_date]
                if dates:
                    project_start = min(dates)

            if not project_end and phases_raw:
                dates = [ph.end_date for ph in phases_raw if ph.end_date]
                if dates:
                    project_end = max(dates)

            project_duration_days = 0
            if project_start and project_end:
                project_duration_days = (project_end - project_start).days

            return {
                "project_start": project_start.isoformat() if project_start else None,
                "project_end": project_end.isoformat() if project_end else None,
                "project_duration_days": project_duration_days,
                "phases": phases,
                "critical_path": critical_path,
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_project_timeline")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def update_phase(
        self,
        project_id: str,
        phase_id: str,
        customer_id: str,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        budget: Optional[float] = None,
        status: Optional[str] = None,
        progress_percent: Optional[int] = None,
    ) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            if project.customer_id != customer_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")

            if project.status not in ("team_matching", "in_progress"):
                raise UnprocessableError(detail="Редактирование фаз недоступно в текущем статусе проекта")

            phase = await self.phase_repo.get_by_id_and_project(phase_id, project_id)
            if not phase:
                raise NotFoundError(detail="Фаза не найдена")

            update_data = {}
            updated_fields = []

            if start_date is not None:
                try:
                    parsed_start = datetime.fromisoformat(start_date)
                except ValueError:
                    raise UnprocessableError(detail="Невалидный формат даты начала")
                update_data["start_date"] = parsed_start
                updated_fields.append("start_date")

            if end_date is not None:
                try:
                    parsed_end = datetime.fromisoformat(end_date)
                except ValueError:
                    raise UnprocessableError(detail="Невалидный формат даты завершения")
                update_data["end_date"] = parsed_end
                updated_fields.append("end_date")

            if "start_date" in update_data and "end_date" in update_data:
                if update_data["end_date"] <= update_data["start_date"]:
                    raise UnprocessableError(detail="Дата завершения должна быть позже даты начала")
            elif "end_date" in update_data and phase.start_date:
                if update_data["end_date"] <= phase.start_date:
                    raise UnprocessableError(detail="Дата завершения должна быть позже даты начала")
            elif "start_date" in update_data and phase.end_date:
                if phase.end_date <= update_data["start_date"]:
                    raise UnprocessableError(detail="Дата завершения должна быть позже даты начала")

            if budget is not None:
                if budget <= 0:
                    raise UnprocessableError(detail="Бюджет должен быть больше 0")
                update_data["budget"] = budget
                updated_fields.append("budget")

            if status is not None:
                if status not in ("draft", "in_progress", "completed", "on_hold"):
                    raise UnprocessableError(detail="Недопустимый статус фазы")
                update_data["status"] = status
                updated_fields.append("status")

            if progress_percent is not None:
                if progress_percent < 0 or progress_percent > 100:
                    raise UnprocessableError(detail="Прогресс должен быть от 0 до 100")
                update_data["progress_percent"] = progress_percent
                updated_fields.append("progress_percent")

            if not update_data:
                raise UnprocessableError(detail="Не указаны поля для обновления")

            now = datetime.utcnow()
            update_data["updated_at"] = now

            await self.phase_repo.update(phase_id, update_data)

            old_values = {}
            for field in updated_fields:
                old_val = getattr(phase, field, None)
                if hasattr(old_val, "isoformat"):
                    old_val = old_val.isoformat()
                if hasattr(old_val, "__float__"):
                    old_val = float(old_val)
                old_values[field] = old_val

            await self.audit_repo.create({
                "project_id": project_id,
                "user_id": customer_id,
                "action_type": "phase_updated",
                "action_description": f"Обновлена фаза «{phase.title or phase_id}»",
                "changed_fields": {f: {"old": old_values.get(f), "new": str(update_data[f])} for f in updated_fields},
            })

            await self.db.commit()

            project_progress = await self.phase_repo.get_avg_progress(project_id)

            return {
                "message": "Фаза обновлена",
                "phase_id": str(phase_id),
                "updated_fields": updated_fields,
                "project_progress": project_progress,
                "updated_at": now.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в update_phase")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def handle_response_action(
        self,
        project_id: str,
        response_id: str,
        customer_id: str,
        action: str,
        rejection_reason: Optional[str] = None,
    ) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            if project.customer_id != customer_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")

            if project.status != "team_matching":
                raise UnprocessableError(detail="Проект не в статусе подбора команды")

            response = await self.response_repo.get_by_id_and_project(response_id, project_id)
            if not response:
                raise NotFoundError(detail="Отклик не найден")

            if response.status != "pending":
                raise ConflictError(detail="Отклик уже обработан")

            if action not in ("accept", "reject"):
                raise UnprocessableError(detail="Недопустимое действие")

            if action == "reject":
                if not rejection_reason:
                    raise UnprocessableError(detail="Укажите причину отклонения")
                if len(rejection_reason) > 500:
                    raise UnprocessableError(detail="Причина отклонения не должна превышать 500 символов")

            now = datetime.utcnow()

            if action == "accept":
                await self.response_repo.update(response_id, {
                    "status": "accepted",
                    "updated_at": now,
                })

                await self.project_repo.update(project_id, {
                    "specialist_id": response.specialist_id,
                    "status": "in_progress",
                    "updated_at": now,
                })

                rejected_count = await self.response_repo.reject_all_pending(project_id, response_id)
                if rejected_count > 0:
                    logger.info(
                        "Отклонено %d остальных откликов для проекта %s",
                        rejected_count, project_id,
                    )

                await self.audit_repo.create({
                    "project_id": project_id,
                    "user_id": customer_id,
                    "action_type": "response_accepted",
                    "action_description": f"Принят отклик {response_id}, специалист {response.specialist_id}",
                    "changed_fields": {
                        "response_status": {"old": "pending", "new": "accepted"},
                        "project_status": {"old": "team_matching", "new": "in_progress"},
                    },
                })

                await self.db.commit()

                return {
                    "message": "Специалист выбран",
                    "response_id": str(response_id),
                    "response_status": "accepted",
                    "project_status": "in_progress",
                    "specialist_id": str(response.specialist_id),
                    "updated_at": now.isoformat(),
                }

            await self.response_repo.update(response_id, {
                "status": "rejected",
                "rejection_reason": rejection_reason,
                "updated_at": now,
            })

            await self.audit_repo.create({
                "project_id": project_id,
                "user_id": customer_id,
                "action_type": "response_rejected",
                "action_description": f"Отклонён отклик {response_id}",
                "changed_fields": {
                    "response_status": {"old": "pending", "new": "rejected"},
                    "rejection_reason": rejection_reason,
                },
            })

            await self.db.commit()

            return {
                "message": "Отклик отклонён",
                "response_id": str(response_id),
                "response_status": "rejected",
                "project_status": project.status,
                "specialist_id": None,
                "updated_at": now.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в handle_response_action")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_project_responses(
        self,
        project_id: str,
        customer_id: str,
        status: Optional[str] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
        page: int = 1,
        limit: int = 20,
    ) -> dict:
        try:
            project = await self.project_repo.get_by_id(project_id)
            if not project:
                raise NotFoundError(detail="Проект не найден")

            if project.customer_id != customer_id:
                raise ForbiddenError(detail="Нет доступа к этому проекту")

            if sort_by not in ("created_at", "proposed_price"):
                sort_by = "created_at"
            if sort_order not in ("asc", "desc"):
                sort_order = "desc"
            if limit > 100:
                limit = 100
            if page < 1:
                page = 1

            result = await self.response_repo.get_list_with_specialists(
                project_id=project_id,
                status=status,
                sort_by=sort_by,
                sort_order=sort_order,
                page=page,
                limit=limit,
            )

            responses = []
            for row in result["items"]:
                name = f"{row.specialist_first_name} {row.specialist_last_name}"
                responses.append({
                    "id": str(row.id),
                    "specialist": {
                        "id": str(row.specialist_id),
                        "name": name.strip(),
                        "avatar": row.specialist_avatar,
                        "rating": float(row.specialist_rating) if row.specialist_rating else 0.0,
                        "level": row.specialist_level,
                        "experience_years": row.specialist_experience_years,
                    },
                    "status": row.status,
                    "created_at": row.created_at.isoformat() if row.created_at else None,
                })

            total = result["total"]
            pages = math.ceil(total / limit) if limit > 0 else 0

            return {
                "responses": responses,
                "pagination": {
                    "total": total,
                    "page": page,
                    "limit": limit,
                    "pages": pages,
                },
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_project_responses")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

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
