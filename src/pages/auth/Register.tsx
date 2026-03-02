import { useEffect, useRef, useState } from 'react'
import Logo from '../../shared/ui/logo/Logo'
import AuthShape from '../../shared/ui/auth-shape/AuthShape'
import EyeIcon from '../../shared/ui/eye-icon/EyeIcon'
import './login.css'
import './register.css'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [roleOpen, setRoleOpen] = useState(false)
  const roleRef = useRef<HTMLDivElement | null>(null)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const isPasswordValid = password.trim().length > 0
  const isConfirmValid = confirmPassword.trim().length > 0 && confirmPassword === password

  useEffect(() => {
    if (!roleOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (!roleRef.current) return
      if (!roleRef.current.contains(event.target as Node)) {
        setRoleOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [roleOpen])

  useEffect(() => {
    if (role) {
      setRoleOpen(false)
    }
  }, [role])

  return (
    <main className="auth-page">
      <Logo className="logo" />
      <div className="auth-shapes">
        <AuthShape className="auth-shape auth-shape--left" side="left" />
        <AuthShape className="auth-shape auth-shape--right" side="right" />
      </div>
      <section className="login-card">
        <div className="login-header">
          <h1 className="register-title">Регистрация</h1>
          <p>Добро пожаловать!</p>
        </div>
          <form
            className="login-form register-form"
            key={step}
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault()
              if (step === 1 && email.trim() && password.trim()) {
                setEmail('')
                setPassword('')
                setShowConfirm(false)
                setShowPassword(false)
                setStep(2)
                return
              }
              if (step === 2) {
                setRoleOpen(false)
                window.location.href = '/register/success'
              }
            }}
          >
            {step === 1 ? (
              <>
              <label className="login-field">
                <div className="login-input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
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
                            id="mask0_7_105_email"
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
                          <g mask="url(#mask0_7_105_email)">
                            <path d="M-1 -1H23V23H-1V-1Z" fill="#0B1215" />
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </label>
              <label className="login-field login-field--password">
                <div className="register-input-row">
                  <div className="login-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Пароль"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
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
                      {isPasswordValid && (
                        <span className="login-check" aria-hidden="true">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask
                              id="mask0_7_105_pass"
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
                            <g mask="url(#mask0_7_105_pass)">
                              <path d="M-1 -1H23V23H-1V-1Z" fill="#0B1215" />
                            </g>
                          </svg>
                        </span>
                      )}
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
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
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
                    {isConfirmValid && (
                      <span className="login-check" aria-hidden="true">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_7_105_confirm"
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
                          <g mask="url(#mask0_7_105_confirm)">
                            <path d="M-1 -1H23V23H-1V-1Z" fill="#0B1215" />
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </>
          ) : (
            <>
              <label className="login-field">
                <div className="login-input">
                  <input type="text" name="lastName" placeholder="Фамилия" />
                  <span className="login-label">Фамилия</span>
                </div>
              </label>
              <label className="login-field">
                <div className="login-input">
                  <input type="text" name="firstName" placeholder="Имя" />
                  <span className="login-label">Имя</span>
                </div>
              </label>
              <label className="login-field">
                <div className="login-input">
                  <input type="text" name="middleName" placeholder="Отчество" />
                  <span className="login-label">Отчество</span>
                </div>
              </label>
              <label className="login-field">
                <div className="register-select" aria-expanded={roleOpen} ref={roleRef}>
                  <button
                    className={`register-select-trigger${role ? ' has-value' : ''}`}
                    type="button"
                    onClick={() => setRoleOpen((value) => !value)}
                    aria-expanded={roleOpen}
                  >
                    <span className="register-select-text">
                      {role ? role : 'Выберите роль'}
                    </span>
                    <span className="register-select-icon" aria-hidden="true">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="#0B1215"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {roleOpen && (
                    <div className="register-select-menu">
                      {['Заказчик', 'Специалист', 'Валидатор'].map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="register-select-item"
                          onPointerDown={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            setRole(item)
                            setRoleOpen(false)
                          }}
                        >
                          <span className="register-select-label">{item}</span>
                          <span
                            className={`register-select-check${
                              role === item ? ' is-visible' : ''
                            }`}
                            aria-hidden="true"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_7_438"
                                style={{ maskType: 'luminance' }}
                                maskUnits="userSpaceOnUse"
                                x="1"
                                y="1"
                                width="22"
                                height="22"
                              >
                                <path
                                  d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                                  fill="white"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 12L11 15L17 9"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </mask>
                              <g mask="url(#mask0_7_438)">
                                <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                              </g>
                            </svg>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            </>
          )}
            <button className="login-submit" type="submit">
              Зарегистрироваться
            </button>
            <div className="register-footer register-footer--inline">
              <span>Я согласен с условиями</span>
              <a href="#" className="register-link">
                Пользовательского соглашения
              </a>
            </div>
          </form>
        </section>
      {step !== 3 && (
        <div className="login-footer">
          <span>Уже зарегистрированы?</span>
          <a href="/login" className="login-register">
            Вход в систему
          </a>
        </div>
      )}
    </main>
  )
}
