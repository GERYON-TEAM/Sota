import { useMemo, useState } from 'react'

export const useCustomerProjectUi = () => {
  const [bellOpen, setBellOpen] = useState(false)
  const [descOpen, setDescOpen] = useState(false)
  const matchPercent = 92

  const matchClass = useMemo(() => {
    if (matchPercent >= 80) return 'project-stat--high'
    if (matchPercent >= 50) return 'project-stat--mid'
    return 'project-stat--low'
  }, [matchPercent])

  return {
    bellOpen,
    setBellOpen,
    descOpen,
    setDescOpen,
    matchPercent,
    matchClass,
  }
}
