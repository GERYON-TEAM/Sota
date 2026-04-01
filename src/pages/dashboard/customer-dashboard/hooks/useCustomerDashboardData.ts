import { useEffect, useState } from 'react'
import { getProjects, getPortfolioSummary } from '../api/customerDashboardApi'
import { mapProjectToActive } from '../api/customerDashboard.mapper'
import type { ActiveProject } from '../types/dashboard.types'

export function useCustomerDashboardData() {
  const [projects, setProjects] = useState<ActiveProject[]>([])
  const [totalProjects, setTotalProjects] = useState(0)
  const [totalInvested, setTotalInvested] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    Promise.all([getProjects(), getPortfolioSummary()])
      .then(([projectsRes, summaryRes]) => {
        if (!active) return
        setProjects(projectsRes.projects.map(mapProjectToActive))
        setTotalProjects(summaryRes.total_projects)
        setTotalInvested(summaryRes.total_spent)
      })
      .catch(() => {
        if (!active) return
        setError('Не удалось загрузить данные')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { projects, totalProjects, totalInvested, loading, error }
}
