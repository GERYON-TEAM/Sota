import { useEffect, useState } from 'react'
import './styles/index.css'
import CustomerSidebar from './components/CustomerSidebar'
import CustomerHeaderBar from './components/CustomerHeaderBar'
import CustomerStatsSection from './components/CustomerStatsSection'
import CustomerActiveProjectsSection from './components/CustomerActiveProjectsSection'
import { useDashboardDropdowns } from '../specialist-dashboard/hooks/useDashboardDropdowns'
import { useCustomerDashboardData } from './hooks/useCustomerDashboardData'

const DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY = 'sota:customer-dashboard:publish-notice:v1'

type DashboardPublishNotice = {
  title: string
  description: string
  durationMs: number
}

export default function CustomerDashboardPage() {
  const hasNotifications = true
  const [publishNotice, setPublishNotice] = useState<DashboardPublishNotice | null>(null)
  const { projects, loading, error } = useCustomerDashboardData()

  const { bellOpen, setBellOpen } = useDashboardDropdowns()

  useEffect(() => {
    const rawNotice = sessionStorage.getItem(DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY)
    if (!rawNotice) return

    try {
      const parsed = JSON.parse(rawNotice) as Partial<DashboardPublishNotice>
      setPublishNotice({
        title: typeof parsed.title === 'string' ? parsed.title : 'Проект опубликован',
        description:
          typeof parsed.description === 'string'
            ? parsed.description
            : 'Ваш проект успешно выложен и доступен специалистам.',
        durationMs: typeof parsed.durationMs === 'number' && parsed.durationMs > 0 ? parsed.durationMs : 4800,
      })
    } catch {
      setPublishNotice({
        title: 'Проект опубликован',
        description: 'Ваш проект успешно выложен и доступен специалистам.',
        durationMs: 4800,
      })
    }
  }, [])

  useEffect(() => {
    if (!publishNotice) return
    const timeoutId = window.setTimeout(() => {
      setPublishNotice(null)
      sessionStorage.removeItem(DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY)
    }, publishNotice.durationMs)
    return () => window.clearTimeout(timeoutId)
  }, [publishNotice])

  return (
    <div className="dashboard dashboard--customer">
      <CustomerSidebar />

      <main className="dashboard-content">
        <CustomerHeaderBar
          hasNotifications={hasNotifications}
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />
        {publishNotice && (
          <section className="customer-dashboard-toast" role="status" aria-live="polite">
            <strong className="customer-dashboard-toast__title">{publishNotice.title}</strong>
            <p className="customer-dashboard-toast__text">{publishNotice.description}</p>
            <span className="customer-dashboard-toast__progress" aria-hidden="true">
              <span
                className="customer-dashboard-toast__progress-fill"
                style={{ animationDuration: `${publishNotice.durationMs}ms` }}
              />
            </span>
          </section>
        )}

        <div className="dashboard-surface">
          <CustomerStatsSection />

          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px 0' }}>Загрузка...</p>
          ) : error ? (
            <p style={{ textAlign: 'center', padding: '40px 0', color: '#e53935' }}>{error}</p>
          ) : (
            <CustomerActiveProjectsSection projects={projects} />
          )}
        </div>
      </main>
    </div>
  )
}
