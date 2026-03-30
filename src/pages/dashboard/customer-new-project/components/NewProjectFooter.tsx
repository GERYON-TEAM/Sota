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
  onEditRequirements: () => void
  onEditBalance: () => void
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
  onEditRequirements,
  onEditBalance,
  onValidationAgreementChange,
}: NewProjectFooterProps) {
  const showBackButton = currentStep > 0
  const isSingleNav = currentStep >= 3 || !showBackButton
  const primaryActionLabel = currentStep === 3 ? 'Утвердить план' : 'Опубликовать проект'
  const draftBlock = (
    <>
      <button className="customer-new-project-draft" type="button" onClick={onSaveDraft}>
        <span className="customer-new-project-draft__title">Сохранить как черновик</span>
      </button>
      <p className="customer-new-project-draft__text">Вы сможете продолжить публикацию проекта позже</p>
    </>
  )

  return (
    <aside className="customer-new-project-side">
      {currentStep === 1 && (
        <div className="customer-new-project-plan-side">
          <button className="customer-new-project-plan-side__trigger" type="button" onClick={onNext}>
            Сгенерировать план
          </button>
          <p className="customer-new-project-plan-side__text">
            На основе указанных вами данных будут составлены такие документы, как “Смета проекта”, “Фазы проекта” и др.
          </p>
          <button className="customer-new-project-plan-side__more" type="button">
            Подробнее
          </button>
        </div>
      )}

      {currentStep === 3 ? (
        <div className="customer-new-project-validation-side-top">
          <div className="customer-new-project-publish customer-new-project-publish--validation">
            <button className="customer-new-project-publish__button" type="button" disabled={!validationAgreement} onClick={onPublish}>
              {primaryActionLabel}
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

          {draftBlock}
        </div>
      ) : (
        draftBlock
      )}

      {currentStep === 2 && (
        <button className="customer-new-project-skip" type="button" onClick={onSkipPlanning}>
          Пропустить этап
        </button>
      )}

      {currentStep >= 4 && (
        <div className="customer-new-project-publish">
          <button className="customer-new-project-publish__button" type="button" disabled={!validationAgreement} onClick={onPublish}>
            {primaryActionLabel}
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
              onClick={onEditRequirements}
            >
              Изменить требования
            </button>
            <button
              className="customer-new-project-validation-side-actions__button customer-new-project-validation-side-actions__button--balance"
              type="button"
              onClick={onEditBalance}
            >
              Изменить баланс проекта
            </button>
          </div>
        </div>
      ) : (
        <div className={`customer-new-project-nav${isSingleNav ? ' is-single' : ''}${currentStep === 4 ? ' customer-new-project-nav--payment' : ''}`}>
          {showBackButton && (
            <button
              className={`customer-new-project-nav__back${currentStep === 4 ? ' customer-new-project-nav__back--payment' : ''}`}
              type="button"
              onClick={onBack}
            >
              Назад
            </button>
          )}
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
