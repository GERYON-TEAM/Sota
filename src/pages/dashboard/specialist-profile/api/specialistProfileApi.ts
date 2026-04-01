import { apiClient } from '../../../../shared/api/client'
import type {
  ProfileResponseDto,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  SkillsListResponseDto,
  SkillsUpdateRequestDto,
  SkillsUpdateResponseDto,
  PdpListResponseDto,
  PdpUpdateRequestDto,
  PdpUpdateResponseDto,
  LevelProgressResponseDto,
  RatingResponseDto,
} from './specialistProfile.dto'

export function getProfile() {
  return apiClient.get<ProfileResponseDto>('/specialists/me/profile')
}

export function updateProfile(data: ProfileUpdateRequestDto) {
  return apiClient.patch<ProfileUpdateResponseDto>('/specialists/me/profile', data)
}

export function getSkills() {
  return apiClient.get<SkillsListResponseDto>('/specialists/me/skills')
}

export function updateSkills(data: SkillsUpdateRequestDto) {
  return apiClient.patch<SkillsUpdateResponseDto>('/specialists/me/skills', data)
}

export function getPdp() {
  return apiClient.get<PdpListResponseDto>('/specialists/me/pdp')
}

export function updatePdp(data: PdpUpdateRequestDto) {
  return apiClient.patch<PdpUpdateResponseDto>('/specialists/me/pdp', data)
}

export function getLevelProgress() {
  return apiClient.get<LevelProgressResponseDto>('/specialists/me/level-progress')
}

export function getRating() {
  return apiClient.get<RatingResponseDto>('/specialists/me/rating')
}
