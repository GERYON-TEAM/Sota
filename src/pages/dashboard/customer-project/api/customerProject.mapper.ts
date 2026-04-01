import type {
  ProjectDetailResponseDto,
  ProjectStatisticsResponseDto,
  ResponseItemDto,
  PhaseItemDto,
  PhaseListItemDto,
  TeamMemberItemDto,
  AttachmentItemDto,
  TimelinePhaseItemDto,
  ProjectTimelineResponseDto,
} from './customerProject.dto'

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

const PHASE_STATUS_LABELS: Record<string, string> = {
  not_started: 'Не начата',
  in_progress: 'В процессе',
  completed: 'Завершена',
  on_hold: 'На паузе',
}

const RESPONSE_STATUS_LABELS: Record<string, string> = {
  pending: 'На рассмотрении',
  accepted: 'Принят',
  rejected: 'Отклонён',
}

const LEVEL_LABELS: Record<string, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU')
}

function formatBudget(value: number | null): string {
  if (value === null) return '—'
  return value.toLocaleString('ru-RU') + ' ₽'
}

export type MappedAttachment = {
  name: string
  url: string | null
  size: number | null
}

export type MappedTeamMember = {
  id: string
  name: string
  avatar: string | null
  rating: number | null
  role: string
  level: string
}

export type MappedPhase = {
  id: string
  phaseNumber: number | null
  title: string
  description: string
  status: string
  statusLabel: string
  startDate: string
  endDate: string
  budget: string
  progressPercent: number
  deliverables: unknown[]
}

export type MappedProject = {
  id: string
  title: string
  description: string
  projectType: string | null
  goals: string | null
  targetAudience: string | null
  status: string
  statusLabel: string
  totalBudget: string
  spentBudget: string
  planId: string | null
  startDate: string
  endDate: string
  actualEndDate: string
  flexibleDeadline: boolean
  techAndRolesPreferences: string | null
  estimatedSize: string | null
  features: unknown[]
  complexity: string | null
  attachments: MappedAttachment[]
  team: MappedTeamMember[]
  phases: MappedPhase[]
  responsesCount: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  completedAt: string
  archivedAt: string
}

export type MappedStatistics = {
  totalBudget: string
  spentBudget: string
  remainingBudget: string
  overallProgress: number
  phasesCompleted: number
  phasesTotal: number
  responsesCount: number
  responsesPending: number
  responsesAccepted: number
  responsesRejected: number
  averageProposedPrice: string
  timeElapsedDays: number
  timeRemainingDays: number | null
  isOverdue: boolean
}

export type MappedResponseItem = {
  id: string
  specialistId: string
  specialistName: string
  specialistAvatar: string | null
  specialistRating: number
  specialistLevel: string
  specialistExperienceYears: number | null
  status: string
  statusLabel: string
  createdAt: string
}

export type MappedTimelinePhase = {
  id: string
  phaseNumber: number | null
  title: string
  startDate: string
  endDate: string
  durationDays: number
  status: string | null
  progressPercent: number
  isCritical: boolean
  isDelayed: boolean
  dependencies: string[]
}

export type MappedTimeline = {
  projectStart: string
  projectEnd: string
  projectDurationDays: number
  phases: MappedTimelinePhase[]
  criticalPath: string[]
}

function mapAttachment(dto: AttachmentItemDto): MappedAttachment {
  return {
    name: dto.name,
    url: dto.url,
    size: dto.size,
  }
}

function mapTeamMember(dto: TeamMemberItemDto): MappedTeamMember {
  return {
    id: dto.id,
    name: dto.name ?? '',
    avatar: dto.avatar,
    rating: dto.rating,
    role: dto.role ?? '',
    level: LEVEL_LABELS[dto.level ?? ''] ?? dto.level ?? '',
  }
}

function mapPhase(dto: PhaseItemDto): MappedPhase {
  return {
    id: dto.id,
    phaseNumber: dto.phase_number,
    title: dto.title ?? '',
    description: dto.description ?? '',
    status: dto.status ?? '',
    statusLabel: PHASE_STATUS_LABELS[dto.status ?? ''] ?? dto.status ?? '',
    startDate: formatDate(dto.start_date),
    endDate: formatDate(dto.end_date),
    budget: formatBudget(dto.budget),
    progressPercent: dto.progress_percent ?? 0,
    deliverables: dto.deliverables ?? [],
  }
}

export function mapProjectDetail(dto: ProjectDetailResponseDto): MappedProject {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    projectType: dto.project_type,
    goals: dto.goals,
    targetAudience: dto.target_audience,
    status: dto.status,
    statusLabel: STATUS_LABELS[dto.status] ?? dto.status,
    totalBudget: formatBudget(dto.total_budget),
    spentBudget: formatBudget(dto.spent_budget),
    planId: dto.plan_id,
    startDate: formatDate(dto.start_date),
    endDate: formatDate(dto.end_date),
    actualEndDate: formatDate(dto.actual_end_date),
    flexibleDeadline: dto.flexible_deadline,
    techAndRolesPreferences: dto.tech_and_roles_preferences,
    estimatedSize: dto.estimated_size,
    features: dto.features ?? [],
    complexity: dto.complexity,
    attachments: dto.attachments.map(mapAttachment),
    team: dto.team.map(mapTeamMember),
    phases: dto.phases.map(mapPhase),
    responsesCount: dto.responses_count,
    createdAt: formatDate(dto.created_at),
    updatedAt: formatDate(dto.updated_at),
    publishedAt: formatDate(dto.published_at),
    completedAt: formatDate(dto.completed_at),
    archivedAt: formatDate(dto.archived_at),
  }
}

export function mapStatistics(dto: ProjectStatisticsResponseDto): MappedStatistics {
  return {
    totalBudget: formatBudget(dto.total_budget),
    spentBudget: formatBudget(dto.spent_budget),
    remainingBudget: formatBudget(dto.remaining_budget),
    overallProgress: dto.overall_progress,
    phasesCompleted: dto.phases_completed,
    phasesTotal: dto.phases_total,
    responsesCount: dto.responses_count,
    responsesPending: dto.responses_pending,
    responsesAccepted: dto.responses_accepted,
    responsesRejected: dto.responses_rejected,
    averageProposedPrice: formatBudget(dto.average_proposed_price),
    timeElapsedDays: dto.time_elapsed_days,
    timeRemainingDays: dto.time_remaining_days,
    isOverdue: dto.is_overdue,
  }
}

export function mapResponseItem(dto: ResponseItemDto): MappedResponseItem {
  return {
    id: dto.id,
    specialistId: dto.specialist.id,
    specialistName: dto.specialist.name,
    specialistAvatar: dto.specialist.avatar,
    specialistRating: dto.specialist.rating,
    specialistLevel: LEVEL_LABELS[dto.specialist.level] ?? dto.specialist.level,
    specialistExperienceYears: dto.specialist.experience_years,
    status: dto.status,
    statusLabel: RESPONSE_STATUS_LABELS[dto.status] ?? dto.status,
    createdAt: formatDate(dto.created_at),
  }
}

function mapTimelinePhase(dto: TimelinePhaseItemDto): MappedTimelinePhase {
  return {
    id: dto.id,
    phaseNumber: dto.phase_number,
    title: dto.title ?? '',
    startDate: formatDate(dto.start_date),
    endDate: formatDate(dto.end_date),
    durationDays: dto.duration_days,
    status: dto.status,
    progressPercent: dto.progress_percent,
    isCritical: dto.is_critical,
    isDelayed: dto.is_delayed,
    dependencies: dto.dependencies,
  }
}

export function mapTimeline(dto: ProjectTimelineResponseDto): MappedTimeline {
  return {
    projectStart: formatDate(dto.project_start),
    projectEnd: formatDate(dto.project_end),
    projectDurationDays: dto.project_duration_days,
    phases: dto.phases.map(mapTimelinePhase),
    criticalPath: dto.critical_path,
  }
}

export function mapPhaseListItem(dto: PhaseListItemDto): MappedPhase {
  return {
    id: dto.id,
    phaseNumber: dto.phase_number,
    title: dto.title ?? '',
    description: dto.description ?? '',
    status: dto.status ?? '',
    statusLabel: PHASE_STATUS_LABELS[dto.status ?? ''] ?? dto.status ?? '',
    startDate: formatDate(dto.start_date),
    endDate: formatDate(dto.end_date),
    budget: formatBudget(dto.budget),
    progressPercent: dto.progress_percent ?? 0,
    deliverables: dto.deliverables ?? [],
  }
}
