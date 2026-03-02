type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

export default function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: FieldProps) {
  return (
    <div className="profile-page__field">
      <span className="profile-page__field-label">{label}</span>
      <input
        className="profile-page__input"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? label}
      />
    </div>
  )
}
