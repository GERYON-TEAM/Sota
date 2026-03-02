export const normalizeGithub = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http')) return trimmed
  if (trimmed.startsWith('github.com/')) return `https://${trimmed}`
  return `https://github.com/${trimmed.replace(/^@/, '')}`
}

export const normalizeTelegram = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http')) return trimmed
  return `https://t.me/${trimmed.replace(/^@/, '')}`
}

export const normalizeEmail = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`
}
