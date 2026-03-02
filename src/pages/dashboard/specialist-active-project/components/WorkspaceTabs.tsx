import type { WorkspaceTab } from '../types/active-project.types'

type WorkspaceTabsProps = {
  active: WorkspaceTab
  onChange: (tab: WorkspaceTab) => void
}

export default function WorkspaceTabs({ active, onChange }: WorkspaceTabsProps) {
  return (
    <div className="project-workspace__tabs">
      <button
        className={`project-workspace__tab${active === 'tasks' ? ' is-active' : ''}`}
        type="button"
        onClick={() => onChange('tasks')}
      >
        Задачи
      </button>
      <button
        className={`project-workspace__tab${active === 'team' ? ' is-active' : ''}`}
        type="button"
        onClick={() => onChange('team')}
      >
        Состав команды
      </button>
      <button
        className={`project-workspace__tab${active === 'artifacts' ? ' is-active' : ''}`}
        type="button"
        onClick={() => onChange('artifacts')}
      >
        Артефакты
      </button>
      <button
        className={`project-workspace__tab${active === 'activity' ? ' is-active' : ''}`}
        type="button"
        onClick={() => onChange('activity')}
      >
        Activity Log
      </button>
    </div>
  )
}
