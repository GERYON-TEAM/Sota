import type { RefObject } from 'react'
import Select from '../ui/Select'
import RangeInput from '../ui/RangeInput'
import DateRangePicker from '../ui/DateRangePicker'

type BudgetStepProps = {
  paymentTypeOpen: boolean
  paymentTypeValue: string
  paymentTypes: string[]
  maxHourlyRate: string
  budgetValue: string
  projectStart: string
  projectEnd: string
  startDateRef: RefObject<HTMLInputElement | null>
  endDateRef: RefObject<HTMLInputElement | null>
  setPaymentTypeOpen: (next: boolean) => void
  setPaymentTypeValue: (value: string) => void
  setMaxHourlyRate: (value: string) => void
  setBudgetValue: (value: string) => void
  setProjectStart: (value: string) => void
  setProjectEnd: (value: string) => void
  sanitizeDigits: (value: string) => string
  stepNumericValue: (value: string, delta: number) => string
  formatDate: (value: string) => string
  openDatePicker: (ref: { current: HTMLInputElement | null }) => void
}

export default function BudgetStep(props: BudgetStepProps) {
  const {
    paymentTypeOpen,
    paymentTypeValue,
    paymentTypes,
    maxHourlyRate,
    budgetValue,
    projectStart,
    projectEnd,
    startDateRef,
    endDateRef,
    setPaymentTypeOpen,
    setPaymentTypeValue,
    setMaxHourlyRate,
    setBudgetValue,
    setProjectStart,
    setProjectEnd,
    sanitizeDigits,
    stepNumericValue,
    formatDate,
    openDatePicker,
  } = props

  return (
    <div className="customer-new-project-form">
      <Select
        label="Тип оплаты"
        value={paymentTypeValue}
        options={paymentTypes}
        open={paymentTypeOpen}
        onToggle={() => setPaymentTypeOpen(!paymentTypeOpen)}
        onSelect={(value) => {
          setPaymentTypeValue(value)
          setPaymentTypeOpen(false)
        }}
      />

      <RangeInput
        id="max-hourly-rate"
        label="Максимальная ставка в час, ₽"
        value={maxHourlyRate}
        onChange={(value) => setMaxHourlyRate(sanitizeDigits(value))}
        onStep={(delta) => setMaxHourlyRate(stepNumericValue(maxHourlyRate, delta))}
        placeholder="Укажите максимальную почасовую ставку"
      />

      <RangeInput
        id="project-budget"
        label="Бюджет, ₽"
        value={budgetValue}
        onChange={(value) => setBudgetValue(sanitizeDigits(value))}
        onStep={(delta) => setBudgetValue(stepNumericValue(budgetValue, delta))}
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
        <p className="customer-new-project-date__hint">
          Опираясь на указанные данные, система автоматически рассчитывает продолжительность проекта и подберёт специалистов в указанном диапазоне.
        </p>
      </div>
    </div>
  )
}
