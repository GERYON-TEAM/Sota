import './error-message.css'

export default function ErrorMessage({
  text = 'Произошла ошибка',
  onRetry,
}: {
  text?: string
  onRetry?: () => void
}) {
  return (
    <div className="error-message">
      <p className="error-message__text">{text}</p>
      {onRetry && (
        <button className="error-message__retry" type="button" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  )
}
