import './progress-steps.css'

type ProgressStepsProps = {
  total?: number
  done?: number
  className?: string
}

export default function ProgressSteps({
  total = 10,
  done = 9,
  className = '',
}: ProgressStepsProps) {
  const safeTotal = Math.max(1, total)
  const safeDone = Math.min(Math.max(0, done), safeTotal)

  return (
    <div className={`progress-steps ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: safeTotal }).map((_, index) => (
        <span
          key={index}
          className={`progress-step ${index < safeDone ? 'progress-step--done' : 'progress-step--rest'}`}
        />
      ))}
    </div>
  )
}
