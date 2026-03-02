import { useCallback, useEffect, useRef } from 'react'

export function useDraftAutosave<T>(params: {
  storageKey: string
  sessionKey: string
  onRestore: (draft: Partial<T>) => void
}) {
  const { storageKey, sessionKey, onRestore } = params
  const onRestoreRef = useRef(onRestore)

  onRestoreRef.current = onRestore

  useEffect(() => {
    let savedDraftRaw = ''
    try {
      savedDraftRaw = localStorage.getItem(storageKey) ?? sessionStorage.getItem(sessionKey) ?? ''
    } catch {
      savedDraftRaw = sessionStorage.getItem(sessionKey) ?? ''
    }

    if (!savedDraftRaw) return

    try {
      const savedDraft = JSON.parse(savedDraftRaw) as Partial<T>
      onRestoreRef.current(savedDraft)
    } catch {
      // ignore broken payload
    }
  }, [sessionKey, storageKey])

  const persist = useCallback(
    (payload: T) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(payload))
        sessionStorage.removeItem(sessionKey)
      } catch {
        try {
          sessionStorage.setItem(sessionKey, JSON.stringify(payload))
        } catch {
          return false
        }
      }

      return true
    },
    [sessionKey, storageKey],
  )

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
      sessionStorage.removeItem(sessionKey)
    } catch {
      // ignore storage errors
    }
  }, [sessionKey, storageKey])

  return { persist, clear }
}
