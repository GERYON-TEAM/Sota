import RatingDots from '../../../shared/ui/color-dots/RatingDots'

type ProfileCardProps = {
  avatarUrl: string | null
  aboutText: string
  techList: string[]
  hasAnyContacts: boolean
  normalizedGithubUrl: string
  normalizedTelegramUrl: string
  normalizedEmailUrl: string
  onEdit: () => void
  onShare: () => void
}

export default function ProfileCard({
  avatarUrl,
  aboutText,
  techList,
  hasAnyContacts,
  normalizedGithubUrl,
  normalizedTelegramUrl,
  normalizedEmailUrl,
  onEdit,
  onShare,
}: ProfileCardProps) {
  return (
    <section className="portfolio-stats">
      <div className="portfolio-stats__top">
        <div className="portfolio-user">
          <div
            className="portfolio-avatar"
            aria-hidden="true"
            style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
          />
          <div className="portfolio-user__text">
            <span className="portfolio-user__name">Алина К.</span>
            <span className="portfolio-user__level">Middle</span>
          </div>
        </div>

        <div className="portfolio-actions">
          <button className="portfolio-action" type="button" onClick={onEdit}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12"
                stroke="#696E82"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3751 2.62523C18.7729 2.2274 19.3125 2.00391 19.8751 2.00391C20.4377 2.00391 20.9773 2.2274 21.3751 2.62523C21.7729 3.02305 21.9964 3.56262 21.9964 4.12523C21.9964 4.68784 21.7729 5.2274 21.3751 5.62523L12.3621 14.6392C12.1246 14.8765 11.8313 15.0501 11.5091 15.1442L8.63609 15.9842C8.55005 16.0093 8.45883 16.0108 8.372 15.9886C8.28517 15.9663 8.20592 15.9212 8.14254 15.8578C8.07916 15.7944 8.03398 15.7151 8.01174 15.6283C7.98949 15.5415 7.991 15.4503 8.01609 15.3642L8.85609 12.4912C8.95062 12.1693 9.12463 11.8763 9.36209 11.6392L18.3751 2.62523Z"
                stroke="#696E82"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Редактировать</span>
          </button>

          <button className="portfolio-action" type="button" onClick={onShare}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15.014 16.636L8.986 13.894M15.112 7.582L8.888 10.977M6.015 15.809C6.44377 15.809 6.86833 15.7245 7.26446 15.5605C7.66059 15.3964 8.02052 15.1559 8.3237 14.8527C8.62689 14.5495 8.86738 14.1896 9.03147 13.7935C9.19555 13.3973 9.28 12.9728 9.28 12.544C9.28 12.1152 9.19555 11.6907 9.03147 11.2945C8.86738 10.8984 8.62689 10.5385 8.3237 10.2353C8.02052 9.93211 7.66059 9.69162 7.26446 9.52753C6.86833 9.36345 6.44377 9.279 6.015 9.279C5.14907 9.279 4.3186 9.62299 3.7063 10.2353C3.09399 10.8476 2.75 11.6781 2.75 12.544C2.75 13.4099 3.09399 14.2404 3.7063 14.8527C4.3186 15.465 5.14907 15.809 6.015 15.809ZM17.985 9.28C18.4138 9.28 18.8383 9.19555 19.2345 9.03147C19.6306 8.86738 19.9905 8.62689 20.2937 8.3237C20.5969 8.02052 20.8374 7.66059 21.0015 7.26446C21.1655 6.86833 21.25 6.44377 21.25 6.015C21.25 5.58623 21.1655 5.16167 21.0015 4.76554C20.8374 4.36941 20.5969 4.00948 20.2937 3.7063C19.9905 3.40311 19.6306 3.16261 19.2345 2.99853C18.8383 2.83445 18.4138 2.75 17.985 2.75C17.1191 2.75 16.2886 3.09399 15.6763 3.7063C15.064 4.3186 14.72 5.14907 14.72 6.015C14.72 6.88093 15.064 7.7114 15.6763 8.3237C16.2886 8.93601 17.1191 9.28 17.985 9.28ZM17.985 21.25C18.8509 21.25 19.6814 20.906 20.2937 20.2937C20.906 19.6814 21.25 18.8509 21.25 17.985C21.25 17.1191 20.906 16.2886 20.2937 15.6763C19.6814 15.064 18.8509 14.72 17.985 14.72C17.1191 14.72 16.2886 15.064 15.6763 15.6763C15.064 16.2886 14.72 17.1191 14.72 17.985C14.72 18.8509 15.064 19.6814 15.6763 20.2937C16.2886 20.906 17.1191 21.25 17.985 21.25Z"
                stroke="#696E82"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Поделиться</span>
          </button>
        </div>
      </div>

      <div className="portfolio-stats__bottom">
        <div className="portfolio-rating stat-card">
          <div className="stat-card__head">
            <span>Рейтинг</span>
            <RatingDots />
          </div>
          <div className="stat-card__value">4,8</div>
          <div className="stat-card__meta">
            отзывы: <span className="stat-accent">24</span>
          </div>
        </div>

        <div className="portfolio-card portfolio-card--about">
          <h3>О специалисте</h3>
          <p>{aboutText}</p>
        </div>

        <div className="portfolio-card portfolio-card--stack">
          <h3>Стек технологий</h3>
          <div className="portfolio-tags">
            {techList.map((tech) => (
              <span className="portfolio-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {hasAnyContacts && (
          <div className="portfolio-card portfolio-card--contacts">
            <h3>Контакты</h3>
            <div className="portfolio-contacts">
              {normalizedGithubUrl && (
                <a
                  className="contact-icon"
                  href={normalizedGithubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 50 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.5 5C24.5453 5 21.6194 5.59643 18.8896 6.75523C16.1598 7.91404 13.6794 9.61252 11.5901 11.7537C7.37053 16.078 5 21.9431 5 28.0586C5 38.2505 11.4575 46.8975 20.39 49.9643C21.515 50.1488 21.875 49.4339 21.875 48.8114V44.9144C15.6425 46.298 14.315 41.8246 14.315 41.8246C13.28 39.1498 11.8175 38.435 11.8175 38.435C9.77 37.0053 11.975 37.0515 11.975 37.0515C14.225 37.2129 15.4175 39.4265 15.4175 39.4265C17.375 42.9314 20.6825 41.8938 21.965 41.3404C22.1675 39.8416 22.7525 38.827 23.3825 38.2505C18.3875 37.674 13.145 35.691 13.145 26.9057C13.145 24.3462 14 22.294 15.4625 20.6568C15.2375 20.0803 14.45 17.6822 15.6875 14.5693C15.6875 14.5693 17.5775 13.9467 21.875 16.9213C23.6525 16.414 25.5875 16.1604 27.5 16.1604C29.4125 16.1604 31.3475 16.414 33.125 16.9213C37.4225 13.9467 39.3125 14.5693 39.3125 14.5693C40.55 17.6822 39.7625 20.0803 39.5375 20.6568C41 22.294 41.855 24.3462 41.855 26.9057C41.855 35.7141 36.59 37.651 31.5725 38.2275C32.3825 38.9423 33.125 40.3488 33.125 42.4933V48.8114C33.125 49.4339 33.485 50.1718 34.6325 49.9643C43.565 46.8744 50 38.2505 50 28.0586C50 25.0305 49.418 22.0321 48.2873 19.2345C47.1566 16.4369 45.4992 13.8949 43.4099 11.7537C41.3206 9.61252 38.8402 7.91404 36.1104 6.75523C33.3806 5.59643 30.4547 5 27.5 5Z"
                      fill="#5260FF"
                    />
                  </svg>
                </a>
              )}
              {normalizedTelegramUrl && (
                <a
                  className="contact-icon"
                  href={normalizedTelegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                >
                  <svg
                    width="54"
                    height="54"
                    viewBox="67.5 0 45 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M90 4.5C77.58 4.5 67.5 14.58 67.5 27C67.5 39.42 77.58 49.5 90 49.5C102.42 49.5 112.5 39.42 112.5 27C112.5 14.58 102.42 4.5 90 4.5ZM100.44 19.8C100.102 23.355 98.64 31.995 97.8975 35.9775C97.5825 37.665 96.9525 38.2275 96.3675 38.295C95.0625 38.4075 94.0725 37.44 92.8125 36.6075C90.8325 35.3025 89.7075 34.4925 87.795 33.2325C85.5675 31.77 87.0075 30.96 88.29 29.655C88.6275 29.3175 94.3875 24.075 94.5 23.6025C94.5156 23.5309 94.5135 23.4566 94.4939 23.3861C94.4743 23.3155 94.4378 23.2508 94.3875 23.1975C94.2525 23.085 94.0725 23.13 93.915 23.1525C93.7125 23.1975 90.5625 25.29 84.42 29.43C83.52 30.0375 82.71 30.3525 81.99 30.33C81.18 30.3075 79.65 29.88 78.5025 29.4975C77.085 29.0475 75.9825 28.8 76.0725 28.0125C76.1175 27.6075 76.68 27.2025 77.7375 26.775C84.3075 23.9175 88.6725 22.0275 90.855 21.1275C97.11 18.5175 98.3925 18.0675 99.2475 18.0675C99.4275 18.0675 99.855 18.1125 100.125 18.3375C100.35 18.5175 100.417 18.765 100.44 18.945C100.417 19.08 100.462 19.485 100.44 19.8Z"
                      fill="#5260FF"
                    />
                  </svg>
                </a>
              )}
              {normalizedEmailUrl && (
                <a className="contact-icon" href={normalizedEmailUrl} aria-label="Email">
                  <svg
                    width="54"
                    height="54"
                    viewBox="130.5 0 45 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M153 4.5C165.426 4.5 175.5 14.5736 175.5 27C175.5 39.4263 165.426 49.5 153 49.5C140.574 49.5 130.5 39.4263 130.5 27C130.5 14.5736 140.574 4.5 153 4.5ZM144 18C142.762 18 141.761 19.0125 141.761 20.25L141.75 33.75C141.75 34.9875 142.762 36 144 36H162C163.237 36 164.25 34.9875 164.25 33.75V20.25C164.25 19.0125 163.237 18 162 18H144ZM162 22.5L153 28.125L144 22.5V20.25L153 25.875L162 20.25V22.5Z"
                      fill="#5260FF"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
