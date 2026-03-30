import KanbanColumn from './KanbanColumn'

type KanbanBoardProps = {
  onColumnMenuClick: () => void
  onArtifactOpen: () => void
  onCreateProject: () => void
}

const columns = ['Нужно сделать', 'В работе', 'На рассмотрении', 'Завершено']

export default function KanbanBoard({
  onColumnMenuClick,
  onArtifactOpen,
  onCreateProject,
}: KanbanBoardProps) {
  return (
    <div className="project-workspace__boards">
      {columns.map((title) => (
        <KanbanColumn
          key={title}
          title={title}
          onMenuClick={onColumnMenuClick}
          onArtifactOpen={onArtifactOpen}
          onCreateProject={onCreateProject}
        />
      ))}
    </div>
  )
}
