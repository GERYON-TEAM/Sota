import { useEffect, useState } from 'react'
import { getDashboard, getInvitations, getMyProjects } from '../api/specialistDashboardApi'
import { mapDashboardStats, mapProjectToActive, mapInvitationToInvite } from '../api/specialistDashboard.mapper'
import type { DashboardStats } from '../api/specialistDashboard.mapper'
import type { ActiveProject, Invite } from '../types/dashboard.types'

export function useSpecialistDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [projects, setProjects] = useState<ActiveProject[]>([])
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const dashboardData = await getDashboard()
        if (!active) return

        const mapped = mapDashboardStats(dashboardData)
        setStats(mapped)

        const [projectsData, invitationsData] = await Promise.all([
          getMyProjects(mapped.profile.id),
          getInvitations(1, 20, 'pending'),
        ])

        if (!active) return

        setProjects(
          projectsData.projects
            .filter((p) => p.status === 'in_progress')
            .map(mapProjectToActive)
        )
        setInvites(invitationsData.invitations.map(mapInvitationToInvite))
      } catch {
        if (!active) return
        setError('Не удалось загрузить данные')
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return { stats, projects, invites, loading, error }
}
