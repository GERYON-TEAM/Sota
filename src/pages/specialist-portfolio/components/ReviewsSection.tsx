import RatingDots from '../../../shared/ui/color-dots/RatingDots'
import SelectCheckIcon from '../ui/SelectCheckIcon'

type ReviewsSectionProps = {
  ratingOpen: boolean
  setRatingOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  ratingValue: 'high' | 'low'
  setRatingValue: (value: 'high' | 'low') => void
  reviewsTypeOpen: boolean
  setReviewsTypeOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  reviewsTypeValue: string
  setReviewsTypeValue: (value: string) => void
  reviewsDateOpen: boolean
  setReviewsDateOpen: (value: boolean | ((prev: boolean) => boolean)) => void
  reviewsDateValue: 'new' | 'old'
  setReviewsDateValue: (value: 'new' | 'old') => void
}

export default function ReviewsSection({
  ratingOpen,
  setRatingOpen,
  ratingValue,
  setRatingValue,
  reviewsTypeOpen,
  setReviewsTypeOpen,
  reviewsTypeValue,
  setReviewsTypeValue,
  reviewsDateOpen,
  setReviewsDateOpen,
  reviewsDateValue,
  setReviewsDateValue,
}: ReviewsSectionProps) {
  return (
    <>
      <div className="portfolio-reviews-bar">
        <div className="portfolio-reviews">
          <span className="portfolio-section-title">Отзывы</span>
          <span className="portfolio-reviews__count">1</span>
        </div>

        <div className="portfolio-filters">
          <div
            className={`active-filter ${ratingOpen ? 'is-open' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              setRatingOpen((prev) => !prev)
              setReviewsTypeOpen(false)
              setReviewsDateOpen(false)
            }}
          >
            <span className="active-filter__text">Рейтинг</span>
            <span className="active-filter__chevron" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#696E82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div
              className={`deadline-menu ${ratingOpen ? 'is-open' : ''}`}
              onClick={(event) => event.stopPropagation()}
            >
              {[
                { value: 'high', label: 'Сначала высокий' },
                { value: 'low', label: 'Сначала низкий' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className="deadline-item"
                  onPointerDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setRatingValue(item.value as 'high' | 'low')
                    setRatingOpen(false)
                  }}
                >
                  <span className="deadline-item__text">{item.label}</span>
                  {ratingValue === item.value && (
                    <span className="deadline-item__check" aria-hidden="true">
                      <SelectCheckIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`active-filter ${reviewsTypeOpen ? 'is-open' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              setReviewsTypeOpen((prev) => !prev)
              setRatingOpen(false)
              setReviewsDateOpen(false)
            }}
          >
            <span className="active-filter__text">Тип проекта</span>
            <span className="active-filter__chevron" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#696E82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div
              className={`deadline-menu ${reviewsTypeOpen ? 'is-open' : ''}`}
              onClick={(event) => event.stopPropagation()}
            >
              {['Коммерческий', 'Некоммерческий'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className="deadline-item"
                  onPointerDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setReviewsTypeValue(type)
                    setReviewsTypeOpen(false)
                  }}
                >
                  <span className="deadline-item__text">{type}</span>
                  {reviewsTypeValue === type && (
                    <span className="deadline-item__check" aria-hidden="true">
                      <SelectCheckIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`active-filter ${reviewsDateOpen ? 'is-open' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              setReviewsDateOpen((prev) => !prev)
              setRatingOpen(false)
              setReviewsTypeOpen(false)
            }}
          >
            <span className="active-filter__icon" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18V5M12 18L16 14M12 18L8 14"
                  stroke="#0B1215"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="active-filter__text">По дате</span>
            <span className="active-filter__chevron" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#696E82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div
              className={`deadline-menu ${reviewsDateOpen ? 'is-open' : ''}`}
              onClick={(event) => event.stopPropagation()}
            >
              {[
                { value: 'new', label: 'Сначала новые' },
                { value: 'old', label: 'Сначала старые' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className="deadline-item"
                  onPointerDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setReviewsDateValue(item.value as 'new' | 'old')
                    setReviewsDateOpen(false)
                  }}
                >
                  <span className="deadline-item__text">{item.label}</span>
                  {reviewsDateValue === item.value && (
                    <span className="deadline-item__check" aria-hidden="true">
                      <SelectCheckIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-review-card">
        <div className="review-card__head">
          <span>Название проекта</span>
          <span className="review-count">5</span>
        </div>

        <div className="review-card__body">
          <div className="review-frame">
            <div className="lead-card lead-card--plain">
              <div className="lead-avatar" aria-hidden="true" />
              <div className="lead-text">
                <span className="lead-role">Tech Lead</span>
                <span className="lead-name">Нестеров Ярослав</span>
              </div>
              <RatingDots className="lead-dots" />
            </div>

            <p className="review-text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
              dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
              vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
              Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
            </p>
          </div>
        </div>

        <div className="review-card__footer">
          <div className="project-role">Junior Backend Developer</div>
          <div className="review-pill review-pill--date">01.01.2026</div>
        </div>
      </div>
    </>
  )
}
