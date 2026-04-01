type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  error?: string
  mask?: 'phone'
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, '').slice(0, 11)
  if (digits.length === 0) return '+7 '
  let result = '+7 '
  const d = digits.startsWith('7') ? digits.slice(1) : digits.startsWith('8') ? digits.slice(1) : digits
  if (d.length > 0) result += '(' + d.slice(0, 3)
  if (d.length >= 3) result += ') '
  if (d.length > 3) result += d.slice(3, 6)
  if (d.length >= 6) result += '-'
  if (d.length > 6) result += d.slice(6, 8)
  if (d.length >= 8) result += '-'
  if (d.length > 8) result += d.slice(8, 10)
  return result
}

export default function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  mask,
}: FieldProps) {
  const handleChange = (val: string) => {
    if (mask === 'phone') {
      onChange(formatPhone(val))
    } else {
      onChange(val)
    }
  }

  const handleFocus = () => {
    if (mask === 'phone' && !value) {
      onChange('+7 ')
    }
  }

  const handleBlur = () => {
    if (mask === 'phone' && value.replace(/[^0-9]/g, '').length <= 1) {
      onChange('')
    }
  }

  return (
    <div className="profile-page__field">
      <span className="profile-page__field-label">{label}</span>
      <input
        className={`profile-page__input${error ? ' profile-page__input--error' : ''}`}
        type={type}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={mask === 'phone' ? '+7 (900) 000-00-00' : (placeholder ?? label)}
      />
      {error && <span style={{ color: '#e53935', fontSize: '12px', marginTop: '4px', display: 'block' }}>{error}</span>}
    </div>
  )
}
