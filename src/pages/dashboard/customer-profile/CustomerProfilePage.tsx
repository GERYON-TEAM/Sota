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
  const draft = useProfileDraft()

  const { handleAvatarChange } = useAvatarUpload({ setAvatarUrl: draft.setAvatarUrl, setProfileDirty: draft.setProfileDirty })

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
                aboutExperience={draft.aboutExperience}
                aboutBio={draft.aboutBio}
                aboutStack={draft.aboutStack}
                aboutStackItems={draft.aboutStackItems}
                onExperienceChange={() => {}}
                onBioChange={(value) => {
                  draft.setAboutBio(value)
                  draft.setProfileDirty(true)
                }}
                onStackChange={() => {}}
                onAddStack={() => {}}
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
                onContactGithubChange={() => {}}
                aboutLabel="О заказчике"
                hideStackField
                hideExperienceField
                hideGithubField
                twoFactorEnabled={twoFactorEnabled}
                onToggleTwoFactor={() => setTwoFactorEnabled((prev) => !prev)}
                onOpenPasswordModal={() => setPasswordModalOpen(true)}
                onOpenDeleteModal={() => setDeleteModalOpen(true)}
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
        onClose={() => setPasswordModalOpen(false)}
        onSave={() => {
          setPasswordModalOpen(false)
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
        }}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => setDeleteModalOpen(false)}
      />
    </div>
  )
}
