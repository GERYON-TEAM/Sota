type RejectReasonModalProps = {
  isOpen: boolean
  reason: string
  onReasonChange: (value: string) => void
  onClose: () => void
  onConfirm: () => void
}

export default function RejectReasonModal({ isOpen, reason, onReasonChange, onClose, onConfirm }: RejectReasonModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
        <div className="profile-modal__head">
          <h3>Причина отклонения</h3>
          <button className="profile-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>×</button>
        </div>
        <div className="profile-modal__body">
          <label className="profile-modal__field">
            <span className="profile-modal__label">Комментарий</span>
            <textarea className="profile-modal__input" value={reason} onChange={(event) => onReasonChange(event.target.value)} />
          </label>
        </div>
        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={onClose}>Отмена</button>
          <button className="profile-modal__btn profile-modal__btn--danger" type="button" onClick={onConfirm}>Отклонить</button>
        </div>
      </div>
    </div>
  )
}
