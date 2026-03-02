import { useState } from 'react'
import type { ChatMessage } from '../types/active-project.types'

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    author: 'Нестеров Ярослав',
    text: 'Подготовил черновик документа, проверь пожалуйста.',
    time: '10:24',
    isMe: false,
  },
  {
    id: 2,
    author: 'Вы',
    text: 'Ок, посмотрю. Можно добавить ещё блок по рискам?',
    time: '10:27',
    isMe: true,
  },
]

export const useChatComposer = () => {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const sendMessage = () => {
    const trimmed = chatInput.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: 'Вы',
        text: trimmed,
        time: 'сейчас',
        isMe: true,
      },
    ])
    setChatInput('')
  }

  return { chatInput, setChatInput, messages, setMessages, sendMessage }
}
