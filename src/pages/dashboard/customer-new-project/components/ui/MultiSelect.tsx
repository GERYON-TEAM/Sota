import Select from './Select'

type MultiSelectProps = {
  label: string
  value: string
  options: string[]
  open: boolean
  onToggle: () => void
  onSelect: (value: string) => void
}

export default function MultiSelect(props: MultiSelectProps) {
  return <Select {...props} />
}
