const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function ActivityCard() {
  return (
    <div className="activity-card">
      <div className="stat-card__head">
        <span>График активности</span>
      </div>
      <div className="activity-layout">
        <div className="activity-scale" aria-hidden="true">
          <span className="activity-tick activity-tick--top">10</span>
          <span className="activity-tick activity-tick--mid">5</span>
          <span className="activity-tick activity-tick--low">1</span>
        </div>
        <div className="activity-chart">
          {DAYS.map((day) => (
            <div key={day} className="activity-day">
              <div className="activity-bar">
                <div className="activity-fill" />
              </div>
              <span className="activity-label">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
