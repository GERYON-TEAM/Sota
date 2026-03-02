import { useState } from 'react'

export const useProfileDraft = () => {
  const [profileDirty, setProfileDirty] = useState(false)
  const [firstName, setFirstName] = useState('Ярослав')
  const [lastName, setLastName] = useState('Нестеров')
  const [middleName, setMiddleName] = useState('Андреевич')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [aboutExperience, setAboutExperience] = useState('5 лет')
  const [aboutBio, setAboutBio] = useState('Backend разработчик, микросервисы, CI/CD')
  const [aboutStack, setAboutStack] = useState('')
  const [aboutStackItems, setAboutStackItems] = useState([
    'Node.js',
    'PostgreSQL',
    'Kubernetes',
    'TypeScript',
  ])
  const [contactPhone, setContactPhone] = useState('+7 (900) 000‑00‑00')
  const [contactEmail, setContactEmail] = useState('yaroslav@example.com')
  const [contactTelegram, setContactTelegram] = useState('t.me/yaroslav')
  const [contactGithub, setContactGithub] = useState('github.com/yaroslav')

  const addStackItems = (value: string) => {
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    if (!items.length) return
    setAboutStackItems((prev) => [...prev, ...items.filter((item) => !prev.includes(item))])
  }

  return {
    profileDirty,
    setProfileDirty,
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
  }
}
