import { useMemo, useRef, useState } from 'react'
import { useFileUploads } from './useFileUploads'
import type { NewProjectDraft, NewProjectFormValues, NewProjectStep } from '../types/new-project.types'
import { MAX_FILES_COUNT } from '../types/new-project.types'

const sanitizeDigits = (value: string) => value.replace(/[^\d]/g, '')

const formatCardNumber = (value: string) =>
  sanitizeDigits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim()

const formatCardExpiry = (value: string) => {
  const digits = sanitizeDigits(value).slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

const stepNumericValue = (currentValue: string, delta: number) => {
  const base = currentValue === '' ? 0 : Number(currentValue)
  const safeBase = Number.isFinite(base) ? base : 0
  const next = Math.max(0, safeBase + delta)
  return String(next)
}

export function useNewProjectForm() {
  const path = window.location.pathname.toLowerCase()
  const dashboardBasePath = path.startsWith('/dashboard/custom') ? '/dashboard/custom' : '/dashboard/customer'

  const [projectTypeOpen, setProjectTypeOpen] = useState(false)
  const [projectSizeOpen, setProjectSizeOpen] = useState(false)
  const [projectTypeValue, setProjectTypeValue] = useState('')
  const [projectSizeValue, setProjectSizeValue] = useState('')
  const [projectFeatureValues, setProjectFeatureValues] = useState<string[]>([])
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectGoals, setProjectGoals] = useState('')
  const [projectAudience, setProjectAudience] = useState('')
  const [projectNotes, setProjectNotes] = useState('')

  const [paymentTypeOpen, setPaymentTypeOpen] = useState(false)
  const [paymentTypeValue, setPaymentTypeValue] = useState('Поэтапно')
  const [flexibleDeadlines, setFlexibleDeadlines] = useState(false)
  const [projectBalanceValue, setProjectBalanceValue] = useState('Оптимально')
  const [maxHourlyRate, setMaxHourlyRate] = useState('')
  const [budgetValue, setBudgetValue] = useState('')
  const [projectStart, setProjectStart] = useState('')
  const [projectEnd, setProjectEnd] = useState('')

  const [validationAgreement, setValidationAgreement] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('transfer')
  const [paymentCardNumber, setPaymentCardNumber] = useState('')
  const [paymentCardExpiry, setPaymentCardExpiry] = useState('')
  const [paymentCardCvc, setPaymentCardCvc] = useState('')

  const startDateRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)

  const uploads = useFileUploads([])

  const steps = useMemo<NewProjectStep[]>(
    () => [
      {
        key: 'basics',
        label: 'Общая информация',
        title: 'Общая информация',
        description: 'Здесь вам необходимо описать общие данные и цели проекта',
      },
      {
        key: 'budget',
        label: 'Бюджет и сроки',
        title: 'Бюджет и сроки',
        description: 'Опишите, на какие сроки и бюджет вы рассчитываете',
      },
      {
        key: 'team',
        label: 'Генерация плана',
        title: 'Генерация плана',
        description: 'Формируем план проекта на основе указанных вами данных',
      },
      {
        key: 'review',
        label: 'Валидация',
        title: 'Валидация',
        description: 'Проверьте правильность данных. Вы можете изменить их или продолжить',
      },
      {
        key: 'attachments',
        label: 'Способ оплаты',
        title: 'Способ оплаты',
        description: 'Выберите удобный способ оплаты чтобы продолжить',
      },
    ],
    [],
  )

  const projectTypes = useMemo(
    () => [
      'Веб-приложение',
      'Мобильное приложение',
      'Сервис/микросервисы (API)',
      'Платформа данных',
      'Инфраструктурный проект',
      'Проект по дизайну (UI/UX)',
    ],
    [],
  )

  const projectSizes = useMemo(
    () => [
      'Небольшой прототип',
      'Средний продукт',
      'Большая платформа (долгий проект)',
    ],
    [],
  )

  const projectFeatures = useMemo(
    () => [
      'Одностраничный сайт / лэндинг',
      'Подключение сторонних сервисов (оплата, CRM и т.п.)',
      'Отчёты и аналитика',
      'Умные подсказки и рекомендации',
      'Работа под большой нагрузкой',
      'Высокие требования к безопасности и конфиденциальности',
      'Важен безотказный 24/7 доступ',
    ],
    [],
  )

  const paymentTypes = useMemo(
    () => ['Поэтапно', 'Почасовая оплата', 'Фиксированная стоимость'],
    [],
  )

  const projectBalances = useMemo(
    () => ['Быстрее', 'Оптимально', 'Экономнее'],
    [],
  )

  const values = useMemo<NewProjectFormValues>(
    () => ({
      projectTypeValue,
      projectSizeValue,
      projectFeatureValues,
      projectName,
      projectDescription,
      projectGoals,
      projectAudience,
      projectNotes,
      paymentTypeValue,
      flexibleDeadlines,
      projectBalanceValue,
      maxHourlyRate,
      budgetValue,
      projectStart,
      projectEnd,
      validationAgreement,
      selectedPaymentMethod,
      paymentCardNumber,
      paymentCardExpiry,
      paymentCardCvc,
    }),
    [
      projectTypeValue,
      projectSizeValue,
      projectFeatureValues,
      projectName,
      projectDescription,
      projectGoals,
      projectAudience,
      projectNotes,
      paymentTypeValue,
      flexibleDeadlines,
      projectBalanceValue,
      maxHourlyRate,
      budgetValue,
      projectStart,
      projectEnd,
      validationAgreement,
      selectedPaymentMethod,
      paymentCardNumber,
      paymentCardExpiry,
      paymentCardCvc,
    ],
  )

  const totalAmount = budgetValue ? `${Number(budgetValue).toLocaleString('ru-RU')} ₽` : '0 ₽'

  const openDatePicker = (ref: { current: HTMLInputElement | null }) => {
    const el = ref.current
    if (!el) return
    const picker = el as HTMLInputElement & { showPicker?: () => void }
    if (typeof picker.showPicker === 'function') picker.showPicker()
    else picker.click()
  }

  const formatDate = (value: string) => {
    if (!value) return ''
    const [year, month, day] = value.split('-')
    if (!year || !month || !day) return value
    return `${day}.${month}.${year}`
  }

  const closeDropdowns = () => {
    setProjectTypeOpen(false)
    setProjectSizeOpen(false)
    setPaymentTypeOpen(false)
  }

  const applyDraft = (draft: Partial<NewProjectDraft>) => {
    if (typeof draft.projectTypeValue === 'string') setProjectTypeValue(draft.projectTypeValue)
    if (typeof draft.projectSizeValue === 'string') setProjectSizeValue(draft.projectSizeValue)
    if (Array.isArray(draft.projectFeatureValues)) {
      setProjectFeatureValues(
        draft.projectFeatureValues.filter(
          (value): value is string => typeof value === 'string' && value.trim().length > 0,
        ),
      )
    }
    if (typeof draft.projectName === 'string') setProjectName(draft.projectName)
    if (typeof draft.projectDescription === 'string') setProjectDescription(draft.projectDescription.slice(0, 500))
    if (typeof draft.projectGoals === 'string') setProjectGoals(draft.projectGoals.slice(0, 500))
    if (typeof draft.projectAudience === 'string') setProjectAudience(draft.projectAudience.slice(0, 250))
    if (typeof draft.projectNotes === 'string') setProjectNotes(draft.projectNotes.slice(0, 1000))
    if (typeof draft.paymentTypeValue === 'string') setPaymentTypeValue(draft.paymentTypeValue)
    if (typeof draft.flexibleDeadlines === 'boolean') setFlexibleDeadlines(draft.flexibleDeadlines)
    if (typeof draft.projectBalanceValue === 'string') setProjectBalanceValue(draft.projectBalanceValue)
    if (typeof draft.maxHourlyRate === 'string') setMaxHourlyRate(draft.maxHourlyRate)
    if (typeof draft.budgetValue === 'string') setBudgetValue(draft.budgetValue)
    if (typeof draft.projectStart === 'string') setProjectStart(draft.projectStart)
    if (typeof draft.projectEnd === 'string') setProjectEnd(draft.projectEnd)
    if (typeof draft.validationAgreement === 'boolean') setValidationAgreement(draft.validationAgreement)
    if (typeof draft.selectedPaymentMethod === 'string') setSelectedPaymentMethod(draft.selectedPaymentMethod)
    if (typeof draft.paymentCardNumber === 'string') setPaymentCardNumber(draft.paymentCardNumber)
    if (typeof draft.paymentCardExpiry === 'string') setPaymentCardExpiry(draft.paymentCardExpiry)
    if (typeof draft.paymentCardCvc === 'string') setPaymentCardCvc(draft.paymentCardCvc)

    if (Array.isArray(draft.fileNames)) {
      const safeNames = draft.fileNames
        .filter((name): name is string => typeof name === 'string' && name.trim().length > 0)
        .slice(0, MAX_FILES_COUNT)
      uploads.setDraftFileNames(safeNames)
    }
  }

  const createDraftPayload = (currentStep: number): NewProjectDraft => ({
    ...values,
    currentStep,
    fileNames: uploads.serializeFileNames,
  })

  return {
    dashboardBasePath,
    steps,
    values,
    uploads,
    projectTypes,
    projectSizes,
    projectFeatures,
    paymentTypes,
    projectBalances,
    projectTypeOpen,
    setProjectTypeOpen,
    projectSizeOpen,
    setProjectSizeOpen,
    setProjectTypeValue,
    setProjectSizeValue,
    setProjectFeatureValues,
    paymentTypeOpen,
    setPaymentTypeOpen,
    setPaymentTypeValue,
    setFlexibleDeadlines,
    setProjectBalanceValue,
    setProjectName,
    setProjectDescription,
    setProjectGoals,
    setProjectAudience,
    setProjectNotes,
    setMaxHourlyRate,
    setBudgetValue,
    setProjectStart,
    setProjectEnd,
    setValidationAgreement,
    setSelectedPaymentMethod,
    setPaymentCardNumber,
    setPaymentCardExpiry,
    setPaymentCardCvc,
    startDateRef,
    endDateRef,
    openDatePicker,
    closeDropdowns,
    formatDate,
    totalAmount,
    sanitizeDigits,
    formatCardNumber,
    formatCardExpiry,
    stepNumericValue,
    applyDraft,
    createDraftPayload,
  }
}
