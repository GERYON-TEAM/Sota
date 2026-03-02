import { useEffect, useMemo, useState } from 'react'
import DeadlineDropdown from './DeadlineDropdown'
import ProjectCard from './ProjectCard'
import ProjectsEmptyState from './ProjectsEmptyState'
import type { ActiveProject, SortOrder } from '../types/dashboard.types'

type ActiveProjectsSectionProps = {
  projects: ActiveProject[]
  deadlineOpen: boolean
  deadlineSort: SortOrder
  onDeadlineToggle: () => void
  onDeadlineSelect: (value: SortOrder) => void
}

export default function ActiveProjectsSection({
  projects,
  deadlineOpen,
  deadlineSort,
  onDeadlineToggle,
  onDeadlineSelect,
}: ActiveProjectsSectionProps) {
  const perPage = 4
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(projects.length / perPage))

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(totalPages - 1)
    }
  }, [page, totalPages])

  const visibleProjects = useMemo(() => {
    const start = page * perPage
    return projects.slice(start, start + perPage)
  }, [page, projects])

  return (
    <>
      <section className="active-projects">
        <div className="active-projects__left">
          <h2>Активные проекты</h2>
          <span className="active-badge">{projects.length}</span>
        </div>

        <div className="active-projects__right">
          <DeadlineDropdown
            isOpen={deadlineOpen}
            value={deadlineSort}
            onToggle={onDeadlineToggle}
            onSelect={onDeadlineSelect}
          />

          <button
            className="active-arrow active-arrow--left"
            type="button"
            aria-label="Назад"
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
            disabled={page === 0}
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
            onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={page >= totalPages - 1}
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
      </section>

      <section className="active-projects-list">
        {projects.length > 0 ? (
          visibleProjects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} />
          ))
        ) : (
          <ProjectsEmptyState />
        )}
      </section>
    </>
  )
}
