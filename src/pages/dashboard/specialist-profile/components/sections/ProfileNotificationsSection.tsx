import Switch from '../ui/Switch'

type ProfileNotificationsSectionProps = {
  enabled: boolean
  onToggle: () => void
}

export default function ProfileNotificationsSection({
  enabled,
  onToggle,
}: ProfileNotificationsSectionProps) {
  return (
    <div className="profile-page__section">
      <div className="profile-page__notifications-title">Настройка уведомлений</div>
      <div className="profile-page__notifications-row">
        <span className="profile-page__notifications-text">
          Позволить приложению присылать уведомления со звуком
        </span>
        <Switch checked={enabled} onToggle={onToggle} />
      </div>
    </div>
  )
}
