import CustomerHeaderBar from '../../customer-dashboard/components/CustomerHeaderBar'

type NewProjectHeaderProps = {
  dashboardBasePath: string
  bellOpen: boolean
  onBellToggle: () => void
  onBellClose: () => void
}

export default function NewProjectHeader({ dashboardBasePath, bellOpen, onBellToggle, onBellClose }: NewProjectHeaderProps) {
  return (
    <CustomerHeaderBar
      title={
        <>
          <button className="dashboard-title__crumb" type="button" onClick={() => { window.location.href = dashboardBasePath }}>
            Дэшборд
          </button>
          <span className="dashboard-title__sep">/</span>
          <span className="dashboard-title__page">Новый проект</span>
        </>
      }
      hasNotifications
      bellOpen={bellOpen}
      onBellToggle={onBellToggle}
      onBellClose={onBellClose}
    />
  )
}
