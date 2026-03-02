type GdfModalProps = {
  onClose: () => void
}

export default function GdfModal({ onClose }: GdfModalProps) {
  return (
    <div className="gdf-modal__overlay" onClick={onClose}>
      <div className="gdf-modal" onClick={(event) => event.stopPropagation()}>
        <div className="gdf-modal__head">
          <h3>Требования стандарта GDF</h3>
          <button className="gdf-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
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
        <div className="gdf-modal__body">
          <p>
            Здесь будет текст требований стандарта GDF. Опишите критерии, обязательные поля, правила
            оформления, формат и необходимые проверки. Если текста много, он будет прокручиваться по
            вертикали. Длинные слова и ссылки будут переноситься на новую строку, чтобы текст
            оставался читаемым и не выходил за пределы контейнера.
          </p>
          <p>
            Пример: документ должен содержать структуру разделов, перечень артефактов, сведения о
            версиях и результаты валидации. Любые отклонения фиксируются в истории версий и
            отмечаются в статусе валидации.
          </p>
        </div>
      </div>
    </div>
  )
}
