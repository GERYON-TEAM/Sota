type RangeInputProps = {
  value: string
  placeholder: string
  onChange: (value: string) => void
  onStep: (delta: number) => void
  id?: string
  label: string
}

export default function RangeInput({ id, label, value, placeholder, onChange, onStep }: RangeInputProps) {
  return (
    <div className="customer-new-project-form__group">
      <label className="customer-new-project-form__label" htmlFor={id}>
        {label}
      </label>
      <div className="customer-new-project-stepper">
        <input
          id={id}
          className="customer-new-project-form__input customer-new-project-form__input--stepper"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        <div className="customer-new-project-stepper__controls">
          <button className="customer-new-project-stepper__btn" type="button" onClick={() => onStep(1)} aria-label="Увеличить">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7L6 2L11 7" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="customer-new-project-stepper__btn" type="button" onClick={() => onStep(-1)} aria-label="Уменьшить">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
