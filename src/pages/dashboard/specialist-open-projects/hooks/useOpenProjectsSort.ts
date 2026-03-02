import { useRef, useState } from 'react'
import type { DateSort, LevelSort, MatchSort, SortMode } from '../types/open-projects.types'

export const useOpenProjectsSort = () => {
  const [sortOpen, setSortOpen] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>(null)
  const [matchSortOpen, setMatchSortOpen] = useState(false)
  const [matchSort, setMatchSort] = useState<MatchSort>('high')
  const [dateSortOpen, setDateSortOpen] = useState(false)
  const [dateSort, setDateSort] = useState<DateSort>('old')
  const [levelSortOpen, setLevelSortOpen] = useState(false)
  const [levelSort, setLevelSort] = useState<LevelSort>('middle')

  const sortCloseTimer = useRef<number | null>(null)
  const matchSortCloseTimer = useRef<number | null>(null)
  const dateSortCloseTimer = useRef<number | null>(null)
  const levelSortCloseTimer = useRef<number | null>(null)

  const closeAllMenus = () => {
    setSortOpen(false)
    setMatchSortOpen(false)
    setDateSortOpen(false)
    setLevelSortOpen(false)
  }

  const handleSortMouseEnter = () => {
    if (sortCloseTimer.current) {
      window.clearTimeout(sortCloseTimer.current)
      sortCloseTimer.current = null
    }
    setSortOpen(true)
  }

  const handleSortMouseLeave = () => {
    if (sortCloseTimer.current) {
      window.clearTimeout(sortCloseTimer.current)
    }
    sortCloseTimer.current = window.setTimeout(() => {
      closeAllMenus()
      sortCloseTimer.current = null
    }, 900)
  }

  const handleMatchMouseEnter = () => {
    if (matchSortCloseTimer.current) {
      window.clearTimeout(matchSortCloseTimer.current)
      matchSortCloseTimer.current = null
    }
    setMatchSortOpen(true)
    setDateSortOpen(false)
    setLevelSortOpen(false)
  }

  const handleMatchMouseLeave = () => {
    if (matchSortCloseTimer.current) {
      window.clearTimeout(matchSortCloseTimer.current)
    }
    matchSortCloseTimer.current = window.setTimeout(() => {
      setMatchSortOpen(false)
      matchSortCloseTimer.current = null
    }, 900)
  }

  const handleDateMouseEnter = () => {
    if (dateSortCloseTimer.current) {
      window.clearTimeout(dateSortCloseTimer.current)
      dateSortCloseTimer.current = null
    }
    setDateSortOpen(true)
    setMatchSortOpen(false)
    setLevelSortOpen(false)
  }

  const handleDateMouseLeave = () => {
    if (dateSortCloseTimer.current) {
      window.clearTimeout(dateSortCloseTimer.current)
    }
    dateSortCloseTimer.current = window.setTimeout(() => {
      setDateSortOpen(false)
      dateSortCloseTimer.current = null
    }, 900)
  }

  const handleLevelMouseEnter = () => {
    if (levelSortCloseTimer.current) {
      window.clearTimeout(levelSortCloseTimer.current)
      levelSortCloseTimer.current = null
    }
    setLevelSortOpen(true)
    setMatchSortOpen(false)
    setDateSortOpen(false)
  }

  const handleLevelMouseLeave = () => {
    if (levelSortCloseTimer.current) {
      window.clearTimeout(levelSortCloseTimer.current)
    }
    levelSortCloseTimer.current = window.setTimeout(() => {
      setLevelSortOpen(false)
      levelSortCloseTimer.current = null
    }, 900)
  }

  return {
    sortOpen,
    setSortOpen,
    sortMode,
    setSortMode,
    matchSortOpen,
    setMatchSortOpen,
    matchSort,
    setMatchSort,
    dateSortOpen,
    setDateSortOpen,
    dateSort,
    setDateSort,
    levelSortOpen,
    setLevelSortOpen,
    levelSort,
    setLevelSort,
    closeAllMenus,
    handleSortMouseEnter,
    handleSortMouseLeave,
    handleMatchMouseEnter,
    handleMatchMouseLeave,
    handleDateMouseEnter,
    handleDateMouseLeave,
    handleLevelMouseEnter,
    handleLevelMouseLeave,
  }
}
