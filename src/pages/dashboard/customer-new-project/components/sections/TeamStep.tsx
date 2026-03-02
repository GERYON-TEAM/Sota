import Select from '../ui/Select'

type TeamStepProps = {
  planningModelOpen: boolean
  planningModelValue: string
  planningModels: string[]
  planningStackOpen: boolean
  planningStackValue: string
  planningStacks: string[]
  planningComplexityOpen: boolean
  planningComplexityValue: string
  planningComplexities: string[]
  planningPreviewVisible: boolean
  setPlanningModelOpen: (next: boolean) => void
  setPlanningModelValue: (value: string) => void
  setPlanningStackOpen: (next: boolean) => void
  setPlanningStackValue: (value: string) => void
  setPlanningComplexityOpen: (next: boolean) => void
  setPlanningComplexityValue: (value: string) => void
  setPlanningPreviewVisible: (next: boolean | ((prev: boolean) => boolean)) => void
}

export default function TeamStep(props: TeamStepProps) {
  const {
    planningModelOpen,
    planningModelValue,
    planningModels,
    planningStackOpen,
    planningStackValue,
    planningStacks,
    planningComplexityOpen,
    planningComplexityValue,
    planningComplexities,
    planningPreviewVisible,
    setPlanningModelOpen,
    setPlanningModelValue,
    setPlanningStackOpen,
    setPlanningStackValue,
    setPlanningComplexityOpen,
    setPlanningComplexityValue,
    setPlanningPreviewVisible,
  } = props

  const planCards = [
    { title: 'Design', hours: '50 часов', index: '01' },
    { title: 'Frontend', hours: '90 часов', index: '02' },
    { title: 'Backend', hours: '70 часов', index: '03' },
  ]

  return (
    <div className="customer-new-project-form">
      <Select
        label="Модель управления"
        value={planningModelValue}
        options={planningModels}
        open={planningModelOpen}
        onToggle={() => {
          setPlanningModelOpen(!planningModelOpen)
          setPlanningStackOpen(false)
          setPlanningComplexityOpen(false)
        }}
        onSelect={(value) => {
          setPlanningModelValue(value)
          setPlanningModelOpen(false)
        }}
      />

      <Select
        label="Требуемый стек технологий"
        value={planningStackValue}
        options={planningStacks}
        open={planningStackOpen}
        onToggle={() => {
          setPlanningStackOpen(!planningStackOpen)
          setPlanningModelOpen(false)
          setPlanningComplexityOpen(false)
        }}
        onSelect={(value) => {
          setPlanningStackValue(value)
          setPlanningStackOpen(false)
        }}
      />

      <Select
        label="Сложность проекта"
        value={planningComplexityValue}
        options={planningComplexities}
        open={planningComplexityOpen}
        onToggle={() => {
          setPlanningComplexityOpen(!planningComplexityOpen)
          setPlanningModelOpen(false)
          setPlanningStackOpen(false)
        }}
        onSelect={(value) => {
          setPlanningComplexityValue(value)
          setPlanningComplexityOpen(false)
        }}
      />

      <div className="customer-new-project-planning__actions">
        <button className="customer-new-project-planning__show-btn" type="button" onClick={() => setPlanningPreviewVisible((prev) => !prev)}>
          Показать схему и сроки
        </button>
      </div>

      {planningPreviewVisible && (
        <section className="customer-new-project-plan">
          <div className="customer-new-project-plan__head">
            <strong>Web Dev</strong>
            <span>*Указанные данные рассчитаны предварительно</span>
          </div>
          <div className="customer-new-project-plan__cards">
            {planCards.map((card) => (
              <article className="customer-new-project-plan-card" key={card.index}>
                <div className="customer-new-project-plan-card__top">
                  <span>{card.title}</span>
                  <span className="customer-new-project-plan-card__index">{card.index}</span>
                </div>
                <strong>{card.hours}</strong>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
