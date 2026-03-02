type FilterSelectProps = {
  label: string
  isOpen: boolean
  selected: string[]
  options: string[]
  onToggle: () => void
  onClear: () => void
  onOptionToggle: (value: string) => void
}

export default function FilterSelect({
  label,
  isOpen,
  selected,
  options,
  onToggle,
  onClear,
  onOptionToggle,
}: FilterSelectProps) {
  return (
    <div className="filter-modal__section">
      <span className="filter-modal__label">{label}</span>
      <div className="filter-modal__select-wrap">
        <button
          className={`filter-modal__select ${isOpen ? 'is-open' : ''}`}
          type="button"
          onClick={onToggle}
        >
          <span>{selected.length > 0 ? selected.join(', ') : 'Выберите категории'}</span>
          <span className="filter-modal__select-actions">
            {selected.length > 0 && (
              <button
                className="filter-modal__select-clear"
                type="button"
                aria-label="Сбросить категории"
                onClick={(event) => {
                  event.stopPropagation()
                  onClear()
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 0.75L0.75 10.5M0.75 0.75L10.5 10.5" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <span className="filter-modal__select-chevron" aria-hidden="true">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L6 6L1 1" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </button>

        {isOpen && (
          <div className="filter-modal__menu filter-modal__categories">
            {options.map((category) => {
              const isSelected = selected.includes(category)
              return (
                <button
                  key={category}
                  type="button"
                  className={`filter-modal__menu-item ${isSelected ? 'is-selected' : ''}`}
                  onPointerDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    onOptionToggle(category)
                  }}
                >
                  <span className="filter-modal__menu-label">{category}</span>
                  <span className="filter-modal__menu-icon" aria-hidden="true">
                    <span className="filter-modal__menu-icon-off">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10.5" stroke="#696E82" />
                      </svg>
                    </span>
                    <span className="filter-modal__menu-icon-on">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_75_1575" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                          <path
                            d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </mask>
                        <g mask="url(#mask0_75_1575)">
                          <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                        </g>
                      </svg>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
