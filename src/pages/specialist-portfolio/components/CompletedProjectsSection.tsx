import RatingDots from '../../../shared/ui/color-dots/RatingDots'
import SelectCheckIcon from '../ui/SelectCheckIcon'

type CompletedProjectsSectionProps = {
  hasInvites: boolean
  yearOpen: boolean
  setYearOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  yearValue: string
  setYearValue: (value: string) => void
  completedTypeOpen: boolean
  setCompletedTypeOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  completedTypeValue: string
  setCompletedTypeValue: (value: string) => void
  completedDateOpen: boolean
  setCompletedDateOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  completedDateValue: 'new' | 'old'
  setCompletedDateValue: (value: 'new' | 'old') => void
}

export default function CompletedProjectsSection({
  hasInvites,
  yearOpen,
  setYearOpen,
  yearValue,
  setYearValue,
  completedTypeOpen,
  setCompletedTypeOpen,
  completedTypeValue,
  setCompletedTypeValue,
  completedDateOpen,
  setCompletedDateOpen,
  completedDateValue,
  setCompletedDateValue,
}: CompletedProjectsSectionProps) {
  const openCompletedProject = () => {
    window.location.href = '/dashboard/specialist/portfolio/project'
  }

  return (
    <>
      <section className="portfolio-completed">
        <div className="portfolio-completed__header">
          <div className="portfolio-completed__title">
            <h2 className="portfolio-section-title">Завершенные проекты</h2>

            <span className="portfolio-count">
              <span>1</span>
            </span>
          </div>

          <div className="portfolio-filters">
            <div
              className={`active-filter ${yearOpen ? 'is-open' : ''}`}
              onClick={(event) => {
                event.stopPropagation()
                setYearOpen((prev) => !prev)
                setCompletedTypeOpen(false)
                setCompletedDateOpen(false)
              }}
            >
              <span className="active-filter__text">Год</span>
              <span className="active-filter__chevron" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="#696E82"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div
                className={`deadline-menu ${yearOpen ? 'is-open' : ''}`}
                onClick={(event) => event.stopPropagation()}
              >
                {['2026', '2025'].map((year) => (
                  <button
                    key={year}
                    type="button"
                    className="deadline-item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setYearValue(year)
                      setYearOpen(false)
                    }}
                  >
                    <span className="deadline-item__text">{year}</span>
                    {yearValue === year && (
                      <span className="deadline-item__check" aria-hidden="true">
                        <SelectCheckIcon />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`active-filter ${completedTypeOpen ? 'is-open' : ''}`}
              onClick={(event) => {
                event.stopPropagation()
                setCompletedTypeOpen((prev) => !prev)
                setYearOpen(false)
                setCompletedDateOpen(false)
              }}
            >
              <span className="active-filter__text">Тип проекта</span>
              <span className="active-filter__chevron" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="#696E82"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div
                className={`deadline-menu ${completedTypeOpen ? 'is-open' : ''}`}
                onClick={(event) => event.stopPropagation()}
              >
                {['Коммерческий', 'Некоммерческий'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="deadline-item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setCompletedTypeValue(type)
                      setCompletedTypeOpen(false)
                    }}
                  >
                    <span className="deadline-item__text">{type}</span>
                    {completedTypeValue === type && (
                      <span className="deadline-item__check" aria-hidden="true">
                        <SelectCheckIcon />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`active-filter ${completedDateOpen ? 'is-open' : ''}`}
              onClick={(event) => {
                event.stopPropagation()
                setCompletedDateOpen((prev) => !prev)
                setYearOpen(false)
                setCompletedTypeOpen(false)
              }}
            >
              <span className="active-filter__icon" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18V5M12 18L16 14M12 18L8 14"
                    stroke="#0B1215"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="active-filter__text">По дате</span>
              <span className="active-filter__chevron" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="#696E82"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div
                className={`deadline-menu ${completedDateOpen ? 'is-open' : ''}`}
                onClick={(event) => event.stopPropagation()}
              >
                {[
                  { value: 'new', label: 'Сначала новые' },
                  { value: 'old', label: 'Сначала старые' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className="deadline-item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setCompletedDateValue(item.value as 'new' | 'old')
                      setCompletedDateOpen(false)
                    }}
                  >
                    <span className="deadline-item__text">{item.label}</span>
                    {completedDateValue === item.value && (
                      <span className="deadline-item__check" aria-hidden="true">
                        <SelectCheckIcon />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="active-projects-list">
        {hasInvites ? (
          <div className="project-frame">
            <div className="project-card">
              <div className="project-card__top">
                <div className="project-role">Junior Backend Developer</div>
                <button
                  className="project-link"
                  type="button"
                  aria-label="Открыть проект"
                  onClick={openCompletedProject}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_22_105)">
                      <path
                        d="M18.5322 6.64453C18.5322 6.37937 18.4268 6.12508 18.2393 5.93758C18.0518 5.75008 17.7975 5.64473 17.5324 5.64469L9.53217 5.64469C9.39941 5.64238 9.26752 5.66653 9.14419 5.71575C9.02086 5.76496 8.90857 5.83824 8.81386 5.93131C8.71916 6.02438 8.64394 6.13539 8.59259 6.25784C8.54124 6.3803 8.5148 6.51175 8.5148 6.64453C8.5148 6.77732 8.54124 6.90877 8.59259 7.03123C8.64394 7.15368 8.71916 7.26469 8.81386 7.35776C8.90857 7.45083 9.02086 7.52411 9.14419 7.57332C9.26752 7.62253 9.39941 7.64669 9.53217 7.64438L15.1183 7.64438L5.7541 17.0086C5.56657 17.1961 5.46121 17.4505 5.46121 17.7157C5.46121 17.9809 5.56657 18.2353 5.7541 18.4228C5.94164 18.6103 6.19599 18.7157 6.46121 18.7157C6.72643 18.7157 6.98078 18.6103 7.16832 18.4228L16.5325 9.0586L16.5325 14.6447C16.5371 14.9069 16.6444 15.1568 16.8314 15.3406C17.0185 15.5244 17.2702 15.6274 17.5324 15.6274C17.7946 15.6274 18.0463 15.5244 18.2333 15.3406C18.4203 15.1568 18.5277 14.9069 18.5322 14.6447L18.5322 6.64453Z"
                        fill="#696E82"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_22_105">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              <div className="project-title">Название проекта</div>

              <div className="task-card">
                <div className="task-card__head">
                  <span>Отзыв Tech Lead</span>
                  <span className="task-date">25.02.2026</span>
                </div>

                <div className="project-review">
                  Отзыв от Tech Lead, может занимать 2-3 строки. Кратко и по содержанию или с использованием многоточия, если текста м...
                </div>
                <div className="lead-card lead-card--plain">
                  <div className="lead-avatar" aria-hidden="true" />
                  <div className="lead-text">
                    <span className="lead-role">Tech Lead</span>
                    <span className="lead-name">Нестеров Ярослав</span>
                  </div>
                  <RatingDots className="lead-dots" />
                </div>
              </div>

              <div className="project-dates">
                <div className="project-date-card">
                  <span>Окончание</span>
                  <span>01.01.2026</span>
                </div>
                <div className="project-date-card">
                  <span>Окончание</span>
                  <span>01.01.2026</span>
                </div>
              </div>

              <button className="project-results" type="button" onClick={openCompletedProject}>
                <span>Посмотреть результаты</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M18.5322 6.64356C18.5322 6.37839 18.4268 6.1241 18.2393 5.9366C18.0518 5.7491 17.7975 5.64375 17.5324 5.64371L9.53217 5.64371C9.39941 5.6414 9.26752 5.66556 9.14419 5.71477C9.02086 5.76398 8.90857 5.83726 8.81386 5.93033C8.71916 6.02341 8.64394 6.13441 8.59259 6.25686C8.54124 6.37932 8.5148 6.51077 8.5148 6.64356C8.5148 6.77634 8.54124 6.9078 8.59259 7.03025C8.64394 7.15271 8.71916 7.26371 8.81386 7.35678C8.90857 7.44986 9.02086 7.52314 9.14419 7.57235C9.26752 7.62156 9.39941 7.64571 9.53217 7.64341L15.1183 7.64341L5.7541 17.0076C5.56657 17.1952 5.46121 17.4495 5.46121 17.7147C5.46121 17.9799 5.56657 18.2343 5.7541 18.4218C5.94164 18.6094 6.19599 18.7147 6.46121 18.7147C6.72643 18.7147 6.98078 18.6094 7.16832 18.4218L16.5325 9.05762L16.5325 14.6438C16.5371 14.9059 16.6444 15.1558 16.8314 15.3396C17.0185 15.5234 17.2702 15.6264 17.5324 15.6264C17.7946 15.6264 18.0463 15.5234 18.2333 15.3396C18.4203 15.1558 18.5277 14.9059 18.5322 14.6438L18.5322 6.64356Z"
                    fill="#696E82"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="project-empty">
            <svg
              width="84"
              height="84"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M41.6667 83.3333C18.7083 83.3333 0 64.625 0 41.6667C0 18.7083 18.7083 0 41.6667 0C64.625 0 83.3333 18.7083 83.3333 41.6667C83.3333 64.625 64.625 83.3333 41.6667 83.3333ZM41.6667 6.25C22.125 6.25 6.25 22.125 6.25 41.6667C6.25 61.2083 22.125 77.0833 41.6667 77.0833C61.2083 77.0833 77.0833 61.2083 77.0833 41.6667C77.0833 22.125 61.2083 6.25 41.6667 6.25ZM53.375 68.6667C51.7271 68.6614 50.1095 68.2238 48.6837 67.3976C47.2579 66.5714 46.0739 65.3854 45.25 63.9583L43.2917 60.5417C36.3333 61.0417 29.5833 58.125 25.25 52.6667C24.9917 52.3482 24.7995 51.9814 24.6846 51.5878C24.5698 51.1942 24.5346 50.7816 24.5812 50.3742C24.6277 49.9668 24.7551 49.5727 24.9558 49.2152C25.1565 48.8576 25.4265 48.5436 25.75 48.2917C27.125 47.2083 29.0833 47.4583 30.125 48.7917C31.8088 50.8707 34.018 52.4615 36.5236 53.3992C39.0292 54.337 41.74 54.5876 44.375 54.125C47.8333 53.4583 51 51.5833 53.2083 48.7917C53.5294 48.4007 53.9383 48.0913 54.4018 47.8885C54.8652 47.6858 55.37 47.5955 55.875 47.625C56.9167 47.7083 57.8333 48.2917 58.3333 49.1667L61.4583 54.5833C64.0417 59.0417 62.5 64.7917 58.0417 67.375C56.5833 68.2083 55 68.625 53.375 68.625V68.6667ZM49.625 59.0417L50.6667 60.8333C51.0833 61.5417 51.75 62.0833 52.5833 62.2917C53.375 62.5 54.2083 62.4167 54.9583 61.9583C56.4583 61.0833 56.9583 59.1667 56.125 57.7083L55.0417 55.8333C53.4167 57.1667 51.625 58.25 49.6667 59.0417H49.625ZM63.8333 37.375C62.5417 37.375 61.3333 36.5417 60.875 35.25C60.75 34.875 59.5833 31.9167 56.5833 31.9167C53.4583 31.9167 52.2917 35.1667 52.2917 35.2083C51.75 36.8333 50 37.75 48.3333 37.1667C47.5511 36.8982 46.9065 36.3317 46.5398 35.5904C46.1731 34.8491 46.1138 33.993 46.375 33.2083C47.3333 30.4167 50.5417 25.625 56.5833 25.625C62.625 25.625 65.8333 30.375 66.7917 33.2083C66.9475 33.6782 66.9899 34.1784 66.9155 34.6678C66.841 35.1572 66.6518 35.6221 66.3633 36.0244C66.0747 36.4267 65.6951 36.755 65.2554 36.9825C64.8157 37.21 64.3284 37.3302 63.8333 37.3333V37.375ZM34 37.375C32.7083 37.375 31.5 36.5417 31.0417 35.25C30.9167 34.875 29.75 31.9167 26.75 31.9167C23.625 31.9167 22.4583 35.1667 22.4583 35.2083C21.9167 36.8333 20.1667 37.75 18.5 37.1667C17.7178 36.8982 17.0732 36.3317 16.7065 35.5904C16.3397 34.8491 16.2805 33.993 16.5417 33.2083C17.5 30.4167 20.7083 25.625 26.75 25.625C32.7917 25.625 36 30.375 36.9583 33.2083C37.1142 33.6782 37.1566 34.1784 37.0821 34.6678C37.0077 35.1572 36.8184 35.6221 36.5299 36.0244C36.2414 36.4267 35.8618 36.755 35.4221 36.9825C34.9824 37.21 34.4951 37.3302 34 37.3333V37.375Z"
                fill="#F8F9FD"
              />
            </svg>
            <p>Пока нет активных проектов</p>
            <button className="project-empty__link" type="button">
              К открытым проектам
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M17.3635 7.37629C17.5509 7.18876 17.6562 6.93445 17.6562 6.66929C17.6562 6.40412 17.5509 6.14982 17.3635 5.96229L11.7065 0.305288C11.6142 0.209778 11.5039 0.133596 11.3819 0.0811866C11.2599 0.0287776 11.1286 0.00119129 10.9959 3.74652e-05C10.8631 -0.00111636 10.7314 0.0241856 10.6085 0.0744665C10.4856 0.124747 10.374 0.199 10.2801 0.292893C10.1862 0.386786 10.1119 0.498437 10.0616 0.621334C10.0114 0.74423 9.98606 0.87591 9.98721 1.00869C9.98837 1.14147 10.016 1.27269 10.0684 1.39469C10.1208 1.5167 10.197 1.62704 10.2925 1.71929L14.2425 5.66929L0.999464 5.66929C0.734247 5.66929 0.479892 5.77464 0.292356 5.96218C0.10482 6.14972 -0.000536245 6.40407 -0.000536256 6.66929C-0.000536268 6.9345 0.10482 7.18886 0.292356 7.37639C0.479892 7.56393 0.734247 7.66929 0.999464 7.66929L14.2425 7.66929L10.2925 11.6193C10.1103 11.8079 10.0095 12.0605 10.0118 12.3227C10.0141 12.5849 10.1192 12.8357 10.3046 13.0211C10.4901 13.2065 10.7409 13.3117 11.0031 13.314C11.2653 13.3162 11.5179 13.2154 11.7065 13.0333L17.3635 7.37629Z"
                  fill="#5260FF"
                />
              </svg>
            </button>
          </div>
        )}
      </section>
    </>
  )
}
