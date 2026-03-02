import type { ReactNode } from 'react'

type OpenProjectsSuggestionsProps = {
  query: string
  suggestions: string[]
  onSelect: (value: string) => void
  renderHighlightedText: (text: string, needle: string) => ReactNode
}

export default function OpenProjectsSuggestions({
  query,
  suggestions,
  onSelect,
  renderHighlightedText,
}: OpenProjectsSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="open-projects-suggestions" role="listbox">
      {suggestions.map((subtitle) => (
        <button
          key={subtitle}
          className="open-projects-suggestion"
          type="button"
          onClick={() => onSelect(subtitle)}
        >
          {renderHighlightedText(subtitle, query)}
        </button>
      ))}
    </div>
  )
}
