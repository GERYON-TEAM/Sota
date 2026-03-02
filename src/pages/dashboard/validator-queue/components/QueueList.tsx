import type { ValidatorQueueItem } from '../types/validator-queue.types'
import QueueItemCard from './QueueItemCard'
import QueueEmptyState from './QueueEmptyState'

type QueueListProps = {
  items: ValidatorQueueItem[]
  selectedId: number
  getPriorityClass: (priority: ValidatorQueueItem['priorityLabel']) => string
  onSelect: (id: number) => void
}

export default function QueueList({ items, selectedId, getPriorityClass, onSelect }: QueueListProps) {
  if (items.length === 0) return <QueueEmptyState />

  return (
    <div className="validator-queue-card-list" role="list">
      {items.map((item) => (
        <QueueItemCard
          key={item.id}
          item={item}
          active={item.id === selectedId}
          priorityClassName={getPriorityClass(item.priorityLabel)}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
