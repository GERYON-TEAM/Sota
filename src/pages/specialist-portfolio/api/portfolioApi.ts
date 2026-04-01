import { apiClient } from '../../../shared/api/client'
import type {
  ProfileResponseDto,
  SkillsListResponseDto,
  PdpListResponseDto,
  ReviewsListResponseDto,
} from './portfolio.dto'
import type { SpecialistProjectsResponseDto } from '../../dashboard/specialist-dashboard/api/specialistDashboard.dto'

export function getPublicProfile(id: string) {
  return apiClient.get<ProfileResponseDto>(`/specialists/${id}`)
}

export function getPublicSkills(id: string) {
  return apiClient.get<SkillsListResponseDto>(`/specialists/${id}/skills`)
}

export function getPublicPdp(id: string) {
  return apiClient.get<PdpListResponseDto>(`/specialists/${id}/pdp`)
}

export function getPublicProjects(id: string) {
  return apiClient.get<SpecialistProjectsResponseDto>(`/specialists/${id}/projects`)
}

export function getPublicReviews(id: string, page = 1, limit = 20) {
  return apiClient.get<ReviewsListResponseDto>(`/specialists/${id}/reviews?page=${page}&limit=${limit}`)
}
