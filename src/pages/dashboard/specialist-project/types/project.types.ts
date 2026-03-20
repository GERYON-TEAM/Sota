export type ProjectMatch = {
  percent: number
  className: string
}

export type ProjectStat = {
  label: string
  value: string
}

export type ProjectRequirementBlock = {
  title: string
  description: string
}

export type ProjectCustomerStat = {
  label: string
  value: string
}

export type ProjectActionState = 'available' | 'applied' | 'invited' | 'in_team'
