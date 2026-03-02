import type { ProjectRequirementBlock } from '../types/project.types'

export default function CustomerProjectRequirements() {
  const blocks: ProjectRequirementBlock[] = [
    {
      title: 'Условия работы',
      description:
        'Описание рабочих часов, как они учитываются, как ведется учет и тому подобное.',
    },
    {
      title: 'Что нужно делать',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.\n\nNullam dictum felis eu pede mollis pretium. Integer tincidunt.',
    },
    {
      title: 'Желаемые характеристики',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    },
  ]

  return (
    <article className="project-requirements">
      <div className="project-requirements__head">
        <h3>Описание требований</h3>
        <span className="project-requirements__pill">Удаленка</span>
      </div>

      {blocks.map((block) => {
        const parts = block.description.split('\n\n')
        return (
          <div className="project-requirements__block" key={block.title}>
            <h4>{block.title}</h4>
            <p>
              {parts.map((paragraph, index) => (
                <span key={paragraph}>
                  {paragraph}
                  {index < parts.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </span>
              ))}
            </p>
          </div>
        )
      })}
    </article>
  )
}
