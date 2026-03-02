type TemplateModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-confirm" onClick={(event) => event.stopPropagation()}>
        <h3>Выбор шаблона</h3>
        <p className="profile-confirm__text">Шаблоны проекта будут добавлены в следующей итерации.</p>
        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}
