import { useState } from 'react'
import RatingDots from '../../../../shared/ui/color-dots/RatingDots'
import ActivityCard from './ActivityCard'
import LevelCard from './LevelCard'
import StatCard from './StatCard'

export default function StatsSection() {
  const [periodOpen, setPeriodOpen] = useState(false)
  const [periodValue, setPeriodValue] = useState('за все время')
  const periods = ['за все время', 'за месяц', 'за неделю']

  return (
    <section className="stats-card">
      <div className="stats-top">
        <div className="stats-user">
          <div className="stats-avatar" aria-hidden="true" />
          <div className="stats-user-text">
            <span className="stats-greeting">Привет,</span>
            <span className="stats-name">Алина</span>
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
        <LevelCard status="Middle" progressText="10% до нового уровня." steps={10} activeIndex={9} />

        <StatCard
          title="Рейтинг"
          headRight={<RatingDots />}
          value="4,8"
          meta={
            <>
              отзывы: <span className="stat-accent">24</span>
            </>
          }
        />

        <StatCard
          title="Завершенные проекты"
          value="20"
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

        <StatCard title="Общий опыт" value="2" meta="года" />

        <ActivityCard />
      </div>
    </section>
  )
}
