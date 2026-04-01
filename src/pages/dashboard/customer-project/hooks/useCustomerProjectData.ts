import { useCallback, useEffect, useState } from 'react'
import { getProject, getProjectStatistics, getProjectResponses } from '../api/customerProjectApi'
import { mapProjectDetail, mapStatistics, mapResponseItem } from '../api/customerProject.mapper'
import type { MappedProject, MappedStatistics, MappedResponseItem } from '../api/customerProject.mapper'

export const useCustomerProjectData = (projectId: string) => {
  const [project, setProject] = useState<MappedProject | null>(null)
  const [statistics, setStatistics] = useState<MappedStatistics | null>(null)
  const [responses, setResponses] = useState<MappedResponseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!projectId) return
    setLoading(true)
    setError(null)

    try {
      const [projectDto, statsDto, responsesDto] = await Promise.all([
        getProject(projectId),
        getProjectStatistics(projectId),
        getProjectResponses(projectId),
      ])

      setProject(mapProjectDetail(projectDto))
      setStatistics(mapStatistics(statsDto))
      setResponses(responsesDto.responses.map(mapResponseItem))
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
    statistics,
    responses,
    loading,
    error,
    reload: load,
  }
}
