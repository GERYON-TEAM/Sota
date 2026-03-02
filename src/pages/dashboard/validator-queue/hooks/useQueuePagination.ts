import { useMemo, useState } from 'react'

export function useQueuePagination<T>(items: T[], initialPageSize = 10) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(initialPageSize)

  const pagesCount = Math.max(1, Math.ceil(items.length / pageSize))
  const normalizedPage = Math.min(page, pagesCount)

  const pagedItems = useMemo(() => {
    const start = (normalizedPage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, normalizedPage, pageSize])

  const next = () => setPage((prev) => Math.min(pagesCount, prev + 1))
  const prev = () => setPage((prev) => Math.max(1, prev - 1))

  return { page: normalizedPage, pageSize, pagesCount, setPage, next, prev, pagedItems }
}
