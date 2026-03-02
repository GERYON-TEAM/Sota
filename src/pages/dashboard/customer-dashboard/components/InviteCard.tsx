import RatingDots from '../../../../shared/ui/color-dots/RatingDots'
import type { Invite } from '../types/dashboard.types'
import { formatRate } from '../utils/money'

type InviteCardProps = {
  invite: Invite
}

export default function InviteCard({ invite }: InviteCardProps) {
  return (
    <section className="invite-card">
      <div className="invite-card__top">
        <div className="invite-score">
          <span>{invite.matchPercent}%</span>
        </div>
        <div className="invite-title">Соответствие требованиям</div>
        <button
          className="invite-action"
          type="button"
          aria-label="Открыть"
          onClick={() => {
            window.location.href = '/dashboard/specialist/invites/project'
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5322 6.64356C18.5322 6.37839 18.4268 6.1241 18.2393 5.9366C18.0518 5.7491 17.7975 5.64375 17.5324 5.64371L9.53217 5.64371C9.39941 5.6414 9.26752 5.66556 9.14419 5.71477C9.02086 5.76398 8.90857 5.83726 8.81386 5.93033C8.71916 6.02341 8.64394 6.13441 8.59259 6.25686C8.54124 6.37932 8.5148 6.51077 8.5148 6.64356C8.5148 6.77634 8.54124 6.9078 8.59259 7.03025C8.64394 7.15271 8.71916 7.26371 8.81386 7.35678C8.90857 7.44986 9.02086 7.52314 9.14419 7.57235C9.26752 7.62156 9.39941 7.64571 9.53217 7.64341L15.1183 7.64341L5.7541 17.0076C5.56657 17.1952 5.46121 17.4495 5.46121 17.7147C5.46121 17.9799 5.56657 18.2343 5.7541 18.4218C5.94164 18.6094 6.19599 18.7147 6.46121 18.7147C6.72643 18.7147 6.98078 18.6094 7.16832 18.4218L16.5325 9.05762L16.5325 14.6438C16.5371 14.9059 16.6444 15.1558 16.8314 15.3396C17.0185 15.5234 17.2702 15.6264 17.5324 15.6264C17.7946 15.6264 18.0463 15.5234 18.2333 15.3396C18.4203 15.1558 18.5277 14.9059 18.5322 14.6438L18.5322 6.64356Z"
              fill="#696E82"
            />
          </svg>
        </button>
      </div>

      <div className="invite-content">
        <div className="invite-main">
          <div className="invite-name">
            <span>{invite.title}</span>
            <span className="invite-rate">
              {formatRate(invite.ratePerHour)}
            </span>
          </div>
          <div className="invite-sub">{invite.subtitle}</div>
        </div>

        <div className="invite-lead">
          <div className="lead-avatar" aria-hidden="true" />
          <div className="lead-text">
            <span className="lead-role">{invite.leadRole}</span>
            <span className="lead-name">{invite.leadName}</span>
          </div>
          <RatingDots className="lead-dots" />
        </div>
      </div>

      <div className="invite-actions">
        <button className="invite-btn invite-btn--muted" type="button">
          Отклонить
        </button>
        <button className="invite-btn invite-btn--primary" type="button">
          Принять
        </button>
      </div>
    </section>
  )
}
