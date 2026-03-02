import type { RefObject } from 'react'
import type { QueueSortValue } from '../types/validator-queue.types'
import QueueFilters from './QueueFilters'
import QueueSort from './QueueSort'

type QueueToolbarProps = {
  queueCount: number
  searchValue: string
  queueSort: QueueSortValue
  queueMenuOpen: boolean
  queueControlsRef: RefObject<HTMLDivElement | null>
  onSearchChange: (value: string) => void
  onToggleMenu: () => void
  onSortChange: (value: QueueSortValue) => void
  onRefresh: () => void
  onResetFilters: () => void
}

export default function QueueToolbar({
  queueCount,
  searchValue,
  queueSort,
  queueMenuOpen,
  queueControlsRef,
  onSearchChange,
  onToggleMenu,
  onSortChange,
  onRefresh,
  onResetFilters,
}: QueueToolbarProps) {
  return (
    <>
      <div className="validator-queue-column__head validator-queue-column__head--queue">
        <h2>Очередь на валидацию</h2>
        <div className="validator-queue-column__controls" ref={queueControlsRef}>
          <span className="validator-queue-counter" aria-label="Активные очереди">{queueCount}</span>
          <QueueSort
            queueMenuOpen={queueMenuOpen}
            queueSort={queueSort}
            onToggleMenu={onToggleMenu}
            onSortChange={onSortChange}
            onRefresh={onRefresh}
          />
          <QueueFilters onReset={onResetFilters} />
        </div>
      </div>

      <label className="validator-queue-search">
        <span className="validator-queue-search__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#9197AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input type="search" value={searchValue} onChange={(event) => onSearchChange(event.target.value)} placeholder="Поиск по очереди" />
      </label>
    </>
  )
}
