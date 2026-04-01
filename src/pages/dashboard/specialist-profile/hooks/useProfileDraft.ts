import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../api/specialistProfileApi'
import { getMe, updateProfile as updateAuthProfile } from '../../../../shared/api/authApi'

export const useProfileDraft = () => {
  const [profileDirty, setProfileDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [aboutExperience, setAboutExperience] = useState('')
  const [aboutBio, setAboutBio] = useState('')
  const [aboutStack, setAboutStack] = useState('')
  const [aboutStackItems, setAboutStackItems] = useState<string[]>([])
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactTelegram, setContactTelegram] = useState('')
  const [contactGithub, setContactGithub] = useState('')

  useEffect(() => {
    let active = true

    Promise.all([getMe(), getProfile()])
      .then(([user, profile]) => {
        if (!active) return
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setMiddleName(user.middle_name ?? '')
        setAvatarUrl(profile.profile_photo_url)
        setAboutBio(profile.bio ?? '')
        setAboutExperience(profile.years_of_experience ? `${profile.years_of_experience} лет` : '')
        setContactEmail(profile.contact_email ?? '')
        setContactTelegram(profile.telegram_handle ?? '')
        setContactGithub(profile.github_url ?? '')
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [])

  const addStackItems = (value: string) => {
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    if (!items.length) return
    setAboutStackItems((prev) => [...prev, ...items.filter((item) => !prev.includes(item))])
  }

  const saveProfile = async () => {
    setSaving(true)
    try {
      await updateAuthProfile({
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName || undefined,
      })
      await updateProfile({
        bio: aboutBio || undefined,
        contact_email: contactEmail || undefined,
        telegram_handle: contactTelegram || undefined,
        github_url: contactGithub || undefined,
        profile_photo_url: avatarUrl || undefined,
      })
      setProfileDirty(false)
    } catch {
    } finally {
      setSaving(false)
    }
  }

  return {
    profileDirty,
    setProfileDirty,
    saving,
    loading,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    avatarUrl,
    setAvatarUrl,
    aboutExperience,
    setAboutExperience,
    aboutBio,
    setAboutBio,
    aboutStack,
    setAboutStack,
    aboutStackItems,
    setAboutStackItems,
    addStackItems,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    contactTelegram,
    setContactTelegram,
    contactGithub,
    setContactGithub,
    saveProfile,
  }
}
