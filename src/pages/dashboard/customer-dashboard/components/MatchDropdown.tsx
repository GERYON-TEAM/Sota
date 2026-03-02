import type { SortOrder } from '../types/dashboard.types'

type MatchDropdownProps = {
  isOpen: boolean
  value: SortOrder
  onToggle: () => void
  onSelect: (value: SortOrder) => void
}

export default function MatchDropdown({ isOpen, value, onToggle, onSelect }: MatchDropdownProps) {
  return (
    <div className={`active-filter ${isOpen ? 'is-open' : ''}`} onClick={onToggle}>
      <span className="active-filter__icon" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18V5M12 18L16 14M12 18L8 14"
            stroke="#696E82"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="active-filter__text">% соответствия</span>
      <span className="active-filter__chevron" aria-hidden="true">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="#696E82"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className={`deadline-menu deadline-menu--match ${isOpen ? 'is-open' : ''}`}>
        <button
          type="button"
          className="deadline-item"
          onClick={(event) => {
            event.stopPropagation()
            onSelect('old')
          }}
        >
          <span className="deadline-item__icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6V19M12 6L16 10M12 6L8 10"
                stroke="#0B1215"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="deadline-item__text">Сначала более подходящие</span>
          {value === 'old' && (
            <span className="deadline-item__check" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_72_11042c"
                  style={{ maskType: 'luminance' }}
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                >
                  <path
                    d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12L11 15L17 9"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_72_11042c)">
                  <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                </g>
              </svg>
            </span>
          )}
        </button>
        <button
          type="button"
          className="deadline-item"
          onClick={(event) => {
            event.stopPropagation()
            onSelect('new')
          }}
        >
          <span className="deadline-item__icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18V5M12 18L16 14M12 18L8 14"
                stroke="#0B1215"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="deadline-item__text">Сначала менее подходящие</span>
          {value === 'new' && (
            <span className="deadline-item__check" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_72_11042d"
                  style={{ maskType: 'luminance' }}
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                >
                  <path
                    d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12L11 15L17 9"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_72_11042d)">
                  <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                </g>
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
