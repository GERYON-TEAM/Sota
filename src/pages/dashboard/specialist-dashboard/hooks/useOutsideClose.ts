import { useEffect } from 'react'

export function useOutsideClose(
  ref: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target || !ref.current) {
        return
      }
      if (!ref.current.contains(target)) {
        onClose()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen, onClose, ref])
}
