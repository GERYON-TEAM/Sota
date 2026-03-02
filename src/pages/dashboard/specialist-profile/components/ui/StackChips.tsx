type StackChipsProps = {
  items: string[]
}

export default function StackChips({ items }: StackChipsProps) {
  return (
    <div className="profile-page__stack-list">
      {items.map((item) => (
        <div key={item} className="profile-page__stack-chip">
          {item}
        </div>
      ))}
    </div>
  )
}
