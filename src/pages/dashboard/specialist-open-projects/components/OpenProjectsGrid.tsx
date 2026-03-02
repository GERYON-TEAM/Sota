import type { OpenProject } from '../types/open-projects.types'
import OpenProjectCard from './OpenProjectCard'
import OpenProjectsEmptyState from './OpenProjectsEmptyState'

type OpenProjectsGridProps = {
  projects: OpenProject[]
  getMatchClass: (value: number) => string
}

export default function OpenProjectsGrid({ projects, getMatchClass }: OpenProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <section className="open-projects-grid">
        <OpenProjectsEmptyState />
      </section>
    )
  }

  return (
    <section className="open-projects-grid">
      {projects.map((project) => (
        <OpenProjectCard
          key={project.id}
          project={project}
          matchClass={getMatchClass(project.matchPercent)}
          onOpen={() => {
            window.location.href = '/dashboard/specialist/open-projects/project'
          }}
        />
      ))}
    </section>
  )
}
