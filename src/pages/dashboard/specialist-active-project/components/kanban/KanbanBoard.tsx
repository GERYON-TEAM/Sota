import KanbanColumn from './KanbanColumn'

type KanbanBoardProps = {
  onColumnMenuClick: () => void
}

const columns = ['Нужно сделать', 'В работе', 'На рассмотрении', 'Завершено']

export default function KanbanBoard({ onColumnMenuClick }: KanbanBoardProps) {
  return (
    <div className="project-workspace__boards">
      {columns.map((title) => (
        <KanbanColumn key={title} title={title} onMenuClick={onColumnMenuClick} />
      ))}
    </div>
  )
}
