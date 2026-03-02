import './rating-dots.css'

type ColorDotsProps = {
  className?: string
}

export default function RatingDots({ className = '' }: ColorDotsProps) {
  return (
    <span className={`rating-dots ${className}`.trim()} aria-hidden="true">
      <span className="rating-dot rating-dot--1" />
      <span className="rating-dot rating-dot--2" />
      <span className="rating-dot rating-dot--3" />
      <span className="rating-dot rating-dot--4" />
      <span className="rating-dot rating-dot--5" />
    </span>
  )
}
