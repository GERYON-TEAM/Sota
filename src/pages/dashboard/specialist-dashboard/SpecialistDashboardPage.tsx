import { useMemo } from 'react'
import './styles/index.css'
import Sidebar from './components/Sidebar'
import HeaderBar from './components/HeaderBar'
import StatsSection from './components/StatsSection'
import ActiveProjectsSection from './components/ActiveProjectsSection'
import InvitesSection from './components/InvitesSection'
import { useDashboardDropdowns } from './hooks/useDashboardDropdowns'
import type { ActiveProject, Invite } from './types/dashboard.types'

export default function SpecialistDashboardPage() {
  const hasNotifications = true

  const projects = useMemo<ActiveProject[]>(
    () => [
      {
        role: 'Junior Backend Developer',
        title: 'Разработка программы',
        taskName: 'Название задачи',
        taskDesc: 'Краткое описание задачи, может занимать пару строк в блоке.',
        taskDate: '25.02.2026',
        progress: 90,
        leadName: 'Нестеров Ярослав',
        leadRole: 'Tech Lead',
      },
      {
        role: 'Middle Backend Developer',
        title: 'Платежный сервис',
        taskName: 'Интеграция провайдера',
        taskDesc: 'Подключить новый платежный шлюз и подготовить документацию.',
        taskDate: '12.03.2026',
        progress: 65,
        leadName: 'Иван Петров',
        leadRole: 'Tech Lead',
      },
      {
        role: 'Senior Backend Developer',
        title: 'Маркетплейс',
        taskName: 'Оптимизация БД',
        taskDesc: 'Ускорить выборки и переработать индексацию.',
        taskDate: '05.03.2026',
        progress: 40,
        leadName: 'Анна Миронова',
        leadRole: 'Product Owner',
      },
      {
        role: 'Backend Developer',
        title: 'CRM система',
        taskName: 'Рефакторинг API',
        taskDesc: 'Убрать дублирование и привести к единому формату ответов.',
        taskDate: '18.03.2026',
        progress: 75,
        leadName: 'Сергей Иванов',
        leadRole: 'Tech Lead',
      },
      {
        role: 'Middle Backend Developer',
        title: 'Доставка',
        taskName: 'Интеграция карт',
        taskDesc: 'Добавить трекинг курьеров и маршрутизацию.',
        taskDate: '21.03.2026',
        progress: 55,
        leadName: 'Мария Орлова',
        leadRole: 'Project Manager',
      },
      {
        role: 'Backend Developer',
        title: 'Аналитическая платформа',
        taskName: 'ETL пайплайн',
        taskDesc: 'Настроить ежедневную загрузку данных и проверку качества.',
        taskDate: '02.04.2026',
        progress: 30,
        leadName: 'Олег Смирнов',
        leadRole: 'Tech Lead',
      },
    ],
    [],
  )

  const invites = useMemo<Invite[]>(
    () => [
      {
        matchPercent: 98,
        title: 'New App',
        ratePerHour: 1000,
        subtitle: 'Ищут Middle Backend на React',
        leadName: 'Нестеров Ярослав',
        leadRole: 'Tech Lead',
      },
      {
        matchPercent: 92,
        title: 'Fintech',
        ratePerHour: 1200,
        subtitle: 'Нужен Backend для финтех-стартапа',
        leadName: 'Анна Петрова',
        leadRole: 'Product Owner',
      },
      {
        matchPercent: 87,
        title: 'Marketplace',
        ratePerHour: 900,
        subtitle: 'Ищут Middle Backend на Node.js',
        leadName: 'Игорь Павлов',
        leadRole: 'Tech Lead',
      },
      {
        matchPercent: 94,
        title: 'Logistics',
        ratePerHour: 1100,
        subtitle: 'Проект по доставке, нужен Backend',
        leadName: 'Мария Орлова',
        leadRole: 'Project Manager',
      },
      {
        matchPercent: 89,
        title: 'SaaS Platform',
        ratePerHour: 1300,
        subtitle: 'Ищут Senior Backend на TypeScript',
        leadName: 'Сергей Иванов',
        leadRole: 'Tech Lead',
      },
      {
        matchPercent: 96,
        title: 'Healthcare',
        ratePerHour: 1050,
        subtitle: 'Backend для медицинской системы',
        leadName: 'Олег Смирнов',
        leadRole: 'Tech Lead',
      },
    ],
    [],
  )

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
          <StatsSection />

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
