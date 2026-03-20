import { useState } from 'react'
import Field from '../ui/Field'
import TextareaField from '../ui/TextareaField'
import Select from '../ui/Select'

type ReviewStepProps = {
  projectName: string
  projectDescription: string
  projectTypeOpen: boolean
  projectTypeValue: string
  projectTypes: string[]
  budgetValue: string
  projectStart: string
  projectEnd: string
  setProjectName: (value: string) => void
  setProjectDescription: (value: string) => void
  projectNotes: string
  setProjectTypeOpen: (next: boolean) => void
  setProjectTypeValue: (value: string) => void
  setProjectNotes: (value: string) => void
}

const DEFAULT_PHASE_DATES = ['01.05.2026 - 12.05.2026', '13.05.2026 - 10.06.2026', '11.06.2026 - 22.06.2026']

const phaseArtifacts = [
  {
    title: 'Первый этап',
    items: ['UI-концепция', 'Карта пользовательских сценариев', 'Прототип ключевых экранов'],
  },
  {
    title: 'Второй этап',
    items: ['Техническое задание', 'API-контракты', 'План реализации по спринтам'],
  },
  {
    title: 'Третий этап',
    items: ['Тест-кейсы', 'Релизный чек-лист', 'План передачи в поддержку'],
  },
]

const PHASE_NAMES = ['Design', 'Разработка', 'Тестирование']
const PHASE_WEIGHTS = [0.25, 0.55, 0.2]

const formatDate = (value: string) => {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${day}.${month}.${year}`
}

const buildPhaseDateRange = (index: number, start: string, end: string) => {
  if (!start || !end) return DEFAULT_PHASE_DATES[index] || DEFAULT_PHASE_DATES[0]

  const startDate = new Date(`${start}T00:00:00`)
  const endDate = new Date(`${end}T00:00:00`)
  const totalMs = endDate.getTime() - startDate.getTime()

  if (Number.isNaN(totalMs) || totalMs <= 0) {
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  const startRatio = PHASE_WEIGHTS.slice(0, index).reduce((sum, value) => sum + value, 0)
  const endRatio = PHASE_WEIGHTS.slice(0, index + 1).reduce((sum, value) => sum + value, 0)
  const phaseStart = new Date(startDate.getTime() + totalMs * startRatio)
  const phaseEnd = new Date(startDate.getTime() + totalMs * endRatio)

  return `${formatDate(phaseStart.toISOString().slice(0, 10))} - ${formatDate(phaseEnd.toISOString().slice(0, 10))}`
}

const buildPhasePrice = (index: number, budgetValue: string) => {
  const total = Number(budgetValue)
  if (!Number.isFinite(total) || total <= 0) {
    return ['120 000 ₽', '260 000 ₽', '80 000 ₽'][index] || '0 ₽'
  }

  const amount = Math.round(total * PHASE_WEIGHTS[index])
  return `${amount.toLocaleString('ru-RU')} ₽`
}

export default function ReviewStep(props: ReviewStepProps) {
  const {
    projectName,
    projectDescription,
    projectTypeOpen,
    projectTypeValue,
    projectTypes,
    budgetValue,
    projectStart,
    projectEnd,
    setProjectName,
    setProjectDescription,
    projectNotes,
    setProjectTypeOpen,
    setProjectTypeValue,
    setProjectNotes,
  } = props

  const [openArtifactTitle, setOpenArtifactTitle] = useState('Первый этап')

  const projectPhases = PHASE_NAMES.map((title, index) => ({
    title,
    dateRange: buildPhaseDateRange(index, projectStart, projectEnd),
    price: buildPhasePrice(index, budgetValue),
  }))

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
        label="Тип проекта"
        value={projectTypeValue}
        options={projectTypes}
        placeholder="Выберите тип проекта"
        open={projectTypeOpen}
        onToggle={() => {
          setProjectTypeOpen(!projectTypeOpen)
        }}
        onSelect={(value) => {
          setProjectTypeValue(value)
          setProjectTypeOpen(false)
        }}
      />

      <div className="customer-new-project-form__group">
        <div className="customer-new-project-form__label-row">
          <label className="customer-new-project-form__label" htmlFor="validation-project-notes">
            Пожелания и уточнения
          </label>
          <span className="customer-new-project-form__counter">{projectNotes.length}/1000</span>
        </div>
        <TextareaField
          id="validation-project-notes"
          label=""
          value={projectNotes}
          onChange={(value) => setProjectNotes(value.slice(0, 1000))}
          placeholder="Укажите стек, навыки и другие важные уточнения"
          maxLength={1000}
        />
      </div>

      <section className="customer-new-project-validation-plan">
        <h3>План проекта</h3>

        <div className="customer-new-project-validation-phases">
          <h4>Фазы проекта</h4>

          <div className="customer-new-project-validation-phases__list">
            {projectPhases.map((phase) => (
              <article className="customer-new-project-validation-phase-card" key={phase.title}>
                <div className="customer-new-project-validation-phase-card__tag">{phase.title}</div>
                <div className="customer-new-project-validation-phase-card__meta">{phase.dateRange}</div>
                <div className="customer-new-project-validation-phase-card__price">{phase.price}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="customer-new-project-validation-artifacts">
          <h4>Артефакты фаз</h4>
          <div className="customer-new-project-validation-artifacts__list">
            {phaseArtifacts.map((group) => {
              const open = openArtifactTitle === group.title
              return (
                <article className="customer-new-project-validation-artifact-card" key={group.title}>
                  <button
                    className="customer-new-project-validation-artifact-card__top"
                    type="button"
                    onClick={() => setOpenArtifactTitle(open ? '' : group.title)}
                  >
                    <span className="customer-new-project-validation-artifact-card__title">{group.title}</span>
                    <span className="customer-new-project-validation-artifact-card__toggle">
                      Артефактов: {group.items.length}
                      <svg
                        className={open ? 'is-open' : ''}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 10L12 15L17 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {open && (
                    <div className="customer-new-project-validation-artifact-card__items">
                      {group.items.map((item) => (
                        <span className="customer-new-project-validation-artifact-card__item" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
