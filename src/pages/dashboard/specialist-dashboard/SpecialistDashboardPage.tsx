import './styles/index.css'
import Sidebar from './components/Sidebar'
import HeaderBar from './components/HeaderBar'
import StatsSection from './components/StatsSection'
import ActiveProjectsSection from './components/ActiveProjectsSection'
import InvitesSection from './components/InvitesSection'
import { useDashboardDropdowns } from './hooks/useDashboardDropdowns'
import { useSpecialistDashboardData } from './hooks/useSpecialistDashboardData'

export default function SpecialistDashboardPage() {
  const hasNotifications = true
  const { stats, projects, invites, loading, error } = useSpecialistDashboardData()

  const {
    deadlineOpen,
    deadlineSort,
    matchOpen,
    matchSort,
    bellOpen,
    setDeadlineOpen,
    setDeadlineSort,
    setMatchOpen,
    setMatchSort,
    setBellOpen,
  } = useDashboardDropdowns()

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <main className="dashboard-content">
          <div className="dashboard-surface" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p>Загрузка...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard">
        <Sidebar />
        <main className="dashboard-content">
          <div className="dashboard-surface" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p style={{ color: '#e53935' }}>{error}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar
          hasNotifications={hasNotifications}
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <StatsSection stats={stats} />

          <ActiveProjectsSection
            projects={projects}
            deadlineOpen={deadlineOpen}
            deadlineSort={deadlineSort}
            onDeadlineToggle={() => setDeadlineOpen((prev) => !prev)}
            onDeadlineSelect={(value) => {
              setDeadlineSort(value)
              setDeadlineOpen(false)
            }}
          />

          <InvitesSection
            invites={invites}
            matchOpen={matchOpen}
            matchSort={matchSort}
            onMatchToggle={() => setMatchOpen((prev) => !prev)}
            onMatchSelect={(value) => {
              setMatchSort(value)
              setMatchOpen(false)
            }}
          />
        </div>
      </main>
    </div>
  )
}
