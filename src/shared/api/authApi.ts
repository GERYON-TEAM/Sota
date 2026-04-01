import { apiClient } from './client'
import type {
  LoginRequestDto,
  RegisterRequestDto,
  TokenResponseDto,
  TwoFactorChallengeDto,
  Verify2FARequestDto,
  PasswordResetRequestDto,
  ChangePasswordRequestDto,
  VerifyEmailRequestDto,
  ProfileUpdateRequestDto,
  UserResponseDto,
  SessionItemDto,
  LoginHistoryItemDto,
} from './auth.dto'
import type { PaginationInfo } from './types'

export type LoginResult =
  | { type: 'success'; data: TokenResponseDto }
  | { type: '2fa'; data: TwoFactorChallengeDto }

export async function login(dto: LoginRequestDto): Promise<LoginResult> {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    let detail = 'Ошибка входа'
    try {
      const body = await response.json()
      detail = body.detail ?? detail
    } catch {
      // ignore
    }
    throw { status: response.status, detail }
  }

  const data = await response.json()

  if (data.two_factor_required) {
    return { type: '2fa', data: data as TwoFactorChallengeDto }
  }

  return { type: 'success', data: data as TokenResponseDto }
}

export async function verify2FA(dto: Verify2FARequestDto): Promise<TokenResponseDto> {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

  const response = await fetch(`${API_BASE_URL}/auth/2fa/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    let detail = 'Неверный код'
    try {
      const body = await response.json()
      detail = body.detail ?? detail
    } catch {
      // ignore
    }
    throw { status: response.status, detail }
  }

  return response.json() as Promise<TokenResponseDto>
}

export function register(dto: RegisterRequestDto) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

  return fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then(async (response) => {
    if (!response.ok) {
      let detail = 'Ошибка регистрации'
      try {
        const body = await response.json()
        detail = body.detail ?? detail
      } catch {
        // ignore
      }
      throw { status: response.status, detail }
    }
    return response.json()
  })
}

export function logout() {
  return apiClient.post<{ message: string }>('/auth/logout')
}

export function getMe() {
  return apiClient.get<UserResponseDto>('/auth/me')
}

export function updateProfile(dto: ProfileUpdateRequestDto) {
  return apiClient.patch<{ message: string; user: UserResponseDto }>('/auth/profile', dto)
}

export function requestPasswordReset(dto: PasswordResetRequestDto) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

  return fetch(`${API_BASE_URL}/auth/password-reset-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then(async (response) => {
    if (!response.ok) {
      let detail = 'Ошибка'
      try {
        const body = await response.json()
        detail = body.detail ?? detail
      } catch {
        // ignore
      }
      throw { status: response.status, detail }
    }
    return response.json()
  })
}

export function changePassword(dto: ChangePasswordRequestDto) {
  return apiClient.post<{ message: string }>('/auth/change-password', dto)
}

export function verifyEmail(dto: VerifyEmailRequestDto) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

  return fetch(`${API_BASE_URL}/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  }).then(async (response) => {
    if (!response.ok) {
      let detail = 'Ошибка верификации'
      try {
        const body = await response.json()
        detail = body.detail ?? detail
      } catch {
        // ignore
      }
      throw { status: response.status, detail }
    }
    return response.json()
  })
}

export function getSessions(limit = 20, offset = 0) {
  return apiClient.get<{ sessions: SessionItemDto[]; pagination: PaginationInfo }>(
    `/auth/sessions?limit=${limit}&offset=${offset}`
  )
}

export function deleteSession(sessionId: string) {
  return apiClient.delete<{ message: string }>(`/auth/sessions/${sessionId}`)
}

export function getLoginHistory(limit = 50, offset = 0) {
  return apiClient.get<{ login_attempts: LoginHistoryItemDto[] }>(
    `/auth/login-history?limit=${limit}&offset=${offset}`
  )
}
