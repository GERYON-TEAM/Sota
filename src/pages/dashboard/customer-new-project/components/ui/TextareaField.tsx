type TextareaFieldProps = {
  id?: string
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function TextareaField({ id, label, value, placeholder, onChange }: TextareaFieldProps) {
  return (
    <div className="customer-new-project-form__group">
      <label className="customer-new-project-form__label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="customer-new-project-form__textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
