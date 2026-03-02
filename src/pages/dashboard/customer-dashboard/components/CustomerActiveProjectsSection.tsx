import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectsEmptyState from './ProjectsEmptyState'
import type { ActiveProject } from '../types/dashboard.types'

type ActiveProjectsSectionProps = {
  projects: ActiveProject[]
}

type CheckIconProps = {
  id: string
}

function CheckIcon({ id }: CheckIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id={id}
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="22"
        height="22"
      >
        <path
          d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 12L11 15L17 9"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask={`url(#${id})`}>
        <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
      </g>
    </svg>
  )
}

export default function CustomerActiveProjectsSection({ projects }: ActiveProjectsSectionProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [modalStatusOpen, setModalStatusOpen] = useState(false)
  const [modalSpecOpen, setModalSpecOpen] = useState(false)
  const [modalBudgetOpen, setModalBudgetOpen] = useState(false)
  const [modalDateOpen, setModalDateOpen] = useState(false)
  const [statusValue, setStatusValue] = useState('Все статусы')
  const [specValue, setSpecValue] = useState('Все специализации')
  const [budgetValue, setBudgetValue] = useState('Любой бюджет')
  const [dateValue, setDateValue] = useState('По дате')
  const [searchValue, setSearchValue] = useState('')

  const statusOptions = ['Все статусы', 'В процессе', 'Опубликовано', 'Завершено', 'Черновик']
  const specOptions = ['Все специализации', 'Backend', 'Frontend', 'Design', 'QA', 'Product']
  const budgetOptions = [
    'Любой бюджет',
    'до 500 000 ₽',
    '500 000 ₽ – 1 000 000 ₽',
    '1 000 000 ₽ – 2 000 000 ₽',
    'от 2 000 000 ₽',
  ]
  const dateOptions = ['По дате', 'Сначала новые', 'Сначала старые']

  const parseDate = (value: string) => {
    const [day, month, year] = value.split('.').map(Number)
    if (!day || !month || !year) return 0
    return new Date(year, month - 1, day).getTime()
  }

  const closeModalLists = () => {
    setModalStatusOpen(false)
    setModalSpecOpen(false)
    setModalBudgetOpen(false)
    setModalDateOpen(false)
  }

  const closeFilter = () => {
    setFilterOpen(false)
    closeModalLists()
  }

  const visibleProjects = useMemo(() => {
    const term = searchValue.trim().toLowerCase()
    let list = projects
    if (statusValue !== 'Все статусы') {
      list = list.filter((project) => project.role === statusValue)
    }
    if (term) {
      list = list.filter((project) => {
        const title = project.title.toLowerCase()
        const desc = project.taskDesc.toLowerCase()
        return title.includes(term) || desc.includes(term)
      })
    }
    if (dateValue === 'Сначала новые') {
      list = [...list].sort((a, b) => parseDate(b.taskDate) - parseDate(a.taskDate))
    }
    if (dateValue === 'Сначала старые') {
      list = [...list].sort((a, b) => parseDate(a.taskDate) - parseDate(b.taskDate))
    }
    return list
  }, [projects, searchValue, statusValue, dateValue])

  return (
    <>
      <section className="active-projects">
        <div className="active-projects__left">
          <h2>Все проекты</h2>
          <span className="active-badge">{projects.length}</span>
        </div>

        <div className="active-projects__right">
          <div className="active-filters">
            <button className="customer-filter-button" type="button" onClick={() => setFilterOpen(true)}>
              <span className="customer-filter-button__icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3429 0.75H1.75086C1.55861 0.749836 1.3704 0.805088 1.20875 0.909141C1.0471 1.01319 0.918864 1.16164 0.839408 1.33669C0.759953 1.51175 0.73264 1.706 0.760742 1.89618C0.788844 2.08636 0.871169 2.26441 0.997858 2.409L6.29986 8.467C6.45932 8.64948 6.5471 8.88366 6.54686 9.126V14C6.54686 14.0776 6.56493 14.1542 6.59964 14.2236C6.63436 14.293 6.68476 14.3534 6.74686 14.4L9.74686 16.65C9.82114 16.7057 9.90947 16.7396 10.002 16.748C10.0944 16.7563 10.1874 16.7387 10.2705 16.6972C10.3535 16.6557 10.4234 16.5919 10.4722 16.5129C10.521 16.4339 10.5469 16.3429 10.5469 16.25V9.126C10.5466 8.88366 10.6344 8.64948 10.7939 8.467L16.0959 2.408C16.6619 1.762 16.2019 0.75 15.3429 0.75Z"
                    stroke="#696E82"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Фильтр
            </button>

            <div className="active-search">
              <span className="active-search__icon" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.25 13.5C10.7018 13.5 13.5 10.7018 13.5 7.25C13.5 3.79822 10.7018 1 7.25 1C3.79822 1 1 3.79822 1 7.25C1 10.7018 3.79822 13.5 7.25 13.5Z"
                    stroke="#696E82"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 15L12.1 12.1"
                    stroke="#696E82"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                className="active-search__input"
                placeholder="Поиск"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="active-projects-list">
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} />
          ))
        ) : (
          <ProjectsEmptyState />
        )}
      </section>

      {filterOpen && (
        <div className="customer-filter-overlay" role="presentation" onClick={closeFilter}>
          <div className="customer-filter-modal" role="dialog" onClick={(event) => event.stopPropagation()}>
            <div className="customer-filter-modal__head">
              <h3>Фильтр</h3>
              <button
                className="customer-filter-modal__close"
                type="button"
                aria-label="Закрыть"
                onClick={closeFilter}
              >
                ×
              </button>
            </div>

            <div className="customer-filter-select">
              <button
                className={`customer-filter-select__btn${modalStatusOpen ? ' is-open' : ''}`}
                type="button"
                onClick={() => {
                  setModalStatusOpen((prev) => !prev)
                  setModalSpecOpen(false)
                  setModalBudgetOpen(false)
                  setModalDateOpen(false)
                }}
              >
                <span>Все статусы</span>
                <span className="customer-filter-select__chevron" aria-hidden="true">
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
              </button>
              {modalStatusOpen && (
                <div className="customer-filter-select__menu">
                  {statusOptions.map((item) => (
                    <button
                      key={item}
                      className="customer-filter-item"
                      type="button"
                      onClick={() => setStatusValue(item)}
                    >
                      <span>{item}</span>
                      {statusValue === item && (
                        <span className="customer-filter-check" aria-hidden="true">
                          <CheckIcon id={`mask_modal_status_${item.replace(/\s+/g, '_')}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="customer-filter-select">
              <button
                className={`customer-filter-select__btn${modalSpecOpen ? ' is-open' : ''}`}
                type="button"
                onClick={() => {
                  setModalSpecOpen((prev) => !prev)
                  setModalStatusOpen(false)
                  setModalBudgetOpen(false)
                  setModalDateOpen(false)
                }}
              >
                <span>Все специализации</span>
                <span className="customer-filter-select__chevron" aria-hidden="true">
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
              </button>
              {modalSpecOpen && (
                <div className="customer-filter-select__menu">
                  {specOptions.map((item) => (
                    <button
                      key={item}
                      className="customer-filter-item"
                      type="button"
                      onClick={() => setSpecValue(item)}
                    >
                      <span>{item}</span>
                      {specValue === item && (
                        <span className="customer-filter-check" aria-hidden="true">
                          <CheckIcon id={`mask_modal_spec_${item.replace(/\s+/g, '_')}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="customer-filter-select">
              <button
                className={`customer-filter-select__btn${modalBudgetOpen ? ' is-open' : ''}`}
                type="button"
                onClick={() => {
                  setModalBudgetOpen((prev) => !prev)
                  setModalStatusOpen(false)
                  setModalSpecOpen(false)
                  setModalDateOpen(false)
                }}
              >
                <span>Любой бюджет</span>
                <span className="customer-filter-select__chevron" aria-hidden="true">
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
              </button>
              {modalBudgetOpen && (
                <div className="customer-filter-select__menu">
                  {budgetOptions.map((item) => (
                    <button
                      key={item}
                      className="customer-filter-item"
                      type="button"
                      onClick={() => setBudgetValue(item)}
                    >
                      <span>{item}</span>
                      {budgetValue === item && (
                        <span className="customer-filter-check" aria-hidden="true">
                          <CheckIcon id={`mask_modal_budget_${item.replace(/\s+/g, '_')}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="customer-filter-select">
              <button
                className={`customer-filter-select__btn${modalDateOpen ? ' is-open' : ''}`}
                type="button"
                onClick={() => {
                  setModalDateOpen((prev) => !prev)
                  setModalStatusOpen(false)
                  setModalSpecOpen(false)
                  setModalBudgetOpen(false)
                }}
              >
                <span>По дате</span>
                <span className="customer-filter-select__chevron" aria-hidden="true">
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
              </button>
              {modalDateOpen && (
                <div className="customer-filter-select__menu">
                  {dateOptions.map((item) => (
                    <button
                      key={item}
                      className="customer-filter-item"
                      type="button"
                      onClick={() => setDateValue(item)}
                    >
                      <span>{item}</span>
                      {dateValue === item && (
                        <span className="customer-filter-check" aria-hidden="true">
                          <CheckIcon id={`mask_modal_date_${item.replace(/\s+/g, '_')}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="customer-filter-apply" type="button" onClick={closeFilter}>
              Применить
            </button>
          </div>
        </div>
      )}
    </>
  )
}
