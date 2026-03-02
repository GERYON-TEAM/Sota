import { useState } from 'react'
import Logo from '../../../shared/ui/logo/Logo'
import AuthShape from '../../../shared/ui/auth-shape/AuthShape'
import '../login.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

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
          <p>Укажите почту, привязанную к аккаунту</p>
        </div>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (isEmailValid) {
              window.location.href = '/register/success'
            }
          }}
        >
          <label className="login-field">
            <div className="login-input">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="login-label">Email</span>
              <div className="login-icons">
                {isEmailValid && (
                  <span className="login-check" aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_7_105_forgot"
                        style={{ maskType: 'luminance' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="22"
                        height="22"
                      >
                        <path
                          d="M11 21C12.3135 21.0016 13.6143 20.7437 14.8278 20.2411C16.0412 19.7384 17.1434 19.0009 18.071 18.071C19.0009 17.1434 19.7384 16.0412 20.2411 14.8278C20.7437 13.6143 21.0016 12.3135 21 11C21.0016 9.68655 20.7437 8.38572 20.2411 7.17225C19.7384 5.95878 19.0009 4.85659 18.071 3.92901C17.1434 2.99909 16.0412 2.26162 14.8278 1.75897C13.6143 1.25631 12.3135 0.998388 11 1.00001C9.68655 0.998388 8.38572 1.25631 7.17225 1.75897C5.95878 2.26162 4.85659 2.99909 3.92901 3.92901C2.99909 4.85659 2.26162 5.95878 1.75897 7.17225C1.25631 8.38572 0.998388 9.68655 1.00001 11C0.998388 12.3135 1.25631 13.6143 1.75897 14.8278C2.26162 16.0412 2.99909 17.1434 3.92901 18.071C4.85659 19.0009 5.95878 19.7384 7.17225 20.2411C8.38572 20.7437 9.68655 21.0016 11 21Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 11L10 14L16 8"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask0_7_105_forgot)">
                        <path d="M-1 -1H23V23H-1V-1Z" fill="#0B1215" />
                      </g>
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </label>
          {isEmailValid && (
            <button className="login-submit" type="submit">
              Отправить ссылку
            </button>
          )}
        </form>
      </section>
    </main>
  )
}
