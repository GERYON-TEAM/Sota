import { useState } from 'react'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import ProjectChat from './components/panels/ProjectChat'
import { useChatComposer } from './hooks/useChatComposer'

const participants = [
  { id: 1, name: 'Нестеров Ярослав', username: 'nesterov', role: 'Team Lead' },
  { id: 2, name: 'Анна Миронова', username: 'amironova', role: 'Designer' },
  { id: 3, name: 'Иван Петров', username: 'ipetrov', role: 'Backend' },
  { id: 4, name: 'Мария Орлова', username: 'morlova', role: 'Product Manager' },
  { id: 5, name: 'Олег Смирнов', username: 'osmirnov', role: 'QA' },
  { id: 6, name: 'Сергей Иванов', username: 'sivanov', role: 'Frontend' },
  { id: 7, name: 'Екатерина Громова', username: 'egromova', role: 'Business Analyst' },
  { id: 8, name: 'Дмитрий Беляев', username: 'dbelyaev', role: 'Mobile' },
  { id: 9, name: 'Антон Фролов', username: 'afrolov', role: 'DevOps' },
]

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

export default function ChatPage() {
  const [bellOpen, setBellOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [participantsOpen, setParticipantsOpen] = useState(false)
  const { chatInput, setChatInput, messages, sendMessage } = useChatComposer()

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar
          title={
            <>
              <button
                className="dashboard-title__crumb"
                type="button"
                onClick={() => {
                  window.location.href = '/dashboard/specialist'
                }}
              >
                Дэшборд
              </button>
              <span className="dashboard-title__sep">/</span>
              <button
                className="dashboard-title__crumb"
                type="button"
                onClick={() => {
                  window.location.href = '/dashboard/specialist/project'
                }}
              >
                Проект
              </button>
              <span className="dashboard-title__sep">/</span>
              <span className="dashboard-title__page">Чат с командой</span>
            </>
          }
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <section className="team-chat-page">
            <div className="team-chat-page__head">
              <div className="team-chat-page__project">
                <h2>Название проекта</h2>
                <span>9 участников</span>
              </div>

              <div className="team-chat-page__menu-wrap">
                <button
                  className="team-chat-page__menu-button"
                  type="button"
                  aria-label="Открыть меню"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_307_179)">
                      <rect width="40" height="40" rx="15" fill="white"/>
                      <path d="M19.835 11C19.526 11 19.2297 11.1227 19.0112 11.3412C18.7927 11.5597 18.67 11.856 18.67 12.165C18.67 12.474 18.7927 12.7703 19.0112 12.9888C19.2297 13.2073 19.526 13.33 19.835 13.33C20.144 13.33 20.4403 13.2073 20.6588 12.9888C20.8773 12.7703 21 12.474 21 12.165C21 11.856 20.8773 11.5597 20.6588 11.3412C20.4403 11.1227 20.144 11 19.835 11ZM19.835 19.155C19.526 19.155 19.2297 19.2777 19.0112 19.4962C18.7927 19.7147 18.67 20.011 18.67 20.32C18.67 20.629 18.7927 20.9253 19.0112 21.1438C19.2297 21.3623 19.526 21.485 19.835 21.485C20.144 21.485 20.4403 21.3623 20.6588 21.1438C20.8773 20.9253 21 20.629 21 20.32C21 20.011 20.8773 19.7147 20.6588 19.4962C20.4403 19.2777 20.144 19.155 19.835 19.155ZM19.835 27.31C19.526 27.31 19.2297 27.4327 19.0112 27.6512C18.7927 27.8697 18.67 28.166 18.67 28.475C18.67 28.784 18.7927 29.0803 19.0112 29.2988C19.2297 29.5173 19.526 29.64 19.835 29.64C20.144 29.64 20.4403 29.5173 20.6588 29.2988C20.8773 29.0803 21 28.784 21 28.475C21 28.166 20.8773 27.8697 20.6588 27.6512C20.4403 27.4327 20.144 27.31 19.835 27.31Z" fill="#696E82" stroke="#0B1215" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_307_179">
                        <rect width="40" height="40" rx="15" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                {menuOpen && (
                  <div className="team-chat-page__menu">
                    <button
                      className="team-chat-page__menu-item"
                      type="button"
                      onClick={() => {
                        setParticipantsOpen(true)
                        setMenuOpen(false)
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8458 7.875C18.7085 9.78141 17.2943 11.25 15.7521 11.25C14.2099 11.25 12.7933 9.78188 12.6583 7.875C12.5177 5.89172 13.8944 4.5 15.7521 4.5C17.6097 4.5 18.9864 5.92781 18.8458 7.875Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.7498 14.25C12.695 14.25 9.75731 15.7673 9.02138 18.7223C8.92388 19.1133 9.16903 19.5 9.57075 19.5H21.9293C22.3311 19.5 22.5748 19.1133 22.4787 18.7223C21.7428 15.72 18.8051 14.25 15.7498 14.25Z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M9.37496 8.71594C9.26527 10.2384 8.12246 11.4375 6.89058 11.4375C5.65871 11.4375 4.51402 10.2389 4.40621 8.71594C4.29418 7.13203 5.40652 6 6.89058 6C8.37465 6 9.48699 7.16109 9.37496 8.71594Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.65671 14.3434C8.81061 13.9557 7.87874 13.8066 6.89108 13.8066C4.45358 13.8066 2.10515 15.0184 1.51686 17.3785C1.43952 17.6907 1.63546 17.9996 1.95608 17.9996H7.21921" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                      </svg>
                      <span>Участники чата</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <ProjectChat
              variant="page"
              messages={messages}
              chatInput={chatInput}
              onInputChange={setChatInput}
              onSend={sendMessage}
            />
          </section>
        </div>
      </main>

      {participantsOpen && (
        <div className="team-chat-page__overlay" onClick={() => setParticipantsOpen(false)}>
          <div className="team-chat-page__participants" onClick={(event) => event.stopPropagation()}>
            <div className="team-chat-page__participants-head">
              <h3>Участники чата</h3>
              <button
                className="team-chat-page__participants-close"
                type="button"
                aria-label="Закрыть"
                onClick={() => setParticipantsOpen(false)}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.75 15L15 24.75M15 15L24.75 24.75" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="team-chat-page__participants-list">
              {participants.map((participant) => (
                <div className="team-chat-page__participant" key={participant.id}>
                  <span className="team-chat-page__participant-avatar" aria-hidden="true">
                    {getInitials(participant.name)}
                  </span>
                  <div className="team-chat-page__participant-meta">
                    <strong>{participant.name}</strong>
                    <span>@{participant.username}</span>
                  </div>
                  <span className="team-chat-page__participant-role">{participant.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
