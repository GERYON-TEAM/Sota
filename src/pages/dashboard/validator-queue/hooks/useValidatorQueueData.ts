import { useEffect, useState } from 'react'
import { getValidatorQueue } from '../api/validatorQueueApi'
import { mapValidatorQueueItem } from '../api/validatorQueue.mapper'
import type { ValidatorQueueItem } from '../types/validator-queue.types'

export function useValidatorQueueData() {
  const [data, setData] = useState<ValidatorQueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    void getValidatorQueue()
      .then((response) => {
        if (!active) return
        setData(response.items.map(mapValidatorQueueItem))
      })
      .catch(() => {
        if (!active) return
        setError('Не удалось загрузить очередь')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { data, loading, error }
}
