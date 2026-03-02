import type { ProfileTab } from '../types/profile.types'

type ProfileTabsProps = {
  tabs: { id: ProfileTab; label: string }[]
  activeTab: ProfileTab
  onChange: (tab: ProfileTab) => void
}

export default function ProfileTabs({ tabs, activeTab, onChange }: ProfileTabsProps) {
  return (
    <div className="profile-page__tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`profile-page__tab${activeTab === tab.id ? ' is-active' : ''}`}
          type="button"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
