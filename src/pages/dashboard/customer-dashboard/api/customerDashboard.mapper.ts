import type { ProjectListItemDto } from './customerDashboard.dto'
import type { ActiveProject } from '../types/dashboard.types'

const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  plan_generated: 'План сформирован',
  plan_approved: 'План утверждён',
  payment_pending: 'Ожидает оплаты',
  payment_completed: 'Оплачен',
  team_matching: 'Подбор команды',
  in_progress: 'В процессе',
  completed: 'Завершено',
  archived: 'Архив',
  cancelled: 'Отменён',
}

export function mapProjectToActive(dto: ProjectListItemDto): ActiveProject {
  return {
    role: STATUS_LABELS[dto.status] ?? dto.status,
    title: dto.title,
    taskName: dto.description.length > 50 ? dto.description.slice(0, 50) + '...' : dto.description,
    taskDesc: dto.description,
    taskDate: dto.end_date ? new Date(dto.end_date).toLocaleDateString('ru-RU') : '',
    progress: dto.progress_percent,
    leadName: '',
    leadRole: '',
  }
}
