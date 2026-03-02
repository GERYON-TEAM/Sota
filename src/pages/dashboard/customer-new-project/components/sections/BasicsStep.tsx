import type { ChangeEvent, DragEvent, RefObject } from 'react'
import Field from '../ui/Field'
import TextareaField from '../ui/TextareaField'
import Select from '../ui/Select'
import FileDropzone from '../ui/FileDropzone'

type BasicsStepProps = {
  categoryOpen: boolean
  categoryValue: string
  categories: string[]
  projectName: string
  projectDescription: string
  files: File[]
  draftFileNames: string[]
  totalFilesCount: number
  isDragActive: boolean
  uploadError: string
  fileInputRef: RefObject<HTMLInputElement | null>
  setCategoryOpen: (next: boolean) => void
  setCategoryValue: (value: string) => void
  setProjectName: (value: string) => void
  setProjectDescription: (value: string) => void
  handleFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDrop: (event: DragEvent<HTMLButtonElement>) => void
  setIsDragActive: (active: boolean) => void
  openFilePreview: (file: File) => void
  removeFile: (file: File) => void
  removeDraftFile: (index: number) => void
}

export default function BasicsStep(props: BasicsStepProps) {
  const {
    categoryOpen,
    categoryValue,
    categories,
    projectName,
    projectDescription,
    files,
    draftFileNames,
    totalFilesCount,
    isDragActive,
    uploadError,
    fileInputRef,
    setCategoryOpen,
    setCategoryValue,
    setProjectName,
    setProjectDescription,
    handleFileInputChange,
    handleDrop,
    setIsDragActive,
    openFilePreview,
    removeFile,
    removeDraftFile,
  } = props

  return (
    <div className="customer-new-project-form">
      <Field
        id="project-name"
        label="Название проекта"
        value={projectName}
        onChange={setProjectName}
        placeholder="Укажите название проекта"
      />

      <TextareaField
        id="project-description"
        label="Описание задачи"
        value={projectDescription}
        onChange={setProjectDescription}
        placeholder="Опишите задачу, цели и ожидаемый результат"
      />

      <Select
        label="Категория"
        value={categoryValue}
        options={categories}
        open={categoryOpen}
        onToggle={() => setCategoryOpen(!categoryOpen)}
        onSelect={(value) => {
          setCategoryValue(value)
          setCategoryOpen(false)
        }}
      />

      <div className="customer-new-project-form__group">
        <span className="customer-new-project-form__label">Файлы</span>
        <FileDropzone
          files={files}
          draftFileNames={draftFileNames}
          totalFilesCount={totalFilesCount}
          isDragActive={isDragActive}
          uploadError={uploadError}
          fileInputRef={fileInputRef}
          onSelectFiles={handleFileInputChange}
          onDrop={handleDrop}
          onDragActiveChange={setIsDragActive}
          onOpenPreview={openFilePreview}
          onRemoveFile={removeFile}
          onRemoveDraftFile={removeDraftFile}
        />
      </div>
    </div>
  )
}
