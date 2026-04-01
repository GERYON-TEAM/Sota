import { useEffect, useState } from 'react'
import { getProjects } from '../api/customerDashboardApi'
import { mapProjectToActive } from '../api/customerDashboard.mapper'
import type { ActiveProject } from '../types/dashboard.types'

export function useCustomerDashboardData() {
  const [projects, setProjects] = useState<ActiveProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    void getProjects()
      .then((response) => {
        if (!active) return
        setProjects(response.projects.map(mapProjectToActive))
      })
      .catch(() => {
        if (!active) return
        setError('Не удалось загрузить проекты')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { projects, loading, error }
}
