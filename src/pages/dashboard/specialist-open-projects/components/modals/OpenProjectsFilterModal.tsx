import FilterSelect from './FilterSelect'
import RangeSlider from './RangeSlider'
import SwitchRow from './SwitchRow'
import type { BudgetRange } from '../../types/open-projects.types'

type OpenProjectsFilterModalProps = {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  categoryOpen: boolean
  onCategoryToggle: () => void
  onCategoryClear: () => void
  selectedCategories: string[]
  onCategorySelect: (value: string) => void
  budgetRange: BudgetRange
  budgetMinValue: number
  budgetMaxValue: number
  budgetMinPercent: number
  budgetMaxPercent: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
  highMatchOnly: boolean
  onHighMatchToggle: () => void
}

export default function OpenProjectsFilterModal({
  isOpen,
  onClose,
  categories,
  categoryOpen,
  onCategoryToggle,
  onCategoryClear,
  selectedCategories,
  onCategorySelect,
  budgetRange,
  budgetMinValue,
  budgetMaxValue,
  budgetMinPercent,
  budgetMaxPercent,
  onMinChange,
  onMaxChange,
  highMatchOnly,
  onHighMatchToggle,
}: OpenProjectsFilterModalProps) {
  if (!isOpen) return null

  return (
    <div className="filter-modal__overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(event) => event.stopPropagation()}>
        <div className="filter-modal__header">
          <h3>Фильтр</h3>
          <button className="filter-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24.75 15L15 24.75M15 15L24.75 24.75"
                stroke="#696E82"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <FilterSelect
          label="Направление"
          isOpen={categoryOpen}
          selected={selectedCategories}
          options={categories}
          onToggle={onCategoryToggle}
          onClear={onCategoryClear}
          onOptionToggle={onCategorySelect}
        />

        <RangeSlider
          label="Бюджет, ₽"
          min={budgetRange.min}
          max={budgetRange.max}
          step={budgetRange.step}
          minValue={budgetMinValue}
          maxValue={budgetMaxValue}
          minPercent={budgetMinPercent}
          maxPercent={budgetMaxPercent}
          onMinChange={onMinChange}
          onMaxChange={onMaxChange}
        />

        <SwitchRow
          label="Только высокое совпадение (≥ 80%)"
          isActive={highMatchOnly}
          onToggle={onHighMatchToggle}
        />

        <div className="filter-modal__actions">
          <button className="filter-modal__btn filter-modal__btn--ghost" type="button" onClick={onClose}>
            Отмена
          </button>
          <button className="filter-modal__btn filter-modal__btn--primary" type="button" onClick={onClose}>
            Применить фильтры
          </button>
        </div>
      </div>
    </div>
  )
}
