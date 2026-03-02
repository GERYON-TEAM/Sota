import ProjectAsideCard from '../cards/ProjectAsideCard'
import type { PortfolioArtifact } from '../../types/portfolio-project.types'

type ArtifactsSectionProps = {
  artifacts: PortfolioArtifact[]
}

export default function ArtifactsSection({ artifacts }: ArtifactsSectionProps) {
  return (
    <ProjectAsideCard title="Артефакты">
      <div className="portfolio-project__artifacts">
        {artifacts.map((artifact) => (
          <div className="portfolio-project__artifact" key={artifact.label}>
            <span>{artifact.label}</span>
            <span className={`portfolio-project__badge is-${artifact.status}`}>{artifact.statusLabel}</span>
          </div>
        ))}
      </div>
    </ProjectAsideCard>
  )
}
