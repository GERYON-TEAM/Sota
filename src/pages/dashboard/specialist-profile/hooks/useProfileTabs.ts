import { useMemo, useState } from 'react'
import type { ProfileTab } from '../types/profile.types'

export const useProfileTabs = () => {
  const tabs = useMemo(
    () => [
      { id: 'profile' as ProfileTab, label: 'Мой профиль' },
      { id: 'security' as ProfileTab, label: 'Безопасность' },
      { id: 'about' as ProfileTab, label: 'О специалисте' },
      { id: 'notifications' as ProfileTab, label: 'Уведомления' },
    ],
    []
  )
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile')

  return { tabs, activeTab, setActiveTab }
}
