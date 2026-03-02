import { useMemo, useState } from 'react'
import type { ProjectMatch } from '../types/project.types'

export const useProjectUi = () => {
  const [bellOpen, setBellOpen] = useState(false)
  const [descOpen, setDescOpen] = useState(false)
  const matchPercent = 92

  const matchClass = useMemo<ProjectMatch>(() => {
    const className =
      matchPercent >= 80
        ? 'project-stat--high'
        : matchPercent >= 50
          ? 'project-stat--mid'
          : 'project-stat--low'

    return { percent: matchPercent, className }
  }, [matchPercent])

  return {
    bellOpen,
    setBellOpen,
    descOpen,
    setDescOpen,
    matchClass,
  }
}
