export const normalizeTitle = (value: string) => value.trim().replace(/\s+/g, ' ')

export const ellipsis = (value: string, maxLength = 80) => {
  if (value.length <= maxLength) {
    return value
  }
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`
}
