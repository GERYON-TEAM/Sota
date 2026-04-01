export type ProfileResponseDto = {
  id: string
  level: string
  level_progress_percent: number
  rating: number
  total_reviews: number
  bio: string | null
  profile_photo_url: string | null
  is_public: boolean
  contact_email: string | null
  github_url: string | null
  telegram_handle: string | null
  years_of_experience: number | null
  total_completed_projects: number
  created_at: string
  updated_at: string
}

export type ProfileUpdateRequestDto = {
  bio?: string
  contact_email?: string
  github_url?: string
  telegram_handle?: string
  profile_photo_url?: string
  is_public?: boolean
  contact_email_public?: boolean
  github_url_public?: boolean
  telegram_handle_public?: boolean
}

export type ProfileUpdateResponseDto = {
  id: string
  updated_fields: string[]
  updated_at: string
  message: string
}

export type SkillItemDto = {
  id: string
  skill_name: string
  skill_type: string
  proficiency: number
  projects_used: number
  created_at: string
  updated_at: string | null
}

export type SkillsListResponseDto = {
  skills: SkillItemDto[]
}

export type SkillInputDto = {
  skill_name: string
  skill_type: string
  proficiency: number
}

export type SkillsUpdateRequestDto = {
  skills: SkillInputDto[]
}

export type SkillsUpdateResponseDto = {
  skills: SkillItemDto[]
  updated_at: string
  message: string
}

export type PdpGoalItemDto = {
  id: string
  goal_title: string
  goal_description: string | null
  status: string
  progress_percent: number
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string | null
}

export type PdpListResponseDto = {
  goals: PdpGoalItemDto[]
}

export type PdpUpdateRequestDto = {
  goal_id: string
  status?: string
  progress_percent?: number
}

export type PdpUpdateResponseDto = {
  goal_id: string
  status: string
  progress_percent: number
  updated_at: string
  message: string
}

export type LevelProgressResponseDto = {
  level: string
  level_progress_percent: number
  last_level_reviewed_at: string | null
}

export type RatingResponseDto = {
  rating: number
  total_reviews: number
  breakdown_by_stars: Record<string, number> | null
}

export type ReviewItemDto = {
  id: string
  project_id: string
  rating: number
  review_text: string
  reviewer_id: string
  created_at: string
}

export type ReviewsListResponseDto = {
  reviews: ReviewItemDto[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}
