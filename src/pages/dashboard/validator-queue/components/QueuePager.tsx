type QueuePagerProps = {
  page: number
  pagesCount: number
  onPrev: () => void
  onNext: () => void
}

export default function QueuePager({ page, pagesCount, onPrev, onNext }: QueuePagerProps) {
  if (pagesCount <= 1) return null

  return (
    <div className="validator-decision-actions__row" aria-label="Пагинация очереди">
      <button className="validator-decision-button validator-decision-button--secondary" type="button" onClick={onPrev} disabled={page <= 1}>
        Назад
      </button>
      <button className="validator-decision-button validator-decision-button--secondary" type="button" onClick={onNext} disabled={page >= pagesCount}>
        Далее
      </button>
    </div>
  )
}
