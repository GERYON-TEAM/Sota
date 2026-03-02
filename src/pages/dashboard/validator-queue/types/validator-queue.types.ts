export type QueueFile = {
  id: number
  name: string
  format: string
  role: string
  owner: string
}

export type QueuePriority = 'П1' | 'П2' | 'П3' | 'П4' | 'П5'

export type ValidatorQueueItem = {
  id: number
  tag: string
  phaseTag: string
  projectName: string
  artifactName: string
  date: string
  priorityLabel: QueuePriority
  files: QueueFile[]
  requirements: string
}

export type QueueSortValue = 'newest' | 'oldest'

export type ChecklistCriterion = {
  id: string
  title: string
  description: string
}

export const QUEUE_ITEMS: ValidatorQueueItem[] = [
  {
    id: 1482,
    tag: '#Дизайн',
    phaseTag: '#Фаза Frontend',
    projectName: 'Название проекта',
    artifactName: 'Название артефакта',
    date: '01.01.2025',
    priorityLabel: 'П1',
    files: [
      { id: 1, name: 'ui-kit-final', format: 'fig', role: 'Tech Lead', owner: 'Нестеров Ярослав' },
      { id: 2, name: 'adaptive-screens', format: 'zip', role: 'Tech Lead', owner: 'Анна Лаврова' },
    ],
    requirements:
      'Проверить соответствие UI-гайду, наличие адаптивных состояний и корректность экспортов всех экранов в Figma.',
  },
  {
    id: 1479,
    tag: '#Дизайн',
    phaseTag: '#Фаза Frontend',
    projectName: 'Платёжная платформа',
    artifactName: 'UI kit и компоненты',
    date: '03.01.2025',
    priorityLabel: 'П3',
    files: [
      { id: 3, name: 'payment-flow', format: 'pdf', role: 'Product Owner', owner: 'Иван Петров' },
      { id: 4, name: 'ui-components', format: 'fig', role: 'UX Lead', owner: 'Екатерина Орлова' },
    ],
    requirements:
      'Проверить кликабельность всех прототипов, финальные названия слоёв и наличие состояний ошибок для форм.',
  },
  {
    id: 1474,
    tag: '#Дизайн',
    phaseTag: '#Фаза Frontend',
    projectName: 'Сервис аналитики',
    artifactName: 'Интерактивные графики',
    date: '05.01.2025',
    priorityLabel: 'П5',
    files: [{ id: 5, name: 'charts-preview', format: 'png', role: 'Tech Lead', owner: 'Мария Смирнова' }],
    requirements:
      'Проверить читаемость графиков, соответствие токенам дизайна и корректность описаний сценариев для разработчиков.',
  },
]

export const CHECKLIST_CRITERIA: ChecklistCriterion[] = [
  {
    id: 'criterion-1',
    title: 'Визуальная согласованность',
    description: 'Все экраны соответствуют дизайн-системе и отступам проекта.',
  },
  {
    id: 'criterion-2',
    title: 'Полнота артефакта',
    description: 'Переданы все необходимые файлы и версии макетов.',
  },
  {
    id: 'criterion-3',
    title: 'Корректность состояний',
    description: 'Прописаны hover/active/disabled/error состояния ключевых блоков.',
  },
  {
    id: 'criterion-4',
    title: 'Готовность к разработке',
    description: 'Названия слоёв, компоненты и спецификации готовы для команды разработки.',
  },
  {
    id: 'criterion-5',
    title: 'Описание требований',
    description: 'Описание задачи и требований не содержит противоречий и пропусков.',
  },
  {
    id: 'criterion-6',
    title: 'Соответствие дедлайну',
    description: 'Артефакт загружен с актуальной датой и в срок текущей фазы.',
  },
]

export const PRIORITY_CLASS_BY_LABEL: Record<QueuePriority, string> = {
  П1: 'is-p1',
  П2: 'is-p2',
  П3: 'is-p3',
  П4: 'is-p4',
  П5: 'is-p5',
}
