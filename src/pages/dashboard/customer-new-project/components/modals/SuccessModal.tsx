type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-confirm" onClick={(event) => event.stopPropagation()}>
        <h3>Проект создан</h3>
        <p className="profile-confirm__text">Ваш проект успешно опубликован и доступен специалистам.</p>
        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--primary" type="button" onClick={onClose}>Понятно</button>
        </div>
      </div>
    </div>
  )
}
