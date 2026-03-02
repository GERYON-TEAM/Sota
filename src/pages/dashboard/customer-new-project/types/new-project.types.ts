export const MAX_FILES_COUNT = 5
export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024

export const NEW_PROJECT_DRAFT_STORAGE_KEY = 'sota:customer-new-project:draft:v1'
export const NEW_PROJECT_DRAFT_SESSION_STORAGE_KEY = 'sota:customer-new-project:draft:session:v1'
export const DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY = 'sota:customer-dashboard:publish-notice:v1'

export type NewProjectStep = {
  key: string
  label: string
  title: string
  description: string
}

export type NewProjectFormValues = {
  categoryValue: string
  projectName: string
  projectDescription: string
  paymentTypeValue: string
  maxHourlyRate: string
  budgetValue: string
  projectStart: string
  projectEnd: string
  planningModelValue: string
  planningStackValue: string
  planningComplexityValue: string
  planningPreviewVisible: boolean
  validationAgreement: boolean
  selectedPaymentMethod: string
  paymentCardNumber: string
  paymentCardExpiry: string
  paymentCardCvc: string
}

export type NewProjectDraft = NewProjectFormValues & {
  currentStep: number
  fileNames: string[]
}

export type PaymentMethod = {
  id: string
  title: string
}

export type ValidationErrors = Partial<Record<keyof NewProjectFormValues, string>>
