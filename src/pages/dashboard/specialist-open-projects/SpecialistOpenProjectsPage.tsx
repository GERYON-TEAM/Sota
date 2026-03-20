import { useMemo, useState } from 'react'
import Sidebar from '../specialist-dashboard/components/Sidebar'
import HeaderBar from '../specialist-dashboard/components/HeaderBar'
import '../specialist-dashboard/styles/index.css'
import './styles/index.css'
import OpenProjectsHeader from './components/OpenProjectsHeader'
import OpenProjectsGrid from './components/OpenProjectsGrid'
import OpenProjectsFilterModal from './components/modals/OpenProjectsFilterModal'
import { useOpenProjectsQuery } from './hooks/useOpenProjectsQuery'
import { useOpenProjectsSort } from './hooks/useOpenProjectsSort'
import { useOpenProjectsFilterModal } from './hooks/useOpenProjectsFilterModal'
import type {
  DateSort,
  LevelSort,
  MatchSort,
  OpenProject,
  SortMode,
} from './types/open-projects.types'

export default function SpecialistOpenProjectsPage() {
  const [bellOpen, setBellOpen] = useState(false)

  const projects = useMemo<OpenProject[]>(
    () => [
      {
        id: 'project-1',
        title: 'Платформа управления задачами',
        projectType: 'Веб-приложение',
        matchPercent: 98,
        matchLabel: 'Соответствие требованиям',
        subtitle: 'Ищут Middle Backend на React',
        timeline: '01.01.2025 - 01.01.2026',
        budget: 'Не публично',
        skills: ['Backend', 'Junior'],
        track: ['Node.js', 'PostgreSQL', 'Kubernetes'],
      },
      {
        id: 'project-2',
        title: 'Редизайн аналитического кабинета',
        projectType: 'Дизайн',
        matchPercent: 60,
        matchLabel: 'Соответствие требованиям',
        subtitle: 'Ищут Senior Frontend на React',
        timeline: '15.02.2026 - 15.05.2026',
        budget: 'Не публично',
        skills: ['Frontend', 'Senior'],
        track: ['React', 'TypeScript', 'D3.js'],
      },
      {
        id: 'project-3',
        title: 'Мобильное приложение для обучения',
        projectType: 'Мобильное приложение',
        matchPercent: 30,
        matchLabel: 'Соответствие требованиям',
        subtitle: 'Ищут Product Designer',
        timeline: '05.03.2026 - 30.04.2026',
        budget: 'Не публично',
        skills: ['Product', 'Middle'],
        track: ['Figma', 'Design System', 'iOS/Android'],
      },
    ],
    []
  )

  const categories = [
    'Бэкенд',
    'Фронтенд',
    'Фуллстек',
    'Мобильная разработка',
    'DevOps',
    'QA',
    'UI/UX дизайн',
    'Product Design',
    'Графический дизайн',
    'Data Science',
    'Data Engineering',
    'ML Engineering',
    'Аналитика',
    'Product Management',
    'Project Management',
    'DevRel',
    'Системный администратор',
    'Информационная безопасность',
    'AR/VR',
    'Blockchain',
    'GameDev',
    'Embedded',
    'SRE',
    'Базы данных',
    'Архитектура ПО',
  ]

  const { query, setQuery, suggestions, renderHighlightedText } = useOpenProjectsQuery(projects)
  const sort = useOpenProjectsSort()
  const filter = useOpenProjectsFilterModal()

  const getMatchClass = (value: number) => {
    if (value >= 80) return 'open-project-score--high'
    if (value >= 50) return 'open-project-score--mid'
    return 'open-project-score--low'
  }

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = projects.filter((project) => {
      const target = [
        project.title,
        project.subtitle,
        project.skills.join(' '),
        project.track.join(' '),
      ]
        .join(' ')
        .toLowerCase()

      const matchesQuery = normalizedQuery ? target.includes(normalizedQuery) : true

      const matchesCategory =
        filter.selectedCategories.length === 0
          ? true
          : filter.selectedCategories.some((category) => {
              const categoryMap: Record<string, string[]> = {
                'Бэкенд': ['backend', 'бэкенд', 'server', 'node', 'api'],
                'Фронтенд': ['frontend', 'фронтенд', 'react', 'vue', 'angular'],
                'Фуллстек': ['fullstack', 'фуллстек'],
                'Мобильная разработка': ['mobile', 'ios', 'android'],
                DevOps: ['devops', 'kubernetes', 'docker', 'ci/cd'],
                QA: ['qa', 'testing', 'тест'],
                'UI/UX дизайн': ['ui', 'ux', 'design'],
                'Product Design': ['product design'],
                'Графический дизайн': ['graphic', 'граф'],
                'Data Science': ['data science', 'ml', 'ds'],
                'Data Engineering': ['data engineering', 'data engineer'],
                'ML Engineering': ['ml', 'machine learning'],
                'Аналитика': ['аналит', 'analytics'],
                'Product Management': ['product manager', 'pm'],
                'Project Management': ['project manager', 'pmo'],
                DevRel: ['devrel', 'developer relations'],
                'Системный администратор': ['sysadmin', 'админ'],
                'Информационная безопасность': ['security', 'sec', 'инфобез'],
                'AR/VR': ['ar', 'vr'],
                Blockchain: ['blockchain', 'web3'],
                GameDev: ['game', 'unity', 'unreal'],
                Embedded: ['embedded', 'hardware'],
                SRE: ['sre', 'site reliability'],
                'Базы данных': ['database', 'db', 'postgres', 'mysql'],
                'Архитектура ПО': ['architect', 'архитект'],
              }

              const keywords = categoryMap[category] ?? [category.toLowerCase()]
              return keywords.some((keyword) => target.includes(keyword))
            })

      const budgetValue = filter.parseBudgetValue(project.budget)
      const matchesBudget = filter.isBudgetDefault
        ? true
        : budgetValue !== null &&
          budgetValue >= filter.budgetMinValue &&
          budgetValue <= filter.budgetMaxValue

      const matchesHighMatch = !filter.highMatchOnly || project.matchPercent >= 80

      return matchesQuery && matchesCategory && matchesBudget && matchesHighMatch
    })

    const parseDate = (value: string) => {
      const match = value.match(/(\d{2})\.(\d{2})\.(\d{4})/)
      if (!match) return null
      const [, day, month, year] = match
      return new Date(Number(year), Number(month) - 1, Number(day)).getTime()
    }

    const parseBudget = (value: string) => filter.parseBudgetValue(value)

    const getLevel = (project: OpenProject) => {
      const found = project.skills.find((skill) =>
        ['junior', 'middle', 'senior'].includes(skill.toLowerCase())
      )
      return (found?.toLowerCase() as 'junior' | 'middle' | 'senior' | undefined) ?? 'middle'
    }

    const sorted = [...filtered]

    if (sort.sortMode === 'match') {
      sorted.sort((a, b) =>
        sort.matchSort === 'high' ? b.matchPercent - a.matchPercent : a.matchPercent - b.matchPercent
      )
    }

    if (sort.sortMode === 'date') {
      sorted.sort((a, b) => {
        const aDate = parseDate(a.timeline) ?? 0
        const bDate = parseDate(b.timeline) ?? 0
        return sort.dateSort === 'old' ? aDate - bDate : bDate - aDate
      })
    }

    if (sort.sortMode === 'level') {
      const levelOrder: Array<'junior' | 'middle' | 'senior'> = ['junior', 'middle', 'senior']
      const levelRank = (level: 'junior' | 'middle' | 'senior') => {
        if (level === sort.levelSort) return 0
        const rest = levelOrder.filter((item) => item !== sort.levelSort)
        return rest.indexOf(level) + 1
      }
      sorted.sort((a, b) => levelRank(getLevel(a)) - levelRank(getLevel(b)))
    }

    if (sort.sortMode === 'budget') {
      sorted.sort((a, b) => {
        const aBudget = parseBudget(a.budget)
        const bBudget = parseBudget(b.budget)
        if (aBudget === null && bBudget === null) return 0
        if (aBudget === null) return 1
        if (bBudget === null) return -1
        return bBudget - aBudget
      })
    }

    return sorted
  }, [
    projects,
    query,
    sort.sortMode,
    sort.matchSort,
    sort.dateSort,
    sort.levelSort,
    filter.selectedCategories,
    filter.highMatchOnly,
    filter.budgetMinValue,
    filter.budgetMaxValue,
    filter.isBudgetDefault,
  ])

  const applySort = (mode: SortMode) => {
    sort.setSortMode(mode)
    sort.closeAllMenus()
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
              <span className="dashboard-title__page">Открытые проекты</span>
            </>
          }
          hasNotifications
          bellOpen={bellOpen}
          onBellToggle={() => setBellOpen((prev) => !prev)}
          onBellClose={() => setBellOpen(false)}
        />

        <div className="dashboard-surface">
          <OpenProjectsHeader
            total={projects.length}
            query={query}
            onQueryChange={setQuery}
            suggestions={suggestions}
            onSuggestionSelect={setQuery}
            renderHighlightedText={renderHighlightedText}
            sortOpen={sort.sortOpen}
            matchSortOpen={sort.matchSortOpen}
            dateSortOpen={sort.dateSortOpen}
            levelSortOpen={sort.levelSortOpen}
            matchSort={sort.matchSort}
            dateSort={sort.dateSort}
            levelSort={sort.levelSort}
            onSortEnter={sort.handleSortMouseEnter}
            onSortLeave={sort.handleSortMouseLeave}
            onSortToggle={() =>
              sort.setSortOpen((prev) => {
                const next = !prev
                if (!next) {
                  sort.setMatchSortOpen(false)
                  sort.setDateSortOpen(false)
                  sort.setLevelSortOpen(false)
                }
                return next
              })
            }
            onMatchEnter={sort.handleMatchMouseEnter}
            onMatchLeave={sort.handleMatchMouseLeave}
            onMatchToggle={() => sort.setMatchSortOpen((prev) => !prev)}
            onDateEnter={sort.handleDateMouseEnter}
            onDateLeave={sort.handleDateMouseLeave}
            onDateToggle={() => sort.setDateSortOpen((prev) => !prev)}
            onLevelEnter={sort.handleLevelMouseEnter}
            onLevelLeave={sort.handleLevelMouseLeave}
            onLevelToggle={() => sort.setLevelSortOpen((prev) => !prev)}
            onApplyMatchSort={(value: MatchSort) => {
              sort.setMatchSort(value)
              applySort('match')
            }}
            onApplyDateSort={(value: DateSort) => {
              sort.setDateSort(value)
              applySort('date')
            }}
            onApplyLevelSort={(value: LevelSort) => {
              sort.setLevelSort(value)
              applySort('level')
            }}
            onApplyBudgetSort={() => applySort('budget')}
            onFilterOpen={() => filter.setFilterOpen(true)}
          />

          <OpenProjectsGrid projects={filteredProjects} getMatchClass={getMatchClass} />
        </div>
      </main>

      <OpenProjectsFilterModal
        isOpen={filter.filterOpen}
        onClose={filter.closeFilterModal}
        categories={categories}
        categoryOpen={filter.categoryOpen}
        onCategoryToggle={() => filter.setCategoryOpen((prev) => !prev)}
        onCategoryClear={() => filter.setSelectedCategories([])}
        selectedCategories={filter.selectedCategories}
        onCategorySelect={filter.toggleCategory}
        budgetRange={filter.budgetRange}
        budgetMinValue={filter.budgetMinValue}
        budgetMaxValue={filter.budgetMaxValue}
        budgetMinPercent={filter.budgetMinPercent}
        budgetMaxPercent={filter.budgetMaxPercent}
        onMinChange={filter.handleMinChange}
        onMaxChange={filter.handleMaxChange}
        highMatchOnly={filter.highMatchOnly}
        onHighMatchToggle={() => filter.setHighMatchOnly((prev) => !prev)}
      />
    </div>
  )
}
