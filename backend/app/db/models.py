import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Boolean, Numeric, Text, DateTime,
    ForeignKey, UniqueConstraint,
)
from sqlalchemy.orm import declarative_base

Base = declarative_base()


def generate_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    middle_name = Column(String(100))
    role = Column(String(50), nullable=False, index=True)
    level = Column(String(50), index=True)
    status = Column(String(50), nullable=False, default="active", index=True)
    email_verified = Column(Boolean, default=False)
    email_verification_token = Column(String(255), index=True)
    email_verification_expires_at = Column(DateTime)
    password_reset_token = Column(String(255), index=True)
    password_reset_expires_at = Column(DateTime)
    two_factor_enabled = Column(Boolean, default=False)
    two_factor_secret = Column(String(255))
    failed_login_attempts = Column(Integer, default=0)
    last_failed_attempt = Column(DateTime)
    locked_until = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime)
    last_login_at = Column(DateTime, index=True)
    pending_email = Column(String(255))
    email_change_token_old = Column(String(255), index=True)
    email_change_token_new = Column(String(255), index=True)
    email_change_expires_at = Column(DateTime)
    deleted_at = Column(DateTime)


class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    access_token = Column(String(500), index=True)
    refresh_token = Column(String(500), unique=True, index=True)
    device_info = Column(Text)
    session_name = Column(String(100))
    ip_address = Column(String(45), index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    last_activity_at = Column(DateTime, index=True)
    expires_at = Column(DateTime, index=True)
    is_active = Column(Boolean, default=True, index=True)


class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    user_email = Column(String(255))
    action = Column(String(100), nullable=False, index=True)
    details = Column(Text)
    entity_id = Column(String, index=True)
    entity_type = Column(String(50), index=True)
    ip_address = Column(String(45), index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class Role(Base):
    __tablename__ = "roles"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(50), unique=True, nullable=False, index=True)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class Permission(Base):
    __tablename__ = "permissions"
    __table_args__ = (
        UniqueConstraint("role_id", "resource", "action", name="uq_role_resource_action"),
    )

    id = Column(String, primary_key=True, default=generate_uuid)
    role_id = Column(String, ForeignKey("roles.id"), nullable=False, index=True)
    resource = Column(String(100), nullable=False, index=True)
    action = Column(String(50), nullable=False, index=True)
    can_perform = Column(Boolean, default=True)


class LoginAttempt(Base):
    __tablename__ = "login_attempts"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String(255), index=True)
    ip_address = Column(String(45), index=True)
    success = Column(Boolean, nullable=False, index=True)
    reason_failure = Column(String(255), index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class TwoFactorBackupCode(Base):
    __tablename__ = "two_factor_backup_codes"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    code_hash = Column(String(255), nullable=False)
    is_used = Column(Boolean, default=False, index=True)
    used_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False)
    required_level = Column(String(50), default="junior")
    completed_at = Column(DateTime)


class ProjectRequiredSkill(Base):
    __tablename__ = "project_required_skills"
    __table_args__ = (
        UniqueConstraint("project_id", "skill_name", name="uq_project_skill"),
    )

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    skill_name = Column(String(255), nullable=False)
    skill_type = Column(String(50), nullable=False)
    min_proficiency = Column(Integer, nullable=False, default=1)


class SpecialistProfile(Base):
    __tablename__ = "specialist_profiles"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    level = Column(String(50), nullable=False, default="junior", index=True)
    level_progress_percent = Column(Integer, default=0)
    last_level_reviewed_at = Column(DateTime)
    rating = Column(Numeric(3, 2), default=0, index=True)
    total_reviews = Column(Integer, default=0)
    bio = Column(Text)
    profile_photo_url = Column(String(500))
    is_public = Column(Boolean, default=True)
    contact_email = Column(String(255))
    contact_email_public = Column(Boolean, default=True)
    github_url = Column(String(500))
    github_url_public = Column(Boolean, default=True)
    telegram_handle = Column(String(100))
    telegram_handle_public = Column(Boolean, default=True)
    years_of_experience = Column(Integer)
    total_completed_projects = Column(Integer, default=0, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow)


class SpecialistSkill(Base):
    __tablename__ = "specialist_skills"
    __table_args__ = (
        UniqueConstraint("specialist_id", "skill_name", name="uq_specialist_skill"),
    )

    id = Column(String, primary_key=True, default=generate_uuid)
    specialist_id = Column(String, ForeignKey("specialist_profiles.id"), nullable=False, index=True)
    skill_name = Column(String(255), nullable=False)
    skill_type = Column(String(50), nullable=False, index=True)
    proficiency = Column(Integer, nullable=False, index=True)
    projects_used = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)


class SpecialistPdp(Base):
    __tablename__ = "specialist_pdp"

    id = Column(String, primary_key=True, default=generate_uuid)
    specialist_id = Column(String, ForeignKey("specialist_profiles.id"), nullable=False, index=True)
    goal_title = Column(String(255), nullable=False)
    goal_description = Column(Text)
    status = Column(String(50), nullable=False, default="in_progress", index=True)
    progress_percent = Column(Integer, default=0)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)


class SpecialistReview(Base):
    __tablename__ = "specialist_reviews"
    __table_args__ = (
        UniqueConstraint(
            "specialist_id", "project_id", "reviewer_id",
            name="uq_specialist_project_reviewer",
        ),
    )

    id = Column(String, primary_key=True, default=generate_uuid)
    specialist_id = Column(String, ForeignKey("specialist_profiles.id"), nullable=False, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    reviewer_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    rating = Column(Integer, nullable=False)
    review_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime)


class SpecialistInvitation(Base):
    __tablename__ = "specialist_invitations"
    __table_args__ = (
        UniqueConstraint("specialist_id", "project_id", name="uq_specialist_invitation_project"),
    )

    id = Column(String, primary_key=True, default=generate_uuid)
    specialist_id = Column(String, ForeignKey("specialist_profiles.id"), nullable=False, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    match_percentage = Column(Integer, nullable=False, default=0)
    status = Column(String(50), nullable=False, default="pending", index=True)
    proposed_role = Column(String(255))
    proposed_salary = Column(Numeric(12, 2))
    message = Column(Text)
    rejection_reason = Column(Text)
    expires_at = Column(DateTime, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime)


class SpecialistProjectHistory(Base):
    __tablename__ = "specialist_project_history"
    __table_args__ = (
        UniqueConstraint("specialist_id", "project_id", name="uq_specialist_project"),
    )

    id = Column(String, primary_key=True, default=generate_uuid)
    specialist_id = Column(String, ForeignKey("specialist_profiles.id"), nullable=False, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    project_role = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False, default="in_progress", index=True)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    is_visible_in_portfolio = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime)
