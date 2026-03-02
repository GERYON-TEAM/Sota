export default function ActivitySection() {
  return (
    <section className="activity-section">
      <div className="activity-section__table">
        <div className="activity-section__head">
          <span>Автор</span>
          <span>Дата</span>
          <span>Время</span>
          <span>Тип действия</span>
          <span>Описание действия</span>
        </div>

        <div className="activity-section__row">
          <span className="activity-section__author">
            <span className="activity-section__avatar" aria-hidden="true" />
            Нестеров Ярослав
          </span>
          <span className="activity-section__value">12.02.2026</span>
          <span className="activity-section__value">14:35</span>
          <span className="activity-section__value">Обновление</span>
          <span className="activity-section__desc">
            Загружена новая версия артефакта Design spec.
          </span>
        </div>

        <div className="activity-section__row">
          <span className="activity-section__author">
            <span className="activity-section__avatar" aria-hidden="true" />
            Нестеров Ярослав
          </span>
          <span className="activity-section__value">11.02.2026</span>
          <span className="activity-section__value">09:18</span>
          <span className="activity-section__value">Комментарий</span>
          <span className="activity-section__desc">
            Добавлен комментарий валидатора и отмечены критерии.
          </span>
        </div>

        <div className="activity-section__pager">
          <button className="activity-section__nav" type="button" aria-label="Назад">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 17L9 12L14 7" stroke="#696E82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="activity-section__page">1</span>
          <button className="activity-section__nav" type="button" aria-label="Вперед">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17L15 12L10 7" stroke="#0B1215" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
