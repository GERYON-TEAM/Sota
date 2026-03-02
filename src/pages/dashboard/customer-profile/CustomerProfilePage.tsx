import { useMemo, useState } from 'react'
import CustomerSidebar from '../customer-dashboard/components/CustomerSidebar'
import CustomerHeaderBar from '../customer-dashboard/components/CustomerHeaderBar'
import '../customer-dashboard/styles/index.css'
import '../specialist-profile/styles/index.css'
import { useProfileTabs } from '../specialist-profile/hooks/useProfileTabs'
import { useProfileDraft } from '../specialist-profile/hooks/useProfileDraft'
import { useAvatarUpload } from '../specialist-profile/hooks/useAvatarUpload'
import ProfileTabs from '../specialist-profile/components/ProfileTabs'
import ProfilePanel from '../specialist-profile/components/ProfilePanel'
import EditFieldModal from '../specialist-profile/components/modals/EditFieldModal'
import ConfirmModal from '../specialist-profile/components/modals/ConfirmModal'

export default function CustomerProfilePage() {
  const [bellOpen, setBellOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { tabs, activeTab, setActiveTab } = useProfileTabs()
  const customerTabs = useMemo(
    () =>
      tabs.map((tab) =>
        tab.id === 'about' ? { ...tab, label: 'О заказчике' } : tab
      ),
    [tabs]
  )
  const {
    profileDirty,
    setProfileDirty,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    avatarUrl,
    setAvatarUrl,
    aboutExperience,
    setAboutExperience,
    aboutBio,
    setAboutBio,
    aboutStack,
    setAboutStack,
    aboutStackItems,
    addStackItems,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    contactTelegram,
    setContactTelegram,
    contactGithub,
    setContactGithub,
  } = useProfileDraft()

  const { handleAvatarChange } = useAvatarUpload({ setAvatarUrl, setProfileDirty })

  return (
    <div className="dashboard dashboard--customer">
      <CustomerSidebar />

      <main className="dashboard-content">
        <CustomerHeaderBar
          title="Мой профиль"
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <section className="profile-page">
            <div className="profile-page__content">
              <ProfileTabs tabs={customerTabs} activeTab={activeTab} onChange={setActiveTab} />

              <ProfilePanel
                activeTab={activeTab}
                avatarUrl={avatarUrl}
                onAvatarChange={handleAvatarChange}
                onRemoveAvatar={() => {
                  setAvatarUrl(null)
                  setProfileDirty(true)
                }}
                profileDirty={profileDirty}
                onSaveProfile={() => setProfileDirty(false)}
                firstName={firstName}
                lastName={lastName}
                middleName={middleName}
                onFirstNameChange={(value) => {
                  setFirstName(value)
                  setProfileDirty(true)
                }}
                onLastNameChange={(value) => {
                  setLastName(value)
                  setProfileDirty(true)
                }}
                onMiddleNameChange={(value) => {
                  setMiddleName(value)
                  setProfileDirty(true)
                }}
                aboutExperience={aboutExperience}
                aboutBio={aboutBio}
                aboutStack={aboutStack}
                aboutStackItems={aboutStackItems}
                onAboutExperienceChange={(value) => {
                  setAboutExperience(value)
                  setProfileDirty(true)
                }}
                onAboutBioChange={(value) => {
                  setAboutBio(value)
                  setProfileDirty(true)
                }}
                onAboutStackChange={(value) => {
                  setAboutStack(value)
                  setProfileDirty(true)
                }}
                onAddStackItem={(value) => {
                  addStackItems(value)
                  setProfileDirty(true)
                }}
                contactPhone={contactPhone}
                contactEmail={contactEmail}
                contactTelegram={contactTelegram}
                contactGithub={contactGithub}
                onContactPhoneChange={(value) => {
                  setContactPhone(value)
                  setProfileDirty(true)
                }}
                onContactEmailChange={(value) => {
                  setContactEmail(value)
                  setProfileDirty(true)
                }}
                onContactTelegramChange={(value) => {
                  setContactTelegram(value)
                  setProfileDirty(true)
                }}
                onContactGithubChange={(value) => {
                  setContactGithub(value)
                  setProfileDirty(true)
                }}
                aboutLabel="О заказчике"
                hideStackField
                twoFactorEnabled={twoFactorEnabled}
                onToggleTwoFactor={() => setTwoFactorEnabled((prev) => !prev)}
                onOpenPasswordModal={() => setPasswordModalOpen(true)}
                onOpenDeleteModal={() => setDeleteModalOpen(true)}
              />
            </div>
          </section>
        </div>
      </main>

      {passwordModalOpen && (
        <EditFieldModal
          title="Изменить пароль"
          submitLabel="Сохранить"
          onClose={() => setPasswordModalOpen(false)}
          onSubmit={() => setPasswordModalOpen(false)}
        >
          <div className="profile-modal__grid">
            <label className="profile-modal__label">
              Текущий пароль
              <input
                className="profile-modal__input"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </label>
            <label className="profile-modal__label">
              Новый пароль
              <input
                className="profile-modal__input"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </label>
            <label className="profile-modal__label">
              Повторите пароль
              <input
                className="profile-modal__input"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>
          </div>
        </EditFieldModal>
      )}

      {deleteModalOpen && (
        <ConfirmModal
          title="Удалить аккаунт?"
          description="Это действие нельзя отменить."
          cancelLabel="Отмена"
          confirmLabel="Удалить аккаунт"
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  )
}
