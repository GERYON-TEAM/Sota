import { apiClient } from '../../../../shared/api/client'
import type { ProjectListResponseDto, PortfolioSummaryResponseDto } from './customerDashboard.dto'

export function getProjects(page = 1, limit = 20) {
  return apiClient.get<ProjectListResponseDto>(`/projects?page=${page}&limit=${limit}`)
}

export function getPortfolioSummary() {
  return apiClient.get<PortfolioSummaryResponseDto>('/projects/portfolio/summary')
}
