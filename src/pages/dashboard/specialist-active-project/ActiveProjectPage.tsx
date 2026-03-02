import { useRef, useState, type RefObject } from 'react'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import WorkspaceCard from './components/WorkspaceCard'
import WorkspaceToolbar from './components/WorkspaceToolbar'
import KanbanBoard from './components/kanban/KanbanBoard'
import TeamSection from './components/sections/TeamSection'
import ActivitySection from './components/sections/ActivitySection'
import ArtifactsSection from './components/sections/ArtifactsSection'
import KanbanTaskModal from './components/modals/KanbanTaskModal'
import GdfModal from './components/modals/GdfModal'
import ValidationModal from './components/modals/ValidationModal'
import HistoryModal from './components/modals/HistoryModal'
import { useWorkspaceTabs } from './hooks/useWorkspaceTabs'
import { useDropdown } from './hooks/useDropdown'
import { useModalState } from './hooks/useModalState'
import { useChatComposer } from './hooks/useChatComposer'
import type { ModalTab, ValidationCriterion } from './types/active-project.types'

export default function ActiveProjectPage() {
  const [bellOpen, setBellOpen] = useState(false)
  const { workspaceTab, setWorkspaceTab } = useWorkspaceTabs('tasks')
  const { modalOpen, setModalOpen, gdfOpen, setGdfOpen, validationOpen, setValidationOpen, historyOpen, setHistoryOpen } =
    useModalState()

  const statusDropdown = useDropdown()
  const priorityDropdown = useDropdown()
  const artifactsDropdown = useDropdown()

  const [taskStatus, setTaskStatus] = useState('В работе')
  const [taskPriority, setTaskPriority] = useState('П1')
  const [storyPoints, setStoryPoints] = useState(3)
  const [deadlineStart, setDeadlineStart] = useState('')
  const [deadlineEnd, setDeadlineEnd] = useState('')
  const [activeTab, setActiveTab] = useState<ModalTab>('info')
  const [artifactsType, setArtifactsType] = useState('Design')
  const [descriptionEditing, setDescriptionEditing] = useState(false)
  const [descriptionText, setDescriptionText] = useState(
    'Здесь будет большое описание задачи. Опишите детали: цели, контекст, ограничения, ожидаемый результат, ссылки на материалы и любые важные примечания для исполнителей. Этот текст может занимать несколько абзацев и прокручиваться при необходимости.',
  )

  const { chatInput, setChatInput, messages, sendMessage } = useChatComposer()

  const startDateRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)

  const statusOptions = ['Нужно сделать', 'В работе', 'На рассмотрении', 'Завершено']
  const priorityOptions = ['П1', 'П2', 'П3', 'П4', 'П5']
  const [checkedCriteria, setCheckedCriteria] = useState<number[]>([1])
  const validationCriteria: ValidationCriterion[] = [
    {
      id: 1,
      title: 'Корректность структуры',
      description:
        'Проверить наличие всех обязательных разделов и их соответствие стандарту.',
    },
    {
      id: 2,
      title: 'Согласованность версий',
      description:
        'Сверить номера версий и даты обновления с историей изменений.',
    },
    {
      id: 3,
      title: 'Полнота артефактов',
      description:
        'Убедиться, что приложены все материалы и ссылки на источники.',
    },
  ]

  const openDatePicker = (ref: RefObject<HTMLInputElement | null>) => {
    const input = ref.current
    if (!input) return
    const picker = (input as HTMLInputElement & { showPicker?: () => void }).showPicker
    if (picker) {
      picker.call(input)
      return
    }
    input.click()
  }

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
              <span className="dashboard-title__page">Проект</span>
            </>
          }
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <section className="project-workspace">
            <WorkspaceCard title="Название проекта" onOpen={() => {}} />

            <WorkspaceToolbar
              workspaceTab={workspaceTab}
              onTabChange={setWorkspaceTab}
              artifactsOpen={artifactsDropdown.open}
              artifactsType={artifactsType}
              onArtifactsToggle={artifactsDropdown.toggle}
              onArtifactsTypeChange={(value) => {
                setArtifactsType(value)
                artifactsDropdown.close()
              }}
            />

            {workspaceTab === 'tasks' && (
              <KanbanBoard onColumnMenuClick={() => setModalOpen(true)} />
            )}

            {workspaceTab === 'artifacts' && (
              <ArtifactsSection
                onGdfOpen={() => setGdfOpen(true)}
                onValidationOpen={() => setValidationOpen(true)}
                onHistoryOpen={() => setHistoryOpen(true)}
              />
            )}
          </section>

          {workspaceTab === 'team' && <TeamSection />}
          {workspaceTab === 'activity' && <ActivitySection />}
        </div>
      </main>

      {modalOpen && (
        <KanbanTaskModal
          activeTab={activeTab}
          onTabChange={setActiveTab}
          statusOpen={statusDropdown.open}
          onStatusToggle={statusDropdown.toggle}
          priorityOpen={priorityDropdown.open}
          onPriorityToggle={priorityDropdown.toggle}
          taskStatus={taskStatus}
          taskPriority={taskPriority}
          statusOptions={statusOptions}
          priorityOptions={priorityOptions}
          onStatusChange={(value) => {
            setTaskStatus(value)
            statusDropdown.close()
          }}
          onPriorityChange={(value) => {
            setTaskPriority(value)
            priorityDropdown.close()
          }}
          storyPoints={storyPoints}
          onStoryPointsChange={setStoryPoints}
          deadlineStart={deadlineStart}
          deadlineEnd={deadlineEnd}
          onDeadlineStartChange={setDeadlineStart}
          onDeadlineEndChange={setDeadlineEnd}
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          onOpenDatePicker={openDatePicker}
          descriptionText={descriptionText}
          descriptionEditing={descriptionEditing}
          onDescriptionChange={setDescriptionText}
          onDescriptionToggle={() => setDescriptionEditing((prev) => !prev)}
          chatInput={chatInput}
          messages={messages}
          onChatInputChange={setChatInput}
          onChatSend={sendMessage}
          onClose={() => setModalOpen(false)}
        />
      )}

      {gdfOpen && <GdfModal onClose={() => setGdfOpen(false)} />}

      {validationOpen && (
        <ValidationModal
          criteria={validationCriteria}
          checked={checkedCriteria}
          onToggle={(id) => {
            setCheckedCriteria((prev) =>
              prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
            )
          }}
          onClose={() => setValidationOpen(false)}
        />
      )}

      {historyOpen && <HistoryModal onClose={() => setHistoryOpen(false)} />}
    </div>
  )
}
