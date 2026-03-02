type AvatarsStackProps = {
  className: string
  itemClassName: string
  count?: number
}

export default function AvatarsStack({ className, itemClassName, count = 4 }: AvatarsStackProps) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className={itemClassName} />
      ))}
    </div>
  )
}
