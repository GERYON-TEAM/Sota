type HistoryModalProps = {
  onClose: () => void
}

export default function HistoryModal({ onClose }: HistoryModalProps) {
  return (
    <div className="history-modal__overlay" onClick={onClose}>
      <div className="history-modal" onClick={(event) => event.stopPropagation()}>
        <div className="history-modal__head">
          <h3>Название артефакта</h3>
          <button className="history-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
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

        <div className="history-modal__table">
          <div className="history-table__head">
            <span>Номер версии</span>
            <span>Автор</span>
            <span>Дата загрузки</span>
            <span>Размер</span>
            <span>Результат</span>
            <span>Статус</span>
          </div>
          <div className="history-table__row">
            <span>v1.2</span>
            <span className="history-table__author">
              <span className="history-table__avatar" aria-hidden="true" />
              Нестеров Ярослав
            </span>
            <span>12.02.2026</span>
            <span>4.2 MB</span>
            <span>Посмотреть</span>
            <span className="artifact-status is-review">На проверке</span>
          </div>
          <div className="history-table__row">
            <span>v1.1</span>
            <span className="history-table__author">
              <span className="history-table__avatar" aria-hidden="true" />
              Нестеров Ярослав
            </span>
            <span>05.02.2026</span>
            <span>3.9 MB</span>
            <span>Посмотреть</span>
            <span className="artifact-status is-changes">Требуются изменения</span>
          </div>
          <div className="history-table__row">
            <span>v1.0</span>
            <span className="history-table__author">
              <span className="history-table__avatar" aria-hidden="true" />
              Нестеров Ярослав
            </span>
            <span>30.01.2026</span>
            <span>3.5 MB</span>
            <span>Посмотреть</span>
            <span className="artifact-status is-critical">Критичная ошибка</span>
          </div>

          <div className="history-table__pager">
            <button className="history-table__arrow" type="button" aria-label="Назад">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 17L9 12L14 7" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="history-table__page">1</span>
            <button className="history-table__arrow" type="button" aria-label="Вперед">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 17L15 12L10 7" stroke="#0B1215" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
