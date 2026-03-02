import type { DateSort, LevelSort, MatchSort } from '../types/open-projects.types'
import OpenProjectsSortMenu from './OpenProjectsSortMenu'

type OpenProjectsSortProps = {
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
}

export default function OpenProjectsSort({
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
}: OpenProjectsSortProps) {
  return (
    <div className="open-projects-sort" onMouseEnter={onSortEnter} onMouseLeave={onSortLeave}>
      <button className="open-projects-filter is-outline" type="button" onClick={onSortToggle}>
        <span className="open-projects-filter__icon" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 20L14 4L20 9.5M10 4L10 20L4 14.5"
              stroke="#696E82"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>Сортировка</span>
      </button>

      <OpenProjectsSortMenu
        sortOpen={sortOpen}
        matchSortOpen={matchSortOpen}
        dateSortOpen={dateSortOpen}
        levelSortOpen={levelSortOpen}
        matchSort={matchSort}
        dateSort={dateSort}
        levelSort={levelSort}
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
    </div>
  )
}
