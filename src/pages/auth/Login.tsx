import { useState } from 'react'
import { useAuth } from '../../shared/auth/useAuth'
import Logo from '../../shared/ui/logo/Logo'
import AuthShape from '../../shared/ui/auth-shape/AuthShape'
import EyeIcon from '../../shared/ui/eye-icon/EyeIcon'
import './login.css'

export default function Login() {
  const { login, verify2FA } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [twoFactorSessionId, setTwoFactorSessionId] = useState<string | null>(null)
  const [twoFactorCode, setTwoFactorCode] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)

    try {
      if (twoFactorSessionId) {
        await verify2FA(twoFactorSessionId, twoFactorCode)
        window.location.href = '/loading'
        return
      }

      const result = await login(email, password)
      if (result.requires2FA && result.sessionId) {
        setTwoFactorSessionId(result.sessionId)
        setLoading(false)
        return
      }

      window.location.href = '/loading'
    } catch (err: unknown) {
      const apiErr = err as { detail?: string }
      setError(apiErr.detail ?? 'Произошла ошибка')
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <Logo className="logo" />
      <div className="auth-shapes">
        <AuthShape className="auth-shape auth-shape--left" side="left" />
        <AuthShape className="auth-shape auth-shape--right" side="right" />
      </div>
      <section className="login-card">
        <div className="login-header">
          <h1>Вход в систему</h1>
          <p>Добро пожаловать!</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {!twoFactorSessionId ? (
            <>
              <label className="login-field">
                <div className="login-input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="login-label">Email</span>
                </div>
              </label>
              <label className="login-field login-field--password">
                <div className="login-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="login-label">Пароль</span>
                  <div className="login-icons">
                    <button
                      className="login-eye"
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                      <EyeIcon variant={showPassword ? 'on' : 'off'} />
                    </button>
                  </div>
                </div>
              </label>
              <div className="login-row">
                <label className="login-remember">
                  <input type="checkbox" name="remember" />
                  <span className="login-radio" aria-hidden="true"></span>
                  <span>Запомнить меня</span>
                </label>
                <a className="login-forgot" href="/forgot">
                  Забыли пароль?
                </a>
              </div>
            </>
          ) : (
            <label className="login-field">
              <div className="login-input">
                <input
                  type="text"
                  name="code"
                  placeholder="Код из приложения"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  autoFocus
                />
                <span className="login-label">Код двухфакторной аутентификации</span>
              </div>
            </label>
          )}
          {error && <p className="login-error" style={{ color: '#e53935', fontSize: '14px', margin: '0 0 8px' }}>{error}</p>}
          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Подождите...' : twoFactorSessionId ? 'Подтвердить' : 'Войти'}
          </button>
        </form>
      </section>
      <div className="login-footer">
        <span>Еще не зарегистрированы?</span>
        <a href="/register" className="login-register">
          Регистрация
        </a>
      </div>
    </main>
  )
}
