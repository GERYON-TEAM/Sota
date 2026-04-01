import type { DashboardResponseDto, InvitationItemDto, SpecialistProjectItemDto } from './specialistDashboard.dto'
import type { ActiveProject, Invite } from '../types/dashboard.types'

export type DashboardProfile = {
  id: string
  name: string
  level: string
  levelProgressPercent: number
  rating: number
  totalReviews: number
  totalCompletedProjects: number
  isPublic: boolean
}

export type DashboardStats = {
  profile: DashboardProfile
  pendingInvitations: number
  activeProjects: number
}

export function mapDashboardStats(dto: DashboardResponseDto): DashboardStats {
  return {
    profile: {
      id: dto.profile.id,
      name: dto.profile.name,
      level: dto.profile.level,
      levelProgressPercent: dto.profile.level_progress_percent,
      rating: dto.profile.rating,
      totalReviews: dto.profile.total_reviews,
      totalCompletedProjects: dto.profile.total_completed_projects,
      isPublic: dto.profile.is_public,
    },
    pendingInvitations: dto.invitations.pending_count,
    activeProjects: dto.projects.active_count,
  }
}

const STATUS_LABELS: Record<string, string> = {
  in_progress: 'В процессе',
  completed: 'Завершён',
  cancelled: 'Отменён',
  failed: 'Провален',
}

export function mapProjectToActive(dto: SpecialistProjectItemDto): ActiveProject {
  return {
    role: dto.project_role,
    title: dto.project_title,
    taskName: STATUS_LABELS[dto.status] ?? dto.status,
    taskDesc: '',
    taskDate: dto.end_date ? new Date(dto.end_date).toLocaleDateString('ru-RU') : '',
    progress: dto.status === 'completed' ? 100 : dto.status === 'in_progress' ? 50 : 0,
    leadName: '',
    leadRole: '',
  }
}

export function mapInvitationToInvite(dto: InvitationItemDto): Invite {
  return {
    matchPercent: dto.match_percentage,
    title: dto.proposed_role ?? 'Проект',
    ratePerHour: dto.proposed_salary ?? 0,
    subtitle: `Проект #${dto.project_id.slice(0, 8)}`,
    leadName: '',
    leadRole: '',
  }
}
