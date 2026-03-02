import { useState } from 'react'
import Logo from '../../../shared/ui/logo/Logo'
import AuthShape from '../../../shared/ui/auth-shape/AuthShape'
import EyeIcon from '../../../shared/ui/eye-icon/EyeIcon'
import '../login.css'
import '../register.css'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <main className="auth-page">
      <Logo className="logo" />
      <div className="auth-shapes">
        <AuthShape className="auth-shape auth-shape--left" side="left" />
        <AuthShape className="auth-shape auth-shape--right" side="right" />
      </div>
      <section className="login-card">
        <div className="login-header">
          <h1>Восстановление пароля</h1>
          <p>Придумайте новый пароль.</p>
        </div>
        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label className="login-field login-field--password">
            <div className="register-input-row">
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
              <div className="register-info">
                <span className="register-info-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 13.5C9.14267 13.5 9.26167 13.452 9.357 13.356C9.45233 13.26 9.5 13.1413 9.5 13V8.5C9.5 8.358 9.452 8.23933 9.356 8.144C9.26 8.04867 9.141 8.00067 8.999 8C8.857 7.99933 8.73833 8.04733 8.643 8.144C8.54767 8.24067 8.5 8.35933 8.5 8.5V13C8.5 13.142 8.548 13.2607 8.644 13.356C8.74 13.4513 8.859 13.4993 9.001 13.5M9 6.577C9.17467 6.577 9.321 6.518 9.439 6.4C9.557 6.282 9.61567 6.136 9.615 5.962C9.61433 5.788 9.55533 5.64167 9.438 5.523C9.32067 5.40433 9.17467 5.34533 9 5.346C8.82533 5.34667 8.67933 5.40567 8.562 5.523C8.44467 5.64033 8.38567 5.78667 8.385 5.962C8.38433 6.13733 8.44333 6.28333 8.562 6.4C8.68067 6.51667 8.82667 6.57567 9 6.577ZM9.003 18C7.75833 18 6.58833 17.764 5.493 17.292C4.39767 16.8193 3.44467 16.178 2.634 15.368C1.82333 14.558 1.18167 13.606 0.709 12.512C0.236333 11.418 0 10.2483 0 9.003C0 7.75767 0.236333 6.58767 0.709 5.493C1.181 4.39767 1.82133 3.44467 2.63 2.634C3.43867 1.82333 4.391 1.18167 5.487 0.709C6.583 0.236333 7.753 0 8.997 0C10.241 0 11.411 0.236333 12.507 0.709C13.6023 1.181 14.5553 1.82167 15.366 2.631C16.1767 3.44033 16.8183 4.39267 17.291 5.488C17.7637 6.58333 18 7.753 18 8.997C18 10.241 17.764 11.411 17.292 12.507C16.82 13.603 16.1787 14.556 15.368 15.366C14.5573 16.176 13.6053 16.8177 12.512 17.291C11.4187 17.7643 10.249 18.0007 9.003 18Z"
                      fill="#696E82"
                    />
                  </svg>
                </span>
                <div className="register-tooltip">
                  <p>От 8 символов</p>
                  <p>До 128 символов</p>
                  <p>Заглавные буквы</p>
                  <p>Цифры</p>
                  <p>Символы *.-</p>
                </div>
              </div>
            </div>
          </label>
          <label className="login-field login-field--password">
            <div className="login-input">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Подтвердите пароль"
              />
              <span className="login-label">Подтвердите пароль</span>
              <div className="login-icons">
                <button
                  className="login-eye"
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  aria-label={showConfirm ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  <EyeIcon variant={showConfirm ? 'on' : 'off'} />
                </button>
              </div>
            </div>
          </label>
          <button className="login-submit" type="submit">
            Сохранить пароль
          </button>
        </form>
      </section>
    </main>
  )
}
