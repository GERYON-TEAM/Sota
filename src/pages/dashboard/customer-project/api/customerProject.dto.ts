export type AttachmentItemDto = {
  name: string
  url: string | null
  size: number | null
}

export type PhaseItemDto = {
  id: string
  phase_number: number | null
  title: string | null
  description: string | null
  status: string | null
  start_date: string | null
  end_date: string | null
  budget: number | null
  progress_percent: number | null
  deliverables: unknown[] | null
}

export type TeamMemberItemDto = {
  id: string
  name: string | null
  avatar: string | null
  rating: number | null
  role: string | null
  level: string | null
}

export type ProjectDetailResponseDto = {
  id: string
  title: string
  description: string
  project_type: string | null
  goals: string | null
  target_audience: string | null
  status: string
  total_budget: number | null
  spent_budget: number | null
  plan_id: string | null
  start_date: string | null
  end_date: string | null
  actual_end_date: string | null
  flexible_deadline: boolean
  tech_and_roles_preferences: string | null
  estimated_size: string | null
  features: unknown[] | null
  complexity: string | null
  attachments: AttachmentItemDto[]
  team: TeamMemberItemDto[]
  phases: PhaseItemDto[]
  responses_count: number
  created_at: string | null
  updated_at: string | null
  published_at: string | null
  completed_at: string | null
  archived_at: string | null
}

export type ProjectStatisticsResponseDto = {
  total_budget: number | null
  spent_budget: number | null
  remaining_budget: number | null
  overall_progress: number
  phases_completed: number
  phases_total: number
  responses_count: number
  responses_pending: number
  responses_accepted: number
  responses_rejected: number
  average_proposed_price: number | null
  time_elapsed_days: number
  time_remaining_days: number | null
  is_overdue: boolean
}

export type ResponseSpecialistInfoDto = {
  id: string
  name: string
  avatar: string | null
  rating: number
  level: string
  experience_years: number | null
}

export type ResponseItemDto = {
  id: string
  specialist: ResponseSpecialistInfoDto
  status: string
  created_at: string
}

export type ProjectResponsesListResponseDto = {
  responses: ResponseItemDto[]
  pagination: { total: number; page: number; limit: number; pages: number }
}

export type PhaseListItemDto = {
  id: string
  phase_number: number | null
  title: string | null
  description: string | null
  status: string | null
  start_date: string | null
  end_date: string | null
  budget: number | null
  progress_percent: number | null
  deliverables: unknown[] | null
  created_at: string | null
  updated_at: string | null
}

export type ProjectPhasesListResponseDto = {
  phases: PhaseListItemDto[]
}

export type PhaseUpdateRequestDto = {
  start_date?: string
  end_date?: string
  budget?: number
  status?: string
  progress_percent?: number
}

export type ResponseActionRequestDto = {
  action: string
  rejection_reason?: string
}

export type TimelinePhaseItemDto = {
  id: string
  phase_number: number | null
  title: string | null
  start_date: string | null
  end_date: string | null
  duration_days: number
  status: string | null
  progress_percent: number
  is_critical: boolean
  is_delayed: boolean
  dependencies: string[]
}

export type ProjectTimelineResponseDto = {
  project_start: string | null
  project_end: string | null
  project_duration_days: number
  phases: TimelinePhaseItemDto[]
  critical_path: string[]
}

export type ProjectArchiveResponseDto = {
  message: string
  project_id: string
  status: string
  archived_at: string
}

export type PhaseUpdateResponseDto = {
  message: string
  phase_id: string
  updated_fields: string[]
  project_progress: number
  updated_at: string
}

export type ResponseActionResponseDto = {
  message: string
  response_id: string
  response_status: string
  project_status: string
  specialist_id: string | null
  updated_at: string
}

export type MatchResponseDto = {
  project_id: string
  specialist_id: string
  match_percentage: number
  skills_match: number
  level_match: number
  rating_match: number
  match_source: string
  ml_engine_version: string | null
  calculated_at: string
}
