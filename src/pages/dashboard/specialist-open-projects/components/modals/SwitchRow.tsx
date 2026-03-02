type SwitchRowProps = {
  label: string
  isActive: boolean
  onToggle: () => void
}

export default function SwitchRow({ label, isActive, onToggle }: SwitchRowProps) {
  return (
    <div className="filter-modal__section filter-modal__switch-row">
      <span>{label}</span>
      <button
        className={`filter-modal__switch ${isActive ? 'is-active' : ''}`}
        type="button"
        onClick={onToggle}
        aria-label={label}
      >
        <span className="filter-modal__switch-thumb" />
      </button>
    </div>
  )
}
