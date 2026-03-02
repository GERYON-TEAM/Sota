type ShareProjectModalProps = {
  isOpen: boolean
  shareUrl: string
  shareCopied: boolean
  onClose: () => void
  onCopy: () => void
}

export default function ShareProjectModal({
  isOpen,
  shareUrl,
  shareCopied,
  onClose,
  onCopy,
}: ShareProjectModalProps) {
  if (!isOpen) return null

  return (
    <div className="portfolio-project__share-overlay" onClick={onClose} role="presentation">
      <div
        className="portfolio-project__share-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="portfolio-project__share-head">
          <span>Поделиться проектом</span>
          <button
            className="portfolio-project__share-close"
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
        <p className="portfolio-project__share-text">
          {shareCopied ? 'Ссылка скопирована' : 'Скопируйте ссылку ниже'}
        </p>
        <div className="portfolio-project__share-row">
          <input className="portfolio-project__share-input" value={shareUrl} readOnly />
          <button className="portfolio-project__share-copy" type="button" onClick={onCopy}>
            Копировать
          </button>
        </div>
      </div>
    </div>
  )
}
