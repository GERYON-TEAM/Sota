import type { RefObject } from 'react'

type DateRangePickerProps = {
  startValue: string
  endValue: string
  startRef: RefObject<HTMLInputElement | null>
  endRef: RefObject<HTMLInputElement | null>
  formatDate: (value: string) => string
  onStartChange: (value: string) => void
  onEndChange: (value: string) => void
  onOpenStart: () => void
  onOpenEnd: () => void
}

export default function DateRangePicker({
  startValue,
  endValue,
  startRef,
  endRef,
  formatDate,
  onStartChange,
  onEndChange,
  onOpenStart,
  onOpenEnd,
}: DateRangePickerProps) {
  return (
    <div className="customer-new-project-date__row">
      <div className={`customer-new-project-date__input${startValue ? ' is-filled' : ''}`}>
        <span className="customer-new-project-date__label">Дата начала проекта</span>
        <span className="customer-new-project-date__value">{formatDate(startValue)}</span>
        <button type="button" className="customer-new-project-date__icon" aria-label="Выбрать дату начала" onClick={onOpenStart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2V5M17 2V5M3 9H21" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 5H18C19.6569 5 21 6.34315 21 8V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V8C3 6.34315 4.34315 5 6 5Z" stroke="#696E82" strokeWidth="1.5" />
          </svg>
        </button>
        <input
          ref={startRef}
          className="customer-new-project-date__picker"
          type="date"
          value={startValue}
          onChange={(event) => onStartChange(event.target.value)}
          aria-label="Дата начала проекта"
        />
      </div>

      <div className={`customer-new-project-date__input${endValue ? ' is-filled' : ''}`}>
        <span className="customer-new-project-date__label">Дата окончания проекта</span>
        <span className="customer-new-project-date__value">{formatDate(endValue)}</span>
        <button type="button" className="customer-new-project-date__icon" aria-label="Выбрать дату окончания" onClick={onOpenEnd}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2V5M17 2V5M3 9H21" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 5H18C19.6569 5 21 6.34315 21 8V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V8C3 6.34315 4.34315 5 6 5Z" stroke="#696E82" strokeWidth="1.5" />
          </svg>
        </button>
        <input
          ref={endRef}
          className="customer-new-project-date__picker"
          type="date"
          value={endValue}
          onChange={(event) => onEndChange(event.target.value)}
          aria-label="Дата окончания проекта"
        />
      </div>
    </div>
  )
}
