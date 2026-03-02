type ConfirmLeaveModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmLeaveModal({ isOpen, onClose, onConfirm }: ConfirmLeaveModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-confirm" onClick={(event) => event.stopPropagation()}>
        <h3>У вас есть несохранённые изменения</h3>
        <p className="profile-confirm__text">Сохранить черновик перед выходом?</p>
        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={onClose}>Остаться</button>
          <button className="profile-modal__btn profile-modal__btn--primary" type="button" onClick={onConfirm}>Сохранить и выйти</button>
        </div>
      </div>
    </div>
  )
}
