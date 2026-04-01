export type LoginRequestDto = {
  email: string
  password: string
}

export type RegisterRequestDto = {
  email: string
  password: string
  first_name: string
  last_name: string
  middle_name?: string
  role: string
  level?: string
}

export type UserResponseDto = {
  id: string
  email: string
  first_name: string
  last_name: string
  middle_name?: string
  role: string
  level?: string
}

export type TokenResponseDto = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: UserResponseDto
}

export type TwoFactorChallengeDto = {
  two_factor_required: true
  message: string
  session_id: string
  user: {
    id: string
    email: string
    first_name: string
    last_name: string
  }
}

export type Verify2FARequestDto = {
  session_id: string
  code: string
}

export type PasswordResetRequestDto = {
  email: string
}

export type ChangePasswordRequestDto = {
  old_password?: string
  new_password: string
  reset_token?: string
}

export type VerifyEmailRequestDto = {
  token: string
}

export type ProfileUpdateRequestDto = {
  first_name?: string
  last_name?: string
  middle_name?: string
}

export type SessionItemDto = {
  id: string
  device_info: string | null
  session_name: string | null
  ip_address: string | null
  last_activity_at: string
  is_current: boolean
  created_at: string
}

export type LoginHistoryItemDto = {
  action: string
  ip_address: string | null
  created_at: string
  details: string | null
}
