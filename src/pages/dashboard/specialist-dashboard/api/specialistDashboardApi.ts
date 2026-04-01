import { apiClient } from '../../../../shared/api/client'
import type { DashboardResponseDto, InvitationsListResponseDto, SpecialistProjectsResponseDto } from './specialistDashboard.dto'

export function getDashboard() {
  return apiClient.get<DashboardResponseDto>('/specialists/me/dashboard')
}

export function getInvitations(page = 1, limit = 20, status?: string) {
  let path = `/specialists/me/invitations?page=${page}&limit=${limit}`
  if (status) path += `&status=${status}`
  return apiClient.get<InvitationsListResponseDto>(path)
}

export function getMyProjects(specialistId: string) {
  return apiClient.get<SpecialistProjectsResponseDto>(`/specialists/${specialistId}/projects`)
}
