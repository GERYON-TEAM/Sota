import { useMemo, useState } from 'react'
import type { OpenProject } from '../types/open-projects.types'

export const useOpenProjectsQuery = (projects: OpenProject[]) => {
  const [query, setQuery] = useState('')

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []
    const matches = projects
      .map((project) => project.subtitle)
      .filter((subtitle) => subtitle.toLowerCase().includes(normalizedQuery))
    return Array.from(new Set(matches)).slice(0, 5)
  }, [projects, query])

  const renderHighlightedText = (text: string, needle: string) => {
    const normalizedNeedle = needle.trim()
    if (!normalizedNeedle) return text
    const lowerText = text.toLowerCase()
    const lowerNeedle = normalizedNeedle.toLowerCase()
    const parts: Array<{ value: string; isMatch: boolean }> = []
    let start = 0
    let index = lowerText.indexOf(lowerNeedle)

    while (index !== -1) {
      if (index > start) {
        parts.push({ value: text.slice(start, index), isMatch: false })
      }
      parts.push({
        value: text.slice(index, index + normalizedNeedle.length),
        isMatch: true,
      })
      start = index + normalizedNeedle.length
      index = lowerText.indexOf(lowerNeedle, start)
    }

    if (start < text.length) {
      parts.push({ value: text.slice(start), isMatch: false })
    }

    return parts.map((part, idx) =>
      part.isMatch ? (
        <mark className="open-projects-suggestion__highlight" key={`h-${idx}`}>
          {part.value}
        </mark>
      ) : (
        <span key={`t-${idx}`}>{part.value}</span>
      )
    )
  }

  return { query, setQuery, suggestions, renderHighlightedText }
}
