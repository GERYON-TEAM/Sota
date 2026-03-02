type ArtifactsSectionProps = {
  onGdfOpen: () => void
  onValidationOpen: () => void
  onHistoryOpen: () => void
}

export default function ArtifactsSection({
  onGdfOpen,
  onValidationOpen,
  onHistoryOpen,
}: ArtifactsSectionProps) {
  return (
    <section className="artifacts-section">
      <div className="artifacts-table">
        <div className="artifacts-table__head">
          <span>Название</span>
          <span>Текущая версия и дата</span>
          <span>Требования стандарта GDF</span>
          <span>Результат валидации</span>
          <span>История версий</span>
          <span>Статус валидации</span>
        </div>
        <div className="artifacts-table__row">
          <span>Design spec</span>
          <span>v1.2 · 12.02.2026</span>
          <button className="artifacts-view" type="button" onClick={onGdfOpen}>
            Посмотреть
          </button>
          <button className="artifacts-view" type="button" onClick={onValidationOpen}>
            Посмотреть
          </button>
          <button className="artifacts-view" type="button" onClick={onHistoryOpen}>
            Посмотреть
          </button>
          <div className="artifacts-status-cell">
            <span className="artifact-status is-review">На проверке</span>
            <button className="artifact-download-btn" type="button">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M16 18.8333L20 23M20 23L24 18.8333M20 23V13M28 23V26.3333C28 26.7754 27.8314 27.1993 27.5314 27.5118C27.2313 27.8244 26.8243 28 26.4 28H13.6C13.1757 28 12.7687 27.8244 12.4686 27.5118C12.1686 27.1993 12 26.7754 12 26.3333V23"
                  stroke="#696E82"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="artifacts-table__pager">
          <button className="artifacts-table__arrow" type="button" aria-label="Назад">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 17L9 12L14 7"
                stroke="#696E82"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="artifacts-table__page">1</span>
          <button className="artifacts-table__arrow" type="button" aria-label="Вперед">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17L15 12L10 7"
                stroke="#0B1215"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
