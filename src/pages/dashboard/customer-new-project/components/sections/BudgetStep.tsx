import { useState, type RefObject } from 'react'
import RangeInput from '../ui/RangeInput'
import DateRangePicker from '../ui/DateRangePicker'

type BudgetStepProps = {
  flexibleDeadlines: boolean
  projectBalanceValue: string
  projectBalances: string[]
  budgetValue: string
  projectStart: string
  projectEnd: string
  startDateRef: RefObject<HTMLInputElement | null>
  endDateRef: RefObject<HTMLInputElement | null>
  setFlexibleDeadlines: (value: boolean) => void
  setProjectBalanceValue: (value: string) => void
  setBudgetValue: (value: string) => void
  setProjectStart: (value: string) => void
  setProjectEnd: (value: string) => void
  sanitizeDigits: (value: string) => string
  formatDate: (value: string) => string
  openDatePicker: (ref: { current: HTMLInputElement | null }) => void
}

export default function BudgetStep(props: BudgetStepProps) {
  const {
    flexibleDeadlines,
    projectBalanceValue,
    projectBalances,
    budgetValue,
    projectStart,
    projectEnd,
    startDateRef,
    endDateRef,
    setFlexibleDeadlines,
    setProjectBalanceValue,
    setBudgetValue,
    setProjectStart,
    setProjectEnd,
    sanitizeDigits,
    formatDate,
    openDatePicker,
  } = props
  const [balanceOpen, setBalanceOpen] = useState(false)
  const [balanceHintOpen, setBalanceHintOpen] = useState<string | null>(null)

  const getBalanceHint = (item: string) => {
    if (item === 'Быстрее') {
      return 'Больше senior-специалистов, короче сроки, выше стоимость (примерно +15%).'
    }
    if (item === 'Оптимально') {
      return 'Баланс опыта и стоимости, стандартные сроки.'
    }
    return 'Больше junior-специалистов, дольше сроки, ниже стоимость (примерно -15%).'
  }

  return (
    <div className="customer-new-project-form">
      <RangeInput
        id="project-budget"
        label="Бюджет, ₽"
        value={budgetValue}
        onChange={(value) => setBudgetValue(sanitizeDigits(value))}
        onStep={() => {}}
        placeholder="Укажите бюджет проекта"
      />

      <div className="customer-new-project-form__group">
        <span className="customer-new-project-form__label">Сроки</span>
        <DateRangePicker
          startValue={projectStart}
          endValue={projectEnd}
          startRef={startDateRef}
          endRef={endDateRef}
          formatDate={formatDate}
          onStartChange={setProjectStart}
          onEndChange={setProjectEnd}
          onOpenStart={() => openDatePicker(startDateRef)}
          onOpenEnd={() => openDatePicker(endDateRef)}
        />
      </div>

      <div className="customer-new-project-form__group">
        <button
          className={`customer-new-project-form__radio-toggle${flexibleDeadlines ? ' is-selected' : ''}`}
          type="button"
          onClick={() => setFlexibleDeadlines(!flexibleDeadlines)}
        >
          <span className="customer-new-project-form__radio-toggle-icon" aria-hidden="true">
            {flexibleDeadlines ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24C13.5761 24.0019 15.1371 23.6924 16.5933 23.0892C18.0495 22.4861 19.3721 21.6011 20.4852 20.4852C21.6011 19.3721 22.4861 18.0495 23.0892 16.5933C23.6924 15.1371 24.0019 13.5761 24 12C24.0019 10.4239 23.6924 8.86286 23.0892 7.4067C22.4861 5.95054 21.6011 4.62791 20.4852 3.51481C19.3721 2.3989 18.0495 1.51394 16.5933 0.910758C15.1371 0.307576 13.5761 -0.0019345 12 9.09715e-06C10.4239 -0.0019345 8.86286 0.307576 7.4067 0.910758C5.95054 1.51394 4.62791 2.3989 3.51481 3.51481C2.3989 4.62791 1.51394 5.95054 0.910758 7.4067C0.307576 8.86286 -0.0019345 10.4239 9.09715e-06 12C-0.0019345 13.5761 0.307576 15.1371 0.910758 16.5933C1.51394 18.0495 2.3989 19.3721 3.51481 20.4852C4.62791 21.6011 5.95054 22.4861 7.4067 23.0892C8.86286 23.6924 10.4239 24.0019 12 24Z" fill="#5260FF"/>
                <path d="M8 12L11 15L17 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11.25" stroke="#C7CCE0" strokeWidth="1.5" />
              </svg>
            )}
          </span>
          <span>Гибкие сроки</span>
        </button>

        <p className="customer-new-project-date__hint customer-new-project-date__hint--budget">
          Опираясь на указанные данные, система автоматически рассчитывает продолжительность проекта и подбирает специалистов в указанном диапазоне.
        </p>
      </div>

      <div className="customer-new-project-form__group customer-new-project-balance">
        <span className="customer-new-project-form__label">Баланс проекта</span>
        <div className="customer-new-project-balance__wrap">
          <button
            className={`customer-new-project-balance__select${balanceOpen ? ' is-open' : ''}`}
            type="button"
            onClick={() => {
              setBalanceOpen((prev) => !prev)
              setBalanceHintOpen(null)
            }}
          >
            <span>{projectBalanceValue}</span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M0.999999 1L6 6L11 1" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {balanceOpen && (
            <div className="customer-new-project-balance__menu" onClick={(event) => event.stopPropagation()}>
              {projectBalances.map((item) => {
                const selected = projectBalanceValue === item
                const hintOpen = balanceHintOpen === item
                return (
                  <div
                    className="customer-new-project-balance__item-wrap"
                    key={item}
                    onMouseLeave={() => {
                      if (balanceHintOpen === item) setBalanceHintOpen(null)
                    }}
                  >
                    <button
                      type="button"
                      className="customer-new-project-balance__item"
                      onClick={() => {
                        setProjectBalanceValue(item)
                        setBalanceOpen(false)
                        setBalanceHintOpen(null)
                      }}
                    >
                      <span className="customer-new-project-balance__item-label">{item}</span>
                      <span className="customer-new-project-balance__item-actions">
                        {selected && (
                          <span className="customer-new-project-balance__item-check" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip-balance-check)">
                                <path d="M12 24C13.5761 24.0019 15.1371 23.6924 16.5933 23.0892C18.0495 22.4861 19.3721 21.6011 20.4852 20.4852C21.6011 19.3721 22.4861 18.0495 23.0892 16.5933C23.6924 15.1371 24.0019 13.5761 24 12C24.0019 10.4239 23.6924 8.86286 23.0892 7.4067C22.4861 5.95054 21.6011 4.62791 20.4852 3.51481C19.3721 2.3989 18.0495 1.51394 16.5933 0.910758C15.1371 0.307576 13.5761 -0.0019345 12 9.09715e-06C10.4239 -0.0019345 8.86286 0.307576 7.4067 0.910758C5.95054 1.51394 4.62791 2.3989 3.51481 3.51481C2.3989 4.62791 1.51394 5.95054 0.910758 7.4067C0.307576 8.86286 -0.0019345 10.4239 9.09715e-06 12C-0.0019345 13.5761 0.307576 15.1371 0.910758 16.5933C1.51394 18.0495 2.3989 19.3721 3.51481 20.4852C4.62791 21.6011 5.95054 22.4861 7.4067 23.0892C8.86286 23.6924 10.4239 24.0019 12 24Z" fill="#5260FF"/>
                                <path d="M8 12L11 15L17 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                              <defs>
                                <clipPath id="clip-balance-check">
                                  <rect width="24" height="24" rx="12" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        )}
                        <button
                          type="button"
                          className="customer-new-project-balance__item-info"
                          aria-label="Подсказка"
                          onMouseEnter={(event) => {
                            event.stopPropagation()
                            setBalanceHintOpen(item)
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip-balance-info)">
                              <path d="M12 24C13.5761 24.0019 15.1371 23.6924 16.5933 23.0892C18.0495 22.4861 19.3721 21.6011 20.4852 20.4852C21.6011 19.3721 22.4861 18.0495 23.0892 16.5933C23.6924 15.1371 24.0019 13.5761 24 12C24.0019 10.4239 23.6924 8.86286 23.0892 7.4067C22.4861 5.95054 21.6011 4.62791 20.4852 3.51481C19.3721 2.3989 18.0495 1.51394 16.5933 0.910758C15.1371 0.307576 13.5761 -0.0019345 12 9.09715e-06C10.4239 -0.0019345 8.86286 0.307576 7.4067 0.910758C5.95054 1.51394 4.62791 2.3989 3.51481 3.51481C2.3989 4.62791 1.51394 5.95054 0.910758 7.4067C0.307576 8.86286 -0.0019345 10.4239 9.09715e-06 12C-0.0019345 13.5761 0.307576 15.1371 0.910758 16.5933C1.51394 18.0495 2.3989 19.3721 3.51481 20.4852C4.62791 21.6011 5.95054 22.4861 7.4067 23.0892C8.86286 23.6924 10.4239 24.0019 12 24Z" fill="white"/>
                              <path d="M12 8H12.01V8.01H12V8Z" stroke="#696E82" strokeWidth="2" strokeLinejoin="round"/>
                              <path d="M12 12V16" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip-balance-info">
                                <rect width="24" height="24" rx="12" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </span>
                    </button>

                    {hintOpen && (
                      <div className="customer-new-project-balance__tooltip">
                        <span>{getBalanceHint(item)}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
