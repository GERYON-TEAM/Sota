import { createContext } from 'react'
import type { User } from '../api/auth.mapper'

export type AuthContextValue = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ requires2FA: boolean; sessionId?: string }>
  verify2FA: (sessionId: string, code: string) => Promise<void>
  register: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    middleName?: string
    role: string
    level?: string
  }) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
