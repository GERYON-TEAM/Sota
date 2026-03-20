import { useMemo, useRef, useState, type DragEvent, type KeyboardEvent } from 'react'
import type { ChatAttachment, ChatMessage } from '../../types/active-project.types'

type ProjectChatProps = {
  messages: ChatMessage[]
  chatInput: string
  onInputChange: (value: string) => void
  onSend: (payload?: { text?: string; attachments?: ChatAttachment[] }) => void
  variant?: 'modal' | 'page'
}

const mentionUsers = [
  { id: 1, name: 'Нестеров Ярослав', username: 'yaroslav' },
  { id: 2, name: 'Анна Миронова', username: 'anna' },
  { id: 3, name: 'Иван Петров', username: 'ivan' },
  { id: 4, name: 'Мария Орлова', username: 'maria' },
]

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} КB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

const buildAttachment = (file: File): ChatAttachment => ({
  id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
  name: file.name,
  sizeLabel: formatFileSize(file.size),
  kind: file.type.startsWith('image/') ? 'image' : 'document',
  previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
})

const getInitials = (author: string) =>
  author
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

export default function ProjectChat({
  messages,
  chatInput,
  onInputChange,
  onSend,
  variant = 'modal',
}: ProjectChatProps) {
  const photoInputRef = useRef<HTMLInputElement | null>(null)
  const documentInputRef = useRef<HTMLInputElement | null>(null)
  const [attachMenuOpen, setAttachMenuOpen] = useState(false)
  const [pendingAttachments, setPendingAttachments] = useState<ChatAttachment[]>([])
  const [dragActive, setDragActive] = useState(false)

  const mentionQuery = useMemo(() => {
    const match = chatInput.match(/(?:^|\s)@([^\s]*)$/)
    return match ? match[1].toLowerCase() : null
  }, [chatInput])

  const mentionOptions = useMemo(() => {
    if (mentionQuery === null) return []
    return mentionUsers.filter((user) => {
      const haystack = `${user.name} ${user.username}`.toLowerCase()
      return haystack.includes(mentionQuery)
    })
  }, [mentionQuery])

  const handleSend = () => {
    if (!chatInput.trim() && pendingAttachments.length === 0) return
    onSend({ attachments: pendingAttachments })
    setPendingAttachments([])
    setAttachMenuOpen(false)
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const attachments = Array.from(fileList).map(buildAttachment)
    setPendingAttachments((prev) => [...prev, ...attachments])
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  const handleMentionSelect = (username: string) => {
    const nextValue = chatInput.replace(/(?:^|\s)@([^\s]*)$/, (match) => {
      const prefix = match.startsWith(' ') ? ' ' : ''
      return `${prefix}@${username} `
    })
    onInputChange(nextValue)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={`kanban-chat kanban-chat--${variant}${dragActive ? ' is-drag-active' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragActive(true)
      }}
      onDragLeave={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return
        setDragActive(false)
      }}
      onDrop={handleDrop}
    >
      <div className="kanban-chat__messages">
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1]
          const nextMessage = messages[index + 1]
          const isFirstInGroup =
            !previousMessage ||
            previousMessage.author !== message.author ||
            previousMessage.isMe !== message.isMe
          const isLastInGroup =
            !nextMessage ||
            nextMessage.author !== message.author ||
            nextMessage.isMe !== message.isMe

          return (
            <div key={message.id} className="kanban-chat__message-wrap">
              {index === 0 && (
                <div className="kanban-chat__date-chip">Январь, 1</div>
              )}
              <div
                className={`kanban-chat__message${message.isMe ? ' is-me' : ''}${isLastInGroup ? ' is-last-in-group' : ''}`}
              >
                {isFirstInGroup && !message.isMe && (
                  <div className="kanban-chat__incoming-head">
                    <span className="kanban-chat__incoming-name">{message.author}</span>
                    <span className="kanban-chat__incoming-time">{message.time}</span>
                  </div>
                )}
                {message.isMe && (
                  <div className="kanban-chat__outgoing-time">{message.time}</div>
                )}
                <div className="kanban-chat__row">
                  {isLastInGroup && (
                    <span className="kanban-chat__avatar" aria-hidden="true">
                      {getInitials(message.author)}
                    </span>
                  )}
                  <div className="kanban-chat__bubble">
                    {!!message.text && <p className="kanban-chat__text">{message.text}</p>}
                    {!!message.attachments?.length && (
                      <div className="kanban-chat__attachments is-sent">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className={`kanban-chat__attachment-card${attachment.kind === 'image' ? ' is-image' : ''}`}
                          >
                            {attachment.kind === 'image' ? (
                              <span
                                className="kanban-chat__attachment-preview"
                                style={{ backgroundImage: `url(${attachment.previewUrl ?? ''})` }}
                              />
                            ) : (
                              <span className="kanban-chat__attachment-preview kanban-chat__attachment-preview--document" />
                            )}
                            <span className="kanban-chat__attachment-name" title={attachment.name}>
                              {attachment.name}
                            </span>
                            <span className="kanban-chat__attachment-size">{attachment.sizeLabel}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {!message.isMe && <span className="kanban-chat__bubble-time">{message.time}</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="kanban-chat__composer">
        <div className="kanban-chat__input-wrap">
          {mentionOptions.length > 0 && (
            <div className="kanban-chat__mentions">
              {mentionOptions.map((user) => (
                <button
                  key={user.id}
                  className="kanban-chat__mention"
                  type="button"
                  onClick={() => handleMentionSelect(user.username)}
                >
                  <span className="kanban-chat__mention-name">{user.name}</span>
                  <span className="kanban-chat__mention-username">@{user.username}</span>
                </button>
              ))}
            </div>
          )}

          {pendingAttachments.length > 0 && (
            <div className="kanban-chat__pending">
              {pendingAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className={`kanban-chat__attachment-card${attachment.kind === 'image' ? ' is-image' : ''}`}
                >
                  {attachment.kind === 'image' ? (
                    <span
                      className="kanban-chat__attachment-preview"
                      style={{ backgroundImage: `url(${attachment.previewUrl ?? ''})` }}
                    />
                  ) : (
                    <span className="kanban-chat__attachment-preview kanban-chat__attachment-preview--document" />
                  )}
                  <span className="kanban-chat__attachment-name" title={attachment.name}>
                    {attachment.name}
                  </span>
                  <span className="kanban-chat__attachment-size">{attachment.sizeLabel}</span>
                </div>
              ))}
            </div>
          )}

          <div className="kanban-chat__input-row">
            <div className="kanban-chat__attach-wrap">
              <button
                className="kanban-chat__attach"
                type="button"
                aria-label="Прикрепить"
                onClick={() => setAttachMenuOpen((prev) => !prev)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.1725 6.99968L8.58651 13.5857C8.39549 13.7702 8.24312 13.9909 8.13831 14.2349C8.03349 14.4789 7.97831 14.7413 7.97601 15.0069C7.9737 15.2724 8.0243 15.5358 8.12486 15.7816C8.22543 16.0274 8.37393 16.2507 8.56172 16.4385C8.7495 16.6263 8.97281 16.7748 9.2186 16.8753C9.46439 16.9759 9.72775 17.0265 9.99331 17.0242C10.2589 17.0219 10.5213 16.9667 10.7653 16.8619C11.0093 16.7571 11.23 16.6047 11.4145 16.4137L17.8285 9.82768C18.5571 9.07327 18.9603 8.06286 18.9512 7.01407C18.9421 5.96528 18.5214 4.96203 17.7798 4.2204C17.0381 3.47877 16.0349 3.05809 14.9861 3.04898C13.9373 3.03987 12.9269 3.44304 12.1725 4.17168L5.75751 10.7567C4.63219 11.882 4 13.4082 4 14.9997C4 16.5911 4.63219 18.1174 5.75751 19.2427C6.88282 20.368 8.40907 21.0002 10.0005 21.0002C11.5919 21.0002 13.1182 20.368 14.2435 19.2427L20.5005 12.9997" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {attachMenuOpen && (
                <div className="kanban-chat__attach-menu">
                  <button
                    className="kanban-chat__attach-item"
                    type="button"
                    onClick={() => {
                      photoInputRef.current?.click()
                      setAttachMenuOpen(false)
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.33 17.657C20.44 17.291 20.5 16.902 20.5 16.5V7.5C20.5 6.43913 20.0786 5.42172 19.3284 4.67157C18.5783 3.92143 17.5609 3.5 16.5 3.5H7.5C6.43913 3.5 5.42172 3.92143 4.67157 4.67157C3.92143 5.42172 3.5 6.43913 3.5 7.5V16.57C3.51835 17.6187 3.94787 18.6182 4.69604 19.3533C5.4442 20.0884 6.45115 20.5002 7.5 20.5H16.5L16.617 20.498M20.33 17.657L20.242 17.553L17.776 14.577C17.5889 14.3513 17.3544 14.1694 17.0892 14.0443C16.824 13.9193 16.5346 13.8541 16.2414 13.8533C15.9482 13.8525 15.6584 13.9162 15.3925 14.0399C15.1267 14.1636 14.8913 14.3442 14.703 14.569L13.391 16.135L13.177 16.396M20.33 17.657C20.0874 18.4603 19.5984 19.166 18.932 19.676C18.2657 20.1861 17.4558 20.4736 16.617 20.498M13.177 16.396L16.524 20.392L16.617 20.498M13.177 16.396L9.95 12.543C9.76228 12.319 9.52774 12.1388 9.26288 12.0152C8.99802 11.8916 8.70929 11.8275 8.417 11.8275C8.12471 11.8275 7.83598 11.8916 7.57112 12.0152C7.30626 12.1388 7.07172 12.319 6.884 12.543L3.678 16.37L3.501 16.571" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.0898 10.4092C15.9183 10.4092 16.5898 9.73761 16.5898 8.90918C16.5898 8.08075 15.9183 7.40918 15.0898 7.40918C14.2614 7.40918 13.5898 8.08075 13.5898 8.90918C13.5898 9.73761 14.2614 10.4092 15.0898 10.4092Z" fill="black"/>
                    </svg>
                    <span>Фото</span>
                  </button>

                  <button
                    className="kanban-chat__attach-item"
                    type="button"
                    onClick={() => {
                      documentInputRef.current?.click()
                      setAttachMenuOpen(false)
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M19.5 12.25V9.625C19.5 8.72989 19.1444 7.87145 18.5115 7.23851C17.8786 6.60558 17.0201 6.25 16.125 6.25H14.625C14.3266 6.25 14.0405 6.13147 13.8295 5.9205C13.6185 5.70952 13.5 5.42337 13.5 5.125V3.625C13.5 2.72989 13.1444 1.87145 12.5115 1.23851C11.8785 0.605579 11.0201 0.25 10.125 0.25H8.25M10.5 0.25H5.625C5.004 0.25 4.5 0.754 4.5 1.375V18.625C4.5 19.246 5.004 19.75 5.625 19.75H18.375C18.996 19.75 19.5 19.246 19.5 18.625V9.25C19.5 6.86305 18.5518 4.57387 16.864 2.88604C15.1761 1.19821 12.8869 0.25 10.5 0.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Документ</span>
                  </button>
                </div>
              )}

              <input
                ref={photoInputRef}
                className="kanban-chat__file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  handleFiles(event.target.files)
                  event.target.value = ''
                }}
              />
              <input
                ref={documentInputRef}
                className="kanban-chat__file-input"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx,.ppt,.pptx"
                multiple
                onChange={(event) => {
                  handleFiles(event.target.files)
                  event.target.value = ''
                }}
              />
            </div>

            <input
              className="kanban-chat__input"
              value={chatInput}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите сообщение"
            />
          </div>
        </div>

        <button className="kanban-chat__send" type="button" aria-label="Отправить" onClick={handleSend}>
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
  )
}
