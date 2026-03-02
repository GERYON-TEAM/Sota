import type { ChangeEvent } from 'react'

type UseAvatarUploadArgs = {
  setAvatarUrl: (value: string | null) => void
  setProfileDirty: (value: boolean) => void
}

export const useAvatarUpload = ({ setAvatarUrl, setProfileDirty }: UseAvatarUploadArgs) => {
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
    setProfileDirty(true)
  }

  return { handleAvatarChange }
}
