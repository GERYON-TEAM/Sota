import { useEffect } from 'react'
import type { RefObject } from 'react'

export default function useOutsideClose(params: {
  isOpen: boolean
  containerRef: RefObject<HTMLElement | null>
  onClose: () => void
}) {
  const { isOpen, containerRef, onClose } = params

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        onClose()
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    return () => window.removeEventListener('mousedown', handlePointerDown)
  }, [containerRef, isOpen, onClose])
}
