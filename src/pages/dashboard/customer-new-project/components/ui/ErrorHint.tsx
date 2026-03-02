type ErrorHintProps = {
  text: string
}

export default function ErrorHint({ text }: ErrorHintProps) {
  if (!text) return null
  return <p className="customer-new-project-upload__error">{text}</p>
}
