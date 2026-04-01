import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { mapUserFromDto, roleLabelToBackend } from '../api/auth.mapper'
import type { User } from '../api/auth.mapper'
import * as authApi from '../api/authApi'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setIsLoading(false)
      return
    }

    authApi
      .getMe()
      .then((dto) => setUser(mapUserFromDto(dto)))
      .catch(() => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login({ email, password })

    if (result.type === '2fa') {
      return { requires2FA: true, sessionId: result.data.session_id }
    }

    localStorage.setItem('access_token', result.data.access_token)
    localStorage.setItem('refresh_token', result.data.refresh_token)
    setUser(mapUserFromDto(result.data.user))
    return { requires2FA: false }
  }, [])

  const verify2FA = useCallback(async (sessionId: string, code: string) => {
    const data = await authApi.verify2FA({ session_id: sessionId, code })
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    setUser(mapUserFromDto(data.user))
  }, [])

  const register = useCallback(
    async (data: {
      email: string
      password: string
      firstName: string
      lastName: string
      middleName?: string
      role: string
      level?: string
    }) => {
      await authApi.register({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName || undefined,
        role: roleLabelToBackend(data.role),
        level: data.level || undefined,
      })
    },
    []
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    window.location.href = '/'
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, verify2FA, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
