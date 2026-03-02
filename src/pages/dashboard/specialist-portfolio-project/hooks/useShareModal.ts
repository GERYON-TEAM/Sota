import { useMemo, useState } from 'react'

export const useShareModal = () => {
  const [shareOpen, setShareOpen] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [])

  const copyToClipboard = async () => {
    try {
      if (navigator?.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl)
        setShareCopied(true)
        return
      }
    } catch {
      // ignore
    }
    setShareCopied(false)
  }

  const openShare = async () => {
    setShareOpen(true)
    await copyToClipboard()
  }

  const closeShare = () => {
    setShareOpen(false)
  }

  return {
    shareOpen,
    shareCopied,
    shareUrl,
    openShare,
    closeShare,
    copyToClipboard,
  }
}
