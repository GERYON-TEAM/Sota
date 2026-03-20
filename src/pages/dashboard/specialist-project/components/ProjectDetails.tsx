import type { ProjectActionState } from '../types/project.types'
import ProjectRequirements from './ProjectRequirements'
import ProjectCustomer from './ProjectCustomer'

type ProjectDetailsProps = {
  actionState: ProjectActionState
}

export default function ProjectDetails({ actionState }: ProjectDetailsProps) {
  return (
    <section className="project-details">
      <ProjectRequirements />
      <ProjectCustomer actionState={actionState} />
    </section>
  )
}
