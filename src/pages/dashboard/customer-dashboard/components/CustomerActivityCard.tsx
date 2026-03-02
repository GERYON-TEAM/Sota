const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

export default function CustomerActivityCard() {
  return (
    <div className="activity-card">
      <div className="stat-card__head">
        <span>Динамика</span>
      </div>
      <div className="activity-layout">
        <div className="activity-scale" aria-hidden="true">
          <span className="activity-tick activity-tick--top">5</span>
          <span className="activity-tick activity-tick--mid">4</span>
          <span className="activity-tick activity-tick--low">3</span>
          <span className="activity-tick activity-tick--low">2</span>
          <span className="activity-tick activity-tick--low">1</span>
        </div>
        <div className="activity-chart">
          {MONTHS.map((month) => (
            <div key={month} className="activity-day">
              <div className="activity-bar">
                <div className="activity-fill" />
              </div>
              <span className="activity-label">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
