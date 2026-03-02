export type PortfolioMetaItem = {
  label: string
  value: string
}

export type PortfolioStatItem = {
  label: string
  value: string
}

export type PortfolioTeamMember = {
  name: string
}

export type PortfolioArtifact = {
  label: string
  status: 'ready' | 'review' | 'changes'
  statusLabel: string
}

export type PortfolioDateItem = {
  label: string
  value: string
}
