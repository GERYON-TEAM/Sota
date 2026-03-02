import type { ChangeEvent } from 'react'
import type { ProfileTab } from '../types/profile.types'
import ProfileMainSection from './sections/ProfileMainSection'
import ProfileSecuritySection from './sections/ProfileSecuritySection'
import ProfileStackSection from './sections/ProfileStackSection'
import ProfileNotificationsSection from './sections/ProfileNotificationsSection'

type ProfilePanelProps = {
  activeTab: ProfileTab
  avatarUrl: string | null
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRemoveAvatar: () => void
  profileDirty: boolean
  onSaveProfile: () => void
  firstName: string
  lastName: string
  middleName: string
  onFirstNameChange: (value: string) => void
  onLastNameChange: (value: string) => void
  onMiddleNameChange: (value: string) => void
  twoFactorEnabled: boolean
  onToggleTwoFactor: () => void
  onOpenPasswordModal: () => void
  onOpenDeleteModal: () => void
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

export default function ProfilePanel({
  activeTab,
  avatarUrl,
  onAvatarChange,
  onRemoveAvatar,
  profileDirty,
  onSaveProfile,
  firstName,
  lastName,
  middleName,
  onFirstNameChange,
  onLastNameChange,
  onMiddleNameChange,
  twoFactorEnabled,
  onToggleTwoFactor,
  onOpenPasswordModal,
  onOpenDeleteModal,
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
  stackVariant,
  hideStackField,
}: ProfilePanelProps) {
  return (
    <div className="profile-page__panel">
      {activeTab === 'profile' && (
        <ProfileMainSection
          avatarUrl={avatarUrl}
          onAvatarChange={onAvatarChange}
          onRemoveAvatar={onRemoveAvatar}
          profileDirty={profileDirty}
          onSave={onSaveProfile}
          firstName={firstName}
          lastName={lastName}
          middleName={middleName}
          onFirstNameChange={onFirstNameChange}
          onLastNameChange={onLastNameChange}
          onMiddleNameChange={onMiddleNameChange}
        />
      )}

      {activeTab === 'security' && (
        <ProfileSecuritySection
          twoFactorEnabled={twoFactorEnabled}
          onToggleTwoFactor={onToggleTwoFactor}
          onOpenPasswordModal={onOpenPasswordModal}
          onOpenDeleteModal={onOpenDeleteModal}
        />
      )}

      {activeTab === 'about' && (
        <ProfileStackSection
          profileDirty={profileDirty}
          onSave={onSaveProfile}
          aboutExperience={aboutExperience}
          aboutBio={aboutBio}
          aboutStack={aboutStack}
          aboutStackItems={aboutStackItems}
          onExperienceChange={onExperienceChange}
          onBioChange={onBioChange}
          onStackChange={onStackChange}
          onAddStack={onAddStack}
          contactPhone={contactPhone}
          contactEmail={contactEmail}
          contactTelegram={contactTelegram}
          contactGithub={contactGithub}
          onContactPhoneChange={onContactPhoneChange}
          onContactEmailChange={onContactEmailChange}
          onContactTelegramChange={onContactTelegramChange}
          onContactGithubChange={onContactGithubChange}
          aboutLabel={aboutLabel}
          stackLabel={stackLabel}
          stackPlaceholder={stackPlaceholder}
          stackVariant={stackVariant}
          hideStackField={hideStackField}
        />
      )}

      {activeTab === 'notifications' && (
        <ProfileNotificationsSection enabled={twoFactorEnabled} onToggle={onToggleTwoFactor} />
      )}
    </div>
  )
}
