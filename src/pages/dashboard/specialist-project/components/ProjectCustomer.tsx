import RatingDots from '../../../../shared/ui/color-dots/RatingDots'
import type { ProjectCustomerStat } from '../types/project.types'
import CustomerLinks from './CustomerLinks'

export default function ProjectCustomer() {
  const stats: ProjectCustomerStat[] = [
    { label: 'Должность', value: 'Заказчик' },
    { label: 'Опыт', value: '5 лет' },
  ]

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
          <RatingDots className="project-customer__rating" />
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

      <button className="project-customer__cta" type="button">
        Откликнуться
      </button>
    </aside>
  )
}
