import type { ReactNode } from 'react'
import OpenProjectsSearch from './OpenProjectsSearch'
import OpenProjectsSort from './OpenProjectsSort'
import OpenProjectsFilterButton from './OpenProjectsFilterButton'
import type { DateSort, LevelSort, MatchSort } from '../types/open-projects.types'

type OpenProjectsHeaderProps = {
  total: number
  query: string
  onQueryChange: (value: string) => void
  suggestions: string[]
  onSuggestionSelect: (value: string) => void
  renderHighlightedText: (text: string, needle: string) => ReactNode
  sortOpen: boolean
  matchSortOpen: boolean
  dateSortOpen: boolean
  levelSortOpen: boolean
  matchSort: MatchSort
  dateSort: DateSort
  levelSort: LevelSort
  onSortEnter: () => void
  onSortLeave: () => void
  onSortToggle: () => void
  onMatchEnter: () => void
  onMatchLeave: () => void
  onMatchToggle: () => void
  onDateEnter: () => void
  onDateLeave: () => void
  onDateToggle: () => void
  onLevelEnter: () => void
  onLevelLeave: () => void
  onLevelToggle: () => void
  onApplyMatchSort: (value: MatchSort) => void
  onApplyDateSort: (value: DateSort) => void
  onApplyLevelSort: (value: LevelSort) => void
  onApplyBudgetSort: () => void
  onFilterOpen: () => void
}

export default function OpenProjectsHeader({
  total,
  query,
  onQueryChange,
  suggestions,
  onSuggestionSelect,
  renderHighlightedText,
  sortOpen,
  matchSortOpen,
  dateSortOpen,
  levelSortOpen,
  matchSort,
  dateSort,
  levelSort,
  onSortEnter,
  onSortLeave,
  onSortToggle,
  onMatchEnter,
  onMatchLeave,
  onMatchToggle,
  onDateEnter,
  onDateLeave,
  onDateToggle,
  onLevelEnter,
  onLevelLeave,
  onLevelToggle,
  onApplyMatchSort,
  onApplyDateSort,
  onApplyLevelSort,
  onApplyBudgetSort,
  onFilterOpen,
}: OpenProjectsHeaderProps) {
  return (
    <section className="open-projects-head">
      <div className="open-projects-head__left">
        <h2>Открытые проекты</h2>
        <span className="active-badge">{total}</span>
      </div>

      <div className="open-projects-head__right">
        <OpenProjectsSort
          sortOpen={sortOpen}
          matchSortOpen={matchSortOpen}
          dateSortOpen={dateSortOpen}
          levelSortOpen={levelSortOpen}
          matchSort={matchSort}
          dateSort={dateSort}
          levelSort={levelSort}
          onSortEnter={onSortEnter}
          onSortLeave={onSortLeave}
          onSortToggle={onSortToggle}
          onMatchEnter={onMatchEnter}
          onMatchLeave={onMatchLeave}
          onMatchToggle={onMatchToggle}
          onDateEnter={onDateEnter}
          onDateLeave={onDateLeave}
          onDateToggle={onDateToggle}
          onLevelEnter={onLevelEnter}
          onLevelLeave={onLevelLeave}
          onLevelToggle={onLevelToggle}
          onApplyMatchSort={onApplyMatchSort}
          onApplyDateSort={onApplyDateSort}
          onApplyLevelSort={onApplyLevelSort}
          onApplyBudgetSort={onApplyBudgetSort}
        />

        <OpenProjectsFilterButton onClick={onFilterOpen} />

        <OpenProjectsSearch
          value={query}
          onChange={onQueryChange}
          suggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
          renderHighlightedText={renderHighlightedText}
        />
      </div>
    </section>
  )
}
