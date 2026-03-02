import type { ValidationCriterion } from '../../types/active-project.types'

type ValidationModalProps = {
  criteria: ValidationCriterion[]
  checked: number[]
  onToggle: (id: number) => void
  onClose: () => void
}

export default function ValidationModal({ criteria, checked, onToggle, onClose }: ValidationModalProps) {
  return (
    <div className="validation-modal__overlay" onClick={onClose}>
      <div className="validation-modal" onClick={(event) => event.stopPropagation()}>
        <div className="validation-modal__head">
          <h3>Результат валидации</h3>
          <button
            className="validation-modal__close"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.75 15L15 24.75M15 15L24.75 24.75"
                stroke="#696E82"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="validation-modal__body">
          <div className="validator-card">
            <div className="validator-card__info">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 22.5C5 21.1739 5.52678 19.9021 6.46447 18.9645C7.40215 18.0268 8.67392 17.5 10 17.5H20C21.3261 17.5 22.5979 18.0268 23.5355 18.9645C24.4732 19.9021 25 21.1739 25 22.5C25 23.163 24.7366 23.7989 24.2678 24.2678C23.7989 24.7366 23.163 25 22.5 25H7.5C6.83696 25 6.20107 24.7366 5.73223 24.2678C5.26339 23.7989 5 23.163 5 22.5Z"
                  stroke="#696E82"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12.5C17.0711 12.5 18.75 10.8211 18.75 8.75C18.75 6.67893 17.0711 5 15 5C12.9289 5 11.25 6.67893 11.25 8.75C11.25 10.8211 12.9289 12.5 15 12.5Z"
                  stroke="#696E82"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Имя Фамилия Отчество Валидатора</span>
            </div>
            <div className="validator-card__meta">
              <div className="validator-chip">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66797 10.0007C1.66797 6.85815 1.66797 5.28648 2.64464 4.31065C3.6213 3.33482 5.19214 3.33398 8.33464 3.33398H11.668C14.8105 3.33398 16.3821 3.33398 17.358 4.31065C18.3338 5.28732 18.3346 6.85815 18.3346 10.0007V11.6673C18.3346 14.8098 18.3346 16.3815 17.358 17.3573C16.3813 18.3331 14.8105 18.334 11.668 18.334H8.33464C5.19214 18.334 3.62047 18.334 2.64464 17.3573C1.6688 16.3806 1.66797 14.8098 1.66797 11.6673V10.0007Z"
                    stroke="#696E82"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5.83594 3.33398V2.08398M14.1693 3.33398V2.08398M2.08594 7.50065H17.9193"
                    stroke="#696E82"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 11.0543 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z"
                    fill="#696E82"
                  />
                </svg>
                <span>12.02.2026</span>
              </div>
              <div className="validator-chip">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_55_3294)">
                    <path
                      d="M10.0013 18.3337C14.6038 18.3337 18.3346 14.6028 18.3346 10.0003C18.3346 5.39783 14.6038 1.66699 10.0013 1.66699C5.3988 1.66699 1.66797 5.39783 1.66797 10.0003C1.66797 14.6028 5.3988 18.3337 10.0013 18.3337Z"
                      stroke="#696E82"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.0039 5V10.0042L13.5368 13.5375"
                      stroke="#696E82"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_55_3294">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>14:35</span>
              </div>
            </div>
          </div>

          <div className="criteria-list">
            {criteria.map((item) => {
              const isChecked = checked.includes(item.id)
              return (
                <button key={item.id} className="criteria-item" type="button" onClick={() => onToggle(item.id)}>
                  <span className={`criteria-check${isChecked ? ' is-checked' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#696E82" />
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask
                        id={`mask0_criteria_${item.id}`}
                        style={{ maskType: 'luminance' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="22"
                        height="22"
                      >
                        <path
                          d="M11 21C12.3135 21.0016 13.6143 20.7437 14.8278 20.2411C16.0412 19.7384 17.1434 19.0009 18.071 18.071C19.0009 17.1434 19.7384 16.0412 20.2411 14.8278C20.7437 13.6143 21.0016 12.3135 21 11C21.0016 9.68655 20.7437 8.38572 20.2411 7.17225C19.7384 5.95878 19.0009 4.85659 18.071 3.92901C17.1434 2.99909 16.0412 2.26162 14.8278 1.75897C13.6143 1.25631 12.3135 0.998388 11 1.00001C9.68655 0.998388 8.38572 1.25631 7.17225 1.75897C5.95878 2.26162 4.85659 2.99909 3.92901 3.92901C2.99909 4.85659 2.26162 5.95878 1.75897 7.17225C1.25631 8.38572 0.998388 9.68655 1.00001 11C0.998388 12.3135 1.25631 13.6143 1.75897 14.8278C2.26162 16.0412 2.99909 17.1434 3.92901 18.071C4.85659 19.0009 5.95878 19.7384 7.17225 20.2411C8.38572 20.7437 9.68655 21.0016 11 21Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path d="M7 11L10 14L16 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </mask>
                      <g mask={`url(#mask0_criteria_${item.id})`}>
                        <path d="M-1 -1H23V23H-1V-1Z" fill="#5260FF" />
                      </g>
                    </svg>
                  </span>
                  <span className="criteria-text">
                    <span className="criteria-title">{item.title}</span>
                    <span className="criteria-description">{item.description}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="validator-comment">
            <span className="validator-comment__label">Комментарий валидатора</span>
            <div className="validator-comment__text">
              Документ в целом соответствует требованиям. Нужно уточнить источники данных в разделе
              рисков и добавить ссылку на исходные макеты. При следующей версии желательно расширить
              перечень артефактов и добавить описание этапов проверки.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
