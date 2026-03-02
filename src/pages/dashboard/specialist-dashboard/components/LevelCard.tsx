type LevelCardProps = {
  status: string
  progressText: string
  steps?: number
  activeIndex?: number
}

export default function LevelCard({
  status,
  progressText,
  steps = 10,
  activeIndex = 9,
}: LevelCardProps) {
  return (
    <div className="level-card">
      <div className="level-card__head">
        <span>Уровень</span>
        <span className="level-steps" aria-hidden="true">
          {Array.from({ length: steps }).map((_, index) => (
            <span
              key={index}
              className={`level-step ${index === activeIndex ? 'level-step--active' : ''}`}
            />
          ))}
        </span>
      </div>
      <div className="level-card__status">{status}</div>
      <div className="level-card__progress">{progressText}</div>
    </div>
  )
}
