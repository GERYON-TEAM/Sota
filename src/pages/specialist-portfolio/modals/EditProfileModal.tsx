type EditProfileModalProps = {
  editAvatarUrl: string | null
  isAvatarDragOver: boolean
  setIsAvatarDragOver: (value: boolean) => void
  handleAvatarFiles: (files: FileList | null) => void
  editAboutText: string
  setEditAboutText: (value: string) => void
  editTechInput: string
  setEditTechInput: (value: string) => void
  editTechList: string[]
  setEditTechList: (value: string[] | ((prev: string[]) => string[])) => void
  editGithubUrl: string
  setEditGithubUrl: (value: string) => void
  editTelegramUrl: string
  setEditTelegramUrl: (value: string) => void
  editEmailAddress: string
  setEditEmailAddress: (value: string) => void
  onClose: () => void
  onSave: () => void
}

export default function EditProfileModal({
  editAvatarUrl,
  isAvatarDragOver,
  setIsAvatarDragOver,
  handleAvatarFiles,
  editAboutText,
  setEditAboutText,
  editTechInput,
  setEditTechInput,
  editTechList,
  setEditTechList,
  editGithubUrl,
  setEditGithubUrl,
  editTelegramUrl,
  setEditTelegramUrl,
  editEmailAddress,
  setEditEmailAddress,
  onClose,
  onSave,
}: EditProfileModalProps) {
  return (
    <div className="edit-modal">
      <button className="edit-modal__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />
      <div className="edit-modal__panel" role="dialog" aria-modal="true">
        <div className="edit-modal__head">
          <h3>Редактирование информации</h3>
          <button className="edit-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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

        <div className="edit-modal__section">
          <span className="edit-modal__label">Фото профиля</span>
          <div className="edit-upload">
            <label
              className={`edit-upload__drop ${isAvatarDragOver ? 'is-dragover' : ''}`}
              onDragEnter={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsAvatarDragOver(true)
              }}
              onDragOver={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsAvatarDragOver(true)
              }}
              onDragLeave={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsAvatarDragOver(false)
              }}
              onDrop={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsAvatarDragOver(false)
                handleAvatarFiles(event.dataTransfer.files)
              }}
            >
              <input
                className="edit-upload__input"
                type="file"
                accept="image/*"
                onChange={(event) => handleAvatarFiles(event.target.files)}
              />
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M17.0013 22.0644C16.8124 22.0644 16.6353 22.0351 16.4701 21.9766C16.3048 21.918 16.1513 21.8175 16.0096 21.6748L10.9096 16.5748C10.6263 16.2915 10.4903 15.961 10.5016 15.5832C10.513 15.2054 10.649 14.8748 10.9096 14.5915C11.193 14.3082 11.5297 14.1608 11.9197 14.1495C12.3098 14.1382 12.646 14.2737 12.9284 14.5561L15.5846 17.2123V7.08318C15.5846 6.68179 15.7206 6.34556 15.9926 6.07451C16.2646 5.80345 16.6009 5.66745 17.0013 5.66651C17.4017 5.66556 17.7384 5.80156 18.0114 6.07451C18.2843 6.34745 18.4199 6.68368 18.418 7.08318V17.2123L21.0742 14.5561C21.3576 14.2728 21.6942 14.1368 22.0843 14.1481C22.4744 14.1594 22.8106 14.3072 23.093 14.5915C23.3527 14.8748 23.4887 15.2054 23.501 15.5832C23.5132 15.961 23.3772 16.2915 23.093 16.5748L17.993 21.6748C17.8513 21.8165 17.6978 21.9171 17.5326 21.9766C17.3673 22.0361 17.1902 22.0654 17.0013 22.0644ZM8.5013 28.3332C7.72214 28.3332 7.05536 28.056 6.50097 27.5016C5.94658 26.9472 5.66891 26.28 5.66797 25.4998V22.6665C5.66797 22.2651 5.80397 21.9289 6.07597 21.6578C6.34797 21.3868 6.68419 21.2508 7.08464 21.2498C7.48508 21.2489 7.82177 21.3849 8.09472 21.6578C8.36766 21.9308 8.50319 22.267 8.5013 22.6665V25.4998H25.5013V22.6665C25.5013 22.2651 25.6373 21.9289 25.9093 21.6578C26.1813 21.3868 26.5175 21.2508 26.918 21.2498C27.3184 21.2489 27.6551 21.3849 27.9281 21.6578C28.201 21.9308 28.3365 22.267 28.3346 22.6665V25.4998C28.3346 26.279 28.0574 26.9463 27.5031 27.5016C26.9487 28.0569 26.2814 28.3341 25.5013 28.3332H8.5013Z"
                  fill="#E8E9EE"
                />
              </svg>
              <span>Выберите или перетащите файл</span>
            </label>
            <div
              className="edit-upload__preview"
              aria-hidden="true"
              style={editAvatarUrl ? { backgroundImage: `url(${editAvatarUrl})` } : undefined}
            />
          </div>
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">О специалисте</span>
          <textarea
            className="edit-textarea"
            value={editAboutText}
            onChange={(event) => setEditAboutText(event.target.value)}
          />
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Стек технологий</span>
          <div className="edit-tech">
            <input
              className="edit-tech__input"
              value={editTechInput}
              onChange={(event) => setEditTechInput(event.target.value)}
              placeholder="Добавить технологию"
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return
                event.preventDefault()
                const value = editTechInput.trim()
                if (!value) return
                if (editTechList.includes(value)) {
                  setEditTechInput('')
                  return
                }
                setEditTechList((prev) => [...prev, value])
                setEditTechInput('')
              }}
            />
            <button
              className="edit-tech__plus"
              type="button"
              aria-label="Добавить"
              onClick={() => {
                const value = editTechInput.trim()
                if (!value) return
                if (editTechList.includes(value)) {
                  setEditTechInput('')
                  return
                }
                setEditTechList((prev) => [...prev, value])
                setEditTechInput('')
              }}
            >
              <span>+</span>
            </button>
          </div>
          <div className="edit-tech__list">
            {editTechList.map((tech) => (
              <span className="edit-tech__chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="edit-modal__section">
          <span className="edit-modal__label">Контакты</span>
          <div className="edit-contacts">
            <input
              className="edit-contacts__input"
              placeholder="Ссылка на GitHub (https://github.com/username)"
              value={editGithubUrl}
              onChange={(event) => setEditGithubUrl(event.target.value)}
            />
            <input
              className="edit-contacts__input"
              placeholder="Telegram (@username или https://t.me/username)"
              value={editTelegramUrl}
              onChange={(event) => setEditTelegramUrl(event.target.value)}
            />
            <input
              className="edit-contacts__input"
              placeholder="Почта (name@example.com)"
              value={editEmailAddress}
              onChange={(event) => setEditEmailAddress(event.target.value)}
            />
          </div>
        </div>

        <div className="edit-modal__actions">
          <button className="edit-action edit-action--ghost" type="button" onClick={onClose}>
            Отменить
          </button>
          <button className="edit-action edit-action--primary" type="button" onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
