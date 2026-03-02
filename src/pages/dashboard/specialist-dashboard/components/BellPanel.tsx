type BellPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export default function BellPanel({ isOpen, onClose }: BellPanelProps) {
  return (
    <div className={`bell-panel ${isOpen ? 'is-open' : ''}`}>
      <div className="bell-panel__head">
        <span>Уведомления</span>
        <button
          className="bell-panel__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.75 15L15 24.75M15 15L24.75 24.75"
              stroke="#696E82"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="bell-item">
        <div className="bell-item__top">
          <span>Фаза заблокирована из-за критичной ошибки</span>
          <span className="bell-item__time">01.01.2025 13:45</span>
        </div>
        <div className="bell-item__bottom">
          <span className="bell-item__desc">Более подробное описание, если есть</span>
          <span className="bell-dot" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
