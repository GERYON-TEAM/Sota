import RatingDots from '../../../shared/ui/color-dots/RatingDots'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import ProjectStats from '../specialist-project/components/ProjectStats'
import ProjectRequirements from '../specialist-project/components/ProjectRequirements'
import ProjectDescriptionModal from '../specialist-project/components/ProjectDescriptionModal'
import CustomerLinks from '../specialist-project/components/CustomerLinks'
import InviteBreadcrumbTitle from './components/InviteBreadcrumbTitle'
import InviteActions from './components/InviteActions'
import { useInviteProjectUi } from './hooks/useInviteProjectUi'

export default function InviteProjectPage() {
  const { bellOpen, setBellOpen, descOpen, setDescOpen, matchPercent, matchClass } =
    useInviteProjectUi()

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar
          title={<InviteBreadcrumbTitle />}
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <ProjectStats
            matchPercent={matchPercent}
            matchClass={matchClass}
            onOpenDescription={() => setDescOpen(true)}
          />

          <section className="project-details">
            <ProjectRequirements />

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
                  <div className="project-customer__stat">
                    <span>Должность</span>
                    <strong>Заказчик</strong>
                  </div>
                  <div className="project-customer__stat">
                    <span>Опыт</span>
                    <strong>5 лет</strong>
                  </div>
                </div>

                <p className="project-customer__desc">
                  Это краткое описание заказчика. Оно занимает пару строк и рассказывает о заказчике
                  основную информацию.
                </p>
              </div>

              <CustomerLinks />
              <InviteActions />
            </aside>
          </section>
        </div>
      </main>
      <ProjectDescriptionModal isOpen={descOpen} onClose={() => setDescOpen(false)} />
    </div>
  )
}
