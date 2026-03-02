import { useState } from 'react'
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

export default function ProfilePage() {
  const [bellOpen, setBellOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { tabs, activeTab, setActiveTab } = useProfileTabs()
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
                twoFactorEnabled={twoFactorEnabled}
                onToggleTwoFactor={() => setTwoFactorEnabled((prev) => !prev)}
                onOpenPasswordModal={() => setPasswordModalOpen(true)}
                onOpenDeleteModal={() => setDeleteModalOpen(true)}
                aboutExperience={aboutExperience}
                aboutBio={aboutBio}
                aboutStack={aboutStack}
                aboutStackItems={aboutStackItems}
                onExperienceChange={(value) => {
                  setAboutExperience(value)
                  setProfileDirty(true)
                }}
                onBioChange={(value) => {
                  setAboutBio(value)
                  setProfileDirty(true)
                }}
                onStackChange={(value) => {
                  setAboutStack(value)
                  setProfileDirty(true)
                }}
                onAddStack={() => {
                  const value = aboutStack.trim()
                  if (!value) return
                  addStackItems(value)
                  setAboutStack('')
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
