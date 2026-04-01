export type ProjectListItemDto = {
  id: string
  title: string
  description: string
  status: string
  project_type: string | null
  total_budget: number | null
  spent_budget: number | null
  progress_percent: number
  start_date: string | null
  end_date: string | null
  is_overdue: boolean
  responses_count: number
  specialist_id: string | null
  created_at: string | null
  updated_at: string | null
}

export type PaginationInfoDto = {
  total: number
  page: number
  limit: number
  pages: number
}

export type ProjectListResponseDto = {
  projects: ProjectListItemDto[]
  pagination: PaginationInfoDto
}
