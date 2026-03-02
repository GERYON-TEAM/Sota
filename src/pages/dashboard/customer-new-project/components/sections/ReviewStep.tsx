import Field from '../ui/Field'
import TextareaField from '../ui/TextareaField'
import Select from '../ui/Select'

type ReviewCard = {
  label: string
  value: string
}

type ReviewStepProps = {
  projectName: string
  projectDescription: string
  categoryOpen: boolean
  categoryValue: string
  categories: string[]
  setProjectName: (value: string) => void
  setProjectDescription: (value: string) => void
  setCategoryOpen: (next: boolean) => void
  setCategoryValue: (value: string) => void
  summaryCards: ReviewCard[]
}

export default function ReviewStep(props: ReviewStepProps) {
  const {
    projectName,
    projectDescription,
    categoryOpen,
    categoryValue,
    categories,
    setProjectName,
    setProjectDescription,
    setCategoryOpen,
    setCategoryValue,
    summaryCards,
  } = props

  return (
    <div className="customer-new-project-form customer-new-project-validation">
      <Field
        id="validation-project-name"
        label="Название проекта"
        value={projectName}
        onChange={setProjectName}
        placeholder="Укажите название проекта"
      />

      <TextareaField
        id="validation-project-description"
        label="Описание проекта"
        value={projectDescription}
        onChange={setProjectDescription}
        placeholder="Опишите задачу, цели и ожидаемый результат"
      />

      <Select
        label="Категория проекта"
        value={categoryValue}
        options={categories}
        open={categoryOpen}
        onToggle={() => setCategoryOpen(!categoryOpen)}
        onSelect={(value) => {
          setCategoryValue(value)
          setCategoryOpen(false)
        }}
      />

      <section className="customer-new-project-validation-phases">
        <h3>Фазы проекта</h3>
        <div className="customer-new-project-validation-phases__surface">
          <div className="customer-new-project-validation-phases__grid">
            {summaryCards.map((card) => (
              <article className="customer-new-project-validation-card" key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
