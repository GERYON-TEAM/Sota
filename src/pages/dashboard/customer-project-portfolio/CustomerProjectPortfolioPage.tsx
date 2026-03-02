import { useEffect, useState } from 'react'
import RatingDots from '../../../shared/ui/color-dots/RatingDots'
import ProgressSteps from '../../../shared/ui/progress-steps/ProgressSteps'
import CustomerSidebar from '../customer-dashboard/components/CustomerSidebar'
import CustomerHeaderBar from '../customer-dashboard/components/CustomerHeaderBar'
import CustomerProjectPortfolioBreadcrumbTitle from './components/CustomerProjectPortfolioBreadcrumbTitle'
import '../customer-dashboard/styles/index.css'
import '../../specialist-portfolio/styles/index.css'
import './styles/index.css'

const hardSkills = [
  { name: 'React', progress: 6 },
  { name: 'Node.js', progress: 7 },
  { name: 'TypeScript', progress: 5 },
]

const softSkills = [
  { name: 'Communication', progress: 5 },
  { name: 'Leadership', progress: 4 },
  { name: 'Teamwork', progress: 6 },
]

const goals = [
  {
    title: 'Выучить Vue.js',
    timeline: '01.01.2025 - сейчас',
    progress: '36%',
    description:
      'Описание цели, краткое и по делу. Если текста много, он будет обрезаться и показываться в две строки.',
    status: 'в процессе',
  },
]

const reviews = [
  {
    project: 'Название проекта',
    rating: 5,
    reviewer: 'Нестеров Ярослав',
    role: 'Tech Lead',
    text:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
    date: '01.01.2026',
    projectRole: 'Junior Backend Developer',
  },
]

export default function CustomerProjectPortfolioPage() {
  const [bellOpen, setBellOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)
  const [yearValue, setYearValue] = useState('2026')
  const [completedTypeOpen, setCompletedTypeOpen] = useState(false)
  const [completedTypeValue, setCompletedTypeValue] = useState('Коммерческий')
  const [completedDateOpen, setCompletedDateOpen] = useState(false)
  const [completedDateValue, setCompletedDateValue] = useState<'new' | 'old'>('new')
  const [ratingOpen, setRatingOpen] = useState(false)
  const [ratingValue, setRatingValue] = useState<'high' | 'low'>('high')
  const [reviewsTypeOpen, setReviewsTypeOpen] = useState(false)
  const [reviewsTypeValue, setReviewsTypeValue] = useState('Коммерческий')
  const [reviewsDateOpen, setReviewsDateOpen] = useState(false)
  const [reviewsDateValue, setReviewsDateValue] = useState<'new' | 'old'>('new')

  useEffect(() => {
    const handleClose = () => {
      setYearOpen(false)
      setCompletedTypeOpen(false)
      setCompletedDateOpen(false)
      setRatingOpen(false)
      setReviewsTypeOpen(false)
      setReviewsDateOpen(false)
    }
    window.addEventListener('click', handleClose)
    return () => window.removeEventListener('click', handleClose)
  }, [])

  return (
    <div className="dashboard dashboard--customer">
      <CustomerSidebar />

      <main className="dashboard-content">
        <CustomerHeaderBar
          title={<CustomerProjectPortfolioBreadcrumbTitle />}
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="portfolio-surface">
          <section className="portfolio-stats">
            <div className="portfolio-stats__top">
              <div className="portfolio-user">
                <div className="portfolio-avatar" aria-hidden="true" />
                <div className="portfolio-user__text">
                  <span className="portfolio-user__name">Нестеров Ярослав</span>
                  <span className="portfolio-user__level">Tech Lead</span>
                </div>
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
                <p>
                  Это текст про специалиста. Он может занимать 2-3 строки и рассказывать о сильных
                  сторонах и опыте.
                </p>
              </div>

              <div className="portfolio-card portfolio-card--stack">
                <h3>Стек технологий</h3>
                <div className="portfolio-tags">
                  {['Node.js', 'React', 'TypeScript', 'PostgreSQL'].map((tech) => (
                    <span className="portfolio-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="portfolio-card portfolio-card--contacts">
                <h3>Контакты</h3>
                <div className="portfolio-contacts">
                  <span className="contact-icon contact-icon--wide" aria-hidden="true">
                    <svg
                      width="180"
                      height="54"
                      viewBox="0 0 180 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.5 5C24.5453 5 21.6194 5.59643 18.8896 6.75523C16.1598 7.91404 13.6794 9.61252 11.5901 11.7537C7.37053 16.078 5 21.9431 5 28.0586C5 38.2505 11.4575 46.8975 20.39 49.9643C21.515 50.1488 21.875 49.4339 21.875 48.8114V44.9144C15.6425 46.298 14.315 41.8246 14.315 41.8246C13.28 39.1498 11.8175 38.435 11.8175 38.435C9.77 37.0053 11.975 37.0515 11.975 37.0515C14.225 37.2129 15.4175 39.4265 15.4175 39.4265C17.375 42.9314 20.6825 41.8938 21.965 41.3404C22.1675 39.8416 22.7525 38.827 23.3825 38.2505C18.3875 37.674 13.145 35.691 13.145 26.9057C13.145 24.3462 14 22.294 15.4625 20.6568C15.2375 20.0803 14.45 17.6822 15.6875 14.5693C15.6875 14.5693 17.5775 13.9467 21.875 16.9213C23.6525 16.414 25.5875 16.1604 27.5 16.1604C29.4125 16.1604 31.3475 16.414 33.125 16.9213C37.4225 13.9467 39.3125 14.5693 39.3125 14.5693C40.55 17.6822 39.7625 20.0803 39.5375 20.6568C41 22.294 41.855 24.3462 41.855 26.9057C41.855 35.7141 36.59 37.651 31.5725 38.2275C32.3825 38.9423 33.125 40.3488 33.125 42.4933V48.8114C33.125 49.4339 33.485 50.1718 34.6325 49.9643C43.565 46.8744 50 38.2505 50 28.0586C50 25.0305 49.418 22.0321 48.2873 19.2345C47.1566 16.4369 45.4992 13.8949 43.4099 11.7537C41.3206 9.61252 38.8402 7.91404 36.1104 6.75523C33.3806 5.59643 30.4547 5 27.5 5Z"
                        fill="#5260FF"
                      />
                      <path
                        d="M90 4.5C77.58 4.5 67.5 14.58 67.5 27C67.5 39.42 77.58 49.5 90 49.5C102.42 49.5 112.5 39.42 112.5 27C112.5 14.58 102.42 4.5 90 4.5ZM100.44 19.8C100.102 23.355 98.64 31.995 97.8975 35.9775C97.5825 37.665 96.9525 38.2275 96.3675 38.295C95.0625 38.4075 94.0725 37.44 92.8125 36.6075C90.8325 35.3025 89.7075 34.4925 87.795 33.2325C85.5675 31.77 87.0075 30.96 88.29 29.655C88.6275 29.3175 94.3875 24.075 94.5 23.6025C94.5156 23.5309 94.5135 23.4566 94.4939 23.3861C94.4743 23.3155 94.4378 23.2508 94.3875 23.1975C94.2525 23.085 94.0725 23.13 93.915 23.1525C93.7125 23.1975 90.5625 25.29 84.42 29.43C83.52 30.0375 82.71 30.3525 81.99 30.33C81.18 30.3075 79.65 29.88 78.5025 29.4975C77.085 29.0475 75.9825 28.8 76.0725 28.0125C76.1175 27.6075 76.68 27.2025 77.7375 26.775C84.3075 23.9175 88.6725 22.0275 90.855 21.1275C97.11 18.5175 98.3925 18.0675 99.2475 18.0675C99.4275 18.0675 99.855 18.1125 100.125 18.3375C100.35 18.5175 100.417 18.765 100.44 18.945C100.417 19.08 100.462 19.485 100.44 19.8Z"
                        fill="#5260FF"
                      />
                      <path
                        d="M153 4.5C165.426 4.5 175.5 14.5736 175.5 27C175.5 39.4263 165.426 49.5 153 49.5C140.574 49.5 130.5 39.4263 130.5 27C130.5 14.5736 140.574 4.5 153 4.5ZM144 18C142.762 18 141.761 19.0125 141.761 20.25L141.75 33.75C141.75 34.9875 142.762 36 144 36H162C163.237 36 164.25 34.9875 164.25 33.75V20.25C164.25 19.0125 163.237 18 162 18H144ZM162 22.5L153 28.125L144 22.5V20.25L153 25.875L162 20.25V22.5Z"
                        fill="#5260FF"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </section>

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
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="11" fill="#5260FF" />
                              <path
                                d="M8 12L11 15L17 9"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="11" fill="#5260FF" />
                              <path
                                d="M8 12L11 15L17 9"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="11" fill="#5260FF" />
                              <path
                                d="M8 12L11 15L17 9"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
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
            <div className="project-frame">
              <div className="project-card">
                <div className="project-card__top">
                  <div className="project-role project-role--chip">Junior Backend Developer</div>
                  <button
                    className="project-link"
                    type="button"
                    aria-label="Открыть проект"
                    onClick={() => {
                      window.location.href = '/dashboard/customer/project/portfolio/project'
                    }}
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
                    Отзыв от Tech Lead, может занимать 2-3 строки. Кратко и по содержанию или с
                    использованием многоточия, если текста м...
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

                <button
                  className="project-results"
                  type="button"
                  onClick={() => {
                    window.location.href = '/dashboard/customer/project/portfolio/project'
                  }}
                >
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
          </section>

          <section className="portfolio-skills">
            <div className="portfolio-skills__header">
              <h3 className="portfolio-section-title">Навыки</h3>
            </div>

            <div className="skills-card-row">
              <div className="skills-card">
                <div className="skills-card__head">
                  <span>Hard Skills</span>
                </div>
                {hardSkills.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-meta">
                      <div className="skill-projects">
                        <span>Проекты с навыком:</span>
                        <span className="skill-projects__count">10</span>
                      </div>
                      <div className="skill-level">Middle</div>
                      <ProgressSteps className="progress-steps--compact" done={skill.progress} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="skills-card skills-card--right">
                <div className="skills-card__head">
                  <span>Soft Skills</span>
                </div>
                {softSkills.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-meta">
                      <div className="skill-projects">
                        <span>Проекты с навыком:</span>
                        <span className="skill-projects__count">10</span>
                      </div>
                      <div className="skill-level">Middle</div>
                      <ProgressSteps className="progress-steps--compact" done={skill.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="portfolio-skills__header">
              <h3 className="portfolio-section-title">Personal Development Plan</h3>
            </div>
            <div className="skills-card-row skills-card-row--single">
              <div className="skills-card">
                <div className="goals-item-head">
                  <span className="goals-label">Цель</span>
                  <span className="goals-label">Timeline</span>
                  <span className="goals-label">Прогресс</span>
                  <span className="goals-label">Описание</span>
                  <span className="goals-label">Статус</span>
                  <span aria-hidden="true" />
                </div>
                {goals.map((goal) => (
                  <div className="goals-item-frame" key={goal.title}>
                    <div className="goals-item">
                      <div className="goals-cell">
                        <span className="goals-label">Цель</span>
                        <span className="goals-value goals-value--title" title={goal.title}>
                          {goal.title}
                        </span>
                      </div>
                      <div className="goals-cell">
                        <span className="goals-label">Timeline</span>
                        <span className="goals-value">{goal.timeline}</span>
                      </div>
                      <div className="goals-cell">
                        <span className="goals-label">Прогресс</span>
                        <span className="goals-value">{goal.progress}</span>
                      </div>
                      <div className="goals-cell goals-cell--desc">
                        <span className="goals-label">Описание</span>
                        <span className="goals-value" title={goal.description}>
                          {goal.description}
                        </span>
                      </div>
                      <div className="goals-cell">
                        <span className="goals-label">Статус</span>
                        <span className="goals-value">
                          <span className="goals-grid__status">{goal.status}</span>
                        </span>
                      </div>
                      <span aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="portfolio-reviews-bar">
              <div className="portfolio-reviews">
                <span className="portfolio-section-title">Отзывы</span>
                <span className="portfolio-reviews__count">1</span>
              </div>

              <div className="portfolio-filters">
                <div
                  className={`active-filter ${ratingOpen ? 'is-open' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setRatingOpen((prev) => !prev)
                    setReviewsTypeOpen(false)
                    setReviewsDateOpen(false)
                  }}
                >
                  <span className="active-filter__text">Рейтинг</span>
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
                    className={`deadline-menu ${ratingOpen ? 'is-open' : ''}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {[
                      { value: 'high', label: 'Сначала высокий' },
                      { value: 'low', label: 'Сначала низкий' },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        className="deadline-item"
                        onPointerDown={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          setRatingValue(item.value as 'high' | 'low')
                          setRatingOpen(false)
                        }}
                      >
                        <span className="deadline-item__text">{item.label}</span>
                        {ratingValue === item.value && (
                          <span className="deadline-item__check" aria-hidden="true">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="11" fill="#5260FF" />
                              <path
                                d="M8 12L11 15L17 9"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`active-filter ${reviewsTypeOpen ? 'is-open' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setReviewsTypeOpen((prev) => !prev)
                    setRatingOpen(false)
                    setReviewsDateOpen(false)
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
                    className={`deadline-menu ${reviewsTypeOpen ? 'is-open' : ''}`}
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
                          setReviewsTypeValue(type)
                          setReviewsTypeOpen(false)
                        }}
                      >
                        <span className="deadline-item__text">{type}</span>
                        {reviewsTypeValue === type && (
                          <span className="deadline-item__check" aria-hidden="true">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="11" fill="#5260FF" />
                              <path
                                d="M8 12L11 15L17 9"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`active-filter ${reviewsDateOpen ? 'is-open' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setReviewsDateOpen((prev) => !prev)
                    setRatingOpen(false)
                    setReviewsTypeOpen(false)
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
                    className={`deadline-menu ${reviewsDateOpen ? 'is-open' : ''}`}
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
                          setReviewsDateValue(item.value as 'new' | 'old')
                          setReviewsDateOpen(false)
                        }}
                      >
                        <span className="deadline-item__text">{item.label}</span>
                        {reviewsDateValue === item.value && (
                          <span className="deadline-item__check" aria-hidden="true">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="11" fill="#5260FF" />
                              <path
                                d="M8 12L11 15L17 9"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {reviews.map((review) => (
              <div className="portfolio-review-card" key={review.project}>
                <div className="review-card__head">
                  <span>{review.project}</span>
                  <span className="review-count">{review.rating}</span>
                </div>

                <div className="review-card__body">
                  <div className="review-frame">
                    <div className="lead-card lead-card--plain">
                      <div className="lead-avatar" aria-hidden="true" />
                      <div className="lead-text">
                        <span className="lead-role">{review.role}</span>
                        <span className="lead-name">{review.reviewer}</span>
                      </div>
                      <RatingDots className="lead-dots" />
                    </div>

                    <p className="review-text">{review.text}</p>
                  </div>
                </div>

                <div className="review-card__footer">
                  <div className="project-role">{review.projectRole}</div>
                  <div className="review-pill review-pill--date">{review.date}</div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
