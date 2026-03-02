import type { ReactNode } from 'react'

type ProjectCardProps = {
  title: string
  children: ReactNode
}

export default function ProjectCard({ title, children }: ProjectCardProps) {
  return (
    <article className="portfolio-project__card">
      <h3>{title}</h3>
      {children}
    </article>
  )
}
