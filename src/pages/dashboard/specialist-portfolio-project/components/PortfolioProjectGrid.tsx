import DescriptionSection from './sections/DescriptionSection'
import ResultsSection from './sections/ResultsSection'
import ReviewSection from './sections/ReviewSection'
import TeamSection from './sections/TeamSection'
import ArtifactsSection from './sections/ArtifactsSection'
import DatesSection from './sections/DatesSection'
import type {
  PortfolioArtifact,
  PortfolioDateItem,
  PortfolioTeamMember,
} from '../types/portfolio-project.types'

type PortfolioProjectGridProps = {
  description: string
  results: string[]
  reviewText: string
  reviewerRole: string
  reviewerName: string
  team: PortfolioTeamMember[]
  artifacts: PortfolioArtifact[]
  dates: PortfolioDateItem[]
}

export default function PortfolioProjectGrid({
  description,
  results,
  reviewText,
  reviewerRole,
  reviewerName,
  team,
  artifacts,
  dates,
}: PortfolioProjectGridProps) {
  return (
    <section className="portfolio-project__grid">
      <div className="portfolio-project__column">
        <DescriptionSection text={description} />
        <ResultsSection results={results} />
        <ReviewSection text={reviewText} reviewerRole={reviewerRole} reviewerName={reviewerName} />
      </div>

      <aside className="portfolio-project__aside">
        <TeamSection members={team} />
        <ArtifactsSection artifacts={artifacts} />
        <DatesSection dates={dates} />
      </aside>
    </section>
  )
}
