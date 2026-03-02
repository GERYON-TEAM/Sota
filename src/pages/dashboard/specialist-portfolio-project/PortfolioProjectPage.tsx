import { useState } from 'react'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import PortfolioProjectHero from './components/PortfolioProjectHero'
import PortfolioProjectGrid from './components/PortfolioProjectGrid'
import ShareProjectModal from './components/modals/ShareProjectModal'
import { useShareModal } from './hooks/useShareModal'
import type {
  PortfolioArtifact,
  PortfolioDateItem,
  PortfolioMetaItem,
  PortfolioStatItem,
  PortfolioTeamMember,
} from './types/portfolio-project.types'

export default function PortfolioProjectPage() {
  const [bellOpen, setBellOpen] = useState(false)
  const { shareOpen, shareCopied, shareUrl, openShare, closeShare, copyToClipboard } = useShareModal()

  const meta: PortfolioMetaItem[] = [
    { label: 'Период', value: '01.01.2025 - 01.01.2026' },
    { label: 'Тип', value: 'Коммерческий' },
    { label: 'Рейтинг', value: '4.8' },
  ]

  const stats: PortfolioStatItem[] = [
    { label: 'Отзывов', value: '12' },
    { label: 'Задач', value: '84' },
    { label: 'Оценка', value: 'Отлично' },
  ]

  const tags = ['Node.js', 'PostgreSQL', 'Kubernetes', 'TypeScript']

  const description =
    'Ищем разработчика для усиления команды: рефакторинг API, оптимизация запросов, участие в проектировании архитектуры и настройка CI/CD. Ожидается опыт работы с высоконагруженными сервисами и микросервисной архитектурой.'

  const results = [
    'Скорость API увеличена на 35% после оптимизации запросов.',
    'CI/CD пайплайн ускорен на 20%, добавлены интеграционные тесты.',
    'Переведено 5 сервисов на Kubernetes, настроен мониторинг.',
  ]

  const team: PortfolioTeamMember[] = [
    { name: 'Нестеров Ярослав' },
    { name: 'Анна Миронова' },
    { name: 'Игорь Павлов' },
  ]

  const artifacts: PortfolioArtifact[] = [
    { label: 'Документация API', status: 'ready', statusLabel: 'Готово' },
    { label: 'Отчет по тестам', status: 'review', statusLabel: 'На проверке' },
    { label: 'Презентация', status: 'changes', statusLabel: 'Изменения' },
  ]

  const dates: PortfolioDateItem[] = [
    { label: 'Старт', value: '01.01.2025' },
    { label: 'Финиш', value: '01.01.2026' },
  ]

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar
          title={
            <>
              <button
                className="dashboard-title__crumb"
                type="button"
                onClick={() => {
                  window.location.href = '/dashboard/specialist'
                }}
              >
                Дэшборд
              </button>
              <span className="dashboard-title__sep">/</span>
              <button
                className="dashboard-title__crumb"
                type="button"
                onClick={() => {
                  window.location.href = '/dashboard/specialist/portfolio'
                }}
              >
                Портфолио
              </button>
              <span className="dashboard-title__sep">/</span>
              <span className="dashboard-title__page">Проект</span>
            </>
          }
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface portfolio-project">
          <PortfolioProjectHero
            title="Название проекта"
            statusLabel="Завершен"
            role="Junior Backend Developer"
            meta={meta}
            tags={tags}
            stats={stats}
            onShare={openShare}
          />

          <PortfolioProjectGrid
            description={description}
            results={results}
            reviewText="Отзыв от Tech Lead, может занимать 2-3 строки. Кратко и по содержанию или с использованием многоточия, если текста много."
            reviewerRole="Tech Lead"
            reviewerName="Нестеров Ярослав"
            team={team}
            artifacts={artifacts}
            dates={dates}
          />
        </div>
      </main>

      <ShareProjectModal
        isOpen={shareOpen}
        shareUrl={shareUrl}
        shareCopied={shareCopied}
        onClose={closeShare}
        onCopy={copyToClipboard}
      />
    </div>
  )
}
