import { useMemo, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { MAX_FILE_SIZE_BYTES, MAX_FILES_COUNT } from '../types/new-project.types'

const getFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`

export function useFileUploads(initialDraftFileNames: string[] = []) {
  const [files, setFiles] = useState<File[]>([])
  const [draftFileNames, setDraftFileNames] = useState<string[]>(initialDraftFileNames)
  const [uploadError, setUploadError] = useState('')
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const totalFilesCount = files.length + draftFileNames.length

  const addFiles = (incomingFiles: File[]) => {
    if (totalFilesCount >= MAX_FILES_COUNT) {
      setUploadError(`Можно прикрепить не более ${MAX_FILES_COUNT} файлов.`)
      return
    }

    const existingFileIds = new Set(files.map(getFileId))
    const availableSlots = Math.max(0, MAX_FILES_COUNT - totalFilesCount)
    const validFiles: File[] = []
    let oversizedCount = 0

    incomingFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        oversizedCount += 1
        return
      }

      const fileId = getFileId(file)
      if (existingFileIds.has(fileId)) return
      existingFileIds.add(fileId)
      validFiles.push(file)
    })

    const filesToAdd = validFiles.slice(0, availableSlots)
    if (filesToAdd.length > 0) {
      setFiles((prev) => [...prev, ...filesToAdd])
      setDraftFileNames((prev) => prev.filter((name) => !filesToAdd.some((file) => file.name === name)))
    }

    if (oversizedCount > 0) {
      setUploadError('Файлы больше 100 МБ не были добавлены.')
      return
    }

    if (validFiles.length > availableSlots) {
      setUploadError(`Можно прикрепить не более ${MAX_FILES_COUNT} файлов.`)
      return
    }

    setUploadError('')
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return
    addFiles(Array.from(selectedFiles))
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDragActive(false)
    addFiles(Array.from(event.dataTransfer.files))
  }

  const removeFile = (fileToRemove: File) => {
    const fileId = getFileId(fileToRemove)
    setFiles((prev) => prev.filter((file) => getFileId(file) !== fileId))
    setUploadError('')
  }

  const removeDraftFile = (indexToRemove: number) => {
    setDraftFileNames((prev) => prev.filter((_, index) => index !== indexToRemove))
    setUploadError('')
  }

  const openFilePreview = (file: File) => {
    const fileUrl = URL.createObjectURL(file)
    const previewWindow = window.open(fileUrl, '_blank', 'noopener,noreferrer')
    if (!previewWindow) window.location.href = fileUrl
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 120000)
  }

  const serializeFileNames = useMemo(
    () => [...draftFileNames, ...files.map((file) => file.name)].slice(0, MAX_FILES_COUNT),
    [draftFileNames, files],
  )

  return {
    files,
    draftFileNames,
    setDraftFileNames,
    uploadError,
    isDragActive,
    setIsDragActive,
    fileInputRef,
    totalFilesCount,
    addFiles,
    handleFileInputChange,
    handleDrop,
    removeFile,
    removeDraftFile,
    openFilePreview,
    serializeFileNames,
  }
}
