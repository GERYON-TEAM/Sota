import ProgressSteps from '../../../shared/ui/progress-steps/ProgressSteps'
import EmptyState from '../ui/EmptyState'
import type { Skill } from '../types/portfolio.types'

type SkillsSectionProps = {
  hasAnySkills: boolean
  hardSkillsSlice: Skill[]
  softSkillsSlice: Skill[]
  hardSkillsPage: number
  hardSkillsTotalPages: number
  softSkillsPage: number
  softSkillsTotalPages: number
  skillsPerPage: number
  dotMenuId: string | null
  onOpenAddSkill: () => void
  onHardPrev: () => void
  onHardNext: () => void
  onSoftPrev: () => void
  onSoftNext: () => void
  onToggleDotMenu: (menuId: string) => void
  onEditSkill: (type: 'hard' | 'soft', index: number) => void
  onDeleteSkill: (type: 'hard' | 'soft', index: number) => void
}

export default function SkillsSection({
  hasAnySkills,
  hardSkillsSlice,
  softSkillsSlice,
  hardSkillsPage,
  hardSkillsTotalPages,
  softSkillsPage,
  softSkillsTotalPages,
  skillsPerPage,
  dotMenuId,
  onOpenAddSkill,
  onHardPrev,
  onHardNext,
  onSoftPrev,
  onSoftNext,
  onToggleDotMenu,
  onEditSkill,
  onDeleteSkill,
}: SkillsSectionProps) {
  return (
    <>
      <div className="portfolio-skills__header">
        <h3 className="portfolio-section-title">Навыки</h3>
        <button className="skills-add" type="button" onClick={onOpenAddSkill}>
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
          Добавить навык
        </button>
      </div>

      {hasAnySkills ? (
        <div className="skills-card-row">
          <div className="skills-card">
            <div className="skills-card__head">
              <span>Hard Skills</span>
              <div className="skills-arrows">
                <button
                  className="active-arrow active-arrow--left"
                  type="button"
                  aria-label="Назад"
                  disabled={hardSkillsPage === 0}
                  onClick={onHardPrev}
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
                  disabled={hardSkillsPage >= hardSkillsTotalPages - 1}
                  onClick={onHardNext}
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

            {hardSkillsSlice.map((skill, index) => {
              const menuId = `hard-${hardSkillsPage}-${index}`
              const globalIndex = hardSkillsPage * skillsPerPage + index
              return (
                <div className="skill-row" key={`${skill.name}-${index}`}>
                  <span className="skill-name">{skill.name}</span>

                  <div className="skill-meta">
                    <div className="skill-projects">
                      <span>Проекты с навыком:</span>
                      <span className="skill-projects__count">10</span>
                    </div>

                    <div className="skill-level">Middle</div>

                    <ProgressSteps className="progress-steps--compact" done={skill.progress} />
                    <span className="skill-spacer" aria-hidden="true" />
                    <span className="dot-menu-wrap">
                      <button
                        className="dot-menu-trigger"
                        type="button"
                        aria-label="Действия"
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
                            onClick={() => onEditSkill('hard', globalIndex)}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            className="dot-menu__item dot-menu__item--danger"
                            onClick={() => onDeleteSkill('hard', globalIndex)}
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
          </div>

          <div className="skills-card skills-card--right">
            <div className="skills-card__head">
              <span>Soft Skills</span>
              <div className="skills-arrows">
                <button
                  className="active-arrow active-arrow--left"
                  type="button"
                  aria-label="Назад"
                  disabled={softSkillsPage === 0}
                  onClick={onSoftPrev}
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
                  disabled={softSkillsPage >= softSkillsTotalPages - 1}
                  onClick={onSoftNext}
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

            {softSkillsSlice.map((skill, index) => {
              const menuId = `soft-${softSkillsPage}-${index}`
              const globalIndex = softSkillsPage * skillsPerPage + index
              return (
                <div className="skill-row" key={`${skill.name}-${index}`}>
                  <span className="skill-name">{skill.name}</span>

                  <div className="skill-meta">
                    <div className="skill-projects">
                      <span>Проекты с навыком:</span>
                      <span className="skill-projects__count">10</span>
                    </div>

                    <div className="skill-level">Middle</div>

                    <ProgressSteps className="progress-steps--compact" done={skill.progress} />
                    <span className="skill-spacer" aria-hidden="true" />
                    <span className="dot-menu-wrap">
                      <button
                        className="dot-menu-trigger"
                        type="button"
                        aria-label="Действия"
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
                            onClick={() => onEditSkill('soft', globalIndex)}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            className="dot-menu__item dot-menu__item--danger"
                            onClick={() => onDeleteSkill('soft', globalIndex)}
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
          </div>
        </div>
      ) : (
        <EmptyState fill="#F8F9FD" />
      )}
    </>
  )
}
