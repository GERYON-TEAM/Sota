import { useState } from 'react'

export const useModalState = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [gdfOpen, setGdfOpen] = useState(false)
  const [validationOpen, setValidationOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  return {
    modalOpen,
    setModalOpen,
    gdfOpen,
    setGdfOpen,
    validationOpen,
    setValidationOpen,
    historyOpen,
    setHistoryOpen,
  }
}
