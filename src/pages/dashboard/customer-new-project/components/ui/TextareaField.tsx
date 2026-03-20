type TextareaFieldProps = {
  id?: string
  label: string
  value: string
  placeholder?: string
  maxLength?: number
  onChange: (value: string) => void
}

export default function TextareaField({
  id,
  label,
  value,
  placeholder,
  maxLength,
  onChange,
}: TextareaFieldProps) {
  return (
    <div className="customer-new-project-form__group">
      {label ? (
        <label className="customer-new-project-form__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        className="customer-new-project-form__textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  )
}
