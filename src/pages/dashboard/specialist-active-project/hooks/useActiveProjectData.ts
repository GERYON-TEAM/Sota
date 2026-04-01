import { useCallback, useEffect, useState } from 'react'
import { getProjectDetails, getProjectPhases, getProjectTimeline } from '../api/activeProjectApi'
import { mapProjectDetail, mapPhaseListItem, mapTimeline } from '../../customer-project/api/customerProject.mapper'
import type { MappedProject, MappedPhase, MappedTimeline } from '../../customer-project/api/customerProject.mapper'

export const useActiveProjectData = (projectId: string) => {
  const [project, setProject] = useState<MappedProject | null>(null)
  const [phases, setPhases] = useState<MappedPhase[]>([])
  const [timeline, setTimeline] = useState<MappedTimeline | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!projectId) return
    setLoading(true)
    setError(null)

    try {
      const [projectDto, phasesDto, timelineDto] = await Promise.all([
        getProjectDetails(projectId),
        getProjectPhases(projectId),
        getProjectTimeline(projectId),
      ])

      setProject(mapProjectDetail(projectDto))
      setPhases(phasesDto.phases.map(mapPhaseListItem))
      setTimeline(mapTimeline(timelineDto))
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'detail' in err
        ? String((err as { detail: string }).detail)
        : 'Не удалось загрузить данные проекта'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    load()
  }, [load])

  return {
    project,
    phases,
    timeline,
    loading,
    error,
  }
}
