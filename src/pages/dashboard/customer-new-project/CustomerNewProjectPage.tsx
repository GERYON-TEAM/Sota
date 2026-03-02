import { useMemo, useState } from 'react'
import CustomerSidebar from '../customer-dashboard/components/CustomerSidebar'
import '../customer-dashboard/styles/index.css'
import './styles/index.css'
import { useDashboardDropdowns } from '../specialist-dashboard/hooks/useDashboardDropdowns'
import NewProjectHeader from './components/NewProjectHeader'
import NewProjectSteps from './components/NewProjectSteps'
import NewProjectFooter from './components/NewProjectFooter'
import BasicsStep from './components/sections/BasicsStep'
import BudgetStep from './components/sections/BudgetStep'
import TeamStep from './components/sections/TeamStep'
import ReviewStep from './components/sections/ReviewStep'
import AttachmentsStep from './components/sections/AttachmentsStep'
import DetailsStep from './components/sections/DetailsStep'
import ConfirmLeaveModal from './components/modals/ConfirmLeaveModal'
import SuccessModal from './components/modals/SuccessModal'
import TemplateModal from './components/modals/TemplateModal'
import { useNewProjectForm } from './hooks/useNewProjectForm'
import { useNewProjectValidation } from './hooks/useNewProjectValidation'
import { useNewProjectSteps } from './hooks/useNewProjectSteps'
import { useDraftAutosave } from './hooks/useDraftAutosave'
import {
  DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY,
  type NewProjectDraft,
  NEW_PROJECT_DRAFT_SESSION_STORAGE_KEY,
  NEW_PROJECT_DRAFT_STORAGE_KEY,
} from './types/new-project.types'

export default function CustomerNewProjectPage() {
  const { bellOpen, setBellOpen } = useDashboardDropdowns()
  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [templateOpen, setTemplateOpen] = useState(false)

  const form = useNewProjectForm()
  const validation = useNewProjectValidation(form.values)
  const stepsState = useNewProjectSteps(form.steps.length, validation.isValidStep)

  const { persist, clear } = useDraftAutosave<NewProjectDraft>({
    storageKey: NEW_PROJECT_DRAFT_STORAGE_KEY,
    sessionKey: NEW_PROJECT_DRAFT_SESSION_STORAGE_KEY,
    onRestore: (draft) => {
      form.applyDraft(draft)
      if (typeof draft.currentStep === 'number') {
        stepsState.goTo(draft.currentStep)
      }
    },
  })

  const summaryCards = useMemo(
    () => [
      { label: 'Бюджет фазы', value: form.values.budgetValue ? `${form.values.budgetValue} ₽` : 'Не указано' },
      {
        label: 'Сроки',
        value:
          form.values.projectStart && form.values.projectEnd
            ? `${form.formatDate(form.values.projectStart)} - ${form.formatDate(form.values.projectEnd)}`
            : 'Не указано',
      },
      { label: 'Тип оплаты', value: form.values.paymentTypeValue || 'Не указано' },
      {
        label: 'Макс. ставка / час',
        value: form.values.maxHourlyRate ? `${form.values.maxHourlyRate} ₽` : 'Не указано',
      },
      { label: 'Модель управления', value: form.values.planningModelValue || 'Не указано' },
      { label: 'Стек технологий', value: form.values.planningStackValue || 'Не указано' },
      { label: 'Сложность', value: form.values.planningComplexityValue || 'Не указано' },
      {
        label: 'Файлы',
        value: form.uploads.totalFilesCount > 0 ? `${form.uploads.totalFilesCount} шт.` : 'Не загружены',
      },
    ],
    [
      form,
      form.values.budgetValue,
      form.values.maxHourlyRate,
      form.values.paymentTypeValue,
      form.values.planningComplexityValue,
      form.values.planningModelValue,
      form.values.planningStackValue,
      form.values.projectEnd,
      form.values.projectStart,
      form.uploads.totalFilesCount,
    ],
  )

  const currentStepMeta = form.steps[stepsState.step]

  const handleSaveDraft = () => {
    const isSaved = persist(form.createDraftPayload(stepsState.step))
    if (isSaved) {
      window.location.href = form.dashboardBasePath
    }
  }

  const handlePublish = () => {
    if (stepsState.step < form.steps.length - 1) {
      stepsState.goTo(form.steps.length - 1)
      return
    }

    const noticePayload = {
      title: 'Проект опубликован',
      description: 'Ваш проект успешно выложен и доступен специалистам.',
      durationMs: 4800,
    }

    try {
      sessionStorage.setItem(DASHBOARD_PUBLISH_NOTICE_STORAGE_KEY, JSON.stringify(noticePayload))
    } catch {
      // ignore
    }

    clear()
    setSuccessOpen(true)
    window.location.href = form.dashboardBasePath
  }

  const renderCurrentStep = () => {
    if (stepsState.step === 0) {
      return (
        <BasicsStep
          categoryOpen={form.categoryOpen}
          categoryValue={form.values.categoryValue}
          categories={form.categories}
          projectName={form.values.projectName}
          projectDescription={form.values.projectDescription}
          files={form.uploads.files}
          draftFileNames={form.uploads.draftFileNames}
          totalFilesCount={form.uploads.totalFilesCount}
          isDragActive={form.uploads.isDragActive}
          uploadError={form.uploads.uploadError}
          fileInputRef={form.uploads.fileInputRef}
          setCategoryOpen={form.setCategoryOpen}
          setCategoryValue={form.setCategoryValue}
          setProjectName={form.setProjectName}
          setProjectDescription={form.setProjectDescription}
          handleFileInputChange={form.uploads.handleFileInputChange}
          handleDrop={form.uploads.handleDrop}
          setIsDragActive={form.uploads.setIsDragActive}
          openFilePreview={form.uploads.openFilePreview}
          removeFile={form.uploads.removeFile}
          removeDraftFile={form.uploads.removeDraftFile}
        />
      )
    }

    if (stepsState.step === 1) {
      return (
        <BudgetStep
          paymentTypeOpen={form.paymentTypeOpen}
          paymentTypeValue={form.values.paymentTypeValue}
          paymentTypes={form.paymentTypes}
          maxHourlyRate={form.values.maxHourlyRate}
          budgetValue={form.values.budgetValue}
          projectStart={form.values.projectStart}
          projectEnd={form.values.projectEnd}
          startDateRef={form.startDateRef}
          endDateRef={form.endDateRef}
          setPaymentTypeOpen={form.setPaymentTypeOpen}
          setPaymentTypeValue={form.setPaymentTypeValue}
          setMaxHourlyRate={form.setMaxHourlyRate}
          setBudgetValue={form.setBudgetValue}
          setProjectStart={form.setProjectStart}
          setProjectEnd={form.setProjectEnd}
          sanitizeDigits={form.sanitizeDigits}
          stepNumericValue={form.stepNumericValue}
          formatDate={form.formatDate}
          openDatePicker={form.openDatePicker}
        />
      )
    }

    if (stepsState.step === 2) {
      return (
        <TeamStep
          planningModelOpen={form.planningModelOpen}
          planningModelValue={form.values.planningModelValue}
          planningModels={form.planningModels}
          planningStackOpen={form.planningStackOpen}
          planningStackValue={form.values.planningStackValue}
          planningStacks={form.planningStacks}
          planningComplexityOpen={form.planningComplexityOpen}
          planningComplexityValue={form.values.planningComplexityValue}
          planningComplexities={form.planningComplexities}
          planningPreviewVisible={form.values.planningPreviewVisible}
          setPlanningModelOpen={form.setPlanningModelOpen}
          setPlanningModelValue={form.setPlanningModelValue}
          setPlanningStackOpen={form.setPlanningStackOpen}
          setPlanningStackValue={form.setPlanningStackValue}
          setPlanningComplexityOpen={form.setPlanningComplexityOpen}
          setPlanningComplexityValue={form.setPlanningComplexityValue}
          setPlanningPreviewVisible={form.setPlanningPreviewVisible}
        />
      )
    }

    if (stepsState.step === 3) {
      return (
        <ReviewStep
          projectName={form.values.projectName}
          projectDescription={form.values.projectDescription}
          categoryOpen={form.categoryOpen}
          categoryValue={form.values.categoryValue}
          categories={form.categories}
          setProjectName={form.setProjectName}
          setProjectDescription={form.setProjectDescription}
          setCategoryOpen={form.setCategoryOpen}
          setCategoryValue={form.setCategoryValue}
          summaryCards={summaryCards}
        />
      )
    }

    if (stepsState.step === 4) {
      return (
        <AttachmentsStep
          totalAmount={form.totalAmount}
          selectedPaymentMethod={form.values.selectedPaymentMethod}
          paymentCardNumber={form.values.paymentCardNumber}
          paymentCardExpiry={form.values.paymentCardExpiry}
          paymentCardCvc={form.values.paymentCardCvc}
          setSelectedPaymentMethod={form.setSelectedPaymentMethod}
          setPaymentCardNumber={form.setPaymentCardNumber}
          setPaymentCardExpiry={form.setPaymentCardExpiry}
          setPaymentCardCvc={form.setPaymentCardCvc}
          formatCardNumber={form.formatCardNumber}
          formatCardExpiry={form.formatCardExpiry}
          sanitizeDigits={form.sanitizeDigits}
        />
      )
    }

    return <DetailsStep />
  }

  return (
    <div className="dashboard dashboard--customer">
      <CustomerSidebar />

      <main className="dashboard-content">
        <NewProjectHeader
          dashboardBasePath={form.dashboardBasePath}
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div
          className="dashboard-surface customer-new-project-surface"
          onClick={() => {
            form.closeDropdowns()
          }}
        >
          <NewProjectSteps steps={form.steps} currentStep={stepsState.step} />

          <section className="customer-new-project-layout">
            <div className="customer-new-project-main">
              <div className="customer-new-project-intro">
                <h2 className="customer-new-project-intro__title">{currentStepMeta.title}</h2>
                <p className="customer-new-project-intro__text">{currentStepMeta.description}</p>
              </div>

              {renderCurrentStep()}
            </div>

            <NewProjectFooter
              currentStep={stepsState.step}
              totalSteps={form.steps.length}
              canNext={stepsState.canNext}
              validationAgreement={form.values.validationAgreement}
              onSaveDraft={handleSaveDraft}
              onSkipPlanning={() => stepsState.next()}
              onPublish={handlePublish}
              onBack={() => stepsState.back()}
              onNext={() => stepsState.next()}
              onValidationAgreementChange={form.setValidationAgreement}
            />
          </section>
        </div>
      </main>

      <ConfirmLeaveModal
        isOpen={confirmLeaveOpen}
        onClose={() => setConfirmLeaveOpen(false)}
        onConfirm={() => {
          setConfirmLeaveOpen(false)
          handleSaveDraft()
        }}
      />
      <SuccessModal isOpen={successOpen} onClose={() => setSuccessOpen(false)} />
      <TemplateModal isOpen={templateOpen} onClose={() => setTemplateOpen(false)} />
    </div>
  )
}
