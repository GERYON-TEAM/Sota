import ProjectCard from '../cards/ProjectCard'

type ResultsSectionProps = {
  results: string[]
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  return (
    <ProjectCard title="Результаты">
      <ul className="portfolio-project__results">
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ProjectCard>
  )
}
