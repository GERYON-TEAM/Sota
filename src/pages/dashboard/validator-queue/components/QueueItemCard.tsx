import type { ValidatorQueueItem } from '../types/validator-queue.types'

type QueueItemCardProps = {
  item: ValidatorQueueItem
  active: boolean
  priorityClassName: string
  onSelect: (id: number) => void
}

export default function QueueItemCard({ item, active, priorityClassName, onSelect }: QueueItemCardProps) {
  return (
    <button className={`validator-queue-task-card${active ? ' is-active' : ''}`} type="button" onClick={() => onSelect(item.id)}>
      <div className="validator-queue-task-card__tags">
        <span className="validator-queue-tag">{item.tag}</span>
        <span className="validator-queue-tag">{item.phaseTag}</span>
      </div>
      <div className="validator-queue-task-card__titles">
        <strong>{item.projectName}</strong>
        <span>{item.artifactName}</span>
      </div>
      <div className="validator-queue-card__footer">
        <span className="validator-queue-date-chip">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z" stroke="#696E82" strokeWidth="1.5" />
            <path d="M7 4V2.5M17 4V2.5M2.5 9H21.5" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17ZM18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#696E82" />
          </svg>
          <span>{item.date}</span>
        </span>
        <span className={`validator-priority-chip ${priorityClassName}`}>{item.priorityLabel}</span>
      </div>
    </button>
  )
}
