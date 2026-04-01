import { useEffect, useState } from 'react'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import { useProfileTabs } from './hooks/useProfileTabs'
import { useProfileDraft } from './hooks/useProfileDraft'
import { useAvatarUpload } from './hooks/useAvatarUpload'
import ProfileTabs from './components/ProfileTabs'
import ProfilePanel from './components/ProfilePanel'
import EditFieldModal from './components/modals/EditFieldModal'
import ConfirmModal from './components/modals/ConfirmModal'
import TwoFactorModal from './components/modals/TwoFactorModal'
import { changePassword, getMe } from '../../../shared/api/authApi'

export default function ProfilePage() {
  const [bellOpen, setBellOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false)
  const [twoFactorMode, setTwoFactorMode] = useState<'enable' | 'disable'>('enable')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    getMe().then((data) => {
      if ((data as Record<string, unknown>).two_factor_enabled) {
        setTwoFactorEnabled(true)
      }
    }).catch(() => {})
  }, [])
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)

  const { tabs, activeTab, setActiveTab } = useProfileTabs()
  const draft = useProfileDraft()
  const { handleAvatarChange } = useAvatarUpload({ setAvatarUrl: draft.setAvatarUrl, setProfileDirty: draft.setProfileDirty })

  const handleSavePassword = async () => {
    setPasswordError('')
    if (!currentPassword) {
      setPasswordError('Введите текущий пароль')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Пароли не совпадают')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Минимум 8 символов')
      return
    }
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError('Нужна хотя бы одна заглавная буква')
      return
    }
    if (!/[0-9]/.test(newPassword)) {
      setPasswordError('Нужна хотя бы одна цифра')
      return
    }
    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setPasswordError('Нужен хотя бы один спецсимвол')
      return
    }
    setPasswordSaving(true)
    try {
      await changePassword({ old_password: currentPassword, new_password: newPassword })
      setPasswordModalOpen(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      const apiErr = err as { detail?: string }
      setPasswordError(apiErr.detail ?? 'Ошибка смены пароля')
    } finally {
      setPasswordSaving(false)
    }
  }

  if (draft.loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <main className="dashboard-content">
          <div className="dashboard-surface" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p>Загрузка...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar
          title="Мой профиль"
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <section className="profile-page">
            <div className="profile-page__content">
              <ProfileTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

              <ProfilePanel
                activeTab={activeTab}
                avatarUrl={draft.avatarUrl}
                onAvatarChange={handleAvatarChange}
                onRemoveAvatar={() => {
                  draft.setAvatarUrl(null)
                  draft.setProfileDirty(true)
                }}
                profileDirty={draft.profileDirty}
                onSaveProfile={() => draft.saveProfile()}
                firstName={draft.firstName}
                lastName={draft.lastName}
                middleName={draft.middleName}
                onFirstNameChange={(value) => {
                  draft.setFirstName(value)
                  draft.setProfileDirty(true)
                }}
                onLastNameChange={(value) => {
                  draft.setLastName(value)
                  draft.setProfileDirty(true)
                }}
                onMiddleNameChange={(value) => {
                  draft.setMiddleName(value)
                  draft.setProfileDirty(true)
                }}
                twoFactorEnabled={twoFactorEnabled}
                onToggleTwoFactor={() => {
                  setTwoFactorMode(twoFactorEnabled ? 'disable' : 'enable')
                  setTwoFactorModalOpen(true)
                }}
                onOpenPasswordModal={() => setPasswordModalOpen(true)}
                onOpenDeleteModal={() => setDeleteModalOpen(true)}
                notificationsEnabled={notificationsEnabled}
                onToggleNotifications={() => setNotificationsEnabled((prev) => !prev)}
                saving={draft.saving}
                saveError={draft.saveError}
                fieldErrors={draft.fieldErrors}
                aboutExperience={draft.aboutExperience}
                aboutBio={draft.aboutBio}
                aboutStack={draft.aboutStack}
                aboutStackItems={draft.aboutStackItems}
                onExperienceChange={(value) => {
                  draft.setAboutExperience(value)
                  draft.setProfileDirty(true)
                }}
                onBioChange={(value) => {
                  draft.setAboutBio(value)
                  draft.setProfileDirty(true)
                }}
                onStackChange={(value) => {
                  draft.setAboutStack(value)
                  draft.setProfileDirty(true)
                }}
                onAddStack={() => {
                  const value = draft.aboutStack.trim()
                  if (!value) return
                  draft.addStackItems(value)
                  draft.setAboutStack('')
                  draft.setProfileDirty(true)
                }}
                contactPhone={draft.contactPhone}
                contactEmail={draft.contactEmail}
                contactTelegram={draft.contactTelegram}
                contactGithub={draft.contactGithub}
                onContactPhoneChange={(value) => {
                  draft.setContactPhone(value)
                  draft.setProfileDirty(true)
                }}
                onContactEmailChange={(value) => {
                  draft.setContactEmail(value)
                  draft.setProfileDirty(true)
                }}
                onContactTelegramChange={(value) => {
                  draft.setContactTelegram(value)
                  draft.setProfileDirty(true)
                }}
                onContactGithubChange={(value) => {
                  draft.setContactGithub(value)
                  draft.setProfileDirty(true)
                }}
              />
            </div>
          </section>
        </div>
      </main>

      <EditFieldModal
        isOpen={passwordModalOpen}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onChangeCurrent={setCurrentPassword}
        onChangeNew={setNewPassword}
        onChangeConfirm={setConfirmPassword}
        onClose={() => {
          setPasswordModalOpen(false)
          setPasswordError('')
        }}
        onSave={handleSavePassword}
        error={passwordError}
        saving={passwordSaving}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => setDeleteModalOpen(false)}
      />

      <TwoFactorModal
        isOpen={twoFactorModalOpen}
        mode={twoFactorMode}
        onClose={() => setTwoFactorModalOpen(false)}
        onSuccess={() => setTwoFactorEnabled((prev) => !prev)}
      />
    </div>
  )
}
