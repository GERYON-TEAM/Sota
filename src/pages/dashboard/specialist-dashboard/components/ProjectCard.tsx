import ProgressSteps from '../../../../shared/ui/progress-steps/ProgressSteps'
import RatingDots from '../../../../shared/ui/color-dots/RatingDots'
import type { ActiveProject } from '../types/dashboard.types'
import { ellipsis, normalizeTitle } from '../utils/text'

type ProjectCardProps = {
  project: ActiveProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-frame">
      <div className="project-card">
        <div className="project-card__top">
          <div className="project-role">{project.role}</div>
          <button
            className="project-link"
            type="button"
            aria-label="Открыть проект"
            onClick={() => {
              window.location.href = '/dashboard/specialist/project'
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_22_105)">
                <path
                  d="M18.5322 6.64453C18.5322 6.37937 18.4268 6.12508 18.2393 5.93758C18.0518 5.75008 17.7975 5.64473 17.5324 5.64469L9.53217 5.64469C9.39941 5.64238 9.26752 5.66653 9.14419 5.71575C9.02086 5.76496 8.90857 5.83824 8.81386 5.93131C8.71916 6.02438 8.64394 6.13539 8.59259 6.25784C8.54124 6.3803 8.5148 6.51175 8.5148 6.64453C8.5148 6.77732 8.54124 6.90877 8.59259 7.03123C8.64394 7.15368 8.71916 7.26469 8.81386 7.35776C8.90857 7.45083 9.02086 7.52411 9.14419 7.57332C9.26752 7.62253 9.39941 7.64669 9.53217 7.64438L15.1183 7.64438L5.7541 17.0086C5.56657 17.1961 5.46121 17.4505 5.46121 17.7157C5.46121 17.9809 5.56657 18.2353 5.7541 18.4228C5.94164 18.6103 6.19599 18.7157 6.46121 18.7157C6.72643 18.7157 6.98078 18.6103 7.16832 18.4228L16.5325 9.0586L16.5325 14.6447C16.5371 14.9069 16.6444 15.1568 16.8314 15.3406C17.0185 15.5244 17.2702 15.6274 17.5324 15.6274C17.7946 15.6274 18.0463 15.5244 18.2333 15.3406C18.4203 15.1568 18.5277 14.9069 18.5322 14.6447L18.5322 6.64453Z"
                  fill="#696E82"
                />
              </g>
              <defs>
                <clipPath id="clip0_22_105">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <div className="project-title">{normalizeTitle(project.title)}</div>

        <div className="task-card">
          <div className="task-card__head">
            <span>Текущая задача</span>
            <span className="task-date">{project.taskDate}</span>
          </div>
          <div className="task-name">{project.taskName}</div>
          <div className="task-desc">{ellipsis(project.taskDesc, 90)}</div>
        </div>

        <div className="task-progress">
          <span>Прогресс</span>
          <span>{project.progress}%</span>
        </div>
        <ProgressSteps />

        <div className="lead-card">
          <div className="lead-avatar" aria-hidden="true" />
          <div className="lead-text">
            <span className="lead-role">{project.leadRole}</span>
            <span className="lead-name">{project.leadName}</span>
          </div>
          <RatingDots className="lead-dots" />
        </div>
      </div>
    </div>
  )
}
