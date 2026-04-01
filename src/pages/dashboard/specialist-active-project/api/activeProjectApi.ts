import { apiClient } from '../../../../shared/api/client'
import type {
  ProjectDetailResponseDto,
  ProjectPhasesListResponseDto,
  ProjectTimelineResponseDto,
  MatchResponseDto,
} from './activeProject.dto'

export function getProjectDetails(id: string) {
  return apiClient.get<ProjectDetailResponseDto>(`/projects/${id}`)
}

export function getProjectPhases(id: string) {
  return apiClient.get<ProjectPhasesListResponseDto>(`/projects/${id}/phases`)
}

export function getProjectTimeline(id: string) {
  return apiClient.get<ProjectTimelineResponseDto>(`/projects/${id}/timeline`)
}

export function getProjectMatch(id: string) {
  return apiClient.get<MatchResponseDto>(`/projects/${id}/match`)
}
