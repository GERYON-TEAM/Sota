import WorkspaceTabs from './WorkspaceTabs'
import WorkspaceTools from './WorkspaceTools'
import type { WorkspaceTab } from '../types/active-project.types'

type WorkspaceToolbarProps = {
  workspaceTab: WorkspaceTab
  onTabChange: (tab: WorkspaceTab) => void
  artifactsOpen: boolean
  artifactsType: string
  onArtifactsToggle: () => void
  onArtifactsTypeChange: (value: string) => void
}

export default function WorkspaceToolbar({
  workspaceTab,
  onTabChange,
  artifactsOpen,
  artifactsType,
  onArtifactsToggle,
  onArtifactsTypeChange,
}: WorkspaceToolbarProps) {
  return (
    <div className="project-workspace__toolbar">
      <WorkspaceTabs active={workspaceTab} onChange={onTabChange} />

      {workspaceTab === 'artifacts' ? (
        <div className="artifacts-controls artifacts-controls--inline">
          <div
            className="artifacts-alert"
            data-tooltip="Этап заблокирован — загрузка и редактирование недоступны"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16V12M12 8H12.01"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Фаза заблокирована
          </div>

          <div
            className={`artifacts-select${artifactsOpen ? ' is-open' : ''}`}
            onClick={onArtifactsToggle}
          >
            <span className="artifacts-select__icon" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2016 3.60039C13.2016 3.28213 13.328 2.97691 13.553 2.75186C13.7781 2.52682 14.0833 2.40039 14.4016 2.40039H18.0016C18.3198 2.40039 18.625 2.52682 18.8501 2.75186C19.0751 2.97691 19.2016 3.28213 19.2016 3.60039V8.40039H18.0016V3.60039H14.4016V7.20039C14.4016 7.51865 14.2751 7.82387 14.0501 8.04892C13.825 8.27396 13.5198 8.40039 13.2016 8.40039H9.60156V12.0004C9.60156 12.3187 9.47513 12.6239 9.25009 12.8489C9.02505 13.074 8.71982 13.2004 8.40156 13.2004H4.80156V16.8004H9.60156V18.0004H4.80156C4.4833 18.0004 4.17808 17.874 3.95303 17.6489C3.72799 17.4239 3.60156 17.1187 3.60156 16.8004V13.2004C3.60156 12.8821 3.72799 12.5769 3.95303 12.3519C4.17808 12.1268 4.4833 12.0004 4.80156 12.0004H8.40156V8.40039C8.40156 8.08213 8.52799 7.77691 8.75303 7.55186C8.97808 7.32682 9.2833 7.20039 9.60156 7.20039H13.2016V3.60039ZM16.8016 9.60039C16.4833 9.60039 16.1781 9.72682 15.953 9.95186C15.728 10.1769 15.6016 10.4821 15.6016 10.8004V14.4004H12.0016C11.6833 14.4004 11.3781 14.5268 11.153 14.7519C10.928 14.9769 10.8016 15.2821 10.8016 15.6004V19.2004C10.8016 19.5187 10.928 19.8239 11.153 20.0489C11.3781 20.274 11.6833 20.4004 12.0016 20.4004H18.6016C19.3972 20.4004 20.1603 20.0843 20.7229 19.5217C21.2855 18.9591 21.6016 18.196 21.6016 17.4004V10.8004C21.6016 10.4821 21.4751 10.1769 21.2501 9.95186C21.025 9.72682 20.7198 9.60039 20.4016 9.60039H16.8016ZM16.8016 10.8004H20.4016V17.4004C20.4016 17.8778 20.2119 18.3356 19.8744 18.6732C19.5368 19.0107 19.079 19.2004 18.6016 19.2004H12.0016V15.6004H15.6016C15.9198 15.6004 16.225 15.474 16.4501 15.2489C16.6751 15.0239 16.8016 14.7187 16.8016 14.4004V10.8004Z"
                  fill="#696E82"
                />
              </svg>
            </span>
            <span className="artifacts-select__value">{artifactsType}</span>
            <span className="artifacts-select__chevron" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#696E82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {artifactsOpen && (
              <div className="artifacts-select__menu">
                {['Design', 'Requirements', 'QA'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="artifacts-select__item"
                    onPointerDown={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      onArtifactsTypeChange(item)
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="artifacts-upload" type="button">
            <span className="artifacts-upload__plus">+</span>
            Загрузить новую версию
          </button>
        </div>
      ) : (
        <WorkspaceTools />
      )}
    </div>
  )
}
