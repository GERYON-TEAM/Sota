import type { ProjectActionState, ProjectCustomerStat } from '../types/project.types'
import CustomerLinks from './CustomerLinks'

type ProjectCustomerProps = {
  actionState: ProjectActionState
}

export default function ProjectCustomer({ actionState }: ProjectCustomerProps) {
  const stats: ProjectCustomerStat[] = [
    { label: 'Должность', value: 'Заказчик' },
  ]
  const actionConfig: Record<
    ProjectActionState,
    { label: string; className: string; disabled: boolean }
  > = {
    available: {
      label: 'Откликнуться',
      className: 'project-customer__cta--primary',
      disabled: false,
    },
    applied: {
      label: 'Вы уже откликнулись',
      className: 'project-customer__cta--applied',
      disabled: true,
    },
    invited: {
      label: 'Вы получили приглашение',
      className: 'project-customer__cta--invited',
      disabled: true,
    },
    in_team: {
      label: 'Вы в команде',
      className: 'project-customer__cta--in-team',
      disabled: true,
    },
  }
  const currentAction = actionConfig[actionState]

  return (
    <aside className="project-customer">
      <h3>О заказчике</h3>
      <div className="project-customer__card">
        <div className="project-customer__profile">
          <div className="project-customer__avatar" aria-hidden="true" />
          <div className="project-customer__info">
            <span className="project-customer__name">Нестеров</span>
            <span className="project-customer__name">Ярослав</span>
          </div>
        </div>

        <div className="project-customer__stats">
          {stats.map((stat) => (
            <div className="project-customer__stat" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        <p className="project-customer__desc">
          Это краткое описание заказчика. Оно занимает пару строк и рассказывает о заказчике
          основную информацию.
        </p>
      </div>

      <CustomerLinks />

      <button
        className={`project-customer__cta ${currentAction.className}`}
        type="button"
        disabled={currentAction.disabled}
      >
        {currentAction.label}
      </button>
    </aside>
  )
}
