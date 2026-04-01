import { useEffect, useState } from 'react'
import { getPublicProfile, getPublicSkills, getPublicPdp, getPublicProjects, getPublicReviews } from '../api/portfolioApi'
import { mapProfile, mapSkills, mapPdpGoals, mapReviews } from '../../dashboard/specialist-profile/api/specialistProfile.mapper'
import { mapProjectToActive } from '../../dashboard/specialist-dashboard/api/specialistDashboard.mapper'
import type { Profile, Skill, PdpGoal, Review } from '../../dashboard/specialist-profile/api/specialistProfile.mapper'
import type { ActiveProject } from '../../dashboard/specialist-dashboard/types/dashboard.types'

export function usePortfolioData(specialistId: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [pdp, setPdp] = useState<PdpGoal[]>([])
  const [projects, setProjects] = useState<ActiveProject[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!specialistId) return

    let active = true

    async function load() {
      try {
        const [profileData, skillsData, pdpData, projectsData, reviewsData] = await Promise.all([
          getPublicProfile(specialistId),
          getPublicSkills(specialistId),
          getPublicPdp(specialistId),
          getPublicProjects(specialistId),
          getPublicReviews(specialistId),
        ])

        if (!active) return

        setProfile(mapProfile(profileData))
        setSkills(mapSkills(skillsData.skills))
        setPdp(mapPdpGoals(pdpData.goals))
        setProjects(projectsData.projects.map(mapProjectToActive))
        setReviews(mapReviews(reviewsData.reviews))
      } catch {
        if (!active) return
        setError('Не удалось загрузить портфолио')
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [specialistId])

  return { profile, skills, pdp, projects, reviews, loading, error }
}
