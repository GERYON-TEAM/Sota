export type SortOrder = 'old' | 'new'

export type ActiveProject = {
  role: string
  title: string
  taskName: string
  taskDesc: string
  taskDate: string
  progress: number
  leadName: string
  leadRole: string
  totalBudget?: string
  spentBudget?: string
  responsesCount?: number
}

export type Invite = {
  matchPercent: number
  title: string
  ratePerHour: number
  subtitle: string
  leadName: string
  leadRole: string
}
