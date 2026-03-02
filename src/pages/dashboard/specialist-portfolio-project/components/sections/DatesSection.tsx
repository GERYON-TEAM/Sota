import ProjectAsideCard from '../cards/ProjectAsideCard'
import type { PortfolioDateItem } from '../../types/portfolio-project.types'

type DatesSectionProps = {
  dates: PortfolioDateItem[]
}

export default function DatesSection({ dates }: DatesSectionProps) {
  return (
    <ProjectAsideCard title="Даты проекта">
      <div className="portfolio-project__dates">
        {dates.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </ProjectAsideCard>
  )
}
