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
    role = Column(String(50), nullable=False)
    level = Column(String(50))
    status = Column(String(50), nullable=False, default="active")
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False)
    completed_at = Column(DateTime)


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
