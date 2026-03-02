import EmptyState from '../ui/EmptyState'
import type { Goal } from '../types/portfolio.types'

type GoalsSectionProps = {
  goals: Goal[]
  goalsSlice: Goal[]
  goalsPage: number
  goalsPerPage: number
  goalsTotalPages: number
  dotMenuId: string | null
  onOpenAddGoal: () => void
  onToggleDotMenu: (menuId: string) => void
  onEditGoal: (index: number) => void
  onDeleteGoal: (index: number) => void
  onPrevPage: () => void
  onNextPage: () => void
  shortenGoalDescription: (value: string) => string
}

export default function GoalsSection({
  goals,
  goalsSlice,
  goalsPage,
  goalsPerPage,
  goalsTotalPages,
  dotMenuId,
  onOpenAddGoal,
  onToggleDotMenu,
  onEditGoal,
  onDeleteGoal,
  onPrevPage,
  onNextPage,
  shortenGoalDescription,
}: GoalsSectionProps) {
  return (
    <>
      <div className="portfolio-skills__header">
        <h3 className="portfolio-section-title">Personal Development Plan</h3>
        <button className="skills-add" type="button" onClick={onOpenAddGoal}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 6V18M18 12H6"
              stroke="#696E82"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Добавить цель
        </button>
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

          {goals.length > 0 ? (
            <>
              {goalsSlice.map((goal, index) => {
                const menuId = `goal-${goalsPage}-${index}`
                const globalIndex = goalsPage * goalsPerPage + index
                return (
                  <div className="goals-item-frame" key={`${goal.title}-${goal.timeline}`}>
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
                          {shortenGoalDescription(goal.description)}
                        </span>
                      </div>

                      <div className="goals-cell">
                        <span className="goals-label">Статус</span>
                        <span className="goals-value">
                          <span
                            className={`goals-grid__status goals-grid__status--${goal.status
                              .toLowerCase()
                              .replace(/\\s+/g, '-')}`}
                          >
                            {goal.status}
                          </span>
                        </span>
                      </div>

                      <span className="dot-menu-wrap goals-grid__menu">
                        <button
                          className="dot-menu-trigger"
                          type="button"
                          aria-label="Меню"
                          onClick={(event) => {
                            event.stopPropagation()
                            onToggleDotMenu(menuId)
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M19.835 11C19.526 11 19.2297 11.1227 19.0112 11.3412C18.7927 11.5597 18.67 11.856 18.67 12.165C18.67 12.474 18.7927 12.7703 19.0112 12.9888C19.2297 13.2073 19.526 13.33 19.835 13.33C20.144 13.33 20.4403 13.2073 20.6588 12.9888C20.8773 12.7703 21 12.474 21 12.165C21 11.856 20.8773 11.5597 20.6588 11.3412C20.4403 11.1227 20.144 11 19.835 11ZM19.835 19.155C19.526 19.155 19.2297 19.2777 19.0112 19.4962C18.7927 19.7147 18.67 20.011 18.67 20.32C18.67 20.629 18.7927 20.9253 19.0112 21.1438C19.2297 21.3623 19.526 21.485 19.835 21.485C20.144 21.485 20.4403 21.3623 20.6588 21.1438C20.8773 20.9253 21 20.629 21 20.32C21 20.011 20.8773 19.7147 20.6588 19.4962C20.4403 19.2777 20.144 19.155 19.835 19.155ZM19.835 27.31C19.526 27.31 19.2297 27.4327 19.0112 27.6512C18.7927 27.8697 18.67 28.166 18.67 28.475C18.67 28.784 18.7927 29.0803 19.0112 29.2988C19.2297 29.5173 19.526 29.64 19.835 29.64C20.144 29.64 20.4403 29.5173 20.6588 29.2988C20.8773 29.0803 21 28.784 21 28.475C21 28.166 20.8773 27.8697 20.6588 27.6512C20.4403 27.4327 20.144 27.31 19.835 27.31Z"
                              fill="#696E82"
                              stroke="#696E82"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {dotMenuId === menuId && (
                          <div className="dot-menu" onClick={(event) => event.stopPropagation()}>
                            <button
                              type="button"
                              className="dot-menu__item"
                              onClick={() => onEditGoal(globalIndex)}
                            >
                              Редактировать
                            </button>
                            <button
                              type="button"
                              className="dot-menu__item dot-menu__item--danger"
                              onClick={() => onDeleteGoal(globalIndex)}
                            >
                              Удалить
                            </button>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                )
              })}
              {goals.length > goalsPerPage && (
                <div className="goals-arrows">
                  <div className="skills-arrows">
                    <button
                      className="active-arrow active-arrow--left"
                      type="button"
                      aria-label="Назад"
                      onClick={onPrevPage}
                      disabled={goalsPage === 0}
                    >
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.33 0.99991L1 6.32991L6.33 11.6599"
                          stroke="#696E82"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      className="active-arrow active-arrow--right"
                      type="button"
                      aria-label="Вперёд"
                      onClick={onNextPage}
                      disabled={goalsPage >= goalsTotalPages - 1}
                    >
                      <svg
                        width="8"
                        height="13"
                        viewBox="0 0 8 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.998125 0.99991L6.32812 6.32991L0.998125 11.6599"
                          stroke="#0B1215"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </>
  )
}
