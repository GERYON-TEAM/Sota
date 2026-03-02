import { useEffect } from 'react'

export const useOutsideClose = (onClose: () => void) => {
  useEffect(() => {
    const handleClose = () => onClose()
    document.addEventListener('click', handleClose)
    return () => document.removeEventListener('click', handleClose)
  }, [onClose])
}
