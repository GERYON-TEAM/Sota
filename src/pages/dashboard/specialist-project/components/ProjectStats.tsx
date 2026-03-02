import type { ProjectStat } from '../types/project.types'

type ProjectStatsProps = {
  matchPercent: number
  matchClass: string
  onOpenDescription: () => void
}

export default function ProjectStats({
  matchPercent,
  matchClass,
  onOpenDescription,
}: ProjectStatsProps) {
  const stats: ProjectStat[] = [
    { label: 'Категория', value: 'Бэкенд' },
    { label: 'Уровень', value: 'Middle' },
    { label: 'Бюджет', value: 'Не публично' },
    { label: 'Сроки', value: '01.01.2025 - 01.01.2026' },
  ]

  return (
    <section className="project-stats">
      <div className="project-stats__grid">
        <article className={`project-stat project-stat--match ${matchClass}`}>
          <span className="project-stat__label">Совпадение</span>
          <span className="project-stat__value">{matchPercent}%</span>
        </article>

        {stats.map((stat) => (
          <article className="project-stat" key={stat.label}>
            <span className="project-stat__label">{stat.label}</span>
            <span className="project-stat__value">{stat.value}</span>
          </article>
        ))}

        <article className="project-stat project-stat--stack">
          <span className="project-stat__label">Стек технологий</span>
          <div className="project-stat__tags">
            {['Node.js', 'PostgreSQL', 'Kubernetes', 'TypeScript'].map((tag) => (
              <span className="project-stat__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>

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
