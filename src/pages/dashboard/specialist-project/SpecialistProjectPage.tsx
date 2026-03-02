import ProjectBreadcrumbTitle from './components/ProjectBreadcrumbTitle'
import ProjectStats from './components/ProjectStats'
import ProjectDetails from './components/ProjectDetails'
import ProjectDescriptionModal from './components/ProjectDescriptionModal'
import { useProjectUi } from './hooks/useProjectUi'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'

export default function SpecialistProjectPage() {
  const { bellOpen, setBellOpen, descOpen, setDescOpen, matchClass } = useProjectUi()

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar
          title={<ProjectBreadcrumbTitle />}
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <ProjectStats
            matchPercent={matchClass.percent}
            matchClass={matchClass.className}
            onOpenDescription={() => setDescOpen(true)}
          />
          <ProjectDetails />
        </div>
      </main>
      <ProjectDescriptionModal isOpen={descOpen} onClose={() => setDescOpen(false)} />
    </div>
  )
}
