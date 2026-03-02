import type { PortfolioStatItem } from '../types/portfolio-project.types'

type PortfolioProjectStatsProps = {
  stats: PortfolioStatItem[]
}

export default function PortfolioProjectStats({ stats }: PortfolioProjectStatsProps) {
  return (
    <div className="portfolio-project__stats">
      {stats.map((stat) => (
        <div className="portfolio-project__stat" key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </div>
      ))}
    </div>
  )
}
