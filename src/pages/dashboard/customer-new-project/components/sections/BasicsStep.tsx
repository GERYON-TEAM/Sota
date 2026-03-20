import type { ChangeEvent, DragEvent, RefObject } from 'react'
import Field from '../ui/Field'
import TextareaField from '../ui/TextareaField'
import Select from '../ui/Select'
import FileDropzone from '../ui/FileDropzone'

type BasicsStepProps = {
  projectTypeOpen: boolean
  projectSizeOpen: boolean
  projectTypeValue: string
  projectTypes: string[]
  projectSizeValue: string
  projectSizes: string[]
  projectFeatureValues: string[]
  projectFeatures: string[]
  projectName: string
  projectDescription: string
  projectNotes: string
  files: File[]
  draftFileNames: string[]
  totalFilesCount: number
  isDragActive: boolean
  uploadError: string
  fileInputRef: RefObject<HTMLInputElement | null>
  setProjectTypeOpen: (next: boolean) => void
  setProjectSizeOpen: (next: boolean) => void
  setProjectTypeValue: (value: string) => void
  setProjectSizeValue: (value: string) => void
  setProjectFeatureValues: (value: string[]) => void
  setProjectName: (value: string) => void
  setProjectDescription: (value: string) => void
  setProjectNotes: (value: string) => void
  handleFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDrop: (event: DragEvent<HTMLButtonElement>) => void
  setIsDragActive: (active: boolean) => void
  openFilePreview: (file: File) => void
  removeFile: (file: File) => void
  removeDraftFile: (index: number) => void
}

export default function BasicsStep(props: BasicsStepProps) {
  const {
    projectTypeOpen,
    projectSizeOpen,
    projectTypeValue,
    projectTypes,
    projectSizeValue,
    projectSizes,
    projectFeatureValues,
    projectFeatures,
    projectName,
    projectDescription,
    projectNotes,
    files,
    draftFileNames,
    totalFilesCount,
    isDragActive,
    uploadError,
    fileInputRef,
    setProjectTypeOpen,
    setProjectSizeOpen,
    setProjectTypeValue,
    setProjectSizeValue,
    setProjectFeatureValues,
    setProjectName,
    setProjectDescription,
    setProjectNotes,
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
        label="Тип проекта"
        value={projectTypeValue}
        options={projectTypes}
        placeholder="Выберите тип проекта"
        open={projectTypeOpen}
        onToggle={() => {
          setProjectTypeOpen(!projectTypeOpen)
          setProjectSizeOpen(false)
        }}
        onSelect={(value) => {
          setProjectTypeValue(value)
          setProjectTypeOpen(false)
        }}
      />

      <Select
        label="Оценочный размер проекта"
        value={projectSizeValue}
        options={projectSizes}
        placeholder="Выберите размер проекта"
        open={projectSizeOpen}
        onToggle={() => {
          setProjectSizeOpen(!projectSizeOpen)
          setProjectTypeOpen(false)
        }}
        onSelect={(value) => {
          setProjectSizeValue(value)
          setProjectSizeOpen(false)
        }}
      />

      <div className="customer-new-project-form__group">
        <span className="customer-new-project-form__label">
          Особенности и приоритеты проекта
        </span>
        <div className="customer-new-project-form__checks customer-new-project-form__checks--plain">
          {projectFeatures.map((item) => {
            const selected = projectFeatureValues.includes(item)
            return (
              <button
                key={item}
                type="button"
                className={`customer-new-project-form__check customer-new-project-form__check--plain${selected ? ' is-selected' : ''}`}
                onClick={() =>
                  setProjectFeatureValues(
                    selected
                      ? projectFeatureValues.filter((value) => value !== item)
                      : [...projectFeatureValues, item],
                  )
                }
              >
                <span className="customer-new-project-form__check-icon" aria-hidden="true">
                  {selected ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#feature-checked-basics)">
                        <path d="M12 24C13.5761 24.0019 15.1371 23.6924 16.5933 23.0892C18.0495 22.4861 19.3721 21.6011 20.4852 20.4852C21.6011 19.3721 22.4861 18.0495 23.0892 16.5933C23.6924 15.1371 24.0019 13.5761 24 12C24.0019 10.4239 23.6924 8.86286 23.0892 7.4067C22.4861 5.95054 21.6011 4.62791 20.4852 3.51481C19.3721 2.3989 18.0495 1.51394 16.5933 0.910758C15.1371 0.307576 13.5761 -0.0019345 12 9.09715e-06C10.4239 -0.0019345 8.86286 0.307576 7.4067 0.910758C5.95054 1.51394 4.62791 2.3989 3.51481 3.51481C2.3989 4.62791 1.51394 5.95054 0.910758 7.4067C0.307576 8.86286 -0.0019345 10.4239 9.09715e-06 12C-0.0019345 13.5761 0.307576 15.1371 0.910758 16.5933C1.51394 18.0495 2.3989 19.3721 3.51481 20.4852C4.62791 21.6011 5.95054 22.4861 7.4067 23.0892C8.86286 23.6924 10.4239 24.0019 12 24Z" fill="#5260FF"/>
                        <path d="M8 12L11 15L17 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="feature-checked-basics">
                          <rect width="24" height="24" rx="12" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11.25" stroke="#C7CCE0" strokeWidth="1.5" />
                    </svg>
                  )}
                </span>
                <span>{item}</span>
              </button>
            )
          })}
        </div>
      </div>

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

      <div className="customer-new-project-form__group">
        <div className="customer-new-project-form__label-row">
          <label className="customer-new-project-form__label" htmlFor="project-notes">
            Пожелания и уточнения
          </label>
          <span className="customer-new-project-form__counter">{projectNotes.length}/1000</span>
        </div>
        <TextareaField
          id="project-notes"
          label=""
          value={projectNotes}
          onChange={(value) => setProjectNotes(value.slice(0, 1000))}
          placeholder="Укажите стек, навыки и другие важные уточнения"
          maxLength={1000}
        />
      </div>
    </div>
  )
}
