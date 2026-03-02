import type { ReactNode } from 'react'
import OpenProjectsSuggestions from './OpenProjectsSuggestions'

type OpenProjectsSearchProps = {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  onSuggestionSelect: (value: string) => void
  renderHighlightedText: (text: string, needle: string) => ReactNode
}

export default function OpenProjectsSearch({
  value,
  onChange,
  suggestions,
  onSuggestionSelect,
  renderHighlightedText,
}: OpenProjectsSearchProps) {
  return (
    <div className="open-projects-search-wrap">
      <label className="open-projects-search">
        <span className="open-projects-search__icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16797 16.6673C12.8499 16.6673 15.8346 13.6826 15.8346 10.0007C15.8346 6.31875 12.8499 3.33398 9.16797 3.33398C5.48607 3.33398 2.5013 6.31875 2.5013 10.0007C2.5013 13.6826 5.48607 16.6673 9.16797 16.6673Z"
              stroke="#696E82"
              strokeWidth="1.5"
            />
            <path
              d="M17.5013 17.5007L13.8763 13.8757"
              stroke="#696E82"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Поиск"
        />
      </label>

      <OpenProjectsSuggestions
        query={value}
        suggestions={suggestions}
        onSelect={onSuggestionSelect}
        renderHighlightedText={renderHighlightedText}
      />
    </div>
  )
}
