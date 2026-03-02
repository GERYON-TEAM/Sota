type NewProjectStepsProps = {
  steps: Array<{ label: string }>
  currentStep: number
}

export default function NewProjectSteps({ steps, currentStep }: NewProjectStepsProps) {
  return (
    <section className="customer-new-project-steps" aria-label="Шаги создания проекта">
      {steps.map((step, index) => (
        <div className="customer-new-project-steps__item" key={step.label}>
          <span className="customer-new-project-steps__label">{step.label}</span>
          <span className="customer-new-project-steps__track" aria-hidden="true">
            <span className={`customer-new-project-steps__fill${index < currentStep ? ' is-active' : ''}`} />
          </span>
        </div>
      ))}
    </section>
  )
}
