import type { ChangeEvent, DragEvent, RefObject } from 'react'
import ErrorHint from './ErrorHint'

type FileDropzoneProps = {
  files: File[]
  draftFileNames: string[]
  totalFilesCount: number
  isDragActive: boolean
  uploadError: string
  fileInputRef: RefObject<HTMLInputElement | null>
  onSelectFiles: (event: ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: DragEvent<HTMLButtonElement>) => void
  onDragActiveChange: (active: boolean) => void
  onOpenPreview: (file: File) => void
  onRemoveFile: (file: File) => void
  onRemoveDraftFile: (index: number) => void
}

export default function FileDropzone({
  files,
  draftFileNames,
  totalFilesCount,
  isDragActive,
  uploadError,
  fileInputRef,
  onSelectFiles,
  onDrop,
  onDragActiveChange,
  onOpenPreview,
  onRemoveFile,
  onRemoveDraftFile,
}: FileDropzoneProps) {
  return (
    <>
      <div className="customer-new-project-files">
        {files.map((file) => (
          <div
            className="customer-new-project-file"
            key={`${file.name}-${file.lastModified}-${file.size}`}
            role="button"
            tabIndex={0}
            onClick={() => onOpenPreview(file)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return
              event.preventDefault()
              onOpenPreview(file)
            }}
          >
            <button
              className="customer-new-project-file__remove"
              type="button"
              aria-label={`Удалить ${file.name}`}
              onClick={(event) => {
                event.stopPropagation()
                onRemoveFile(file)
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16.875 7.125L7.125 16.875M7.125 7.125L16.875 16.875" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="customer-new-project-file__icon" aria-hidden="true">📄</span>
            <span className="customer-new-project-file__name" title={file.name}>{file.name}</span>
          </div>
        ))}

        {draftFileNames.map((fileName, index) => (
          <div className="customer-new-project-file is-draft" key={`draft-${fileName}-${index}`}>
            <button
              className="customer-new-project-file__remove"
              type="button"
              aria-label={`Удалить ${fileName}`}
              onClick={() => onRemoveDraftFile(index)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16.875 7.125L7.125 16.875M7.125 7.125L16.875 16.875" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="customer-new-project-file__icon" aria-hidden="true">📄</span>
            <span className="customer-new-project-file__name" title={fileName}>{fileName}</span>
          </div>
        ))}

        {totalFilesCount < 5 && (
          <button
            className={`customer-new-project-upload${totalFilesCount > 0 ? ' is-compact' : ''}${isDragActive ? ' is-drag' : ''}`}
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault()
              event.dataTransfer.dropEffect = 'copy'
              onDragActiveChange(true)
            }}
            onDragLeave={(event) => {
              const relatedTarget = event.relatedTarget as Node | null
              if (relatedTarget && event.currentTarget.contains(relatedTarget)) return
              onDragActiveChange(false)
            }}
            onDrop={onDrop}
          >
            <span>Выберите или перетащите файл до 100 МБ</span>
          </button>
        )}
      </div>

      <input ref={fileInputRef} className="customer-new-project-upload__input" type="file" multiple onChange={onSelectFiles} />
      <p className="customer-new-project-upload__hint">Вы можете прикрепить до 5 файлов: текущие дизайны, макеты, скриншоты и т. д.</p>
      <ErrorHint text={uploadError} />
    </>
  )
}
