import { useState } from 'react'
import type { WorkspaceTab } from '../types/active-project.types'

export const useWorkspaceTabs = (initial: WorkspaceTab = 'tasks') => {
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>(initial)
  return { workspaceTab, setWorkspaceTab }
}
