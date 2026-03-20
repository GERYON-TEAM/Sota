import type { ProjectStat } from '../types/project.types'

type ProjectStatsProps = {
  matchPercent: number
  matchClass: string
  onOpenDescription: () => void
}

export default function CustomerProjectStats({
  matchPercent,
  matchClass,
  onOpenDescription,
}: ProjectStatsProps) {
  const stats: ProjectStat[] = [
    { label: 'Тип проекта', value: 'Веб-приложение' },
    { label: 'Загруженные файлы', value: '5' },
  ]

  return (
    <section className="project-stats">
      <div className="project-stats__grid">
        <article className={`project-stat project-stat--match ${matchClass}`}>
          <span className="project-stat__label">Создание проекта </span>
          <span className="project-stat__value">01.01.2025</span>
        </article>

        {stats.map((stat) => (
          <article className="project-stat" key={stat.label}>
            {stat.label === 'Загруженные файлы' ? (
              <div className="project-stat__label-row">
                <span className="project-stat__label">{stat.label}</span>
                <button className="project-stat__arrow" type="button" aria-label="Открыть">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_48_551)">
                      <path
                        d="M18.5322 6.64551C18.5322 6.38035 18.4268 6.12605 18.2393 5.93856C18.0518 5.75106 17.7975 5.6457 17.5324 5.64566L9.53217 5.64566C9.39941 5.64335 9.26752 5.66751 9.14419 5.71672C9.02086 5.76593 8.90857 5.83921 8.81386 5.93229C8.71916 6.02536 8.64394 6.13636 8.59259 6.25882C8.54124 6.38127 8.5148 6.51273 8.5148 6.64551C8.5148 6.7783 8.54124 6.90975 8.59259 7.0322C8.64394 7.15466 8.71916 7.26566 8.81386 7.35874C8.90857 7.45181 9.02086 7.52509 9.14419 7.5743C9.26752 7.62351 9.39941 7.64767 9.53217 7.64536L15.1183 7.64536L5.7541 17.0096C5.56657 17.1971 5.46121 17.4515 5.46121 17.7167C5.46121 17.9819 5.56657 18.2363 5.7541 18.4238C5.94164 18.6113 6.19599 18.7167 6.46121 18.7167C6.72643 18.7167 6.98078 18.6113 7.16832 18.4238L16.5325 9.05957L16.5325 14.6457C16.5371 14.9079 16.6444 15.1578 16.8314 15.3416C17.0185 15.5254 17.2702 15.6283 17.5324 15.6283C17.7946 15.6283 18.0463 15.5254 18.2333 15.3416C18.4203 15.1578 18.5277 14.9079 18.5322 14.6457L18.5322 6.64551Z"
                        fill="#696E82"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_48_551">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            ) : (
              <span className="project-stat__label">{stat.label}</span>
            )}
            <span className="project-stat__value">{stat.value}</span>
          </article>
        ))}

        <article className="project-stat project-stat--description">
          <div className="project-stat__head">
            <span className="project-stat__label">Описание проекта</span>
            <button className="project-stat__more" type="button" onClick={onOpenDescription}>
              подробнее
            </button>
          </div>
          <div className="project-stat__description-row">
            <span className="project-stat__value project-stat__value--clamp">
              Ищем разработчика для усиления команды: рефакторинг API, оптимизация запросов,
              участие в проектировании архитектуры и настройка CI/CD. Ожидается опыт работы
              с высоконагруженными сервисами и микросервисной архитектурой.
            </span>
          </div>
        </article>
      </div>
    </section>
  )
}
