import { useEffect, useState, type RefObject } from 'react'

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

const formatManualDateInput = (value: string) => {
  const digits = value.replace(/[^\d]/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`
}

const parseManualDate = (value: string) => {
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return null

  const [day, month, year] = value.split('.')
  if (!day || !month || !year) return null

  const isoValue = `${year}-${month}-${day}`
  const parsedDate = new Date(`${isoValue}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) return null

  const isSameDate =
    parsedDate.getFullYear() === Number(year) &&
    parsedDate.getMonth() + 1 === Number(month) &&
    parsedDate.getDate() === Number(day)

  return isSameDate ? isoValue : null
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
  const [startText, setStartText] = useState(formatDate(startValue))
  const [endText, setEndText] = useState(formatDate(endValue))

  useEffect(() => {
    setStartText(formatDate(startValue))
  }, [formatDate, startValue])

  useEffect(() => {
    setEndText(formatDate(endValue))
  }, [endValue, formatDate])

  const handleManualChange = (
    nextValue: string,
    setText: (value: string) => void,
    onChange: (value: string) => void,
  ) => {
    const formattedValue = formatManualDateInput(nextValue)
    setText(formattedValue)

    if (formattedValue === '') {
      onChange('')
      return
    }

    const parsedValue = parseManualDate(formattedValue)
    if (parsedValue) onChange(parsedValue)
  }

  const handleManualBlur = (
    textValue: string,
    currentValue: string,
    setText: (value: string) => void,
    onChange: (value: string) => void,
  ) => {
    if (textValue === '') {
      onChange('')
      return
    }

    const parsedValue = parseManualDate(textValue)
    if (parsedValue) {
      onChange(parsedValue)
      setText(formatDate(parsedValue))
      return
    }

    setText(formatDate(currentValue))
  }

  return (
    <div className="customer-new-project-date__row">
      <div className="customer-new-project-date__input">
        <input
          className="customer-new-project-date__text"
          type="text"
          inputMode="numeric"
          maxLength={10}
          placeholder="Дата начала проекта"
          value={startText}
          onChange={(event) => handleManualChange(event.target.value, setStartText, onStartChange)}
          onBlur={() => handleManualBlur(startText, startValue, setStartText, onStartChange)}
          aria-label="Дата начала проекта"
        />
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
          onChange={(event) => {
            onStartChange(event.target.value)
            setStartText(formatDate(event.target.value))
          }}
          aria-label="Дата начала проекта"
        />
      </div>

      <div className="customer-new-project-date__input">
        <input
          className="customer-new-project-date__text"
          type="text"
          inputMode="numeric"
          maxLength={10}
          placeholder="Дата окончания проекта"
          value={endText}
          onChange={(event) => handleManualChange(event.target.value, setEndText, onEndChange)}
          onBlur={() => handleManualBlur(endText, endValue, setEndText, onEndChange)}
          aria-label="Дата окончания проекта"
        />
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
          onChange={(event) => {
            onEndChange(event.target.value)
            setEndText(formatDate(event.target.value))
          }}
          aria-label="Дата окончания проекта"
        />
      </div>
    </div>
  )
}
