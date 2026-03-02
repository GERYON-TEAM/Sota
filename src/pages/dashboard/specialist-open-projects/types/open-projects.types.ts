export type OpenProject = {
  id: string
  title: string
  matchPercent: number
  matchLabel: string
  subtitle: string
  timeline: string
  budget: string
  skills: string[]
  track: string[]
}

export type SortMode = 'match' | 'date' | 'level' | 'budget' | null
export type MatchSort = 'high' | 'low'
export type DateSort = 'old' | 'new'
export type LevelSort = 'junior' | 'middle' | 'senior'

export type BudgetRange = {
  min: number
  max: number
  step: number
}
