import type { ChecklistCriterion } from '../../types/validator-queue.types'

type QueueActionsPanelProps = {
  decisionView: 'checklist' | 'comment'
  checkedCriteria: string[]
  commentText: string
  checklistCriteria: ChecklistCriterion[]
  onDecisionViewChange: (view: 'checklist' | 'comment') => void
  onToggleCriterion: (id: string) => void
  onCommentChange: (value: string) => void
  onOpenRejectModal: () => void
}

export default function QueueActionsPanel({
  decisionView,
  checkedCriteria,
  commentText,
  checklistCriteria,
  onDecisionViewChange,
  onToggleCriterion,
  onCommentChange,
  onOpenRejectModal,
}: QueueActionsPanelProps) {
  return (
    <article className="validator-queue-column validator-queue-column--decision">
      <div className="validator-queue-column__head validator-queue-column__head--decision">
        <h2>Решение</h2>
        <div className="validator-queue-switch" role="tablist" aria-label="Режим решения">
          <button className={`validator-queue-switch__item${decisionView === 'checklist' ? ' is-active' : ''}`} type="button" onClick={() => onDecisionViewChange('checklist')}>
            Чек лист
          </button>
          <button className={`validator-queue-switch__item${decisionView === 'comment' ? ' is-active' : ''}`} type="button" onClick={() => onDecisionViewChange('comment')}>
            Комментарий
          </button>
        </div>
      </div>

      {decisionView === 'checklist' ? (
        <ul className="validator-queue-checklist">
          {checklistCriteria.map((criterion) => {
            const isChecked = checkedCriteria.includes(criterion.id)
            return (
              <li key={criterion.id}>
                <button className={`validator-checklist-item${isChecked ? ' is-checked' : ''}`} type="button" onClick={() => onToggleCriterion(criterion.id)}>
                  <span className={`validator-checklist-radio${isChecked ? ' is-checked' : ''}`} />
                  <span className="validator-checklist-text">
                    <strong>{criterion.title}</strong>
                    <span>{criterion.description}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="validator-comment-wrap">
          <button className="validator-comment-edit" type="button">Редактировать</button>
          <textarea
            className="validator-queue-comment"
            value={commentText}
            onChange={(event) => onCommentChange(event.target.value)}
            placeholder="Добавьте комментарий к артефакту. Большой текст переносится на новую строку."
          />
        </div>
      )}

      <div className="validator-decision-actions">
        <div className="validator-decision-actions__row">
          <button className="validator-decision-button validator-decision-button--secondary" type="button">Необходимы изменения</button>
          <button className="validator-decision-button validator-decision-button--primary" type="button">Одобрено</button>
        </div>
        <button className="validator-decision-button validator-decision-button--critical" type="button" onClick={onOpenRejectModal}>
          Критичное несоответствие
        </button>
      </div>
    </article>
  )
}
