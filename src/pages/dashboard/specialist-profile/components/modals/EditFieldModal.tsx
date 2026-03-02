type EditFieldModalProps = {
  isOpen: boolean
  currentPassword: string
  newPassword: string
  confirmPassword: string
  onChangeCurrent: (value: string) => void
  onChangeNew: (value: string) => void
  onChangeConfirm: (value: string) => void
  onClose: () => void
  onSave: () => void
}

export default function EditFieldModal({
  isOpen,
  currentPassword,
  newPassword,
  confirmPassword,
  onChangeCurrent,
  onChangeNew,
  onChangeConfirm,
  onClose,
  onSave,
}: EditFieldModalProps) {
  if (!isOpen) return null

  return (
    <div className="profile-modal__overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
        <div className="profile-modal__head">
          <h3>Изменить пароль</h3>
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

        <div className="profile-modal__body">
          <label className="profile-modal__field">
            <span className="profile-modal__label">Текущий пароль</span>
            <input
              className="profile-modal__input"
              type="password"
              value={currentPassword}
              onChange={(event) => onChangeCurrent(event.target.value)}
            />
          </label>
          <label className="profile-modal__field">
            <span className="profile-modal__label">Новый пароль</span>
            <input
              className="profile-modal__input"
              type="password"
              value={newPassword}
              onChange={(event) => onChangeNew(event.target.value)}
            />
          </label>
          <label className="profile-modal__field">
            <span className="profile-modal__label">Повторите пароль</span>
            <input
              className="profile-modal__input"
              type="password"
              value={confirmPassword}
              onChange={(event) => onChangeConfirm(event.target.value)}
            />
          </label>
        </div>

        <div className="profile-modal__actions">
          <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={onClose}>
            Отмена
          </button>
          <button className="profile-modal__btn profile-modal__btn--primary" type="button" onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
