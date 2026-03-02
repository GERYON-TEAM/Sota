import { useState } from 'react'
import type { SortOrder } from '../types/dashboard.types'

export function useDashboardDropdowns() {
  const [deadlineOpen, setDeadlineOpen] = useState(false)
  const [deadlineSort, setDeadlineSort] = useState<SortOrder>('old')
  const [matchOpen, setMatchOpen] = useState(false)
  const [matchSort, setMatchSort] = useState<SortOrder>('old')
  const [bellOpen, setBellOpen] = useState(false)

  return {
    deadlineOpen,
    deadlineSort,
    matchOpen,
    matchSort,
    bellOpen,
    setDeadlineOpen,
    setDeadlineSort,
    setMatchOpen,
    setMatchSort,
    setBellOpen,
  }
}
