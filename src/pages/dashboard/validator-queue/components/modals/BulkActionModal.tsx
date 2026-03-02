type BulkActionModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function BulkActionModal({ isOpen, onClose }: BulkActionModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-confirm" onClick={(event) => event.stopPropagation()}>
        <h3>Массовые действия</h3>
        <p className="profile-confirm__text">Функция будет доступна позже.</p>
        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}
