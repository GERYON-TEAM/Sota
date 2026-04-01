import type { UserResponseDto } from './auth.dto'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  level?: string
}

const ROLE_TO_LABEL: Record<string, string> = {
  customer: 'Заказчик',
  specialist: 'Специалист',
  validator: 'Валидатор',
  admin: 'Администратор',
}

const LABEL_TO_ROLE: Record<string, string> = {
  'Заказчик': 'customer',
  'Специалист': 'specialist',
  'Валидатор': 'validator',
}

export function mapUserFromDto(dto: UserResponseDto): User {
  return {
    id: dto.id,
    email: dto.email,
    firstName: dto.first_name,
    lastName: dto.last_name,
    role: dto.role,
    level: dto.level ?? undefined,
  }
}

export function roleLabelToBackend(label: string): string {
  return LABEL_TO_ROLE[label] ?? label
}

export function roleToLabel(role: string): string {
  return ROLE_TO_LABEL[role] ?? role
}
