import { useState } from 'react'
import { apiClient } from '../../../../../shared/api/client'

type TwoFactorModalProps = {
  isOpen: boolean
  mode: 'enable' | 'disable'
  onClose: () => void
  onSuccess: () => void
}

type Enable2FAResponse = {
  qr_code_url: string
  secret: string
  backup_codes: string[]
}

export default function TwoFactorModal({ isOpen, mode, onClose, onSuccess }: TwoFactorModalProps) {
  const [step, setStep] = useState<'password' | 'qr' | 'done'>('password')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const reset = () => {
    setStep('password')
    setPassword('')
    setCode('')
    setQrCode('')
    setBackupCodes([])
    setError('')
    setLoading(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handlePasswordSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (mode === 'enable') {
        const result = await apiClient.post<Enable2FAResponse>('/auth/2fa/enable', { password })
        setQrCode(result.qr_code_url)
        setBackupCodes(result.backup_codes ?? [])
        setStep('qr')
      } else {
        await apiClient.post('/auth/2fa/disable', { password })
        onSuccess()
        handleClose()
      }
    } catch (err: unknown) {
      const apiErr = err as { detail?: string }
      setError(apiErr.detail ?? 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmCode = async () => {
    setError('')
    setLoading(true)
    try {
      await apiClient.post('/auth/2fa/confirm', { code })
      setStep('done')
    } catch (err: unknown) {
      const apiErr = err as { detail?: string }
      setError(apiErr.detail ?? 'Неверный код')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-modal__overlay" onClick={handleClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal__head">
          <h3>{mode === 'enable' ? 'Включить 2FA' : 'Отключить 2FA'}</h3>
          <button className="profile-modal__close" type="button" aria-label="Закрыть" onClick={handleClose}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M24.75 15L15 24.75M15 15L24.75 24.75" stroke="#696E82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="profile-modal__body">
          {step === 'password' && (
            <label className="profile-modal__field">
              <span className="profile-modal__label">Введите пароль</span>
              <input
                className="profile-modal__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </label>
          )}

          {step === 'qr' && (
            <>
              {qrCode && (
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#696E82' }}>
                    Отсканируйте QR-код в приложении-аутентификаторе
                  </p>
                  <img src={qrCode} alt="QR Code" style={{ width: '200px', height: '200px' }} />
                </div>
              )}
              <label className="profile-modal__field">
                <span className="profile-modal__label">Код из приложения</span>
                <input
                  className="profile-modal__input"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoFocus
                />
              </label>
            </>
          )}

          {step === 'done' && (
            <div>
              <p style={{ fontSize: '14px', color: '#0B1215', marginBottom: '12px' }}>
                2FA успешно включена!
              </p>
              {backupCodes.length > 0 && (
                <>
                  <p style={{ fontSize: '13px', color: '#696E82', marginBottom: '8px' }}>
                    Сохраните резервные коды в надёжном месте:
                  </p>
                  <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.8' }}>
                    {backupCodes.map((c, i) => (
                      <div key={i}>{c}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {error && <p style={{ color: '#e53935', fontSize: '14px', margin: '0 16px 8px' }}>{error}</p>}

        <div className="profile-modal__actions">
          {step !== 'done' && (
            <button className="profile-modal__btn profile-modal__btn--muted" type="button" onClick={handleClose}>
              Отмена
            </button>
          )}
          {step === 'password' && (
            <button className="profile-modal__btn profile-modal__btn--primary" type="button" onClick={handlePasswordSubmit} disabled={loading || !password}>
              {loading ? 'Подождите...' : 'Подтвердить'}
            </button>
          )}
          {step === 'qr' && (
            <button className="profile-modal__btn profile-modal__btn--primary" type="button" onClick={handleConfirmCode} disabled={loading || !code}>
              {loading ? 'Подождите...' : 'Подтвердить код'}
            </button>
          )}
          {step === 'done' && (
            <button className="profile-modal__btn profile-modal__btn--primary" type="button" onClick={() => { onSuccess(); handleClose() }}>
              Готово
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
