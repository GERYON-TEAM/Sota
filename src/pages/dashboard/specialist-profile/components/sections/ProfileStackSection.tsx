import Field from '../ui/Field'
import TextareaField from '../ui/TextareaField'
import StackChips from '../ui/StackChips'

type ProfileStackSectionProps = {
  profileDirty: boolean
  onSave: () => void
  aboutExperience: string
  aboutBio: string
  aboutStack: string
  aboutStackItems: string[]
  onExperienceChange: (value: string) => void
  onBioChange: (value: string) => void
  onStackChange: (value: string) => void
  onAddStack: () => void
  contactPhone: string
  contactEmail: string
  contactTelegram: string
  contactGithub: string
  onContactPhoneChange: (value: string) => void
  onContactEmailChange: (value: string) => void
  onContactTelegramChange: (value: string) => void
  onContactGithubChange: (value: string) => void
  aboutLabel?: string
  stackLabel?: string
  stackPlaceholder?: string
  stackVariant?: 'stack' | 'count'
  hideStackField?: boolean
}

export default function ProfileStackSection({
  profileDirty,
  onSave,
  aboutExperience,
  aboutBio,
  aboutStack,
  aboutStackItems,
  onExperienceChange,
  onBioChange,
  onStackChange,
  onAddStack,
  contactPhone,
  contactEmail,
  contactTelegram,
  contactGithub,
  onContactPhoneChange,
  onContactEmailChange,
  onContactTelegramChange,
  onContactGithubChange,
  aboutLabel,
  stackLabel,
  stackPlaceholder,
  stackVariant = 'stack',
  hideStackField = false,
}: ProfileStackSectionProps) {
  const resolvedAboutLabel = aboutLabel ?? 'О специалисте'
  const resolvedStackLabel = stackLabel ?? 'Стек технологий'
  const resolvedStackPlaceholder = stackPlaceholder ?? resolvedStackLabel
  const showStackExtras = stackVariant === 'stack' && !hideStackField

  return (
    <div className="profile-page__section">
      <div className="profile-page__row profile-page__row--between profile-page__row--heading">
        <span className="profile-page__label">Общие данные</span>
        <button
          className={`profile-page__save${profileDirty ? ' is-active' : ''}`}
          type="button"
          onClick={onSave}
        >
          Сохранить
        </button>
      </div>

      <Field
        label="Опыт"
        value={aboutExperience}
        onChange={onExperienceChange}
        placeholder="Опыт"
      />
      <TextareaField label={resolvedAboutLabel} value={aboutBio} onChange={onBioChange} />

      {!hideStackField && (
        <div className="profile-page__field">
          <span className="profile-page__field-label">{resolvedStackLabel}</span>
          <div className="profile-page__stack-row">
            <input
              className="profile-page__input profile-page__input--stack"
              value={aboutStack}
              onChange={(event) => onStackChange(event.target.value)}
              placeholder={resolvedStackPlaceholder}
            />
            {showStackExtras && (
              <button
                className="profile-page__stack-add"
                type="button"
                onClick={onAddStack}
              >
                <span className="profile-page__stack-plus">+</span>
              </button>
            )}
          </div>
        </div>
      )}

      {showStackExtras && <StackChips items={aboutStackItems} />}

      <div className="profile-page__label">Контактные данные</div>
      <Field
        label="Телефон"
        value={contactPhone}
        onChange={onContactPhoneChange}
        placeholder="Телефон (любой формат)"
        type="tel"
      />
      <Field
        label="Почта"
        value={contactEmail}
        onChange={onContactEmailChange}
        placeholder="Почта"
        type="email"
      />
      <Field
        label="Telegram"
        value={contactTelegram}
        onChange={onContactTelegramChange}
        placeholder="Ссылка на Telegram"
        type="url"
      />
      <Field
        label="GitHub"
        value={contactGithub}
        onChange={onContactGithubChange}
        placeholder="Ссылка на GitHub"
        type="url"
      />
    </div>
  )
}
