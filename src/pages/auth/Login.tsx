import { useState } from 'react'
import Logo from '../../shared/ui/logo/Logo'
import AuthShape from '../../shared/ui/auth-shape/AuthShape'
import EyeIcon from '../../shared/ui/eye-icon/EyeIcon'
import './login.css'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

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
        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label className="login-field">
            <div className="login-input">
              <input type="email" name="email" placeholder="Email" />
              <span className="login-label">Email</span>
            </div>
          </label>
          <label className="login-field login-field--password">
            <div className="login-input">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Пароль" />
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
          <button className="login-submit" type="submit">
            Войти
          </button>
        </form>
      </section>
      <div className="login-footer">
        <span>Еще не зарегистрированы?</span>
        <a href="/Register" className="login-register">
          Регистрация
        </a>
      </div>
    </main>
  )
}
