import { useState } from 'react'
import type { BudgetRange } from '../types/open-projects.types'

export const useOpenProjectsFilterModal = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [highMatchOnly, setHighMatchOnly] = useState(false)
  const [budgetMinValue, setBudgetMinValue] = useState(0)
  const [budgetMaxValue, setBudgetMaxValue] = useState(500000)
  const MIN_GAP = 20000

  const budgetRange: BudgetRange = {
    min: 0,
    max: 500000,
    step: 1000,
  }

  const budgetMinPercent =
    ((budgetMinValue - budgetRange.min) / (budgetRange.max - budgetRange.min)) * 100
  const budgetMaxPercent =
    ((budgetMaxValue - budgetRange.min) / (budgetRange.max - budgetRange.min)) * 100
  const isBudgetDefault =
    budgetMinValue === budgetRange.min && budgetMaxValue === budgetRange.max

  const handleMinChange = (value: number) => {
    if (budgetMaxValue - value < MIN_GAP) {
      setBudgetMinValue(budgetMaxValue - MIN_GAP)
    } else {
      setBudgetMinValue(value)
    }
  }

  const handleMaxChange = (value: number) => {
    if (value - budgetMinValue < MIN_GAP) {
      setBudgetMaxValue(budgetMinValue + MIN_GAP)
    } else {
      setBudgetMaxValue(value)
    }
  }

  const parseBudgetValue = (value: string) => {
    const digits = value.replace(/[^\d]/g, '')
    if (!digits) return null
    return Number(digits)
  }

  const closeFilterModal = () => {
    setFilterOpen(false)
    setCategoryOpen(false)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    )
  }

  return {
    filterOpen,
    setFilterOpen,
    categoryOpen,
    setCategoryOpen,
    selectedCategories,
    setSelectedCategories,
    highMatchOnly,
    setHighMatchOnly,
    budgetMinValue,
    setBudgetMinValue,
    budgetMaxValue,
    setBudgetMaxValue,
    budgetRange,
    budgetMinPercent,
    budgetMaxPercent,
    isBudgetDefault,
    handleMinChange,
    handleMaxChange,
    parseBudgetValue,
    closeFilterModal,
    toggleCategory,
    MIN_GAP,
  }
}
