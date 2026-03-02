import type { InputHTMLAttributes } from 'react'

type FieldProps = {
  id?: string
  label: string
  value: string
  placeholder?: string
  type?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  onChange: (value: string) => void
  className?: string
}

export default function Field({
  id,
  label,
  value,
  placeholder,
  type = 'text',
  inputMode,
  onChange,
  className = 'customer-new-project-form__input',
}: FieldProps) {
  return (
    <div className="customer-new-project-form__group">
      <label className="customer-new-project-form__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={className}
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
