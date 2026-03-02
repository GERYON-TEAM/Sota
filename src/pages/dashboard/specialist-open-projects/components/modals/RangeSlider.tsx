type RangeSliderProps = {
  label: string
  min: number
  max: number
  step: number
  minValue: number
  maxValue: number
  minPercent: number
  maxPercent: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export default function RangeSlider({
  label,
  min,
  max,
  step,
  minValue,
  maxValue,
  minPercent,
  maxPercent,
  onMinChange,
  onMaxChange,
}: RangeSliderProps) {
  return (
    <div className="filter-modal__section">
      <span className="filter-modal__label">{label}</span>
      <div className="filter-modal__slider">
        <div className="filter-modal__slider-track">
          <div
            className="filter-modal__slider-range"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>
        <input
          className="filter-modal__range filter-modal__range--min"
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(event) => {
            onMinChange(Number(event.target.value))
          }}
          aria-label="Минимальный бюджет"
        />
        <input
          className="filter-modal__range filter-modal__range--max"
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(event) => {
            onMaxChange(Number(event.target.value))
          }}
          aria-label="Максимальный бюджет"
        />
      </div>

      <div className="filter-modal__inputs">
        <input
          className="filter-modal__input"
          placeholder="От"
          value={minValue.toString()}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^\d]/g, '')
            const nextValue = digits === '' ? 0 : Number(digits)
            onMinChange(nextValue)
          }}
        />
        <input
          className="filter-modal__input"
          placeholder="До"
          value={maxValue.toString()}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^\d]/g, '')
            const nextValue = digits === '' ? max : Number(digits)
            onMaxChange(nextValue)
          }}
        />
      </div>
    </div>
  )
}
