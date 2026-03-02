type ConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmModal({ isOpen, onClose, onConfirm }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-confirm" onClick={(event) => event.stopPropagation()}>
        <div className="profile-modal__head">
          <h3>Удалить аккаунт?</h3>
          <button className="profile-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
        <p className="profile-confirm__text">
          Вы точно хотите удалить аккаунт? Это действие необратимо.
        </p>
        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={onClose}>
            Отмена
          </button>
          <button className="profile-modal__btn profile-modal__btn--danger" type="button" onClick={onConfirm}>
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  )
}
