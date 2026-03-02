import { useMemo, useState } from 'react'

export function useNewProjectSteps(stepCount: number, isValidStep: (step: number) => boolean) {
  const [step, setStep] = useState(0)

  const canNext = isValidStep(step)

  const next = () => {
    if (!canNext) return
    setStep((prev) => Math.min(stepCount - 1, prev + 1))
  }

  const back = () => {
    setStep((prev) => Math.max(0, prev - 1))
  }

  const goTo = (index: number) => {
    const normalized = Math.max(0, Math.min(stepCount - 1, index))
    setStep(normalized)
  }

  return useMemo(
    () => ({ step, setStep, canNext, next, back, goTo }),
    [step, canNext],
  )
}
