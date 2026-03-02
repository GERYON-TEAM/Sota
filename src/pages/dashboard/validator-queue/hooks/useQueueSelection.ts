import { useMemo, useState } from 'react'
import type { ValidatorQueueItem } from '../types/validator-queue.types'

export function useQueueSelection(items: ValidatorQueueItem[]) {
  const [selectedId, setSelectedId] = useState<number>(items[0]?.id ?? 0)

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) ?? items[0]
  }, [items, selectedId])

  const select = (id: number) => setSelectedId(id)
  const clear = () => setSelectedId(0)

  return { selectedId, selectedItem, select, clear }
}
