export type ProfileInfoDto = {
  id: string
  name: string
  level: string
  level_progress_percent: number
  rating: number
  total_reviews: number
  total_completed_projects: number
  is_public: boolean
}

export type InvitationsInfoDto = {
  pending_count: number
  last_received_at: string | null
}

export type ProjectsInfoDto = {
  active_count: number
  last_completed_at: string | null
}

export type DashboardResponseDto = {
  profile: ProfileInfoDto
  invitations: InvitationsInfoDto
  projects: ProjectsInfoDto
}

export type InvitationItemDto = {
  id: string
  project_id: string
  proposed_role: string | null
  proposed_salary: number | null
  match_percentage: number
  status: string
  expires_at: string
  created_at: string
}

export type InvitationsListResponseDto = {
  invitations: InvitationItemDto[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export type SpecialistProjectItemDto = {
  project_id: string
  project_title: string
  project_role: string
  status: string
  start_date: string | null
  end_date: string | null
  is_visible_in_portfolio: boolean
}

export type SpecialistProjectsResponseDto = {
  projects: SpecialistProjectItemDto[]
}
