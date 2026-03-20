type NewProjectFooterProps = {
  currentStep: number
  totalSteps: number
  canNext: boolean
  validationAgreement: boolean
  onSaveDraft: () => void
  onSkipPlanning: () => void
  onPublish: () => void
  onBack: () => void
  onNext: () => void
  onValidationAgreementChange: (value: boolean) => void
}

export default function NewProjectFooter({
  currentStep,
  totalSteps,
  canNext,
  validationAgreement,
  onSaveDraft,
  onSkipPlanning,
  onPublish,
  onBack,
  onNext,
  onValidationAgreementChange,
}: NewProjectFooterProps) {
  return (
    <aside className="customer-new-project-side">
      <button className="customer-new-project-draft" type="button" onClick={onSaveDraft}>
        <span className="customer-new-project-draft__title">Сохранить как черновик</span>
      </button>
      <p className="customer-new-project-draft__text">Вы сможете продолжить публикацию проекта позже</p>

      {currentStep === 2 && (
        <button className="customer-new-project-skip" type="button" onClick={onSkipPlanning}>
          Пропустить этап
        </button>
      )}

      {currentStep >= 3 && (
        <div className="customer-new-project-publish">
          <button className="customer-new-project-publish__button" type="button" disabled={!validationAgreement} onClick={onPublish}>
            Опубликовать проект
          </button>
          <label className="customer-new-project-publish__agreement">
            <input
              className="customer-new-project-publish__checkbox"
              type="checkbox"
              checked={validationAgreement}
              onChange={(event) => onValidationAgreementChange(event.target.checked)}
            />
            <span className="customer-new-project-publish__radio" aria-hidden="true" />
            <span className="customer-new-project-publish__agreement-text">Я согласен с Условиями пользовательского соглашения</span>
          </label>
        </div>
      )}

      {currentStep === 3 ? (
        <div className="customer-new-project-validation-side-bottom">
          <div className="customer-new-project-validation-side-actions">
            <button
              className="customer-new-project-validation-side-actions__button customer-new-project-validation-side-actions__button--requirements"
              type="button"
            >
              Изменить требования
            </button>
            <button
              className="customer-new-project-validation-side-actions__button customer-new-project-validation-side-actions__button--balance"
              type="button"
            >
              Изменить баланс проекта
            </button>
          </div>

          <div className="customer-new-project-nav is-single">
            <button className="customer-new-project-nav__back" type="button" onClick={onBack}>
              Назад
            </button>
          </div>
        </div>
      ) : (
        <div className={`customer-new-project-nav${currentStep >= 3 ? ' is-single' : ''}`}>
          <button className="customer-new-project-nav__back" type="button" onClick={onBack}>
            Назад
          </button>
          {currentStep < 3 && (
            <button className="customer-new-project-nav__next" type="button" onClick={onNext} disabled={!canNext}>
              Далее
            </button>
          )}
        </div>
      )}

      <span hidden>{totalSteps}</span>
    </aside>
  )
}
