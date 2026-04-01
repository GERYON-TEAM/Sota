import { apiClient } from '../../../../shared/api/client'
import type {
  ProjectDetailResponseDto,
  ProjectStatisticsResponseDto,
  ProjectResponsesListResponseDto,
  ProjectPhasesListResponseDto,
  PhaseUpdateRequestDto,
  PhaseUpdateResponseDto,
  ResponseActionRequestDto,
  ResponseActionResponseDto,
  ProjectTimelineResponseDto,
  ProjectArchiveResponseDto,
} from './customerProject.dto'

export function getProject(id: string) {
  return apiClient.get<ProjectDetailResponseDto>(`/projects/${id}`)
}

export function getProjectStatistics(id: string) {
  return apiClient.get<ProjectStatisticsResponseDto>(`/projects/${id}/statistics`)
}

export function getProjectResponses(id: string, page = 1, limit = 20) {
  return apiClient.get<ProjectResponsesListResponseDto>(
    `/projects/${id}/responses?page=${page}&limit=${limit}`
  )
}

export function respondToResponse(
  projectId: string,
  responseId: string,
  action: string,
  rejectionReason?: string
) {
  const body: ResponseActionRequestDto = { action }
  if (rejectionReason) {
    body.rejection_reason = rejectionReason
  }
  return apiClient.patch<ResponseActionResponseDto>(
    `/projects/${projectId}/responses/${responseId}`,
    body
  )
}

export function getProjectPhases(id: string) {
  return apiClient.get<ProjectPhasesListResponseDto>(`/projects/${id}/phases`)
}

export function updateProjectPhase(
  projectId: string,
  phaseId: string,
  data: PhaseUpdateRequestDto
) {
  return apiClient.patch<PhaseUpdateResponseDto>(
    `/projects/${projectId}/phases/${phaseId}`,
    data
  )
}

export function getProjectTimeline(id: string) {
  return apiClient.get<ProjectTimelineResponseDto>(`/projects/${id}/timeline`)
}

export function archiveProject(id: string) {
  return apiClient.patch<ProjectArchiveResponseDto>(`/projects/${id}/archive`)
}
