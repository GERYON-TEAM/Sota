import Logo from '../../../shared/ui/logo/Logo'
import AuthShape from '../../../shared/ui/auth-shape/AuthShape'
import './register-success.css'

export default function RegisterSuccess() {
  return (
    <main className="auth-page">
      <Logo className="logo" />
      <div className="auth-shapes">
        <AuthShape className="auth-shape auth-shape--left" side="left" />
        <AuthShape className="auth-shape auth-shape--right" side="right" />
      </div>
      <section className="register-success">
        <svg
          width="141"
          height="141"
          viewBox="0 0 141 141"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M111.625 58.75C118.264 58.75 124.315 56.4587 129.25 52.7575V105.75C129.25 112.213 123.963 117.5 117.5 117.5H23.5C17.0375 117.5 11.75 112.213 11.75 105.75V35.25C11.75 28.7875 17.0375 23.5 23.5 23.5H82.8375C82.485 25.38 82.25 27.3775 82.25 29.375C82.25 38.07 86.0687 45.7662 92.0612 51.1712L70.5 64.625L31.1375 40.0087C30.5821 39.6241 29.9544 39.3562 29.2925 39.2212C28.6305 39.0862 27.9481 39.0869 27.2864 39.2233C26.6247 39.3596 25.9976 39.6288 25.443 40.0146C24.8884 40.4004 24.4178 40.8946 24.0598 41.4675C23.7017 42.0404 23.4636 42.68 23.3599 43.3476C23.2562 44.0151 23.289 44.6968 23.4564 45.3513C23.6237 46.0058 23.9222 46.6196 24.3336 47.1554C24.745 47.6913 25.2609 48.1381 25.85 48.4688L67.3863 74.4362C69.2663 75.6112 71.7337 75.6112 73.6137 74.4362L101.637 56.9287C104.81 58.045 108.1 58.75 111.625 58.75Z"
            fill="#0B1215"
          />
          <path
            d="M111.625 47C101.873 47 94 39.1275 94 29.375C94 19.6225 101.873 11.75 111.625 11.75C121.377 11.75 129.25 19.6225 129.25 29.375C129.25 39.1275 121.377 47 111.625 47Z"
            fill="#5260FF"
          />
        </svg>
        <div className="register-success-text">
          <h2>Проверьте почту</h2>
          <p>
            Чтобы закончить регистрацию, перейдите по ссылке в письме, отправленном
            на указанную почту
          </p>
        </div>
      </section>
    </main>
  )
}
