type ConfirmLeaveModalProps = {
  isOpen: boolean
  onClose: () => void
  onDiscard: () => void
  onSaveAndExit: () => void
}

export default function ConfirmLeaveModal({
  isOpen,
  onClose,
  onDiscard,
  onSaveAndExit,
}: ConfirmLeaveModalProps) {
  if (!isOpen) return null

  return (
    <div className="customer-new-project-leave-modal__overlay" onClick={onClose}>
      <div className="customer-new-project-leave-modal" onClick={(event) => event.stopPropagation()}>
        <h3>Выйти без сохранения?</h3>
        <p className="customer-new-project-leave-modal__text">
          Вы точно хотите выйти со страницы создания проекта? Несохраненные данные будут утеряны.
        </p>
        <div className="customer-new-project-leave-modal__actions">
          <button
            className="customer-new-project-leave-modal__button customer-new-project-leave-modal__button--secondary"
            type="button"
            onClick={onDiscard}
          >
            Выйти без сохранения
          </button>
          <button
            className="customer-new-project-leave-modal__button customer-new-project-leave-modal__button--primary"
            type="button"
            onClick={onSaveAndExit}
          >
            Сохранить и выйти
          </button>
        </div>
      </div>
    </div>
  )
}
