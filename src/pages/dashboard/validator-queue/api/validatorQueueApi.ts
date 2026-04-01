import { apiClient } from '../../../../shared/api/client'
import type { ValidatorQueueListResponseDto } from './validatorQueue.dto'

export function getValidatorQueue(page = 1, limit = 20) {
  return apiClient.get<ValidatorQueueListResponseDto>(`/validator/queue?page=${page}&limit=${limit}`)
}

export function approveItem(artifactId: string) {
  return apiClient.patch<{ message: string; artifact_id: string; status: string; updated_at: string }>(
    `/validator/queue/${artifactId}/approve`
  )
}

export function rejectItem(artifactId: string, reason: string) {
  return apiClient.patch<{ message: string; artifact_id: string; status: string; updated_at: string }>(
    `/validator/queue/${artifactId}/reject`,
    { reason }
  )
}
