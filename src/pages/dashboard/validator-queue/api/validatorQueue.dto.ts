export type ValidatorQueueItemDto = {
  id: string
  project_id: string
  project_title: string
  phase_id: string | null
  phase_title: string | null
  name: string
  description: string | null
  file_url: string | null
  artifact_type: string | null
  status: string
  created_by: string
  created_at: string
}

export type ValidatorQueueListResponseDto = {
  items: ValidatorQueueItemDto[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}
