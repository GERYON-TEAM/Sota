export type WorkspaceTab = 'tasks' | 'team' | 'artifacts' | 'activity'
export type ModalTab = 'info' | 'description' | 'artifacts' | 'comments'

export type ValidationCriterion = {
  id: number
  title: string
  description: string
}

export type ChatAttachment = {
  id: string
  name: string
  sizeLabel: string
  kind: 'image' | 'document'
  previewUrl?: string
}

export type ChatMessage = {
  id: number
  author: string
  text: string
  time: string
  isMe: boolean
  attachments?: ChatAttachment[]
}
