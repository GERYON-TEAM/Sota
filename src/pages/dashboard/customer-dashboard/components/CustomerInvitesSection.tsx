import { useEffect, useMemo, useState } from 'react'
import MatchDropdown from './MatchDropdown'
import InviteCard from './InviteCard'
import type { Invite, SortOrder } from '../types/dashboard.types'

type InvitesSectionProps = {
  invites: Invite[]
  matchOpen: boolean
  matchSort: SortOrder
  onMatchToggle: () => void
  onMatchSelect: (value: SortOrder) => void
}

export default function CustomerInvitesSection({
  invites,
  matchOpen,
  matchSort,
  onMatchToggle,
  onMatchSelect,
}: InvitesSectionProps) {
  const perPage = 3
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(invites.length / perPage))

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(totalPages - 1)
    }
  }, [page, totalPages])

  const visibleInvites = useMemo(() => {
    const start = page * perPage
    return invites.slice(start, start + perPage)
  }, [page, invites])

  return (
    <>
      <section className="project-invites">
        <div className="project-invites__left">
          <h3>Приглашения в проекты</h3>
          <span className="active-badge">{invites.length}</span>
        </div>
        <div className="active-projects__right">
          <MatchDropdown
            isOpen={matchOpen}
            value={matchSort}
            onToggle={onMatchToggle}
            onSelect={onMatchSelect}
          />

          <button
            className="active-arrow active-arrow--left"
            type="button"
            aria-label="Назад"
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
            disabled={page === 0}
          >
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33 0.99991L1 6.32991L6.33 11.6599"
                stroke="#696E82"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="active-arrow active-arrow--right"
            type="button"
            aria-label="Вперёд"
            onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={page >= totalPages - 1}
          >
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.998125 0.99991L6.32812 6.32991L0.998125 11.6599"
                stroke="#0B1215"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      <section className="invites-list">
        {visibleInvites.map((invite, index) => (
          <InviteCard key={`${invite.title}-${index}`} invite={invite} />
        ))}
      </section>
    </>
  )
}
