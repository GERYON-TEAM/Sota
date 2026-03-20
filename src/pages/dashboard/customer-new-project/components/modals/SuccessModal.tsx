type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
  onGoToProjects: () => void
}

export default function SuccessModal({ isOpen, onClose, onGoToProjects }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="customer-new-project-success__overlay" onClick={onClose}>
      <div className="customer-new-project-success" onClick={(event) => event.stopPropagation()}>
        <svg width="117" height="117" viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24.5833 54.377L4 112.335L61.9583 91.8061M14.8333 9.41862H14.8875M112.333 36.502H112.387M74.4167 4.00195H74.4708M112.333 101.502H112.387M112.333 4.00195L100.2 8.06445C96.7462 9.21489 93.7993 11.5292 91.8628 14.6117C89.9263 17.6942 89.1206 21.3537 89.5833 24.9645C90.125 29.6228 86.4958 33.7936 81.7292 33.7936H79.6708C75.0125 33.7936 71.0042 37.0436 70.1375 41.5936L69 47.3353M112.333 63.5853L107.892 61.7978C103.233 59.9561 98.0333 62.8811 97.1667 67.8103C96.5708 71.602 93.2667 74.4186 89.4208 74.4186H85.25M52.75 4.00195L54.5375 8.44362C56.3792 13.102 53.4542 18.302 48.525 19.1686C44.7333 19.7103 41.9167 23.0686 41.9167 26.9145V31.0853" stroke="#5260FF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M52.7498 63.5857C63.204 74.0399 68.079 86.1732 63.5831 90.6691C59.0873 95.1649 46.954 90.2899 36.4998 79.8357C26.0456 69.3816 21.1706 57.2482 25.6665 52.7524C30.1623 48.2566 42.2956 53.1316 52.7498 63.5857Z" stroke="#5260FF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <h3>Вы опубликовали новый проект!</h3>
        <p className="customer-new-project-success__text">
          Теперь вы можете отслеживать его состояние в разделе “Активные проекты”
        </p>

        <button
          className="customer-new-project-success__button"
          type="button"
          onClick={onGoToProjects}
        >
          Перейти к активным проектам
        </button>
      </div>
    </div>
  )
}
