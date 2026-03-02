import { useRef, useState } from 'react'
import RatingDots from '../../../shared/ui/color-dots/RatingDots'
import CustomerSidebar from '../customer-dashboard/components/CustomerSidebar'
import CustomerHeaderBar from '../customer-dashboard/components/CustomerHeaderBar'
import '../customer-dashboard/styles/index.css'
import './styles/index.css'
import CustomerProjectStats from './components/CustomerProjectStats'
import CustomerProjectDescriptionModal from './components/CustomerProjectDescriptionModal'
import CustomerProjectLinks from './components/CustomerProjectLinks'
import CustomerProjectBreadcrumbTitle from './components/CustomerProjectBreadcrumbTitle'
import { useCustomerProjectUi } from './hooks/useCustomerProjectUi'

export default function CustomerProjectPage() {
  const { bellOpen, setBellOpen, descOpen, setDescOpen, matchPercent, matchClass } =
    useCustomerProjectUi()
  const [chatOpen, setChatOpen] = useState(false)
  const [dotMenuId, setDotMenuId] = useState<string | null>(null)
  const responsesRef = useRef<HTMLElement | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'Нестеров Ярослав',
      text: 'Добрый день! Готов обсудить проект и предложить план работ.',
      isMe: false,
    },
    {
      id: 2,
      author: 'Вы',
      text: 'Отлично, давайте созвонимся и сверим сроки.',
      isMe: true,
    },
  ])

  return (
    <div className="dashboard dashboard--customer">
      <CustomerSidebar />

      <main className="dashboard-content">
        <CustomerHeaderBar
          title={<CustomerProjectBreadcrumbTitle />}
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div
          className="dashboard-surface customer-project-surface"
          onClick={() => setDotMenuId(null)}
        >
          <div className="customer-project__header">
            <div className="customer-project__title">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.912 2.08203H20.0854C21.5837 2.08203 22.832 2.08203 23.822 2.21536C24.8687 2.35536 25.8137 2.66536 26.572 3.4237C27.332 4.1837 27.642 5.1287 27.782 6.1737C27.882 6.90703 27.907 7.78036 27.9137 8.79036C28.9937 8.82536 29.957 8.89036 30.8137 9.0037C32.767 9.26703 34.3487 9.82036 35.597 11.067C36.8437 12.3154 37.397 13.897 37.6604 15.8504C37.9154 17.7504 37.9154 20.1754 37.9154 23.2387V23.4254C37.9154 26.4887 37.9154 28.9154 37.6604 30.8137C37.397 32.767 36.8437 34.3487 35.597 35.597C34.3487 36.8437 32.767 37.397 30.8137 37.6604C28.9137 37.9154 26.4887 37.9154 23.4254 37.9154H16.572C13.5087 37.9154 11.082 37.9154 9.1837 37.6604C7.23036 37.397 5.6487 36.8437 4.40036 35.597C3.1537 34.3487 2.60036 32.767 2.33703 30.8137C2.08203 28.9137 2.08203 26.4887 2.08203 23.4254V23.2387C2.08203 20.1754 2.08203 17.7487 2.33703 15.8504C2.60036 13.897 3.1537 12.3154 4.40036 11.067C5.6487 9.82036 7.23036 9.26703 9.1837 9.0037C10.1463 8.88575 11.1142 8.81456 12.0837 8.79036C12.0904 7.78036 12.117 6.90703 12.2154 6.1737C12.3554 5.1287 12.6654 4.1837 13.4237 3.4237C14.1837 2.66536 15.1287 2.35703 16.1737 2.21536C17.1654 2.08203 18.4154 2.08203 19.912 2.08203ZM14.5854 8.75203C15.2154 8.7487 15.8776 8.74759 16.572 8.7487H23.4254C24.1198 8.7487 24.782 8.74981 25.412 8.75203C25.4054 7.80203 25.382 7.08536 25.3054 6.50703C25.2004 5.7387 25.022 5.4087 24.8054 5.19203C24.5887 4.97536 24.2587 4.79703 23.4887 4.69203C22.6854 4.58536 21.6054 4.58203 19.9987 4.58203C18.392 4.58203 17.312 4.58536 16.507 4.6937C15.7387 4.79703 15.4087 4.97536 15.192 5.1937C14.9754 5.41203 14.797 5.7387 14.692 6.50703C14.6154 7.0837 14.592 7.80036 14.5854 8.75203ZM9.51536 11.482C7.8387 11.707 6.87203 12.1304 6.16536 12.8354C5.46203 13.5404 5.0387 14.507 4.8137 16.1837C4.5837 17.8954 4.58036 20.1537 4.58036 23.332C4.58036 26.5104 4.5837 28.7687 4.8137 30.482C5.0387 32.157 5.46203 33.1237 6.16703 33.8287C6.87203 34.5337 7.8387 34.957 9.51536 35.182C11.2287 35.412 13.4854 35.4154 16.6637 35.4154H23.3304C26.5087 35.4154 28.767 35.412 30.4804 35.182C32.1554 34.957 33.122 34.5337 33.827 33.8287C34.532 33.1237 34.9554 32.157 35.1804 30.4804C35.4104 28.7687 35.4137 26.5104 35.4137 23.332C35.4137 20.1537 35.4104 17.897 35.1804 16.182C34.9554 14.507 34.532 13.5404 33.827 12.8354C33.122 12.1304 32.1554 11.707 30.4787 11.482C28.767 11.252 26.5087 11.2487 23.3304 11.2487H16.6637C13.4854 11.2487 11.2304 11.252 9.51536 11.482Z"
                  fill="#5260FF"
                />
                <path
                  d="M28.3346 14.9987C28.3346 15.4407 28.159 15.8646 27.8465 16.1772C27.5339 16.4898 27.11 16.6654 26.668 16.6654C26.2259 16.6654 25.802 16.4898 25.4895 16.1772C25.1769 15.8646 25.0013 15.4407 25.0013 14.9987C25.0013 14.5567 25.1769 14.1327 25.4895 13.8202C25.802 13.5076 26.2259 13.332 26.668 13.332C27.11 13.332 27.5339 13.5076 27.8465 13.8202C28.159 14.1327 28.3346 14.5567 28.3346 14.9987ZM15.0013 14.9987C15.0013 15.4407 14.8257 15.8646 14.5131 16.1772C14.2006 16.4898 13.7767 16.6654 13.3346 16.6654C12.8926 16.6654 12.4687 16.4898 12.1561 16.1772C11.8436 15.8646 11.668 15.4407 11.668 14.9987C11.668 14.5567 11.8436 14.1327 12.1561 13.8202C12.4687 13.5076 12.8926 13.332 13.3346 13.332C13.7767 13.332 14.2006 13.5076 14.5131 13.8202C14.8257 14.1327 15.0013 14.5567 15.0013 14.9987Z"
                  fill="#5260FF"
                />
              </svg>
              <h2>Название проекта</h2>
            </div>
            <div className="customer-project__actions">
              <button
                className="customer-project__pill customer-project__pill--accent"
                type="button"
                onClick={() =>
                  responsesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              >
                Найдены специалисты
              </button>
              <button
                className="customer-project__pill"
                type="button"
                onClick={() => setChatOpen(true)}
              >
                Чат со специалистом
              </button>
              <span className="dot-menu-wrap customer-project__dot-menu">
                <button
                  className="dot-menu-trigger"
                  type="button"
                  aria-label="Действия"
                  onClick={(event) => {
                    event.stopPropagation()
                    setDotMenuId((prev) => (prev === 'project-title' ? null : 'project-title'))
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.835 11C19.526 11 19.2297 11.1227 19.0112 11.3412C18.7927 11.5597 18.67 11.856 18.67 12.165C18.67 12.474 18.7927 12.7703 19.0112 12.9888C19.2297 13.2073 19.526 13.33 19.835 13.33C20.144 13.33 20.4403 13.2073 20.6588 12.9888C20.8773 12.7703 21 12.474 21 12.165C21 11.856 20.8773 11.5597 20.6588 11.3412C20.4403 11.1227 20.144 11 19.835 11ZM19.835 19.155C19.526 19.155 19.2297 19.2777 19.0112 19.4962C18.7927 19.7147 18.67 20.011 18.67 20.32C18.67 20.629 18.7927 20.9253 19.0112 21.1438C19.2297 21.3623 19.526 21.485 19.835 21.485C20.144 21.485 20.4403 21.3623 20.6588 21.1438C20.8773 20.9253 21 20.629 21 20.32C21 20.011 20.8773 19.7147 20.6588 19.4962C20.4403 19.2777 20.144 19.155 19.835 19.155ZM19.835 27.31C19.526 27.31 19.2297 27.4327 19.0112 27.6512C18.7927 27.8697 18.67 28.166 18.67 28.475C18.67 28.784 18.7927 29.0803 19.0112 29.2988C19.2297 29.5173 19.526 29.64 19.835 29.64C20.144 29.64 20.4403 29.5173 20.6588 29.2988C20.8773 29.0803 21 28.784 21 28.475C21 28.166 20.8773 27.8697 20.6588 27.6512C20.4403 27.4327 20.144 27.31 19.835 27.31Z"
                      fill="#696E82"
                      stroke="#696E82"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {dotMenuId === 'project-title' && (
                  <div className="dot-menu" onClick={(event) => event.stopPropagation()}>
                    <button
                      type="button"
                      className="dot-menu__item"
                      onClick={() => setDotMenuId(null)}
                    >
                      Редактировать проект
                    </button>
                    <button
                      type="button"
                      className="dot-menu__item"
                      onClick={() => setDotMenuId(null)}
                    >
                      Переименовать
                    </button>
                    <button
                      type="button"
                      className="dot-menu__item"
                      onClick={() => setDotMenuId(null)}
                    >
                      Архивировать
                    </button>
                    <button
                      type="button"
                      className="dot-menu__item dot-menu__item--danger"
                      onClick={() => setDotMenuId(null)}
                    >
                      Удалить проект
                    </button>
                  </div>
                )}
              </span>
            </div>
          </div>

          <CustomerProjectStats
            matchPercent={matchPercent}
            matchClass={matchClass}
            onOpenDescription={() => setDescOpen(true)}
          />

          <h3 className="customer-project__section-title">Бюджет и сроки</h3>
          <div className="customer-project__info">
            <div className="customer-project__summary">
              <h4>Общие данные</h4>
              <div className="customer-project__summary-grid">
                <div className="customer-project__summary-card">
                  <span>Общий бюджет</span>
                  <strong>900 000 ₽</strong>
                </div>
                <div className="customer-project__summary-card">
                  <span>Продолжительность</span>
                  <strong>6 месяцев</strong>
                </div>
                <div className="customer-project__summary-card customer-project__summary-card--pay">
                  <span>Тип оплаты</span>
                  <strong>Поэтапно</strong>
                </div>
                <div className="customer-project__summary-card">
                  <span>Сроки</span>
                  <strong>01.01.2025 - 01.07.2025</strong>
                </div>
              </div>
            </div>

            <div className="customer-project__specialists">
            <div className="customer-project__specialists-head">
              <div className="customer-project__specialists-title">
                <h4>Специалисты</h4>
                <div className="customer-project__specialists-count">
                  <span>2</span>
                </div>
              </div>
              <div className="customer-project__specialists-nav">
                <button type="button" className="customer-project__arrow" aria-label="Назад">
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33 1.00015L1 6.33016L6.33 11.6602"
                      stroke="#696E82"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button type="button" className="customer-project__arrow" aria-label="Вперёд">
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.998125 1.00015L6.32812 6.33016L0.998125 11.6602"
                      stroke="#0B1215"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

              <div className="customer-project__specialist-card">
                <div className="customer-project__specialist-top">
                  <div className="customer-project__specialist-info">
                    <div className="customer-project__specialist-avatar" aria-hidden="true" />
                    <div className="customer-project__specialist-name">
                      <span>Нестеров Ярослав</span>
                      <small>Тич лид</small>
                    </div>
                  </div>
                  <RatingDots className="customer-project__specialist-rating" />
                </div>
                <div className="customer-project__specialist-meta">
                  <div className="customer-project__chip">цена: 90000</div>
                  <div className="customer-project__chip">сроки: 40 часов</div>
                </div>
              </div>
            </div>
          </div>

          <section className="customer-project__status">
            <div className="customer-project__status-head">
              <div className="customer-project__status-title">
                <h3>Статус подбора</h3>
                <div className="customer-project__status-badges">
                  <span className="customer-project__status-chip">Приглашено: 10</span>
                  <span className="customer-project__status-chip">Откликнулось: 5</span>
                  <span className="customer-project__status-chip">Оставшееся время: 5 часов</span>
                </div>
              </div>

              <div className="customer-project__status-progress-group">
                <div className="customer-project__status-progress">
                  <span className="customer-project__status-progress-label">2 из 5</span>
                </div>
                <div className="customer-project__status-bars">
                  <span className="customer-project__status-bar is-active" />
                  <span className="customer-project__status-bar is-active" />
                  <span className="customer-project__status-bar" />
                  <span className="customer-project__status-bar" />
                  <span className="customer-project__status-bar" />
                </div>
              </div>
            </div>
          </section>

          <section className="customer-project__selected">
            <div className="customer-project__selected-head">
              <h3>Выбранные специалисты</h3>
              <div className="customer-project__selected-count customer-project__selected-count--light">
                <span>2</span>
              </div>
              <div className="customer-project__selected-nav">
                <button type="button" className="customer-project__arrow" aria-label="Назад">
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33 1.00015L1 6.33016L6.33 11.6602"
                      stroke="#696E82"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button type="button" className="customer-project__arrow" aria-label="Вперёд">
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.998125 1.00015L6.32812 6.33016L0.998125 11.6602"
                      stroke="#0B1215"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="customer-project__selected-list">
              {['Нестеров Ярослав', 'Анна Петрова'].map((name) => (
                <div className="customer-project__selected-card" key={name}>
                  <div className="customer-project__selected-top">
                    <div className="customer-project__specialist-info">
                      <div className="customer-project__specialist-avatar" aria-hidden="true" />
                      <div className="customer-project__specialist-name">
                        <span>{name}</span>
                        <small>Тич лид</small>
                      </div>
                    </div>
                    <RatingDots className="customer-project__specialist-rating" />
                  </div>

                  <div className="customer-project__selected-actions">
                    <button
                      className="customer-project__selected-link"
                      type="button"
                      onClick={() => {
                        window.location.href = '/dashboard/customer/project/portfolio'
                      }}
                    >
                      Перейти к портфолио
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_48_662)">
                          <path
                            d="M18.5322 6.64551C18.5322 6.38035 18.4268 6.12605 18.2393 5.93856C18.0518 5.75106 17.7975 5.6457 17.5324 5.64566L9.53217 5.64566C9.39941 5.64335 9.26752 5.66751 9.14419 5.71672C9.02086 5.76593 8.90857 5.83921 8.81386 5.93229C8.71916 6.02536 8.64394 6.13636 8.59259 6.25882C8.54124 6.38127 8.5148 6.51273 8.5148 6.64551C8.5148 6.7783 8.54124 6.90975 8.59259 7.0322C8.64394 7.15466 8.71916 7.26566 8.81386 7.35874C8.90857 7.45181 9.02086 7.52509 9.14419 7.5743C9.26752 7.62351 9.39941 7.64767 9.53217 7.64536L15.1183 7.64536L5.7541 17.0096C5.56657 17.1971 5.46121 17.4515 5.46121 17.7167C5.46121 17.9819 5.56657 18.2363 5.7541 18.4238C5.94164 18.6113 6.19599 18.7167 6.46121 18.7167C6.72643 18.7167 6.98078 18.6113 7.16832 18.4238L16.5325 9.05957L16.5325 14.6457C16.5371 14.9079 16.6444 15.1578 16.8314 15.3416C17.0185 15.5254 17.2702 15.6283 17.5324 15.6283C17.7946 15.6283 18.0463 15.5254 18.2333 15.3416C18.4203 15.1578 18.5277 14.9079 18.5322 14.6457L18.5322 6.64551Z"
                            fill="#696E82"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_48_662">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>

                    <CustomerProjectLinks />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="customer-project__responses" ref={responsesRef}>
            <div className="customer-project__responses-head">
              <div className="customer-project__responses-title">
                <h3>Отклики</h3>
                <div className="customer-project__responses-count">10</div>
              </div>
              <div className="customer-project__responses-head-actions">
                <div className="customer-project__responses-nav">
                  <span>10 откликов</span>
                </div>
                <div className="customer-project__responses-controls">
                  <button type="button" className="customer-project__arrow" aria-label="Назад">
                    <svg
                      width="8"
                      height="13"
                      viewBox="0 0 8 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.33 1.00015L1 6.33016L6.33 11.6602"
                        stroke="#696E82"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button type="button" className="customer-project__arrow" aria-label="Вперёд">
                    <svg
                      width="8"
                      height="13"
                      viewBox="0 0 8 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.998125 1.00015L6.32812 6.33016L0.998125 11.6602"
                        stroke="#0B1215"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="customer-project__responses-card">
              <div className="customer-project__responses-top">
                <div className="customer-project__specialist-info">
                  <div className="customer-project__specialist-avatar" aria-hidden="true" />
                  <div className="customer-project__specialist-name">
                    <span>Нестеров Ярослав</span>
                    <small>Тич лид</small>
                  </div>
                </div>
                <RatingDots className="customer-project__specialist-rating" />
              </div>

              <div className="customer-project__responses-meta">
                <div className="customer-project__response-chip">Цена: 20 000₽</div>
                <div className="customer-project__response-chip">Сроки: 40 часов</div>
                <CustomerProjectLinks />
              </div>

              <div className="customer-project__responses-actions">
                <button
                  className="customer-project__selected-link"
                  type="button"
                  onClick={() => {
                    window.location.href = '/dashboard/customer/project/portfolio'
                  }}
                >
                  Перейти к портфолио
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_48_662)">
                      <path
                        d="M18.5322 6.64551C18.5322 6.38035 18.4268 6.12605 18.2393 5.93856C18.0518 5.75106 17.7975 5.6457 17.5324 5.64566L9.53217 5.64566C9.39941 5.64335 9.26752 5.66751 9.14419 5.71672C9.02086 5.76593 8.90857 5.83921 8.81386 5.93229C8.71916 6.02536 8.64394 6.13636 8.59259 6.25882C8.54124 6.38127 8.5148 6.51273 8.5148 6.64551C8.5148 6.7783 8.54124 6.90975 8.59259 7.0322C8.64394 7.15466 8.71916 7.26566 8.81386 7.35874C8.90857 7.45181 9.02086 7.52509 9.14419 7.5743C9.26752 7.62351 9.39941 7.64767 9.53217 7.64536L15.1183 7.64536L5.7541 17.0096C5.56657 17.1971 5.46121 17.4515 5.46121 17.7167C5.46121 17.9819 5.56657 18.2363 5.7541 18.4238C5.94164 18.6113 6.19599 18.7167 6.46121 18.7167C6.72643 18.7167 6.98078 18.6113 7.16832 18.4238L16.5325 9.05957L16.5325 14.6457C16.5371 14.9079 16.6444 15.1578 16.8314 15.3416C17.0185 15.5254 17.2702 15.6283 17.5324 15.6283C17.7946 15.6283 18.0463 15.5254 18.2333 15.3416C18.4203 15.1578 18.5277 14.9079 18.5322 14.6457L18.5322 6.64551Z"
                        fill="#696E82"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_48_662">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <button className="customer-project__response-select" type="button">
                  Выбрать
                </button>
              </div>
            </div>
          </section>

          <section className="customer-project__phases">
            <div className="customer-project__phases-head">
              <h3>Фазы проекта</h3>
            </div>

            <div className="customer-project__phases-table">
              <div className="customer-project__phases-row customer-project__phases-row--head">
                <span>Фаза</span>
                <span>Сроки</span>
                <span>Бюджет, ₽</span>
                <span>Прогресс</span>
                <span>Статус</span>
              </div>

              {[
                {
                  phase: 'Аналитика',
                  dates: '01.01.2025 - 15.01.2025',
                  budget: '120 000',
                  progress: '100%',
                  status: 'Завершено',
                  statusClass: 'is-done',
                },
                {
                  phase: 'Разработка',
                  dates: '16.01.2025 - 15.03.2025',
                  budget: '520 000',
                  progress: '65%',
                  status: 'В процессе',
                  statusClass: 'is-progress',
                },
                {
                  phase: 'Тестирование',
                  dates: '16.03.2025 - 30.03.2025',
                  budget: '90 000',
                  progress: '0%',
                  status: 'Не начато',
                  statusClass: 'is-pending',
                },
              ].map((row, index) => {
                const menuId = `phase-${index}`
                return (
                  <div className="customer-project__phases-row" key={row.phase}>
                  <span>{row.phase}</span>
                  <span>{row.dates}</span>
                  <span>{row.budget}</span>
                  <span>{row.progress}</span>
                  <div className="phase-status-wrap">
                    <span className={`phase-status ${row.statusClass}`}>{row.status}</span>
                    <span className="dot-menu-wrap customer-project__dot-menu">
                      <button
                        className="dot-menu-trigger"
                        type="button"
                        aria-label="Действия"
                        onClick={(event) => {
                          event.stopPropagation()
                          setDotMenuId((prev) => (prev === menuId ? null : menuId))
                        }}
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.835 11C19.526 11 19.2297 11.1227 19.0112 11.3412C18.7927 11.5597 18.67 11.856 18.67 12.165C18.67 12.474 18.7927 12.7703 19.0112 12.9888C19.2297 13.2073 19.526 13.33 19.835 13.33C20.144 13.33 20.4403 13.2073 20.6588 12.9888C20.8773 12.7703 21 12.474 21 12.165C21 11.856 20.8773 11.5597 20.6588 11.3412C20.4403 11.1227 20.144 11 19.835 11ZM19.835 19.155C19.526 19.155 19.2297 19.2777 19.0112 19.4962C18.7927 19.7147 18.67 20.011 18.67 20.32C18.67 20.629 18.7927 20.9253 19.0112 21.1438C19.2297 21.3623 19.526 21.485 19.835 21.485C20.144 21.485 20.4403 21.3623 20.6588 21.1438C20.8773 20.9253 21 20.629 21 20.32C21 20.011 20.8773 19.7147 20.6588 19.4962C20.4403 19.2777 20.144 19.155 19.835 19.155ZM19.835 27.31C19.526 27.31 19.2297 27.4327 19.0112 27.6512C18.7927 27.8697 18.67 28.166 18.67 28.475C18.67 28.784 18.7927 29.0803 19.0112 29.2988C19.2297 29.5173 19.526 29.64 19.835 29.64C20.144 29.64 20.4403 29.5173 20.6588 29.2988C20.8773 29.0803 21 28.784 21 28.475C21 28.166 20.8773 27.8697 20.6588 27.6512C20.4403 27.4327 20.144 27.31 19.835 27.31Z"
                            fill="#696E82"
                            stroke="#696E82"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {dotMenuId === menuId && (
                        <div className="dot-menu" onClick={(event) => event.stopPropagation()}>
                          <button
                            type="button"
                            className="dot-menu__item"
                            onClick={() => setDotMenuId(null)}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            className="dot-menu__item dot-menu__item--danger"
                            onClick={() => setDotMenuId(null)}
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </span>
                  </div>
                  </div>
                )
              })}
            </div>

            <div className="customer-project__phases-pager">
              <button className="customer-project__pager-btn" type="button" aria-label="Назад">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 17L9 12L14 7"
                    stroke="#696E82"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="customer-project__pager-page">1</span>
              <button className="customer-project__pager-btn" type="button" aria-label="Вперёд">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17L15 12L10 7"
                    stroke="#0B1215"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </section>

          <section className="customer-project__logs">
            <div className="customer-project__logs-head">
              <h3>Логи событий</h3>
            </div>

            <div className="customer-project__logs-table">
              <div className="customer-project__logs-row customer-project__logs-row--head">
                <span>Событие</span>
                <span>Дата</span>
                <span>Время</span>
              </div>

              {[
                { event: 'Создан проект', date: '01.01.2025', time: '10:20' },
                { event: 'Приглашены специалисты', date: '02.01.2025', time: '14:45' },
                { event: 'Начата разработка', date: '05.01.2025', time: '09:10' },
              ].map((row, index) => {
                const menuId = `log-${index}`
                return (
                  <div className="customer-project__logs-row" key={`${row.event}-${row.date}`}>
                    <span>{row.event}</span>
                    <span>{row.date}</span>
                    <div className="customer-project__logs-cell">
                      <span>{row.time}</span>
                      <span className="dot-menu-wrap customer-project__dot-menu">
                        <button
                          className="dot-menu-trigger"
                          type="button"
                          aria-label="Действия"
                          onClick={(event) => {
                            event.stopPropagation()
                            setDotMenuId((prev) => (prev === menuId ? null : menuId))
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.835 11C19.526 11 19.2297 11.1227 19.0112 11.3412C18.7927 11.5597 18.67 11.856 18.67 12.165C18.67 12.474 18.7927 12.7703 19.0112 12.9888C19.2297 13.2073 19.526 13.33 19.835 13.33C20.144 13.33 20.4403 13.2073 20.6588 12.9888C20.8773 12.7703 21 12.474 21 12.165C21 11.856 20.8773 11.5597 20.6588 11.3412C20.4403 11.1227 20.144 11 19.835 11ZM19.835 19.155C19.526 19.155 19.2297 19.2777 19.0112 19.4962C18.7927 19.7147 18.67 20.011 18.67 20.32C18.67 20.629 18.7927 20.9253 19.0112 21.1438C19.2297 21.3623 19.526 21.485 19.835 21.485C20.144 21.485 20.4403 21.3623 20.6588 21.1438C20.8773 20.9253 21 20.629 21 20.32C21 20.011 20.8773 19.7147 20.6588 19.4962C20.4403 19.2777 20.144 19.155 19.835 19.155ZM19.835 27.31C19.526 27.31 19.2297 27.4327 19.0112 27.6512C18.7927 27.8697 18.67 28.166 18.67 28.475C18.67 28.784 18.7927 29.0803 19.0112 29.2988C19.2297 29.5173 19.526 29.64 19.835 29.64C20.144 29.64 20.4403 29.5173 20.6588 29.2988C20.8773 29.0803 21 28.784 21 28.475C21 28.166 20.8773 27.8697 20.6588 27.6512C20.4403 27.4327 20.144 27.31 19.835 27.31Z"
                              fill="#696E82"
                              stroke="#696E82"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {dotMenuId === menuId && (
                          <div className="dot-menu" onClick={(event) => event.stopPropagation()}>
                            <button
                              type="button"
                              className="dot-menu__item"
                              onClick={() => setDotMenuId(null)}
                            >
                              Редактировать
                            </button>
                            <button
                              type="button"
                              className="dot-menu__item dot-menu__item--danger"
                              onClick={() => setDotMenuId(null)}
                            >
                              Удалить
                            </button>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="customer-project__logs-pager">
              <button className="customer-project__pager-btn" type="button" aria-label="Назад">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 17L9 12L14 7"
                    stroke="#696E82"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="customer-project__pager-page">1</span>
              <button className="customer-project__pager-btn" type="button" aria-label="Вперёд">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17L15 12L10 7"
                    stroke="#0B1215"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </section>

        </div>
      </main>
      <CustomerProjectDescriptionModal isOpen={descOpen} onClose={() => setDescOpen(false)} />
      {chatOpen && (
        <div className="project-modal__overlay" onClick={() => setChatOpen(false)}>
          <div className="project-modal customer-chat-modal" onClick={(event) => event.stopPropagation()}>
            <div className="project-modal__head">
              <h3>Чат со специалистом</h3>
              <button
                className="project-modal__close"
                type="button"
                aria-label="Закрыть"
                onClick={() => setChatOpen(false)}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <div className="customer-chat-modal__body">
              <div className="kanban-chat">
                <div className="kanban-chat__messages">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`kanban-chat__message${message.isMe ? ' is-me' : ''}`}
                    >
                      {!message.isMe && (
                        <span className="kanban-chat__author">{message.author}</span>
                      )}
                      <div className="kanban-chat__bubble">
                        <p className="kanban-chat__text">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="kanban-chat__composer">
                  <div className="kanban-chat__input-wrap">
                    <input
                      className="kanban-chat__input"
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      placeholder="Введите сообщение"
                    />
                  </div>
                  <button
                    className="kanban-chat__send"
                    type="button"
                    aria-label="Отправить"
                    onClick={() => {
                      const trimmed = chatInput.trim()
                      if (!trimmed) return
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          author: 'Вы',
                          text: trimmed,
                          isMe: true,
                        },
                      ])
                      setChatInput('')
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_51_1644)">
                        <path
                          d="M18.5322 6.64551C18.5322 6.38035 18.4268 6.12605 18.2393 5.93856C18.0518 5.75106 17.7975 5.6457 17.5324 5.64566L9.53217 5.64566C9.39941 5.64335 9.26752 5.66751 9.14419 5.71672C9.02086 5.76593 8.90857 5.83921 8.81386 5.93229C8.71916 6.02536 8.64394 6.13636 8.59259 6.25882C8.54124 6.38127 8.5148 6.51273 8.5148 6.64551C8.5148 6.7783 8.54124 6.90975 8.59259 7.0322C8.64394 7.15466 8.71916 7.26566 8.81386 7.35874C8.90857 7.45181 9.02086 7.52509 9.14419 7.5743C9.26752 7.62351 9.39941 7.64767 9.53217 7.64536L15.1183 7.64536L5.7541 17.0096C5.56657 17.1971 5.46121 17.4515 5.46121 17.7167C5.46121 17.9819 5.56657 18.2363 5.7541 18.4238C5.94164 18.6113 6.19599 18.7167 6.46121 18.7167C6.72643 18.7167 6.98078 18.6113 7.16832 18.4238L16.5325 9.05957L16.5325 14.6457C16.5371 14.9079 16.6444 15.1578 16.8314 15.3416C17.0185 15.5254 17.2702 15.6283 17.5324 15.6283C17.7946 15.6283 18.0463 15.5254 18.2333 15.3416C18.4203 15.1578 18.5277 14.9079 18.5322 14.6457L18.5322 6.64551Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_51_1644">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
