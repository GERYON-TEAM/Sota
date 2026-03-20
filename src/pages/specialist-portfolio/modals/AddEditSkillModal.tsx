type AddEditSkillModalProps = {
  skillTypeOpen: boolean
  setSkillTypeOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  skillType: string
  setSkillType: (value: string) => void
  newSkillTitle: string
  setNewSkillTitle: (value: string) => void
  skillLevelOpen: boolean
  setSkillLevelOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  skillLevel: string
  setSkillLevel: (value: string) => void
  progressOpen: boolean
  setProgressOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  progress: number
  setProgress: (value: number) => void
  onClose: () => void
  onSave: () => void
}

export default function AddEditSkillModal({
  skillTypeOpen,
  setSkillTypeOpen,
  skillType,
  setSkillType,
  newSkillTitle,
  setNewSkillTitle,
  skillLevelOpen,
  setSkillLevelOpen,
  skillLevel,
  setSkillLevel,
  progressOpen,
  setProgressOpen,
  progress,
  setProgress,
  onClose,
  onSave,
}: AddEditSkillModalProps) {
  const progressOptions = [1, 2, 3, 4, 5]

  return (
    <div className="edit-modal">
      <button className="edit-modal__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />
      <div
        className="edit-modal__panel"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-modal__head">
          <h3>Добавить навык</h3>
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
          <span className="edit-modal__label">Тип навыка</span>
          <div className={`edit-select ${skillTypeOpen ? 'is-open' : ''}`} onClick={() => setSkillTypeOpen((prev) => !prev)}>
            <span className="edit-select__value">{skillType || 'Выберите тип навыка'}</span>
            <span className="edit-select__chevron" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {skillTypeOpen && (
              <div className="edit-select__menu">
                {['Hard Skills', 'Soft Skills'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="edit-select__item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setSkillType(item)
                      setSkillTypeOpen(false)
                    }}
                  >
                    <span className="edit-select__label">{item}</span>
                    <span className={`edit-select__check${skillType === item ? ' is-visible' : ''}`} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask
                          id={`mask-skill-type-${item.replace(/\s+/g, '-').toLowerCase()}`}
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
                        <g mask={`url(#mask-skill-type-${item.replace(/\s+/g, '-').toLowerCase()})`}>
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
          <span className="edit-modal__label">Название</span>
          <textarea
            className="edit-textarea edit-textarea--compact"
            value={newSkillTitle}
            onChange={(event) => setNewSkillTitle(event.target.value)}
            placeholder="Название навыка"
          />
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Уровень</span>
          <div className={`edit-select ${skillLevelOpen ? 'is-open' : ''}`} onClick={() => setSkillLevelOpen((prev) => !prev)}>
            <span className="edit-select__value">{skillLevel || 'Выберите уровень навыка'}</span>
            <span className="edit-select__chevron" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {skillLevelOpen && (
              <div className="edit-select__menu">
                {['Junior', 'Middle', 'Senior'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="edit-select__item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setSkillLevel(item)
                      setSkillLevelOpen(false)
                    }}
                  >
                    <span className="edit-select__label">{item}</span>
                    <span className={`edit-select__check${skillLevel === item ? ' is-visible' : ''}`} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask
                          id={`mask-skill-level-${item.replace(/\s+/g, '-').toLowerCase()}`}
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
                        <g mask={`url(#mask-skill-level-${item.replace(/\s+/g, '-').toLowerCase()})`}>
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
          <span className="edit-modal__label">Прогресс</span>
          <div className={`edit-select ${progressOpen ? 'is-open' : ''}`} onClick={() => setProgressOpen((prev) => !prev)}>
            <span className="edit-select__value">
              {progress ? `${progress} балл${progress > 1 ? (progress < 5 ? 'а' : 'ов') : ''}` : 'Выберите уровень прогресса'}
            </span>
            <span className="edit-select__chevron" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 10L12 15L7 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {progressOpen && (
              <div className="edit-select__menu">
                {progressOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="edit-select__item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setProgress(item)
                      setProgressOpen(false)
                    }}
                  >
                    <span className="edit-select__label">{item} балл{item > 1 ? (item < 5 ? 'а' : 'ов') : ''}</span>
                    <span className={`edit-select__check${progress === item ? ' is-visible' : ''}`} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask
                          id={`mask-progress-level-${item}`}
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
                        <g mask={`url(#mask-progress-level-${item})`}>
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
