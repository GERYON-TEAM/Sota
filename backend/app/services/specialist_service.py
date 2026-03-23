import logging
import math
from datetime import datetime, timedelta

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories import (
    UserRepository,
    SpecialistProfileRepository,
    SpecialistInvitationRepository,
    SpecialistProjectHistoryRepository,
    SpecialistReviewRepository,
    SpecialistSkillRepository,
    SpecialistPdpRepository,
    ProjectRepository,
)
from app.core.exceptions import NotFoundError, ForbiddenError, ConflictError

logger = logging.getLogger(__name__)


class SpecialistService:
    def __init__(self, db: AsyncSession):
        self.user_repo = UserRepository(db)
        self.profile_repo = SpecialistProfileRepository(db)
        self.invitation_repo = SpecialistInvitationRepository(db)
        self.project_repo = SpecialistProjectHistoryRepository(db)
        self.review_repo = SpecialistReviewRepository(db)
        self.skill_repo = SpecialistSkillRepository(db)
        self.pdp_repo = SpecialistPdpRepository(db)
        self.project_table_repo = ProjectRepository(db)

    async def get_dashboard(self, user_id: str) -> dict:
        try:
            # профиль
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            # имя
            user = await self.user_repo.get_by_id(user_id)
            name = user.first_name + " " + user.last_name

            await self.invitation_repo.mark_expired(profile.id)

            inv = await self.invitation_repo.get_pending_stats(profile.id)

            # проекты
            active_count = await self.project_repo.get_active_count(profile.id)
            last_completed_at = await self.project_repo.get_last_completed_date(profile.id)

            last_received = None
            if inv.last_received_at:
                last_received = inv.last_received_at.isoformat()

            last_completed = None
            if last_completed_at:
                last_completed = last_completed_at.isoformat()

            return {
                "profile": {
                    "id": str(profile.id),
                    "name": name,
                    "level": profile.level,
                    "level_progress_percent": profile.level_progress_percent,
                    "rating": float(profile.rating),
                    "total_reviews": profile.total_reviews,
                    "total_completed_projects": profile.total_completed_projects,
                    "is_public": profile.is_public,
                },
                "invitations": {
                    "pending_count": inv.pending_count,
                    "last_received_at": last_received,
                },
                "projects": {
                    "active_count": active_count,
                    "last_completed_at": last_completed,
                },
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_dashboard")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_profile(self, user_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            return {
                "id": str(profile.id),
                "level": profile.level,
                "level_progress_percent": profile.level_progress_percent,
                "rating": float(profile.rating),
                "total_reviews": profile.total_reviews,
                "bio": profile.bio,
                "profile_photo_url": profile.profile_photo_url,
                "is_public": profile.is_public,
                "contact_email": profile.contact_email,
                "github_url": profile.github_url,
                "telegram_handle": profile.telegram_handle,
                "years_of_experience": profile.years_of_experience,
                "total_completed_projects": profile.total_completed_projects,
                "created_at": profile.created_at.isoformat(),
                "updated_at": profile.updated_at.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_profile")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_public_profile(self, specialist_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            if not profile.is_public:
                raise ForbiddenError(detail="Профиль скрыт")

            return {
                "id": str(profile.id),
                "level": profile.level,
                "level_progress_percent": profile.level_progress_percent,
                "rating": float(profile.rating),
                "total_reviews": profile.total_reviews,
                "bio": profile.bio,
                "profile_photo_url": profile.profile_photo_url,
                "is_public": profile.is_public,
                "contact_email": profile.contact_email if profile.contact_email_public else None,
                "github_url": profile.github_url if profile.github_url_public else None,
                "telegram_handle": profile.telegram_handle if profile.telegram_handle_public else None,
                "years_of_experience": profile.years_of_experience,
                "total_completed_projects": profile.total_completed_projects,
                "created_at": profile.created_at.isoformat(),
                "updated_at": profile.updated_at.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_public_profile")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def update_profile(self, user_id: str, data: dict) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            if not data:
                raise HTTPException(status_code=422, detail="Нет полей для обновления")

            allowed_fields = {
                "bio", "contact_email", "github_url", "telegram_handle",
                "profile_photo_url", "is_public",
                "contact_email_public", "github_url_public", "telegram_handle_public",
            }
            fields_to_update = {k: v for k, v in data.items() if k in allowed_fields}

            if not fields_to_update:
                raise HTTPException(status_code=422, detail="Нет полей для обновления")

            now = datetime.utcnow()
            fields_to_update["updated_at"] = now

            await self.profile_repo.update(profile.id, fields_to_update)

            updated_fields = [k for k in fields_to_update if k != "updated_at"]

            return {
                "id": str(profile.id),
                "updated_fields": updated_fields,
                "updated_at": now.isoformat(),
                "message": "Профиль успешно обновлён",
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в update_profile")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_specialist_projects(self, specialist_id: str, current_user_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            is_owner = profile.user_id == current_user_id
            only_visible = not is_owner

            rows = await self.project_repo.get_projects_with_title(specialist_id, only_visible)

            projects = []
            for row in rows:
                projects.append({
                    "project_id": str(row.project_id),
                    "project_title": row.project_title,
                    "project_role": row.project_role,
                    "status": row.status,
                    "start_date": row.start_date.isoformat() if row.start_date else None,
                    "end_date": row.end_date.isoformat() if row.end_date else None,
                    "is_visible_in_portfolio": row.is_visible_in_portfolio,
                })

            return {"projects": projects}

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_specialist_projects")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def update_project_visibility(
        self, specialist_id: str, project_id: str, is_visible: bool, current_user_id: str
    ) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            if profile.user_id != current_user_id:
                raise ForbiddenError(detail="Можно менять видимость только своих проектов")

            record = await self.project_repo.get_by_specialist_and_project(specialist_id, project_id)
            if not record:
                raise NotFoundError(detail="Проект не найден в истории специалиста")

            now = datetime.utcnow()
            await self.project_repo.update(record.id, {
                "is_visible_in_portfolio": is_visible,
                "updated_at": now,
            })

            return {
                "message": "Видимость проекта обновлена",
                "specialist_id": str(specialist_id),
                "project_id": str(project_id),
                "is_visible_in_portfolio": is_visible,
                "updated_at": now.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в update_project_visibility")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_invitations(
        self, user_id: str, status: str | None, page: int, limit: int
    ) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            await self.invitation_repo.mark_expired(profile.id)

            result = await self.invitation_repo.get_list(profile.id, status, page, limit)
            items = result["items"]
            total = result["total"]

            pages = math.ceil(total / limit) if total > 0 else 1

            invitations = []
            for inv in items:
                invitations.append({
                    "id": str(inv.id),
                    "project_id": str(inv.project_id),
                    "proposed_role": inv.proposed_role,
                    "proposed_salary": float(inv.proposed_salary) if inv.proposed_salary else None,
                    "match_percentage": inv.match_percentage,
                    "status": inv.status,
                    "expires_at": inv.expires_at.isoformat(),
                    "created_at": inv.created_at.isoformat(),
                })

            return {
                "invitations": invitations,
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
            logger.exception("Ошибка в get_invitations")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def handle_invitation(
        self, user_id: str, invitation_id: str, action: str, rejection_reason: str | None
    ) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            invitation = await self.invitation_repo.get_by_id_and_specialist(invitation_id, profile.id)
            if not invitation:
                raise NotFoundError(detail="Приглашение не найдено")

            if invitation.status != "pending":
                raise ConflictError(detail="Приглашение уже обработано")

            if invitation.expires_at < datetime.utcnow():
                raise ConflictError(detail="Срок приглашения истёк")

            if action == "reject" and not rejection_reason:
                raise HTTPException(status_code=422, detail="Укажите причину отказа")

            new_status = "accepted" if action == "accept" else "rejected"
            now = datetime.utcnow()

            update_data = {
                "status": new_status,
                "updated_at": now,
            }
            if action == "reject":
                update_data["rejection_reason"] = rejection_reason

            await self.invitation_repo.update(invitation.id, update_data)

            if action == "accept":
                await self.project_table_repo.update(
                    invitation.project_id, {"status": "team_matching"}
                )

            if action == "reject":
                logger.info(
                    "invitation_rejected specialist_id=%s project_id=%s reason=%s",
                    profile.id, invitation.project_id, rejection_reason,
                )

            message = "Приглашение принято" if action == "accept" else "Приглашение отклонено"

            return {
                "invitation_id": str(invitation.id),
                "status": new_status,
                "message": message,
                "updated_at": now.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в handle_invitation")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_reviews(self, specialist_id: str, page: int, limit: int) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            result = await self.review_repo.get_list(specialist_id, page, limit)
            items = result["items"]
            total = result["total"]

            pages = math.ceil(total / limit) if total > 0 else 1

            reviews = []
            for r in items:
                reviews.append({
                    "id": str(r.id),
                    "project_id": str(r.project_id),
                    "rating": r.rating,
                    "review_text": r.review_text,
                    "reviewer_id": str(r.reviewer_id),
                    "created_at": r.created_at.isoformat(),
                })

            return {
                "reviews": reviews,
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
            logger.exception("Ошибка в get_reviews")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_review(self, specialist_id: str, review_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            review = await self.review_repo.get_by_id_and_specialist(review_id, specialist_id)
            if not review:
                raise NotFoundError(detail="Отзыв не найден")

            return {
                "id": str(review.id),
                "project_id": str(review.project_id),
                "rating": review.rating,
                "review_text": review.review_text,
                "reviewer_id": str(review.reviewer_id),
                "created_at": review.created_at.isoformat(),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_review")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def create_review(
        self, specialist_id: str, reviewer_user_id: str,
        project_id: str, rating: int, review_text: str,
    ) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            reviewer_profile = await self.profile_repo.get_by_user_id(reviewer_user_id)
            if not reviewer_profile:
                raise ForbiddenError(detail="Профиль рецензента не найден")

            reviewer_role = await self.project_repo.get_role_in_project(
                reviewer_profile.id, project_id
            )
            if reviewer_role != "Tech Lead":
                raise ForbiddenError(detail="Только Tech Lead может оставлять отзывы")

            specialist_in_project = await self.project_repo.get_by_specialist_and_project(
                specialist_id, project_id
            )
            if not specialist_in_project:
                raise NotFoundError(detail="Специалист не участвовал в этом проекте")

            try:
                review = await self.review_repo.create({
                    "specialist_id": specialist_id,
                    "project_id": project_id,
                    "reviewer_id": reviewer_user_id,
                    "rating": rating,
                    "review_text": review_text,
                })
            except Exception:
                raise ConflictError(detail="Отзыв на этого специалиста в этом проекте уже существует")

            stats = await self.review_repo.get_stats(specialist_id)
            await self.profile_repo.update(profile.id, {
                "rating": round(stats["avg_rating"], 2),
                "total_reviews": stats["total"],
                "updated_at": datetime.utcnow(),
            })

            await self._recalculate_level_progress(specialist_id)

            return {
                "review_id": str(review.id),
                "specialist_id": str(specialist_id),
                "project_id": str(project_id),
                "rating": review.rating,
                "review_text": review.review_text,
                "created_at": review.created_at.isoformat(),
                "message": "Отзыв успешно создан",
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в create_review")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def update_review(
        self, specialist_id: str, review_id: str, current_user_id: str, data: dict
    ) -> dict:
        try:
            review = await self.review_repo.get_by_id_and_specialist(review_id, specialist_id)
            if not review:
                raise NotFoundError(detail="Отзыв не найден")

            if review.reviewer_id != current_user_id:
                raise ForbiddenError(detail="Редактировать отзыв может только его автор")

            if datetime.utcnow() - review.created_at > timedelta(hours=24):
                raise ConflictError(detail="Время на редактирование отзыва истекло (24 часа)")

            if not data:
                raise HTTPException(status_code=422, detail="Нет полей для обновления")

            allowed_fields = {"rating", "review_text"}
            fields_to_update = {k: v for k, v in data.items() if k in allowed_fields}

            if not fields_to_update:
                raise HTTPException(status_code=422, detail="Нет полей для обновления")

            now = datetime.utcnow()
            fields_to_update["updated_at"] = now

            await self.review_repo.update(review.id, fields_to_update)

            if "rating" in fields_to_update:
                profile = await self.profile_repo.get_by_id(specialist_id)
                stats = await self.review_repo.get_stats(specialist_id)
                await self.profile_repo.update(profile.id, {
                    "rating": round(stats["avg_rating"], 2),
                    "updated_at": now,
                })
                await self._recalculate_level_progress(specialist_id)

            updated_review = await self.review_repo.get_by_id(review.id)

            return {
                "review_id": str(updated_review.id),
                "specialist_id": str(specialist_id),
                "project_id": str(updated_review.project_id),
                "rating": updated_review.rating,
                "review_text": updated_review.review_text,
                "updated_at": now.isoformat(),
                "message": "Отзыв успешно обновлён",
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в update_review")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_skills(self, user_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            rows = await self.skill_repo.get_by_specialist_id(profile.id)

            skills = []
            for s in rows:
                skills.append({
                    "id": str(s.id),
                    "skill_name": s.skill_name,
                    "skill_type": s.skill_type,
                    "proficiency": s.proficiency,
                    "projects_used": s.projects_used,
                    "created_at": s.created_at.isoformat(),
                    "updated_at": s.updated_at.isoformat() if s.updated_at else None,
                })

            return {"skills": skills}

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_skills")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_specialist_skills(self, specialist_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            if not profile.is_public:
                raise ForbiddenError(detail="Профиль скрыт")

            rows = await self.skill_repo.get_by_specialist_id(specialist_id)

            skills = []
            for s in rows:
                skills.append({
                    "id": str(s.id),
                    "skill_name": s.skill_name,
                    "skill_type": s.skill_type,
                    "proficiency": s.proficiency,
                    "projects_used": s.projects_used,
                    "created_at": s.created_at.isoformat(),
                    "updated_at": s.updated_at.isoformat() if s.updated_at else None,
                })

            return {"skills": skills}

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_specialist_skills")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def update_skills(self, user_id: str, skills_input: list[dict]) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            names = [s["skill_name"] for s in skills_input]
            if len(names) != len(set(names)):
                raise ConflictError(detail="Дублирующиеся названия навыков")

            existing = await self.skill_repo.get_by_specialist_id(profile.id)
            existing_map = {s.skill_name: s for s in existing}

            now = datetime.utcnow()

            await self.skill_repo.delete_by_specialist_id(profile.id)

            new_items = []
            for s in skills_input:
                old = existing_map.get(s["skill_name"])
                new_items.append({
                    "specialist_id": profile.id,
                    "skill_name": s["skill_name"],
                    "skill_type": s["skill_type"],
                    "proficiency": s["proficiency"],
                    "projects_used": old.projects_used if old else 0,
                    "created_at": old.created_at if old else now,
                    "updated_at": now if old else None,
                })

            created = await self.skill_repo.bulk_create(new_items)

            skills = []
            for s in created:
                skills.append({
                    "id": str(s.id),
                    "skill_name": s.skill_name,
                    "skill_type": s.skill_type,
                    "proficiency": s.proficiency,
                    "projects_used": s.projects_used,
                    "created_at": s.created_at.isoformat(),
                    "updated_at": s.updated_at.isoformat() if s.updated_at else None,
                })

            await self.profile_repo.update(profile.id, {"updated_at": now})

            return {
                "skills": skills,
                "updated_at": now.isoformat(),
                "message": "Навыки успешно обновлены",
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в update_skills")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_pdp(self, user_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            rows = await self.pdp_repo.get_by_specialist_id(profile.id)

            goals = []
            for g in rows:
                goals.append({
                    "id": str(g.id),
                    "goal_title": g.goal_title,
                    "goal_description": g.goal_description,
                    "status": g.status,
                    "progress_percent": g.progress_percent,
                    "start_date": g.start_date.isoformat() if g.start_date else None,
                    "end_date": g.end_date.isoformat() if g.end_date else None,
                    "created_at": g.created_at.isoformat(),
                    "updated_at": g.updated_at.isoformat() if g.updated_at else None,
                })

            return {"goals": goals}

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_pdp")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_specialist_pdp(self, specialist_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_id(specialist_id)
            if not profile:
                raise NotFoundError(detail="Специалист не найден")

            if not profile.is_public:
                raise ForbiddenError(detail="Профиль скрыт")

            rows = await self.pdp_repo.get_by_specialist_id(specialist_id)

            goals = []
            for g in rows:
                if g.status == "archived":
                    continue
                goals.append({
                    "id": str(g.id),
                    "goal_title": g.goal_title,
                    "goal_description": g.goal_description,
                    "status": g.status,
                    "progress_percent": g.progress_percent,
                    "start_date": g.start_date.isoformat() if g.start_date else None,
                    "end_date": g.end_date.isoformat() if g.end_date else None,
                    "created_at": g.created_at.isoformat(),
                    "updated_at": g.updated_at.isoformat() if g.updated_at else None,
                })

            return {"goals": goals}

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_specialist_pdp")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def update_pdp(self, user_id: str, goal_id: str, data: dict) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            goal = await self.pdp_repo.get_by_id_and_specialist(goal_id, profile.id)
            if not goal:
                raise NotFoundError(detail="Цель не найдена")

            if goal.status == "archived":
                raise ConflictError(detail="Нельзя обновлять архивную цель")

            if not data:
                raise HTTPException(status_code=422, detail="Нет полей для обновления")

            allowed_fields = {"status", "progress_percent"}
            fields_to_update = {k: v for k, v in data.items() if k in allowed_fields}

            if not fields_to_update:
                raise HTTPException(status_code=422, detail="Нет полей для обновления")

            if fields_to_update.get("status") == "completed":
                fields_to_update["progress_percent"] = 100

            now = datetime.utcnow()
            fields_to_update["updated_at"] = now

            await self.pdp_repo.update(goal.id, fields_to_update)

            updated = await self.pdp_repo.get_by_id(goal.id)

            return {
                "goal_id": str(updated.id),
                "status": updated.status,
                "progress_percent": updated.progress_percent,
                "updated_at": now.isoformat(),
                "message": "Цель успешно обновлена",
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в update_pdp")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def _recalculate_level_progress(self, specialist_id: str) -> None:
        profile = await self.profile_repo.get_by_id(specialist_id)
        if not profile:
            return

        if profile.level == "senior":
            if profile.level_progress_percent != 100:
                await self.profile_repo.update(profile.id, {
                    "level_progress_percent": 100,
                    "updated_at": datetime.utcnow(),
                })
            return

        completed_count = await self.project_repo.get_completed_count(specialist_id)
        stats = await self.review_repo.get_stats(specialist_id)
        avg_rating = stats["avg_rating"]
        unique_reviewers = await self.review_repo.get_unique_reviewer_count(specialist_id)

        if profile.level == "junior":
            req_projects = 5
            req_rating = 4.2
            req_reviewers = 3
            next_level = "middle"
        else:
            req_projects = 10
            req_rating = 4.5
            req_reviewers = 5
            next_level = "senior"

        projects_pct = min(completed_count / req_projects * 100, 100)
        rating_pct = 100.0 if avg_rating >= req_rating else (avg_rating / req_rating * 100)
        reviewers_pct = min(unique_reviewers / req_reviewers * 100, 100)

        progress = round((projects_pct + rating_pct + reviewers_pct) / 3)

        now = datetime.utcnow()

        if progress >= 100:
            await self.profile_repo.update(profile.id, {
                "level": next_level,
                "level_progress_percent": 0 if next_level != "senior" else 100,
                "last_level_reviewed_at": now,
                "updated_at": now,
            })
        else:
            await self.profile_repo.update(profile.id, {
                "level_progress_percent": progress,
                "updated_at": now,
            })

    async def get_level_progress(self, user_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            await self._recalculate_level_progress(profile.id)

            profile = await self.profile_repo.get_by_user_id(user_id)

            return {
                "level": profile.level,
                "level_progress_percent": profile.level_progress_percent,
                "last_level_reviewed_at": (
                    profile.last_level_reviewed_at.isoformat()
                    if profile.last_level_reviewed_at else None
                ),
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_level_progress")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    async def get_rating(self, user_id: str) -> dict:
        try:
            profile = await self.profile_repo.get_by_user_id(user_id)
            if not profile:
                raise NotFoundError(detail="Профиль специалиста не найден")

            breakdown = await self.review_repo.get_breakdown(profile.id)

            return {
                "rating": float(profile.rating),
                "total_reviews": profile.total_reviews,
                "breakdown_by_stars": breakdown,
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.exception("Ошибка в get_rating")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")
