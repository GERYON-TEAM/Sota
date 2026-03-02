import ProjectCard from '../cards/ProjectCard'

type DescriptionSectionProps = {
  text: string
}

export default function DescriptionSection({ text }: DescriptionSectionProps) {
  return (
    <ProjectCard title="Описание проекта">
      <p>{text}</p>
    </ProjectCard>
  )
}
