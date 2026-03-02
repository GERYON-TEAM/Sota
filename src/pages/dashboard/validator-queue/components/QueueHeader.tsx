type QueueHeaderProps = {
  title: string
}

export default function QueueHeader({ title }: QueueHeaderProps) {
  return (
    <div className="validator-queue-column__head">
      <h2>{title}</h2>
    </div>
  )
}
