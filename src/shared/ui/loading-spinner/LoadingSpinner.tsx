import './loading-spinner.css'

export default function LoadingSpinner({ text = 'Загрузка...' }: { text?: string }) {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__circle" />
      <p className="loading-spinner__text">{text}</p>
    </div>
  )
}
