import ProjectCard from '../cards/ProjectCard'

type ReviewSectionProps = {
  text: string
  reviewerRole: string
  reviewerName: string
}

export default function ReviewSection({ text, reviewerRole, reviewerName }: ReviewSectionProps) {
  return (
    <ProjectCard title="Отзыв заказчика">
      <div className="portfolio-project__review">{text}</div>
      <div className="portfolio-project__reviewer">
        <div className="portfolio-project__avatar" aria-hidden="true" />
        <div>
          <span className="portfolio-project__reviewer-role">{reviewerRole}</span>
          <span className="portfolio-project__reviewer-name">{reviewerName}</span>
        </div>
      </div>
    </ProjectCard>
  )
}
