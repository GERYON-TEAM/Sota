type TaskDescriptionPanelProps = {
  text: string
  isEditing: boolean
  onToggleEdit: () => void
  onChange: (value: string) => void
}

export default function TaskDescriptionPanel({
  text,
  isEditing,
  onToggleEdit,
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
        <button className="kanban-description__edit" type="button" onClick={onToggleEdit}>
          {isEditing ? 'Сохранить' : 'Редактировать'}
        </button>
      </div>
    </div>
  )
}
