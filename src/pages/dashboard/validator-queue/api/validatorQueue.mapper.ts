import type { ValidatorQueueItemDto } from './validatorQueue.dto'
import type { ValidatorQueueItem } from '../types/validator-queue.types'

function hashId(uuid: string): number {
  let hash = 0
  for (let i = 0; i < uuid.length; i++) {
    hash = (hash * 31 + uuid.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % 10000
}

export function mapValidatorQueueItem(dto: ValidatorQueueItemDto): ValidatorQueueItem {
  return {
    id: hashId(dto.id),
    tag: dto.artifact_type ? `#${dto.artifact_type}` : '#Без тега',
    phaseTag: dto.phase_title ? `#${dto.phase_title}` : '#Без фазы',
    projectName: dto.project_title,
    artifactName: dto.name,
    date: dto.created_at ? new Date(dto.created_at).toLocaleDateString('ru-RU') : '',
    priorityLabel: 'П1',
    files: [],
    requirements: dto.description ?? '',
  }
}
