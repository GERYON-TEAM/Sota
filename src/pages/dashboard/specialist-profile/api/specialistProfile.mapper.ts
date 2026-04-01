import type {
  ProfileResponseDto,
  SkillItemDto,
  PdpGoalItemDto,
  LevelProgressResponseDto,
  RatingResponseDto,
  ReviewItemDto,
} from './specialistProfile.dto'

export type Profile = {
  id: string
  level: string
  levelProgressPercent: number
  rating: number
  totalReviews: number
  bio: string | null
  profilePhotoUrl: string | null
  isPublic: boolean
  contactEmail: string | null
  githubUrl: string | null
  telegramHandle: string | null
  yearsOfExperience: number | null
  totalCompletedProjects: number
  createdAt: string
  updatedAt: string
}

export type Skill = {
  id: string
  name: string
  type: 'hard' | 'soft'
  level: string
  progress: number
  projectsUsed: number
}

export type PdpGoal = {
  id: string
  title: string
  description: string | null
  status: string
  progress: number
  timeline: string
}

export type LevelProgress = {
  level: string
  levelProgressPercent: number
  lastLevelReviewedAt: string | null
}

export type Rating = {
  rating: number
  totalReviews: number
  breakdownByStars: Record<string, number> | null
}

export type Review = {
  id: string
  projectId: string
  rating: number
  text: string
  reviewerId: string
  date: string
}

const PROFICIENCY_TO_LEVEL: Record<number, string> = {
  1: 'Junior',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Senior',
}

export function mapProfile(dto: ProfileResponseDto): Profile {
  return {
    id: dto.id,
    level: dto.level,
    levelProgressPercent: dto.level_progress_percent,
    rating: dto.rating,
    totalReviews: dto.total_reviews,
    bio: dto.bio,
    profilePhotoUrl: dto.profile_photo_url,
    isPublic: dto.is_public,
    contactEmail: dto.contact_email,
    githubUrl: dto.github_url,
    telegramHandle: dto.telegram_handle,
    yearsOfExperience: dto.years_of_experience,
    totalCompletedProjects: dto.total_completed_projects,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  }
}

export function mapSkill(dto: SkillItemDto): Skill {
  return {
    id: dto.id,
    name: dto.skill_name,
    type: dto.skill_type === 'hardskill' ? 'hard' : 'soft',
    level: PROFICIENCY_TO_LEVEL[dto.proficiency] ?? 'Junior',
    progress: dto.proficiency,
    projectsUsed: dto.projects_used,
  }
}

export function mapSkills(dtos: SkillItemDto[]): Skill[] {
  return dtos.map(mapSkill)
}

export function mapPdpGoal(dto: PdpGoalItemDto): PdpGoal {
  let timeline = ''
  if (dto.start_date && dto.end_date) {
    timeline = `${new Date(dto.start_date).toLocaleDateString('ru-RU')} — ${new Date(dto.end_date).toLocaleDateString('ru-RU')}`
  } else if (dto.start_date) {
    timeline = `с ${new Date(dto.start_date).toLocaleDateString('ru-RU')}`
  } else if (dto.end_date) {
    timeline = `до ${new Date(dto.end_date).toLocaleDateString('ru-RU')}`
  }

  return {
    id: dto.id,
    title: dto.goal_title,
    description: dto.goal_description,
    status: dto.status,
    progress: dto.progress_percent,
    timeline,
  }
}

export function mapPdpGoals(dtos: PdpGoalItemDto[]): PdpGoal[] {
  return dtos.map(mapPdpGoal)
}

export function mapLevelProgress(dto: LevelProgressResponseDto): LevelProgress {
  return {
    level: dto.level,
    levelProgressPercent: dto.level_progress_percent,
    lastLevelReviewedAt: dto.last_level_reviewed_at,
  }
}

export function mapRating(dto: RatingResponseDto): Rating {
  return {
    rating: dto.rating,
    totalReviews: dto.total_reviews,
    breakdownByStars: dto.breakdown_by_stars,
  }
}

export function mapReview(dto: ReviewItemDto): Review {
  return {
    id: dto.id,
    projectId: dto.project_id,
    rating: dto.rating,
    text: dto.review_text,
    reviewerId: dto.reviewer_id,
    date: dto.created_at,
  }
}

export function mapReviews(dtos: ReviewItemDto[]): Review[] {
  return dtos.map(mapReview)
}
