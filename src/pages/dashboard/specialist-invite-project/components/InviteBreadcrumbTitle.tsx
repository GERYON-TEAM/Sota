export default function InviteBreadcrumbTitle() {
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
      <span className="dashboard-title__page">Приглашения в проект</span>
    </>
  )
}
