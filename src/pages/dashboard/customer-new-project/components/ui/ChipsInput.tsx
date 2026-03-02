type ChipsInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function ChipsInput({ value, onChange, placeholder }: ChipsInputProps) {
  return (
    <input
      className="customer-new-project-form__input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  )
}
