import { useRef, useState } from 'react'
import CustomerHeaderBar from '../customer-dashboard/components/CustomerHeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import { useDashboardDropdowns } from '../specialist-dashboard/hooks/useDashboardDropdowns'
import ValidatorSidebar from './components/ValidatorSidebar'
import QueueToolbar from './components/QueueToolbar'
import QueueList from './components/QueueList'
import QueuePager from './components/QueuePager'
import QueueDetailsPanel from './components/panels/QueueDetailsPanel'
import QueueActionsPanel from './components/panels/QueueActionsPanel'
import RejectReasonModal from './components/modals/RejectReasonModal'
import BulkActionModal from './components/modals/BulkActionModal'
import { useValidatorQueueQuery } from './hooks/useValidatorQueueQuery'
import { useQueueSelection } from './hooks/useQueueSelection'
import { useQueuePagination } from './hooks/useQueuePagination'
import useOutsideClose from './hooks/useOutsideClose'
import { CHECKLIST_CRITERIA, PRIORITY_CLASS_BY_LABEL, QUEUE_ITEMS } from './types/validator-queue.types'

export default function ValidatorQueuePage() {
  const { bellOpen, setBellOpen } = useDashboardDropdowns()

  const [decisionView, setDecisionView] = useState<'checklist' | 'comment'>('checklist')
  const [checkedCriteria, setCheckedCriteria] = useState<string[]>([])
  const [commentText, setCommentText] = useState('')
  const [queueMenuOpen, setQueueMenuOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [bulkModalOpen, setBulkModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  const queueControlsRef = useRef<HTMLDivElement | null>(null)

  const { query, setQuery, sort, setSort, resetFilters, filteredSortedItems } = useValidatorQueueQuery(QUEUE_ITEMS)
  const { page, pagesCount, next, prev, pagedItems } = useQueuePagination(filteredSortedItems, 10)
  const { selectedId, selectedItem, select } = useQueueSelection(filteredSortedItems)

  useOutsideClose({
    isOpen: queueMenuOpen,
    containerRef: queueControlsRef,
    onClose: () => setQueueMenuOpen(false),
  })

  const toggleCriterion = (criterionId: string) => {
    setCheckedCriteria((prev) =>
      prev.includes(criterionId) ? prev.filter((item) => item !== criterionId) : [...prev, criterionId],
    )
  }

  const openFilePreview = (file: { name: string; format: string }) => {
    window.alert(`Просмотр файла ${file.name}.${file.format} (мок)`)
  }

  const handleQueueRefresh = () => {
    setQueueMenuOpen(false)
    window.alert('Очередь обновлена (мок)')
  }

  return (
    <div className="dashboard validator-queue-page">
      <ValidatorSidebar />

      <main className="dashboard-content">
        <CustomerHeaderBar
          title="Очередь"
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface validator-queue-surface">
          <section className="validator-queue-grid">
            <article className="validator-queue-column">
              <QueueToolbar
                queueCount={QUEUE_ITEMS.length}
                searchValue={query}
                queueSort={sort}
                queueMenuOpen={queueMenuOpen}
                queueControlsRef={queueControlsRef}
                onSearchChange={setQuery}
                onToggleMenu={() => setQueueMenuOpen((prev) => !prev)}
                onSortChange={(value) => {
                  setSort(value)
                  setQueueMenuOpen(false)
                }}
                onRefresh={handleQueueRefresh}
                onResetFilters={resetFilters}
              />

              <QueueList
                items={pagedItems}
                selectedId={selectedId}
                getPriorityClass={(priority) => PRIORITY_CLASS_BY_LABEL[priority]}
                onSelect={select}
              />

              <QueuePager page={page} pagesCount={pagesCount} onPrev={prev} onNext={next} />
            </article>

            {selectedItem && (
              <QueueDetailsPanel
                selectedItem={selectedItem}
                priorityClassName={PRIORITY_CLASS_BY_LABEL[selectedItem.priorityLabel]}
                onOpenFilePreview={openFilePreview}
              />
            )}

            <QueueActionsPanel
              decisionView={decisionView}
              checkedCriteria={checkedCriteria}
              commentText={commentText}
              checklistCriteria={CHECKLIST_CRITERIA}
              onDecisionViewChange={setDecisionView}
              onToggleCriterion={toggleCriterion}
              onCommentChange={setCommentText}
              onOpenRejectModal={() => setRejectModalOpen(true)}
            />
          </section>
        </div>
      </main>

      <RejectReasonModal
        isOpen={rejectModalOpen}
        reason={rejectReason}
        onReasonChange={setRejectReason}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={() => {
          setRejectModalOpen(false)
          setRejectReason('')
        }}
      />

      <BulkActionModal isOpen={bulkModalOpen} onClose={() => setBulkModalOpen(false)} />
    </div>
  )
}
