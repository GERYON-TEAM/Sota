type TextareaFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: TextareaFieldProps) {
  return (
    <div className="profile-page__field">
      <span className="profile-page__field-label">{label}</span>
      <textarea
        className="profile-page__input profile-page__textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? label}
      />
    </div>
  )
}
