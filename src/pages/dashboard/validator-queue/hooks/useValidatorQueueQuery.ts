import { useMemo, useState } from 'react'
import type { QueueSortValue, ValidatorQueueItem } from '../types/validator-queue.types'

export function useValidatorQueueQuery(items: ValidatorQueueItem[]) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<QueueSortValue>('newest')

  const filteredSortedItems = useMemo(() => {
    const normalizedSearch = query.trim().toLowerCase()
    const searched = normalizedSearch
      ? items.filter((item) => `${item.projectName} ${item.artifactName}`.toLowerCase().includes(normalizedSearch))
      : items

    const sorted = [...searched]
    if (sort === 'oldest') return sorted.sort((a, b) => a.id - b.id)
    return sorted.sort((a, b) => b.id - a.id)
  }, [items, query, sort])

  const resetFilters = () => {
    setQuery('')
    setSort('newest')
  }

  return {
    query,
    setQuery,
    sort,
    setSort,
    resetFilters,
    filteredSortedItems,
  }
}
