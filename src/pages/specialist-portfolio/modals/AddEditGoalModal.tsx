import type { RefObject } from 'react'

type AddEditGoalModalProps = {
  goalStatusOpen: boolean
  setGoalStatusOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  newGoalTitle: string
  setNewGoalTitle: (value: string) => void
  newGoalDescription: string
  setNewGoalDescription: (value: string) => void
  newGoalStatus: string
  setNewGoalStatus: (value: string) => void
  newGoalProgress: string
  setNewGoalProgress: (value: string) => void
  newGoalStart: string
  setNewGoalStart: (value: string) => void
  newGoalEnd: string
  setNewGoalEnd: (value: string) => void
  formatDate: (value: string) => string
  startDateRef: RefObject<HTMLInputElement | null>
  endDateRef: RefObject<HTMLInputElement | null>
  openDatePicker: (ref: RefObject<HTMLInputElement | null>) => void
  onClose: () => void
  onSave: () => void
}

export default function AddEditGoalModal({
  goalStatusOpen,
  setGoalStatusOpen,
  newGoalTitle,
  setNewGoalTitle,
  newGoalDescription,
  setNewGoalDescription,
  newGoalStatus,
  setNewGoalStatus,
  newGoalProgress,
  setNewGoalProgress,
  newGoalStart,
  setNewGoalStart,
  newGoalEnd,
  setNewGoalEnd,
  formatDate,
  startDateRef,
  endDateRef,
  openDatePicker,
  onClose,
  onSave,
}: AddEditGoalModalProps) {
  return (
    <div className="edit-modal">
      <button className="edit-modal__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />
      <div className="edit-modal__panel" role="dialog" aria-modal="true">
        <div className="edit-modal__head">
          <h3>Цель</h3>
          <button className="edit-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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

        <div className="edit-modal__section">
          <span className="edit-modal__label">Название</span>
          <input
            className="edit-tech__input"
            value={newGoalTitle}
            onChange={(event) => setNewGoalTitle(event.target.value)}
            placeholder="Укажите название цели"
          />
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Описание</span>
          <textarea
            className="edit-textarea"
            value={newGoalDescription}
            onChange={(event) => setNewGoalDescription(event.target.value)}
            placeholder="Введите описание вашей цели"
          />
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Статус</span>
          <div className={`edit-select ${goalStatusOpen ? 'is-open' : ''}`} onClick={() => setGoalStatusOpen((prev) => !prev)}>
            <span className="edit-select__value">{newGoalStatus || 'Выберите статус цели'}</span>
            <span className="edit-select__chevron" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {goalStatusOpen && (
              <div className="edit-select__menu">
                {['В процессе', 'Достигнуто', 'На паузе'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="edit-select__item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setNewGoalStatus(item)
                      setGoalStatusOpen(false)
                    }}
                  >
                    <span className="edit-select__label">{item}</span>
                    <span className={`edit-select__check${newGoalStatus === item ? ' is-visible' : ''}`} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask
                          id="mask-goal-status"
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
                          <path d="M8 12L11 15L17 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </mask>
                        <g mask="url(#mask-goal-status)">
                          <path d="M0 0H24V24H0V0Z" fill="#5260FF" />
                        </g>
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Прогресс, %</span>
          <div className="edit-percent">
            <input
              className="edit-percent__input"
              inputMode="numeric"
              pattern="[0-9]*"
              value={newGoalProgress}
              onChange={(event) => {
                const digits = event.target.value.replace(/[^\d]/g, '')
                if (digits === '') {
                  setNewGoalProgress('')
                  return
                }
                const n = Math.max(0, Math.min(100, Number(digits)))
                setNewGoalProgress(String(n))
                if (n >= 100) {
                  setNewGoalStatus('достигнуто')
                }
              }}
              placeholder="Укажите процент выполнения"
            />
            <span className="edit-percent__suffix">%</span>
          </div>
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Timeline</span>
          <div className="edit-date__row">
            <div className={`edit-date__input${newGoalStart ? ' is-filled' : ''}`}>
              <span className="edit-date__label">Дата начала</span>
              <span className="edit-date__value">{formatDate(newGoalStart)}</span>
              <button
                type="button"
                className="edit-date__icon"
                aria-label="Выбрать дату начала"
                onClick={() => openDatePicker(startDateRef)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2V5M17 2V5M3 9H21" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
                  <path
                    d="M6 5H18C19.6569 5 21 6.34315 21 8V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V8C3 6.34315 4.34315 5 6 5Z"
                    stroke="#696E82"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <input
                ref={startDateRef}
                className="edit-date__picker"
                type="date"
                value={newGoalStart}
                onChange={(event) => setNewGoalStart(event.target.value)}
                aria-label="Дата начала"
              />
            </div>
            {newGoalStatus.trim().toLowerCase() === 'достигнуто' && (
              <div className={`edit-date__input edit-date__input--end${newGoalEnd ? ' is-filled' : ''}`}>
                <span className="edit-date__label">Дата окончания</span>
                <span className="edit-date__value">{formatDate(newGoalEnd)}</span>
                <button
                  type="button"
                  className="edit-date__icon"
                  aria-label="Выбрать дату окончания"
                  onClick={() => openDatePicker(endDateRef)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2V5M17 2V5M3 9H21" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
                    <path
                      d="M6 5H18C19.6569 5 21 6.34315 21 8V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V8C3 6.34315 4.34315 5 6 5Z"
                      stroke="#696E82"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                <input
                  ref={endDateRef}
                  className="edit-date__picker"
                  type="date"
                  value={newGoalEnd}
                  onChange={(event) => setNewGoalEnd(event.target.value)}
                  aria-label="Дата окончания"
                />
              </div>
            )}
          </div>
        </div>

        <div className="edit-modal__actions">
          <button className="edit-action edit-action--ghost" type="button" onClick={onClose}>
            Отменить
          </button>
          <button className="edit-action edit-action--primary" type="button" onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
