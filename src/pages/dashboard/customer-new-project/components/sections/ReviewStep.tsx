import { useMemo, useState } from 'react'

type ReviewStepProps = {
  projectName: string
  projectDescription: string
  projectTypeValue: string
  budgetValue: string
  projectStart: string
  projectEnd: string
}

const DEFAULT_PHASES = [
  { title: 'Design', dateRange: '01.01.2026 - 01.03.2026', price: 50_000 },
  { title: 'Frontend', dateRange: '01.03.2026 - 01.05.2026', price: 100_000 },
  { title: 'Backend', dateRange: '01.05.2026 - 01.07.2026', price: 100_000 },
  { title: 'Testing', dateRange: '01.07.2026 - 01.10.2026', price: 100_000 },
  { title: 'Deploy', dateRange: '01.10.2026 - 01.01.2027', price: 100_000 },
] as const

const ARTIFACT_GROUPS = [
  { title: 'Первый этап', count: 2, items: ['Название артефакта', 'Название артефакта'] },
  { title: 'Второй этап', count: 5, items: ['Название артефакта', 'Название артефакта', 'Название артефакта'] },
  { title: 'Третий этап', count: 10, items: ['Название артефакта', 'Название артефакта'] },
] as const

const TEAM_ROLES = [
  { title: 'Designer', count: 1 },
  { title: 'Project Manager', count: 1 },
  { title: 'Frontend', count: 2 },
  { title: 'Backend', count: 3 },
] as const

const PHASE_WEIGHTS = [0.111, 0.222, 0.222, 0.222, 0.223]

const formatMoney = (value: number) => `${value.toLocaleString('ru-RU')} ₽`

const formatDateObject = (value: Date) => {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${day}.${month}.${year}`
}

const buildWeightedSegments = (start: string, end: string) => {
  if (!start || !end) return DEFAULT_PHASES.map((item) => item.dateRange)

  const startDate = new Date(`${start}T00:00:00`)
  const endDate = new Date(`${end}T00:00:00`)
  const totalMs = endDate.getTime() - startDate.getTime()

  if (Number.isNaN(totalMs) || totalMs <= 0) {
    return DEFAULT_PHASES.map((item) => item.dateRange)
  }

  let offset = 0
  return PHASE_WEIGHTS.map((weight, index) => {
    const segmentStart = new Date(startDate.getTime() + totalMs * offset)
    offset += weight
    const segmentEnd = new Date(startDate.getTime() + totalMs * offset)
    const safeEnd = index === PHASE_WEIGHTS.length - 1 ? endDate : segmentEnd
    return `${formatDateObject(segmentStart)} - ${formatDateObject(safeEnd)}`
  })
}

const buildPhaseAmounts = (budgetValue: string) => {
  const total = Number(budgetValue)
  if (!Number.isFinite(total) || total <= 0) {
    return DEFAULT_PHASES.map((item) => item.price)
  }

  return PHASE_WEIGHTS.map((weight) => Math.max(10_000, Math.round(total * weight)))
}

const splitAmount = (amount: number, parts: number) => {
  if (parts <= 1) return [amount]

  const base = Math.floor(amount / parts)
  const values = Array.from({ length: parts }, () => base)
  const remainder = amount - base * parts

  for (let index = 0; index < remainder; index += 1) {
    values[index] += 1
  }

  return values
}

const buildEstimateStages = (phaseAmounts: number[]) => {
  const firstStageTotal = phaseAmounts[0] ?? DEFAULT_PHASES[0].price
  const secondStageTotal = (phaseAmounts[1] ?? DEFAULT_PHASES[1].price) + (phaseAmounts[2] ?? DEFAULT_PHASES[2].price)
  const thirdStageTotal = (phaseAmounts[3] ?? DEFAULT_PHASES[3].price) + (phaseAmounts[4] ?? DEFAULT_PHASES[4].price)

  const firstStageItems = splitAmount(firstStageTotal, 2)
  const secondStageItems = splitAmount(secondStageTotal, 2)
  const thirdStageItems = splitAmount(thirdStageTotal, 2)

  return [
    {
      title: 'Первый этап',
      total: firstStageTotal,
      items: [
        { title: 'Дизайнер', price: firstStageItems[0] ?? 0 },
        { title: 'Проджект менеджер', price: firstStageItems[1] ?? 0 },
      ],
    },
    {
      title: 'Второй этап',
      total: secondStageTotal,
      items: [
        { title: 'Frontend', price: secondStageItems[0] ?? 0 },
        { title: 'Backend', price: secondStageItems[1] ?? 0 },
      ],
    },
    {
      title: 'Третий этап',
      total: thirdStageTotal,
      items: [
        { title: 'Testing', price: thirdStageItems[0] ?? 0 },
        { title: 'Deploy', price: thirdStageItems[1] ?? 0 },
      ],
    },
  ]
}

export default function ReviewStep({
  projectName,
  projectDescription,
  projectTypeValue,
  budgetValue,
  projectStart,
  projectEnd,
}: ReviewStepProps) {
  const [openArtifactTitle, setOpenArtifactTitle] = useState('Первый этап')

  const phaseRanges = buildWeightedSegments(projectStart, projectEnd)
  const phaseAmounts = buildPhaseAmounts(budgetValue)
  const phases = DEFAULT_PHASES.map((phase, index) => ({
    title: phase.title,
    dateRange: phaseRanges[index] ?? phase.dateRange,
    price: formatMoney(phaseAmounts[index] ?? phase.price),
  }))
  const estimateStages = useMemo(() => buildEstimateStages(phaseAmounts), [phaseAmounts])

  return (
    <div className="customer-new-project-form customer-new-project-validation">
      <section className="customer-new-project-validation-section">
        <h3 className="customer-new-project-validation-section__title">Указанные данные</h3>

        <div className="customer-new-project-validation-display">
          <div className="customer-new-project-validation-display__group">
            <span className="customer-new-project-validation-display__label">Название проекта</span>
            <div className="customer-new-project-validation-display__value">
              {projectName || 'Название проекта'}
            </div>
          </div>

          <div className="customer-new-project-validation-display__group">
            <span className="customer-new-project-validation-display__label">Описание проекта</span>
            <div className="customer-new-project-validation-display__value customer-new-project-validation-display__value--multiline">
              {projectDescription ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'}
            </div>
          </div>

          <div className="customer-new-project-validation-display__group">
            <span className="customer-new-project-validation-display__label">Тип проекта</span>
            <div className="customer-new-project-validation-display__value">
              {projectTypeValue || 'Разработка'}
            </div>
          </div>
        </div>
      </section>

      <section className="customer-new-project-validation-section">
        <h3 className="customer-new-project-validation-section__title">План проекта</h3>

        <div className="customer-new-project-validation-panel">
          <h4 className="customer-new-project-validation-panel__title">Фазы проекта</h4>

          <div className="customer-new-project-validation-phases__list">
            {phases.map((phase) => (
              <article className="customer-new-project-validation-phase-card" key={phase.title}>
                <div className="customer-new-project-validation-phase-card__tag">{phase.title}</div>
                <div className="customer-new-project-validation-phase-card__meta">{phase.dateRange}</div>
                <div className="customer-new-project-validation-phase-card__price">{phase.price}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="customer-new-project-validation-panel">
          <h4 className="customer-new-project-validation-panel__title">Артефакты фаз</h4>

          <div className="customer-new-project-validation-artifacts__list">
            {ARTIFACT_GROUPS.map((group) => {
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
                      Артефактов: <strong>{group.count}</strong>
                      <svg
                        className={open ? 'is-open' : ''}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.5 8L10 12.5L14.5 8" stroke="#7E86A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {open && (
                    <div className="customer-new-project-validation-artifact-card__items">
                      {group.items.map((item, index) => (
                        <span className="customer-new-project-validation-artifact-card__item" key={`${group.title}-${index}`}>
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

      <section className="customer-new-project-validation-section">
        <div className="customer-new-project-validation-panel">
          <h3 className="customer-new-project-validation-panel__title">Ролевой состав команды</h3>

          <div className="customer-new-project-validation-roles">
            {TEAM_ROLES.map((role) => (
              <article className="customer-new-project-validation-role-card" key={role.title}>
                <span className="customer-new-project-validation-role-card__title">{role.title}</span>
                <span className="customer-new-project-validation-role-card__count">Специалистов: {role.count}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="customer-new-project-validation-section">
        <div className="customer-new-project-validation-panel">
          <h3 className="customer-new-project-validation-panel__title">Смета проекта</h3>

          <div className="customer-new-project-validation-estimate">
            {estimateStages.map((stage) => (
              <div className="customer-new-project-validation-estimate__stage" key={stage.title}>
                <div className="customer-new-project-validation-estimate__head">
                  <span>{stage.title}</span>
                  <span className="customer-new-project-validation-estimate__head-price">{formatMoney(stage.total)}</span>
                </div>

                <div className="customer-new-project-validation-estimate__items">
                  {stage.items.map((item) => (
                    <article className="customer-new-project-validation-estimate__item" key={`${stage.title}-${item.title}`}>
                      <span>{item.title}</span>
                      <span className="customer-new-project-validation-estimate__item-price">{formatMoney(item.price)}</span>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
