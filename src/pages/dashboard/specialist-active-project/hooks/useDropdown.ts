import { useCallback, useState } from 'react'

export const useDropdown = (initial = false) => {
  const [open, setOpen] = useState(initial)

  const toggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const openDropdown = useCallback(() => {
    setOpen(true)
  }, [])

  return { open, setOpen, toggle, close, openDropdown }
}
