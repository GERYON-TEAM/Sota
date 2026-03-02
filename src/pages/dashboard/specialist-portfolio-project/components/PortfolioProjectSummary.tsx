import type { PortfolioMetaItem } from '../types/portfolio-project.types'

type PortfolioProjectSummaryProps = {
  title: string
  statusLabel: string
  role: string
  meta: PortfolioMetaItem[]
  tags: string[]
  onShare: () => void
}

export default function PortfolioProjectSummary({
  title,
  statusLabel,
  role,
  meta,
  tags,
  onShare,
}: PortfolioProjectSummaryProps) {
  return (
    <div className="portfolio-project__summary">
      <div className="portfolio-project__title-row">
        <h2 className="portfolio-project__title">{title}</h2>
        <div className="portfolio-project__title-actions">
          <span className="portfolio-project__status">{statusLabel}</span>
          <button className="portfolio-project__share" type="button" onClick={onShare}>
            Поделиться
          </button>
        </div>
      </div>
      <div className="portfolio-project__role">{role}</div>
      <div className="portfolio-project__meta">
        {meta.map((item) => (
          <div className="portfolio-project__meta-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="portfolio-project__tags">
        {tags.map((tag) => (
          <span className="portfolio-project__tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
