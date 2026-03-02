import { useMemo } from 'react'
import type { NewProjectFormValues, ValidationErrors } from '../types/new-project.types'

export function useNewProjectValidation(form: NewProjectFormValues) {
  const errors = useMemo<ValidationErrors>(() => {
    const nextErrors: ValidationErrors = {}

    if (!form.projectName.trim()) nextErrors.projectName = 'Укажите название проекта'
    if (!form.projectDescription.trim()) nextErrors.projectDescription = 'Добавьте описание проекта'

    return nextErrors
  }, [form.projectDescription, form.projectName])

  const isValidStep = (step: number) => {
    if (step === 0) {
      return !errors.projectName && !errors.projectDescription
    }

    if (step === 3) {
      return form.validationAgreement
    }

    return true
  }

  const isValidAll = Object.keys(errors).length === 0

  return { errors, isValidStep, isValidAll }
}
