import SelectCheckIcon from '../ui/SelectCheckIcon'

type ReviewData = {
  id: string
  rating: number
  text: string
  date: string
}

type ReviewsSectionProps = {
  reviews?: ReviewData[]
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
  reviews = [],
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
          <span className="portfolio-reviews__count">{reviews.length}</span>
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

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="portfolio-review-card" key={review.id}>
            <div className="review-card__head">
              <span>Отзыв</span>
              <span className="review-count">{review.rating}</span>
            </div>

            <div className="review-card__body">
              <div className="review-frame">
                <p className="review-text">{review.text}</p>
              </div>
            </div>

            <div className="review-card__footer">
              <div className="review-pill review-pill--date">
                {review.date ? new Date(review.date).toLocaleDateString('ru-RU') : ''}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: '#696E82', textAlign: 'center', padding: '24px 0' }}>Пока нет отзывов</p>
      )}
    </>
  )
}
