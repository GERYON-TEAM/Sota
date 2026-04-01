import { useState } from 'react'
import RatingDots from '../../../../shared/ui/color-dots/RatingDots'
import ActivityCard from './ActivityCard'
import LevelCard from './LevelCard'
import StatCard from './StatCard'
import { useAuth } from '../../../../shared/auth/useAuth'
import type { DashboardStats } from '../api/specialistDashboard.mapper'

type Props = {
  stats?: DashboardStats | null
}

export default function StatsSection({ stats }: Props) {
  const { user } = useAuth()
  const [periodOpen, setPeriodOpen] = useState(false)
  const [periodValue, setPeriodValue] = useState('за все время')
  const periods = ['за все время', 'за месяц', 'за неделю']

  const name = user?.firstName ?? ''
  const rawLevel = stats?.profile.level ?? 'junior'
  const level = rawLevel.charAt(0).toUpperCase() + rawLevel.slice(1)
  const levelProgress = stats?.profile.levelProgressPercent ?? 0
  const rating = stats?.profile.rating ?? 0
  const totalReviews = stats?.profile.totalReviews ?? 0
  const completedProjects = stats?.profile.totalCompletedProjects ?? 0

  return (
    <section className="stats-card">
      <div className="stats-top">
        <div className="stats-user">
          <div className="stats-avatar" aria-hidden="true" />
          <div className="stats-user-text">
            <span className="stats-greeting">Привет,</span>
            <span className="stats-name">{name}</span>
          </div>
        </div>
        <button
          className="stats-action"
          type="button"
          onClick={() => {
            window.location.href = '/dashboard/specialist/open-projects'
          }}
        >
          Посмотреть открытые проекты
        </button>
      </div>

      <div className="stats-grid">
        <LevelCard status={level} progressText={`${levelProgress}% до нового уровня.`} steps={10} activeIndex={Math.round(levelProgress / 10)} />

        <StatCard
          title="Рейтинг"
          headRight={<RatingDots />}
          value={rating.toFixed(1).replace('.', ',')}
          meta={
            <>
              отзывы: <span className="stat-accent">{totalReviews}</span>
            </>
          }
        />

        <StatCard
          title="Завершенные проекты"
          value={String(completedProjects)}
          metaRow
          meta={
            <>
              <div className="stat-filter">
                <button
                  className={`stat-filter__btn${periodOpen ? ' is-open' : ''}`}
                  type="button"
                  onClick={() => setPeriodOpen((prev) => !prev)}
                >
                  <span>{periodValue}</span>
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
                </button>
                {periodOpen && (
                  <div className="stat-filter__menu">
                    {periods.map((item) => (
                      <button
                        key={item}
                        className="stat-filter__item"
                        type="button"
                        onClick={() => {
                          setPeriodValue(item)
                          setPeriodOpen(false)
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          }
        />

        <StatCard title="Общий опыт" value="—" meta="" />

        <ActivityCard />
      </div>
    </section>
  )
}
