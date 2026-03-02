import type { ReactNode } from 'react'

type ProjectAsideCardProps = {
  title: string
  children: ReactNode
}

export default function ProjectAsideCard({ title, children }: ProjectAsideCardProps) {
  return (
    <div className="portfolio-project__aside-card">
      <h4>{title}</h4>
      {children}
    </div>
  )
}
