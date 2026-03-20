import { useId } from 'react'

type SelectProps = {
  label: string
  value: string
  options: string[]
  placeholder?: string
  open: boolean
  onToggle: () => void
  onSelect: (value: string) => void
}

export default function Select({
  label,
  value,
  options,
  placeholder = 'Выберите значение',
  open,
  onToggle,
  onSelect,
}: SelectProps) {
  const menuId = useId()

  return (
    <div
      className="customer-new-project-form__group customer-new-project-form__group--dropdown"
      onClick={(event) => event.stopPropagation()}
    >
      <span className="customer-new-project-form__label">{label}</span>
      <button
        className={`customer-new-project-form__select${open ? ' is-open' : ''}`}
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onToggle()
        }}
      >
        <span className={value ? '' : 'customer-new-project-form__select-placeholder'}>
          {value || placeholder}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7 10L12 15L17 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div id={menuId} className="customer-new-project-form__menu" onClick={(event) => event.stopPropagation()}>
          {options.map((item) => {
            const selected = item === value
            return (
              <button
                key={item}
                className="customer-new-project-form__menu-item"
                type="button"
                onClick={() => onSelect(item)}
              >
                <span>{item}</span>
                {selected && (
                  <span className="customer-new-project-form__menu-check" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#5260FF" />
                      <path d="M8 12L11 15L17 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
