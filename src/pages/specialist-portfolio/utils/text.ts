export const shortenGoalDescription = (value: string) => value.replace(/(.*?сокр).*/i, '$1...')

export const shortenGoalTitle = (value: string) => {
  const idx = value.indexOf('сокр')
  if (idx === -1) return value
  return `${value.slice(0, idx + 4)}...`
}
