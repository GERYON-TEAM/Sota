type SwitchProps = {
  checked: boolean
  onToggle: () => void
  ariaLabel?: string
}

export default function Switch({ checked, onToggle, ariaLabel }: SwitchProps) {
  return (
    <button
      className={`profile-page__switch${checked ? ' is-active' : ''}`}
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={ariaLabel}
    />
  )
}
