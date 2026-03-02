import type { ReactNode } from 'react'

type StatCardProps = {
  title: string
  headRight?: ReactNode
  value: string
  meta?: ReactNode
  metaRow?: boolean
}

export default function StatCard({ title, headRight, value, meta, metaRow }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card__head">
        <span>{title}</span>
        {headRight ? headRight : null}
      </div>
      <div className="stat-card__value">{value}</div>
      {meta ? (
        <div className={`stat-card__meta ${metaRow ? 'stat-card__meta--row' : ''}`}>{meta}</div>
      ) : null}
    </div>
  )
}
