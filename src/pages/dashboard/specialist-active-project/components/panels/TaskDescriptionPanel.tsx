type TaskDescriptionPanelProps = {
  text: string
  isEditing: boolean
  onStartEdit: () => void
  onSave: () => void
  onCancel: () => void
  onChange: (value: string) => void
}

export default function TaskDescriptionPanel({
  text,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
  onChange,
}: TaskDescriptionPanelProps) {
  return (
    <div className="kanban-description">
      {isEditing ? (
        <textarea
          className="kanban-description__editor"
          value={text}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <div className="kanban-description__text">{text}</div>
      )}
      <div className="kanban-description__actions">
        {isEditing ? (
          <>
            <button
              className="kanban-description__action kanban-description__action--cancel"
              type="button"
              onClick={onCancel}
            >
              Отмена
            </button>
            <button
              className="kanban-description__action kanban-description__action--save"
              type="button"
              onClick={onSave}
            >
              Сохранить
            </button>
          </>
        ) : (
          <button className="kanban-description__action kanban-description__action--cancel" type="button" onClick={onStartEdit}>
            Редактировать
          </button>
        )}
      </div>
    </div>
  )
}
