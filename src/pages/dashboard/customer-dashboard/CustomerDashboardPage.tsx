import { useEffect, useMemo, useState } from 'react'
import './styles/index.css'
import CustomerSidebar from './components/CustomerSidebar'
import CustomerHeaderBar from './components/CustomerHeaderBar'
import CustomerStatsSection from './components/CustomerStatsSection'
import CustomerActiveProjectsSection from './components/CustomerActiveProjectsSection'
import { useDashboardDropdowns } from '../specialist-dashboard/hooks/useDashboardDropdowns'
import type { ActiveProject } from './types/dashboard.types'

const DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY = 'sota:customer-dashboard:publish-notice:v1'

type DashboardPublishNotice = {
  title: string
  description: string
  durationMs: number
}

export default function CustomerDashboardPage() {
  const hasNotifications = true
  const [publishNotice, setPublishNotice] = useState<DashboardPublishNotice | null>(null)

  const projects = useMemo<ActiveProject[]>(
    () => [
      {
        role: 'В процессе',
        title: 'Разработка программы',
        taskName: 'Название задачи',
        taskDesc: 'Краткое описание задачи, может занимать пару строк в блоке.',
        taskDate: '25.02.2026',
        progress: 90,
        leadName: 'Нестеров Ярослав',
        leadRole: 'Tech Lead',
      },
      {
        role: 'Опубликовано',
        title: 'Платежный сервис',
        taskName: 'Интеграция провайдера',
        taskDesc: 'Подключить новый платежный шлюз и подготовить документацию.',
        taskDate: '12.03.2026',
        progress: 65,
        leadName: 'Иван Петров',
        leadRole: 'Tech Lead',
      },
      {
        role: 'Завершено',
        title: 'Маркетплейс',
        taskName: 'Оптимизация БД',
        taskDesc: 'Ускорить выборки и переработать индексацию.',
        taskDate: '05.03.2026',
        progress: 40,
        leadName: 'Анна Миронова',
        leadRole: 'Product Owner',
      },
      {
        role: 'Черновик',
        title: 'CRM система',
        taskName: 'Рефакторинг API',
        taskDesc: 'Убрать дублирование и привести к единому формату ответов.',
        taskDate: '18.03.2026',
        progress: 75,
        leadName: 'Сергей Иванов',
        leadRole: 'Tech Lead',
      },
      {
        role: 'В процессе',
        title: 'HR платформа',
        taskName: 'Интеграция резюме',
        taskDesc: 'Добавить импорт резюме и автоматическое распределение кандидатов.',
        taskDate: '02.04.2026',
        progress: 55,
        leadName: 'Мария Орлова',
        leadRole: 'Project Manager',
      },
      {
        role: 'Опубликовано',
        title: 'Логистика',
        taskName: 'Маршрутизация',
        taskDesc: 'Настроить распределение заказов и контроль SLA.',
        taskDate: '10.04.2026',
        progress: 30,
        leadName: 'Олег Смирнов',
        leadRole: 'Tech Lead',
      },
      {
        role: 'Завершено',
        title: 'Складской учет',
        taskName: 'Отчеты',
        taskDesc: 'Сформировать отчеты по остаткам и оборачиваемости.',
        taskDate: '28.03.2026',
        progress: 100,
        leadName: 'Екатерина Громова',
        leadRole: 'Product Owner',
      },
      {
        role: 'Черновик',
        title: 'Обучающая платформа',
        taskName: 'Курс API',
        taskDesc: 'Подготовить материалы и структуру курса.',
        taskDate: '15.04.2026',
        progress: 10,
        leadName: 'Дмитрий Беляев',
        leadRole: 'Tech Lead',
      },
    ],
    [],
  )

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

          <CustomerActiveProjectsSection projects={projects} />

        </div>
      </main>
    </div>
  )
}
