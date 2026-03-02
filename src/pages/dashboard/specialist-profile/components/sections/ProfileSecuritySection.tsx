import Switch from '../ui/Switch'

type ProfileSecuritySectionProps = {
  twoFactorEnabled: boolean
  onToggleTwoFactor: () => void
  onOpenPasswordModal: () => void
  onOpenDeleteModal: () => void
}

export default function ProfileSecuritySection({
  twoFactorEnabled,
  onToggleTwoFactor,
  onOpenPasswordModal,
  onOpenDeleteModal,
}: ProfileSecuritySectionProps) {
  return (
    <div className="profile-page__section">
      <div className="profile-page__row profile-page__row--between">
        <span className="profile-page__label">Пароль</span>
        <button className="profile-page__ghost" type="button" onClick={onOpenPasswordModal}>
          Изменить пароль
        </button>
      </div>

      <div className="profile-page__row profile-page__row--between">
        <span className="profile-page__label">Двухфакторная аутентификация</span>
        <Switch checked={twoFactorEnabled} onToggle={onToggleTwoFactor} />
      </div>

      <div className="profile-page__session-card">
        <div className="profile-page__session-info">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M28.8475 47.5H8.75002C8.39502 47.5 8.09835 47.38 7.86002 47.14C7.62168 46.9 7.50168 46.6025 7.50002 46.2475C7.49835 45.8925 7.61835 45.5958 7.86002 45.3575C8.10168 45.1192 8.39835 45 8.75002 45H28.8475C29.2008 45 29.4975 45.12 29.7375 45.36C29.9775 45.6 30.0975 45.8975 30.0975 46.2525C30.0975 46.6075 29.9775 46.9042 29.7375 47.1425C29.4975 47.3808 29.2008 47.5 28.8475 47.5ZM14.04 41.54C12.8884 41.54 11.9275 41.1542 11.1575 40.3825C10.3875 39.6108 10.0017 38.65 10 37.5V16.54C10 15.3883 10.3858 14.4275 11.1575 13.6575C11.9292 12.8875 12.89 12.5017 14.04 12.5H48.365C48.72 12.5 49.0175 12.62 49.2575 12.86C49.4975 13.1 49.6167 13.3975 49.615 13.7525C49.6134 14.1075 49.4942 14.4042 49.2575 14.6425C49.0209 14.8808 48.7234 15 48.365 15H14.04C13.655 15 13.3017 15.16 12.98 15.48C12.6584 15.8 12.4984 16.1533 12.5 16.54V37.5C12.5 37.8833 12.66 38.2358 12.98 38.5575C13.3 38.8792 13.6525 39.04 14.0375 39.04H28.8475C29.2008 39.04 29.4975 39.1592 29.7375 39.3975C29.9759 39.6375 30.095 39.935 30.095 40.29C30.095 40.645 29.9759 40.9417 29.7375 41.18C29.4992 41.4183 29.2017 41.5383 28.845 41.54H14.04ZM50.48 44.1825V25.24C50.48 25.0167 50.4 24.825 50.24 24.665C50.08 24.5033 49.8884 24.4225 49.665 24.4225H40.335C40.1117 24.4225 39.92 24.5025 39.76 24.6625C39.6 24.8225 39.52 25.015 39.52 25.24V44.1825C39.52 44.4075 39.6 44.5992 39.76 44.7575C39.92 44.9192 40.1117 45 40.335 45H49.6625C49.8875 45 50.08 44.92 50.24 44.76C50.4 44.6 50.48 44.4075 50.48 44.1825ZM40.05 47.5C39.21 47.5 38.495 47.2058 37.905 46.6175C37.3167 46.0275 37.0225 45.3125 37.0225 44.4725V24.95C37.0225 24.1083 37.3167 23.3933 37.905 22.805C38.4933 22.215 39.2084 21.92 40.05 21.92H49.955C50.795 21.92 51.51 22.2142 52.1 22.8025C52.6884 23.3925 52.9825 24.1083 52.9825 24.95V44.4675C52.9825 45.3092 52.6884 46.025 52.1 46.615C51.5117 47.2033 50.7967 47.4975 49.955 47.4975L40.05 47.5ZM44.995 31.25C45.4783 31.25 45.8809 31.0833 46.2025 30.75C46.5242 30.4133 46.685 30.0217 46.685 29.575C46.685 29.0917 46.5242 28.6892 46.2025 28.3675C45.8809 28.0458 45.4742 27.885 44.9825 27.885C44.5275 27.885 44.1367 28.0458 43.81 28.3675C43.4833 28.6892 43.32 29.0958 43.32 29.5875C43.32 30.0425 43.4867 30.4333 43.82 30.76C44.155 31.0867 44.5467 31.25 44.995 31.25Z"
              fill="#0B1215"
            />
          </svg>
          <div className="profile-page__session-text">
            <span className="profile-page__session-title">iPhone 14</span>
            <span className="profile-page__session-sub">
              Это устройство · Ростов-на-Дону, Россия
            </span>
          </div>
        </div>
        <button className="profile-page__danger" type="button">
          Завершить сессию
        </button>
      </div>

      <div className="profile-page__row profile-page__row--between">
        <span className="profile-page__label">Аккаунт</span>
        <button className="profile-page__danger-outline" type="button" onClick={onOpenDeleteModal}>
          Удалить аккаунт
        </button>
      </div>
    </div>
  )
}
