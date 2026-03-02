export default function ProjectBreadcrumbTitle() {
  return (
    <>
      <button
        className="dashboard-title__crumb"
        type="button"
        onClick={() => {
          window.location.href = '/dashboard/specialist'
        }}
      >
        Дэшборд
      </button>
      <span className="dashboard-title__sep">/</span>
      <button
        className="dashboard-title__crumb"
        type="button"
        onClick={() => {
          window.location.href = '/dashboard/specialist/open-projects'
        }}
      >
        Открытые проекты
      </button>
      <span className="dashboard-title__sep">/</span>
      <span className="dashboard-title__page">Проект</span>
    </>
  )
}
