import type { ChangeEvent } from 'react'

type AvatarUploadProps = {
  avatarUrl: string | null
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function AvatarUpload({ avatarUrl, onChange }: AvatarUploadProps) {
  return (
    <label className="profile-page__avatar" aria-label="Загрузить фото">
      {avatarUrl && <img className="profile-page__avatar-img" src={avatarUrl} alt="" />}
      <input
        className="profile-page__avatar-input"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </label>
  )
}
