import { useRef } from 'react'

export const useDatePicker = () => {
  const startDateRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)

  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current
    if (!el) return
    const picker = el as HTMLInputElement & { showPicker?: () => void }
    if (typeof picker.showPicker === 'function') picker.showPicker()
    else picker.click()
  }

  return { startDateRef, endDateRef, openDatePicker }
}
