import { useEffect } from 'react'

export const usePaginationClamp = (
  setPage: (value: number | ((prev: number) => number)) => void,
  totalPages: number
) => {
  useEffect(() => {
    setPage((page) => Math.min(page, totalPages - 1))
  }, [setPage, totalPages])
}
