import ProjectAsideCard from '../cards/ProjectAsideCard'
import type { PortfolioTeamMember } from '../../types/portfolio-project.types'

type TeamSectionProps = {
  members: PortfolioTeamMember[]
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <ProjectAsideCard title="Команда проекта">
      <div className="portfolio-project__team">
        {members.map((member) => (
          <div className="portfolio-project__team-item" key={member.name}>
            <div className="portfolio-project__team-avatar" aria-hidden="true" />
            <span>{member.name}</span>
          </div>
        ))}
      </div>
    </ProjectAsideCard>
  )
}
