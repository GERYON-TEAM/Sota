import type { QueueSortValue } from '../types/validator-queue.types'

type QueueSortProps = {
  queueMenuOpen: boolean
  queueSort: QueueSortValue
  onToggleMenu: () => void
  onSortChange: (value: QueueSortValue) => void
  onRefresh: () => void
}

export default function QueueSort({ queueMenuOpen, queueSort, onToggleMenu, onSortChange, onRefresh }: QueueSortProps) {
  return (
    <>
      <button
        className={`validator-queue-more${queueMenuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label="Дополнительные действия"
        aria-expanded={queueMenuOpen}
        aria-haspopup="menu"
        onClick={onToggleMenu}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_71_8245)">
            <path d="M19.835 11C19.526 11 19.2297 11.1227 19.0112 11.3412C18.7927 11.5597 18.67 11.856 18.67 12.165C18.67 12.474 18.7927 12.7703 19.0112 12.9888C19.2297 13.2073 19.526 13.33 19.835 13.33C20.144 13.33 20.4403 13.2073 20.6588 12.9888C20.8773 12.7703 21 12.474 21 12.165C21 11.856 20.8773 11.5597 20.6588 11.3412C20.4403 11.1227 20.144 11 19.835 11ZM19.835 19.155C19.526 19.155 19.2297 19.2777 19.0112 19.4962C18.7927 19.7147 18.67 20.011 18.67 20.32C18.67 20.629 18.7927 20.9253 19.0112 21.1438C19.2297 21.3623 19.526 21.485 19.835 21.485C20.144 21.485 20.4403 21.3623 20.6588 21.1438C20.8773 20.9253 21 20.629 21 20.32C21 20.011 20.8773 19.7147 20.6588 19.4962C20.4403 19.2777 20.144 19.155 19.835 19.155ZM19.835 27.31C19.526 27.31 19.2297 27.4327 19.0112 27.6512C18.7927 27.8697 18.67 28.166 18.67 28.475C18.67 28.784 18.7927 29.0803 19.0112 29.2988C19.2297 29.5173 19.526 29.64 19.835 29.64C20.144 29.64 20.4403 29.5173 20.6588 29.2988C20.8773 29.0803 21 28.784 21 28.475C21 28.166 20.8773 27.8697 20.6588 27.6512C20.4403 27.4327 20.144 27.31 19.835 27.31Z" fill="#696E82" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_71_8245">
              <rect width="40" height="40" rx="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      {queueMenuOpen && (
        <div className="validator-queue-menu" role="menu" aria-label="Меню очереди">
          <button type="button" role="menuitemradio" aria-checked={queueSort === 'newest'} className={`validator-queue-menu__item${queueSort === 'newest' ? ' is-active' : ''}`} onClick={() => onSortChange('newest')}>
            Сначала новые
          </button>
          <button type="button" role="menuitemradio" aria-checked={queueSort === 'oldest'} className={`validator-queue-menu__item${queueSort === 'oldest' ? ' is-active' : ''}`} onClick={() => onSortChange('oldest')}>
            Сначала старые
          </button>
          <button type="button" role="menuitem" className="validator-queue-menu__item" onClick={onRefresh}>
            Обновить очередь
          </button>
        </div>
      )}
    </>
  )
}
