import { useState } from 'react'
import Sidebar from '../dashboard/specialist-dashboard/components/Sidebar'
import ProfileCard from './components/ProfileCard'
import CompletedProjectsSection from './components/CompletedProjectsSection'
import SkillsSection from './components/SkillsSection'
import GoalsSection from './components/GoalsSection'
import ReviewsSection from './components/ReviewsSection'
import HeaderBar from './components/HeaderBar'
import EditProfileModal from './modals/EditProfileModal'
import AddEditSkillModal from './modals/AddEditSkillModal'
import AddEditGoalModal from './modals/AddEditGoalModal'
import { normalizeEmail, normalizeGithub, normalizeTelegram } from './utils/contacts'
import { formatDate, toIsoDate } from './utils/dates'
import { shortenGoalDescription } from './utils/text'
import type { Goal, Skill } from './types/portfolio.types'
import { useDatePicker } from './hooks/useDatePicker'
import { useOutsideClose } from './hooks/useOutsideClose'
import { usePaginationClamp } from './hooks/usePaginationClamp'
import '../dashboard/specialist-dashboard/styles/index.css'
import './styles/index.css'

export default function SpecialistPortfolio() {
  const hasInvites = true
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [aboutText, setAboutText] = useState(
    'Это текст про специалиста. Он может занимать 2-3 строки и его можно редактировать. Например, 2 года работы по специальности, достижения, качества.'
  )
  const [techList, setTechList] = useState<string[]>(['Node.js', 'React'])
  const [editAvatarUrl, setEditAvatarUrl] = useState<string | null>(null)
  const [editAboutText, setEditAboutText] = useState('')
  const [editTechInput, setEditTechInput] = useState('')
  const [editTechList, setEditTechList] = useState<string[]>(['Node.js', 'React'])
  const [isAvatarDragOver, setIsAvatarDragOver] = useState(false)
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false)
  const [dotMenuId, setDotMenuId] = useState<string | null>(null)
  const [editingSkill, setEditingSkill] = useState<{ type: 'hard' | 'soft'; index: number } | null>(
    null
  )
  const [hardSkills, setHardSkills] = useState<Skill[]>([
    { name: 'React', level: 'Middle', progress: 5 },
  ])
  const [softSkills, setSoftSkills] = useState<Skill[]>([
    { name: 'Communication', level: 'Middle', progress: 4 },
  ])
  const [hardSkillsPage, setHardSkillsPage] = useState(0)
  const [softSkillsPage, setSoftSkillsPage] = useState(0)
  const skillsPerPage = 3
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillTitle, setNewSkillTitle] = useState('')
  const [skillTypeOpen, setSkillTypeOpen] = useState(false)
  const [skillType, setSkillType] = useState('')
  const [skillLevelOpen, setSkillLevelOpen] = useState(false)
  const [skillLevel, setSkillLevel] = useState('')
  const [progressOpen, setProgressOpen] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [githubUrl, setGithubUrl] = useState('')
  const [telegramUrl, setTelegramUrl] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [editGithubUrl, setEditGithubUrl] = useState('')
  const [editTelegramUrl, setEditTelegramUrl] = useState('')
  const [editEmailAddress, setEditEmailAddress] = useState('')
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [editingGoalIndex, setEditingGoalIndex] = useState<number | null>(null)
  const [goals, setGoals] = useState<Goal[]>([
    {
      title: 'Выучить Vue.js',
      timeline: '01.01.2025 - сейчас',
      progress: '36%',
      description:
        'Описание, не слишком большое, иначе сократить иначе все не влезет, а так должно быть в одну-две строки, не больше. Если текста много, то можно использовать многоточия и показывать полное описание по клику на цель.',
      status: 'в процессе',
    },
  ])
  const [newGoalTitle, setNewGoalTitle] = useState('')
  const [newGoalTimeline, setNewGoalTimeline] = useState('')
  const [newGoalProgress, setNewGoalProgress] = useState('')
  const [newGoalDescription, setNewGoalDescription] = useState('')
  const [newGoalStatus, setNewGoalStatus] = useState('')
  const [newGoalStart, setNewGoalStart] = useState('')
  const [newGoalEnd, setNewGoalEnd] = useState('')
  const goalsPerPage = 3
  const [goalsPage, setGoalsPage] = useState(0)
  const [goalStatusOpen, setGoalStatusOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)
  const [yearValue, setYearValue] = useState('2026')
  const [completedTypeOpen, setCompletedTypeOpen] = useState(false)
  const [completedTypeValue, setCompletedTypeValue] = useState('Коммерческий')
  const [completedDateOpen, setCompletedDateOpen] = useState(false)
  const [completedDateValue, setCompletedDateValue] = useState<'new' | 'old'>('new')
  const [ratingOpen, setRatingOpen] = useState(false)
  const [ratingValue, setRatingValue] = useState<'high' | 'low'>('high')
  const [reviewsTypeOpen, setReviewsTypeOpen] = useState(false)
  const [reviewsTypeValue, setReviewsTypeValue] = useState('Коммерческий')
  const [reviewsDateOpen, setReviewsDateOpen] = useState(false)
  const [reviewsDateValue, setReviewsDateValue] = useState<'new' | 'old'>('new')
  const [shareOpen, setShareOpen] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href
  const normalizedGithubUrl = normalizeGithub(githubUrl)
  const normalizedTelegramUrl = normalizeTelegram(telegramUrl)
  const normalizedEmailUrl = normalizeEmail(emailAddress)
  const hasAnyContacts = Boolean(normalizedGithubUrl || normalizedTelegramUrl || normalizedEmailUrl)

  const handleAvatarFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const nextUrl = URL.createObjectURL(file)
    setEditAvatarUrl(nextUrl)
  }

  const resetSkillModal = () => {
    setIsAddSkillOpen(false)
    setEditingSkill(null)
    setNewSkillName('')
    setNewSkillTitle('')
    setSkillType('')
    setSkillLevel('')
    setProgress(0)
    setSkillTypeOpen(false)
    setSkillLevelOpen(false)
    setProgressOpen(false)
  }

  const handleShare = async () => {
    setShareOpen(true)
    try {
      if (navigator?.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl)
        setShareCopied(true)
      } else {
        setShareCopied(false)
      }
    } catch {
      setShareCopied(false)
    }
  }

  const handleShareCopy = async () => {
    try {
      if (navigator?.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl)
        setShareCopied(true)
      }
    } catch {
      setShareCopied(false)
    }
  }

  const handleAddSkill = () => {
    const rawName = newSkillTitle.trim() || newSkillName.trim()
    if (!rawName) return
    const normalizedName = rawName.toLowerCase()
    const targetType = skillType === 'Soft Skills' ? 'soft' : 'hard'
    const updatedSkill = {
      name: rawName,
      level: skillLevel || 'Middle',
      progress: progress || 1,
    }

    if (targetType === 'soft') {
      const duplicate = softSkills.some(
        (skill, index) =>
          skill.name.toLowerCase() === normalizedName &&
          !(editingSkill && editingSkill.type === 'soft' && editingSkill.index === index)
      )
      if (duplicate) return
    } else {
      const duplicate = hardSkills.some(
        (skill, index) =>
          skill.name.toLowerCase() === normalizedName &&
          !(editingSkill && editingSkill.type === 'hard' && editingSkill.index === index)
      )
      if (duplicate) return
    }

    if (editingSkill) {
      if (editingSkill.type === targetType) {
        if (targetType === 'soft') {
          setSoftSkills((prev) => {
            const next = [...prev]
            next[editingSkill.index] = updatedSkill
            return next
          })
        } else {
          setHardSkills((prev) => {
            const next = [...prev]
            next[editingSkill.index] = updatedSkill
            return next
          })
        }
      } else {
        if (editingSkill.type === 'soft') {
          setSoftSkills((prev) => prev.filter((_, index) => index !== editingSkill.index))
        } else {
          setHardSkills((prev) => prev.filter((_, index) => index !== editingSkill.index))
        }

        if (targetType === 'soft') {
          setSoftSkills((prev) => [...prev, updatedSkill])
          setSoftSkillsPage(0)
        } else {
          setHardSkills((prev) => [...prev, updatedSkill])
          setHardSkillsPage(0)
        }
      }
    } else if (targetType === 'soft') {
      setSoftSkills((prev) => [...prev, updatedSkill])
      setSoftSkillsPage(0)
    } else {
      setHardSkills((prev) => [...prev, updatedSkill])
      setHardSkillsPage(0)
    }

    resetSkillModal()
  }

  const handleEditSkill = (type: 'hard' | 'soft', index: number) => {
    const list = type === 'hard' ? hardSkills : softSkills
    const skill = list[index]
    if (!skill) return
    setEditingSkill({ type, index })
    setNewSkillTitle(skill.name)
    setNewSkillName(skill.name)
    setSkillType(type === 'hard' ? 'Hard Skills' : 'Soft Skills')
    setSkillTypeOpen(false)
    setSkillLevel(skill.level)
    setSkillLevelOpen(false)
    setProgressOpen(false)
    setProgress(skill.progress)
    setIsAddSkillOpen(true)
    setDotMenuId(null)
  }

  const handleDeleteSkill = (type: 'hard' | 'soft', index: number) => {
    if (type === 'hard') {
      setHardSkills((prev) => prev.filter((_, idx) => idx !== index))
    } else {
      setSoftSkills((prev) => prev.filter((_, idx) => idx !== index))
    }
    setDotMenuId(null)
  }

  const resetGoalModal = () => {
    setIsAddGoalOpen(false)
    setEditingGoalIndex(null)
    setNewGoalTitle('')
    setNewGoalTimeline('')
    setNewGoalProgress('')
    setNewGoalDescription('')
    setNewGoalStatus('')
    setNewGoalStart('')
    setNewGoalEnd('')
    setGoalStatusOpen(false)
  }

  const handleEditGoal = (index: number) => {
    const goal = goals[index]
    if (!goal) return
    setEditingGoalIndex(index)
    setNewGoalTitle(goal.title)
    setNewGoalDescription(goal.description)
    setNewGoalProgress(goal.progress.replace('%', ''))
    setNewGoalStatus(goal.status)
    const [startRaw, endRaw] = goal.timeline.split(' - ')
    setNewGoalStart(toIsoDate(startRaw))
    setNewGoalEnd(endRaw && endRaw !== 'сейчас' ? toIsoDate(endRaw) : '')
    setIsAddGoalOpen(true)
    setDotMenuId(null)
  }

  const handleDeleteGoal = (index: number) => {
    setGoals((prev) => prev.filter((_, idx) => idx !== index))
    setDotMenuId(null)
  }

  const handleAddGoal = () => {
    const title = newGoalTitle.trim()
    if (!title) return
    const rawProgress = newGoalProgress.trim().replace(/%/g, '')
    const progressNumber = rawProgress ? Math.min(100, Math.max(0, Number(rawProgress))) : 0
    const progressValue = `${progressNumber}%`
    const statusValue =
      progressNumber >= 100 ? 'достигнуто' : newGoalStatus.trim() || 'в процессе'
    const isInProgress = statusValue.toLowerCase() === 'в процессе'
    const timelineValue =
      newGoalStart && newGoalEnd
        ? `${newGoalStart} - ${newGoalEnd}`
        : newGoalStart
          ? `${newGoalStart} - ${isInProgress ? 'сейчас' : ''}`.trim()
          : newGoalTimeline
    const nextGoal = {
      title,
      timeline: timelineValue || '01.01.2025 - сейчас',
      progress: progressValue,
      description: newGoalDescription.trim() || 'Описание',
      status: statusValue,
    }
    setGoals((prev) => {
      if (editingGoalIndex !== null && editingGoalIndex >= 0 && editingGoalIndex < prev.length) {
        const next = [...prev]
        next[editingGoalIndex] = nextGoal
        return next
      }
      return [nextGoal, ...prev]
    })
    resetGoalModal()
  }

  const hardSkillsTotalPages = Math.max(1, Math.ceil(hardSkills.length / skillsPerPage))
  const softSkillsTotalPages = Math.max(1, Math.ceil(softSkills.length / skillsPerPage))
  const hardSkillsSlice = hardSkills.slice(
    hardSkillsPage * skillsPerPage,
    hardSkillsPage * skillsPerPage + skillsPerPage
  )
  const softSkillsSlice = softSkills.slice(
    softSkillsPage * skillsPerPage,
    softSkillsPage * skillsPerPage + skillsPerPage
  )
  const goalsTotalPages = Math.max(1, Math.ceil(goals.length / goalsPerPage))
  const goalsSlice = goals.slice(goalsPage * goalsPerPage, goalsPage * goalsPerPage + goalsPerPage)
  const hasAnySkills = hardSkills.length > 0 || softSkills.length > 0
  const { startDateRef, endDateRef, openDatePicker } = useDatePicker()

  usePaginationClamp(setGoalsPage, goalsTotalPages)
  usePaginationClamp(setHardSkillsPage, hardSkillsTotalPages)
  usePaginationClamp(setSoftSkillsPage, softSkillsTotalPages)

  useOutsideClose(() => {
    setDotMenuId(null)
    setYearOpen(false)
    setCompletedTypeOpen(false)
    setCompletedDateOpen(false)
    setRatingOpen(false)
    setReviewsTypeOpen(false)
    setReviewsDateOpen(false)
    setSkillTypeOpen(false)
    setSkillLevelOpen(false)
    setProgressOpen(false)
  })

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <HeaderBar bellOpen={bellOpen} onToggleBell={() => setBellOpen((prev) => !prev)} onCloseBell={() => setBellOpen(false)} />
        <div className="portfolio-surface">
          <ProfileCard
            avatarUrl={avatarUrl}
            aboutText={aboutText}
            techList={techList}
            hasAnyContacts={hasAnyContacts}
            normalizedGithubUrl={normalizedGithubUrl}
            normalizedTelegramUrl={normalizedTelegramUrl}
            normalizedEmailUrl={normalizedEmailUrl}
            onEdit={() => {
              setEditAvatarUrl(avatarUrl)
              setEditAboutText(aboutText)
              setEditTechList(techList)
              setEditGithubUrl(githubUrl)
              setEditTelegramUrl(telegramUrl)
              setEditEmailAddress(emailAddress)
              setEditTechInput('')
              setIsEditOpen(true)
            }}
            onShare={handleShare}
          />

          <CompletedProjectsSection
            hasInvites={hasInvites}
            yearOpen={yearOpen}
            setYearOpen={setYearOpen}
            yearValue={yearValue}
            setYearValue={setYearValue}
            completedTypeOpen={completedTypeOpen}
            setCompletedTypeOpen={setCompletedTypeOpen}
            completedTypeValue={completedTypeValue}
            setCompletedTypeValue={setCompletedTypeValue}
            completedDateOpen={completedDateOpen}
            setCompletedDateOpen={setCompletedDateOpen}
            completedDateValue={completedDateValue}
            setCompletedDateValue={setCompletedDateValue}
          />

          <section className="portfolio-skills">
            <SkillsSection
              hasAnySkills={hasAnySkills}
              hardSkillsSlice={hardSkillsSlice}
              softSkillsSlice={softSkillsSlice}
              hardSkillsPage={hardSkillsPage}
              hardSkillsTotalPages={hardSkillsTotalPages}
              softSkillsPage={softSkillsPage}
              softSkillsTotalPages={softSkillsTotalPages}
              skillsPerPage={skillsPerPage}
              dotMenuId={dotMenuId}
              onOpenAddSkill={() => {
                setNewSkillName('')
                setNewSkillTitle('')
                setSkillType('')
                setSkillLevel('')
                setSkillTypeOpen(false)
                setSkillLevelOpen(false)
                setProgressOpen(false)
                setProgress(0)
                setIsAddSkillOpen(true)
              }}
              onHardPrev={() => setHardSkillsPage((prev) => Math.max(0, prev - 1))}
              onHardNext={() =>
                setHardSkillsPage((prev) => Math.min(hardSkillsTotalPages - 1, prev + 1))
              }
              onSoftPrev={() => setSoftSkillsPage((prev) => Math.max(0, prev - 1))}
              onSoftNext={() =>
                setSoftSkillsPage((prev) => Math.min(softSkillsTotalPages - 1, prev + 1))
              }
              onToggleDotMenu={(menuId) =>
                setDotMenuId((prev) => (prev === menuId ? null : menuId))
              }
              onEditSkill={handleEditSkill}
              onDeleteSkill={handleDeleteSkill}
            />

            <GoalsSection
              goals={goals}
              goalsSlice={goalsSlice}
              goalsPage={goalsPage}
              goalsPerPage={goalsPerPage}
              goalsTotalPages={goalsTotalPages}
              dotMenuId={dotMenuId}
              onOpenAddGoal={() => setIsAddGoalOpen(true)}
              onToggleDotMenu={(menuId) =>
                setDotMenuId((prev) => (prev === menuId ? null : menuId))
              }
              onEditGoal={handleEditGoal}
              onDeleteGoal={handleDeleteGoal}
              onPrevPage={() => setGoalsPage((page) => Math.max(0, page - 1))}
              onNextPage={() =>
                setGoalsPage((page) => Math.min(goalsTotalPages - 1, page + 1))
              }
              shortenGoalDescription={shortenGoalDescription}
            />

            <ReviewsSection
              ratingOpen={ratingOpen}
              setRatingOpen={setRatingOpen}
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              reviewsTypeOpen={reviewsTypeOpen}
              setReviewsTypeOpen={setReviewsTypeOpen}
              reviewsTypeValue={reviewsTypeValue}
              setReviewsTypeValue={setReviewsTypeValue}
              reviewsDateOpen={reviewsDateOpen}
              setReviewsDateOpen={setReviewsDateOpen}
              reviewsDateValue={reviewsDateValue}
              setReviewsDateValue={setReviewsDateValue}
            />
          </section>

        </div>
      </main>

      {isEditOpen && (
        <EditProfileModal
          editAvatarUrl={editAvatarUrl}
          isAvatarDragOver={isAvatarDragOver}
          setIsAvatarDragOver={setIsAvatarDragOver}
          handleAvatarFiles={handleAvatarFiles}
          editAboutText={editAboutText}
          setEditAboutText={setEditAboutText}
          editTechInput={editTechInput}
          setEditTechInput={setEditTechInput}
          editTechList={editTechList}
          setEditTechList={setEditTechList}
          editGithubUrl={editGithubUrl}
          setEditGithubUrl={setEditGithubUrl}
          editTelegramUrl={editTelegramUrl}
          setEditTelegramUrl={setEditTelegramUrl}
          editEmailAddress={editEmailAddress}
          setEditEmailAddress={setEditEmailAddress}
          onClose={() => setIsEditOpen(false)}
          onSave={() => {
            setAvatarUrl(editAvatarUrl)
            setAboutText(editAboutText)
            setTechList(editTechList)
            setGithubUrl(editGithubUrl)
            setTelegramUrl(editTelegramUrl)
            setEmailAddress(editEmailAddress)
            setIsEditOpen(false)
          }}
        />
      )}

      {isAddSkillOpen && (
        <AddEditSkillModal
          skillTypeOpen={skillTypeOpen}
          setSkillTypeOpen={setSkillTypeOpen}
          skillType={skillType}
          setSkillType={setSkillType}
          newSkillTitle={newSkillTitle}
          setNewSkillTitle={setNewSkillTitle}
          skillLevelOpen={skillLevelOpen}
          setSkillLevelOpen={setSkillLevelOpen}
          skillLevel={skillLevel}
          setSkillLevel={setSkillLevel}
          progressOpen={progressOpen}
          setProgressOpen={setProgressOpen}
          progress={progress}
          setProgress={setProgress}
          onClose={resetSkillModal}
          onSave={handleAddSkill}
        />
      )}

      {isAddGoalOpen && (
        <AddEditGoalModal
          goalStatusOpen={goalStatusOpen}
          setGoalStatusOpen={setGoalStatusOpen}
          newGoalTitle={newGoalTitle}
          setNewGoalTitle={setNewGoalTitle}
          newGoalDescription={newGoalDescription}
          setNewGoalDescription={setNewGoalDescription}
          newGoalStatus={newGoalStatus}
          setNewGoalStatus={setNewGoalStatus}
          newGoalProgress={newGoalProgress}
          setNewGoalProgress={setNewGoalProgress}
          newGoalStart={newGoalStart}
          setNewGoalStart={setNewGoalStart}
          newGoalEnd={newGoalEnd}
          setNewGoalEnd={setNewGoalEnd}
          formatDate={formatDate}
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          openDatePicker={openDatePicker}
          onClose={resetGoalModal}
          onSave={handleAddGoal}
        />
      )}

      {shareOpen && (
        <div className="edit-modal">
          <button
            className="edit-modal__backdrop"
            type="button"
            aria-label="Закрыть"
            onClick={() => setShareOpen(false)}
          />
          <div className="edit-modal__panel portfolio-share-modal">
            <div className="edit-modal__head">
              <h3>Поделиться профилем</h3>
              <button
                className="edit-modal__close"
                type="button"
                aria-label="Закрыть"
                onClick={() => setShareOpen(false)}
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
            <p className="portfolio-share-text">
              {shareCopied ? 'Ссылка скопирована' : 'Скопируйте ссылку на профиль'}
            </p>
            <div className="portfolio-share-row">
              <input className="portfolio-share-input" value={shareUrl} readOnly />
              <button className="portfolio-share-copy" type="button" onClick={handleShareCopy}>
                Копировать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
