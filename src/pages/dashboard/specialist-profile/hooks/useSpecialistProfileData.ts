import { useEffect, useState } from 'react'
import { getProfile, getSkills, getPdp, getLevelProgress, getRating } from '../api/specialistProfileApi'
import { mapProfile, mapSkills, mapPdpGoals, mapLevelProgress, mapRating } from '../api/specialistProfile.mapper'
import type { Profile, Skill, PdpGoal, LevelProgress, Rating } from '../api/specialistProfile.mapper'

export function useSpecialistProfileData() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [pdp, setPdp] = useState<PdpGoal[]>([])
  const [level, setLevel] = useState<LevelProgress | null>(null)
  const [rating, setRating] = useState<Rating | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const [profileData, skillsData, pdpData, levelData, ratingData] = await Promise.all([
          getProfile(),
          getSkills(),
          getPdp(),
          getLevelProgress(),
          getRating(),
        ])

        if (!active) return

        setProfile(mapProfile(profileData))
        setSkills(mapSkills(skillsData.skills))
        setPdp(mapPdpGoals(pdpData.goals))
        setLevel(mapLevelProgress(levelData))
        setRating(mapRating(ratingData))
      } catch {
        if (!active) return
        setError('Не удалось загрузить данные профиля')
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return { profile, skills, pdp, level, rating, loading, error }
}
