import type { PortfolioMetaItem, PortfolioStatItem } from '../types/portfolio-project.types'
import PortfolioProjectSummary from './PortfolioProjectSummary'
import PortfolioProjectStats from './PortfolioProjectStats'

type PortfolioProjectHeroProps = {
  title: string
  statusLabel: string
  role: string
  meta: PortfolioMetaItem[]
  tags: string[]
  stats: PortfolioStatItem[]
  onShare: () => void
}

export default function PortfolioProjectHero({
  title,
  statusLabel,
  role,
  meta,
  tags,
  stats,
  onShare,
}: PortfolioProjectHeroProps) {
  return (
    <section className="portfolio-project__hero">
      <PortfolioProjectSummary
        title={title}
        statusLabel={statusLabel}
        role={role}
        meta={meta}
        tags={tags}
        onShare={onShare}
      />
      <PortfolioProjectStats stats={stats} />
    </section>
  )
}
