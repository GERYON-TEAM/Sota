import type { ChangeEvent } from 'react'
import AvatarUpload from '../ui/AvatarUpload'
import Field from '../ui/Field'

type ProfileMainSectionProps = {
  avatarUrl: string | null
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRemoveAvatar: () => void
  profileDirty: boolean
  saving?: boolean
  saveError?: string | null
  onSave: () => void
  firstName: string
  lastName: string
  middleName: string
  onFirstNameChange: (value: string) => void
  onLastNameChange: (value: string) => void
  onMiddleNameChange: (value: string) => void
}

export default function ProfileMainSection({
  avatarUrl,
  onAvatarChange,
  onRemoveAvatar,
  profileDirty,
  saving,
  saveError,
  onSave,
  firstName,
  lastName,
  middleName,
  onFirstNameChange,
  onLastNameChange,
  onMiddleNameChange,
}: ProfileMainSectionProps) {
  return (
    <div className="profile-page__section">
      <div className="profile-page__top">
        <div className="profile-page__avatar-block">
          <AvatarUpload avatarUrl={avatarUrl} onChange={onAvatarChange} />
          <div className="profile-page__avatar-name">{firstName && lastName ? `${firstName} ${lastName}` : 'Имя пользователя'}</div>
        </div>
        <div className="profile-page__actions">
          <button className="profile-page__remove" type="button" onClick={onRemoveAvatar}>
            Удалить фото
          </button>
          <label className="profile-page__upload">
            Загрузить новое фото
            <input
              className="profile-page__avatar-input"
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
            />
          </label>
          <button
            className={`profile-page__save${profileDirty ? ' is-active' : ''}`}
            type="button"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>

      {saveError && <p style={{ color: '#e53935', fontSize: '14px', margin: '0 0 12px' }}>{saveError}</p>}
      <Field label="Фамилия" value={lastName} onChange={onLastNameChange} placeholder="Фамилия" />
      <Field label="Имя" value={firstName} onChange={onFirstNameChange} placeholder="Имя" />
      <Field
        label="Отчество"
        value={middleName}
        onChange={onMiddleNameChange}
        placeholder="Отчество"
      />
      <p className="profile-page__note">Эти данные отображаются в публичном профиле</p>
    </div>
  )
}
