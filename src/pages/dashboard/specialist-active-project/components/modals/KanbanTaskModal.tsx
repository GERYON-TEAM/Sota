import type { RefObject } from 'react'
import type { ModalTab } from '../../types/active-project.types'
import TaskDescriptionPanel from '../panels/TaskDescriptionPanel'
import ProjectChat from '../panels/ProjectChat'
import type { ChatMessage } from '../../types/active-project.types'

type KanbanTaskModalProps = {
  activeTab: ModalTab
  onTabChange: (tab: ModalTab) => void
  statusOpen: boolean
  onStatusToggle: () => void
  priorityOpen: boolean
  onPriorityToggle: () => void
  taskStatus: string
  taskPriority: string
  statusOptions: string[]
  priorityOptions: string[]
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
  storyPoints: number
  onStoryPointsChange: (value: number) => void
  deadlineStart: string
  deadlineEnd: string
  onDeadlineStartChange: (value: string) => void
  onDeadlineEndChange: (value: string) => void
  startDateRef: RefObject<HTMLInputElement | null>
  endDateRef: RefObject<HTMLInputElement | null>
  onOpenDatePicker: (ref: RefObject<HTMLInputElement | null>) => void
  descriptionText: string
  descriptionEditing: boolean
  onDescriptionChange: (value: string) => void
  onDescriptionToggle: () => void
  chatInput: string
  messages: ChatMessage[]
  onChatInputChange: (value: string) => void
  onChatSend: () => void
  onClose: () => void
}

export default function KanbanTaskModal({
  activeTab,
  onTabChange,
  statusOpen,
  onStatusToggle,
  priorityOpen,
  onPriorityToggle,
  taskStatus,
  taskPriority,
  statusOptions,
  priorityOptions,
  onStatusChange,
  onPriorityChange,
  storyPoints,
  onStoryPointsChange,
  deadlineStart,
  deadlineEnd,
  onDeadlineStartChange,
  onDeadlineEndChange,
  startDateRef,
  endDateRef,
  onOpenDatePicker,
  descriptionText,
  descriptionEditing,
  onDescriptionChange,
  onDescriptionToggle,
  chatInput,
  messages,
  onChatInputChange,
  onChatSend,
  onClose,
}: KanbanTaskModalProps) {
  const formatDate = (value: string) => {
    if (!value) return 'Выберите дату'
    const [year, month, day] = value.split('-')
    if (!year || !month || !day) return value
    return `${day}.${month}.${year}`
  }

  return (
    <div className="kanban-modal__overlay" onClick={onClose}>
      <div className="kanban-modal" onClick={(event) => event.stopPropagation()}>
        <div className="kanban-modal__head">
          <h3>Создать документ</h3>
          <button
            className="kanban-modal__close"
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

        <div className="kanban-modal__tabs">
          {[
            { id: 'info', label: 'Инфо' },
            { id: 'description', label: 'Описание' },
            { id: 'artifacts', label: 'Артефакты' },
            { id: 'comments', label: 'Комментарии' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`kanban-modal__tab${activeTab === tab.id ? ' is-active' : ''}`}
              type="button"
              onClick={() => onTabChange(tab.id as ModalTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'info' && (
          <>
            <div className="kanban-modal__section">
              <div className="kanban-field__row">
                <span className="kanban-field__label">Исполнители</span>
                <button className="kanban-square-btn" type="button" aria-label="Добавить">
                  <span className="kanban-plus">+</span>
                </button>
              </div>
              <div className="kanban-assignee">
                <span className="kanban-assignee__avatar" aria-hidden="true" />
                <span className="kanban-assignee__name">Нестеров Ярослав</span>
              </div>
            </div>

            <div className="kanban-modal__section">
              <span className="kanban-select-label">Статус задачи</span>
              <div className={`kanban-select${statusOpen ? ' is-open' : ''}`} onClick={onStatusToggle}>
                <span className="kanban-select__left">
                  <span
                    className={`kanban-status-dot ${
                      taskStatus === 'В работе'
                        ? 'is-work'
                        : taskStatus === 'На рассмотрении'
                          ? 'is-review'
                          : taskStatus === 'Завершено'
                            ? 'is-done'
                            : 'is-todo'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="kanban-select__text">{taskStatus}</span>
                </span>
                <span className="kanban-select__chevron" aria-hidden="true">
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
                {statusOpen && (
                  <div className="kanban-select__menu">
                    {statusOptions.map((item, index) => {
                      const maskId = `mask-status-${index}`
                      return (
                        <button
                          key={item}
                          type="button"
                          className="kanban-select__item"
                          onPointerDown={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            onStatusChange(item)
                          }}
                        >
                          <span className="kanban-select__label">{item}</span>
                          <span
                            className={`kanban-select__check${taskStatus === item ? ' is-visible' : ''}`}
                            aria-hidden="true"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id={maskId}
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
                                <path
                                  d="M7 11L10 14L16 8"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </mask>
                              <g mask={`url(#${maskId})`}>
                                <path d="M-1 -1H23V23H-1V-1Z" fill="#5260FF" />
                              </g>
                            </svg>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="kanban-modal__section">
              <span className="kanban-select-label">Приоритет задачи</span>
              <div
                className={`kanban-select${priorityOpen ? ' is-open' : ''}`}
                onClick={onPriorityToggle}
              >
                <span className="kanban-select__left">
                  <span
                    className={`kanban-status-dot ${
                      taskPriority === 'П2'
                        ? 'is-p2'
                        : taskPriority === 'П3'
                          ? 'is-p3'
                          : taskPriority === 'П4'
                            ? 'is-p4'
                            : taskPriority === 'П5'
                              ? 'is-p5'
                              : 'is-p1'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="kanban-select__text">{taskPriority}</span>
                </span>
                <span className="kanban-select__chevron" aria-hidden="true">
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
                {priorityOpen && (
                  <div className="kanban-select__menu">
                    {priorityOptions.map((item, index) => {
                      const maskId = `mask-priority-${index}`
                      return (
                        <button
                          key={item}
                          type="button"
                          className="kanban-select__item"
                          onPointerDown={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            onPriorityChange(item)
                          }}
                        >
                          <span className="kanban-select__label">{item}</span>
                          <span
                            className={`kanban-select__check${taskPriority === item ? ' is-visible' : ''}`}
                            aria-hidden="true"
                          >
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id={maskId}
                                style={{ maskType: 'luminance' }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="22"
                                height="22"
                              >
                                <path
                                  d="M11 21C12.3135 21.0016 13.6143 20.7437 14.8278 20.2411C16.0412 19.7384 17.1434 19.0009 18.071 18.071C19.0009 17.1434 19.7384 16.0412 20.2411 14.8278C20.7437 13.6143 21.0016 12.3135 21 11C21.0016 9.68655 20.7437 8.38572 20.2411 7.17225C19.7384 5.95878 19.0009 4.85659 18.071 3.92901C17.1434 2.99909 16.0412 2.26162 14.8278 1.75897C13.6143 1.25631 12.3135 0.998388 11 1.00001C9.68655 0.998388 8.38572 1.25631 7.17225 1.75897C5.95878 2.26162 4.85659 2.99909 3.92901 3.92901C2.99909 4.85659 2.26162 6.95878 1.75897 8.17225C1.25631 9.38572 0.998388 10.6866 1.00001 12C0.998388 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 2.99909 18.1434 3.92901 19.071C4.85659 20.0009 5.95878 20.7384 7.17225 21.2411C8.38572 21.7437 9.68655 21.0016 11 21Z"
                                  fill="white"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 11L10 14L16 8"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </mask>
                              <g mask={`url(#${maskId})`}>
                                <path d="M-1 -1H23V23H-1V-1Z" fill="#5260FF" />
                              </g>
                            </svg>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'description' && (
          <TaskDescriptionPanel
            text={descriptionText}
            isEditing={descriptionEditing}
            onToggleEdit={onDescriptionToggle}
            onChange={onDescriptionChange}
          />
        )}

        {activeTab === 'comments' && (
          <ProjectChat
            messages={messages}
            chatInput={chatInput}
            onInputChange={onChatInputChange}
            onSend={onChatSend}
          />
        )}

        {activeTab === 'info' && (
          <>
            <div className="kanban-modal__section">
              <div className="kanban-select-label">Дедлайн</div>
              <div className="kanban-date-row">
                <div className={`kanban-date-input${deadlineStart ? ' is-filled' : ''}`}>
                  <span className="kanban-date-label">Дата начала</span>
                  <span className="kanban-date-value">{formatDate(deadlineStart)}</span>
                  <button
                    type="button"
                    className="kanban-date-icon"
                    aria-label="Выбрать дату начала"
                    onClick={() => onOpenDatePicker(startDateRef)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                    className="kanban-date-picker"
                    type="date"
                    value={deadlineStart}
                    onChange={(event) => onDeadlineStartChange(event.target.value)}
                  />
                </div>
                <div className={`kanban-date-input${deadlineEnd ? ' is-filled' : ''}`}>
                  <span className="kanban-date-label">Дата окончания</span>
                  <span className="kanban-date-value">{formatDate(deadlineEnd)}</span>
                  <button
                    type="button"
                    className="kanban-date-icon"
                    aria-label="Выбрать дату окончания"
                    onClick={() => onOpenDatePicker(endDateRef)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                    className="kanban-date-picker"
                    type="date"
                    value={deadlineEnd}
                    onChange={(event) => onDeadlineEndChange(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="kanban-modal__section">
              <div className="kanban-select-label">Сложность Story Points</div>
              <div className="kanban-select kanban-select--stepper">
                <input
                  className="kanban-select__input"
                  inputMode="numeric"
                  value={storyPoints}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/[^\d]/g, '')
                    if (digits === '') {
                      onStoryPointsChange(0)
                      return
                    }
                    const n = Math.max(0, Math.min(13, Number(digits)))
                    onStoryPointsChange(n)
                  }}
                />
                <span className="kanban-stepper" aria-hidden="true">
                  <button
                    className="kanban-stepper__btn"
                    type="button"
                    onClick={() => onStoryPointsChange(Math.min(13, storyPoints + 1))}
                    aria-label="Увеличить"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 14L12 9L17 14" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    className="kanban-stepper__btn"
                    type="button"
                    onClick={() => onStoryPointsChange(Math.max(0, storyPoints - 1))}
                    aria-label="Уменьшить"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 10L12 15L17 10" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
