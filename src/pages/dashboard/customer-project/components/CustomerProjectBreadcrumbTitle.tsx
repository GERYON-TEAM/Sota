export default function CustomerProjectBreadcrumbTitle() {
  return (
    <>
      <button
        className="dashboard-title__crumb"
        type="button"
        onClick={() => {
          window.location.href = '/dashboard/customer'
        }}
      >
        Дэшборд
      </button>
      <span className="dashboard-title__sep">/</span>
      <span className="dashboard-title__page">О проекте</span>
    </>
  )
}
