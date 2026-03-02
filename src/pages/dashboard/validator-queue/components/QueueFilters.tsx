type QueueFiltersProps = {
  onReset: () => void
}

export default function QueueFilters({ onReset }: QueueFiltersProps) {
  return (
    <button className="validator-queue-menu__item" type="button" onClick={onReset}>
      Сбросить фильтры
    </button>
  )
}
