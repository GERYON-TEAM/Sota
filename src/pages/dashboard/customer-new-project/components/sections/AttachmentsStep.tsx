type AttachmentsStepProps = {
  totalAmount: string
  selectedPaymentMethod: string
  paymentCardNumber: string
  paymentCardExpiry: string
  paymentCardCvc: string
  setSelectedPaymentMethod: (value: string) => void
  setPaymentCardNumber: (value: string) => void
  setPaymentCardExpiry: (value: string) => void
  setPaymentCardCvc: (value: string) => void
  formatCardNumber: (value: string) => string
  formatCardExpiry: (value: string) => string
  sanitizeDigits: (value: string) => string
}

function PaymentMethodIcon({ id }: { id: string }) {
  if (id === 'transfer') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 10H4L9.5 4M4 14H20L14.5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  if (id === 'card') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 12C4 8.229 4 6.343 5.172 5.172C6.344 4.001 8.229 4 12 4H16C19.771 4 21.657 4 22.828 5.172C23.999 6.344 24 8.229 24 12C24 15.771 23.999 17.657 22.828 18.828C21.656 19.999 19.771 20 16 20H12C8.229 20 6.343 19.999 5.172 18.828C4.001 17.656 4 15.771 4 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 16H8M16 16H14.5M4 10H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }

  if (id === 'crypto') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14.595 5.43237H12.947C12.694 5.43255 12.449 5.52063 12.255 5.6815C12.06 5.84238 11.927 6.06602 11.879 6.31407C11.831 6.56212 11.871 6.81913 11.992 7.04101C12.113 7.26288 12.307 7.4358 12.541 7.53011L14.215 8.19989C14.449 8.2942 14.644 8.46712 14.764 8.68899C14.885 8.91087 14.925 9.16788 14.877 9.41593C14.829 9.66398 14.697 9.88762 14.502 10.0485C14.307 10.2094 14.062 10.2974 13.81 10.2976H13.379M13.379 5.43237V4.82422" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.01 12.6907C14.91 12.5724 15.759 12.2047 16.462 11.629C17.164 11.0533 17.691 10.2926 17.983 9.43295C18.276 8.57332 18.322 7.64904 18.116 6.76462C17.911 5.88019 17.462 5.07092 16.82 4.4283C16.179 3.78569 15.37 3.33537 14.486 3.12827C13.602 2.92117 12.678 2.96555 11.818 3.25639C10.957 3.54723 10.196 4.07293 9.619 4.77405C9.042 5.47516 8.673 6.32372 8.553 7.22376M12.161 15.1639C12.161 13.5509 11.52 12.0041 10.38 10.8635C9.239 9.72302 7.693 9.08229 6.08 9.08229M1.214 11.5149C0.721 12.1789 0.369 12.9364 0.179 13.7411C-0.011 14.5459 -0.036 15.381 0.108 16.1954C0.251 17.0098 0.559 17.7864 1.013 18.4778C1.467 19.1691 2.057 19.7606 2.747 20.2161C3.437 20.6716 4.213 20.9816 5.027 21.1271C5.841 21.2725 6.677 21.2505 7.482 21.0622C8.287 20.8739 9.045 20.5234 9.711 20.0321C10.376 19.5408 10.934 18.9189 11.35 18.2046" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.69 15.1634C7.012 15.1634 7.322 15.0352 7.55 14.8071C7.778 14.579 7.906 14.2696 7.906 13.947C7.906 13.6245 7.778 13.3151 7.55 13.087C7.322 12.8589 7.012 12.7307 6.69 12.7307H4.865V17.596H6.69C7.012 17.596 7.322 17.4678 7.55 17.2397C7.778 17.0116 7.906 16.7023 7.906 16.3797C7.906 16.0571 7.778 15.7477 7.55 15.5196C7.322 15.2915 7.012 15.1634 6.69 15.1634ZM6.69 15.1634H4.865M6.082 12.7307V11.5144M6.082 17.596V18.8123M0 6.04102L1.824 9.0818L4.865 7.25733" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.033 3.12305C4.907 3.53333 3.947 4.3018 3.3 5.31047C2.653 6.31914 2.355 7.51228 2.451 8.70673M18.246 18.2053L16.421 15.1645L13.38 16.989M12.211 21.125C13.337 20.7148 14.297 19.9466 14.944 18.9383C15.59 17.9299 15.889 16.7372 15.793 15.543" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.25 8.25V6.375C8.25 5.87772 8.44754 5.40081 8.79917 5.04917C9.15081 4.69754 9.62772 4.5 10.125 4.5H19.875C20.3723 4.5 20.8492 4.69754 21.2008 5.04917C21.5525 5.40081 21.75 5.87772 21.75 6.375V17.625C21.75 18.1223 21.5525 18.5992 21.2008 18.9508C20.8492 19.3025 20.3723 19.5 19.875 19.5H10.125C9.62772 19.5 9.15081 19.3025 8.79917 18.9508C8.44754 18.5992 8.25 18.1223 8.25 17.625V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.75 15.75L16.5 12L12.75 8.25M2.25 12H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function AttachmentsStep(props: AttachmentsStepProps) {
  const {
    totalAmount,
    selectedPaymentMethod,
    paymentCardNumber,
    paymentCardExpiry,
    paymentCardCvc,
    setSelectedPaymentMethod,
    setPaymentCardNumber,
    setPaymentCardExpiry,
    setPaymentCardCvc,
    formatCardNumber,
    formatCardExpiry,
    sanitizeDigits,
  } = props

  const paymentMethods = [
    { id: 'transfer', title: 'Прямой перевод' },
    { id: 'card', title: 'Картой' },
    { id: 'crypto', title: 'Криптовалюта' },
    { id: 'platform', title: 'На платформе' },
  ]

  return (
    <div className="customer-new-project-form customer-new-project-payment">
      <div className="customer-new-project-payment-total">
        <span>Итого</span>
        <strong>{totalAmount}</strong>
      </div>

      <div className="customer-new-project-form__group">
        <span className="customer-new-project-form__label">Способ оплаты</span>
        <div className="customer-new-project-payment-methods">
          {paymentMethods.map((method) => {
            const selected = selectedPaymentMethod === method.id
            return (
              <button
                key={method.id}
                className={`customer-new-project-payment-method${selected ? ' is-active' : ''}`}
                type="button"
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <span className="customer-new-project-payment-method__icon">
                  <PaymentMethodIcon id={method.id} />
                </span>
                <span className="customer-new-project-payment-method__title">{method.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="customer-new-project-form__group">
        <label className="customer-new-project-form__label" htmlFor="payment-card-number">
          Номер карты
        </label>
        <input
          id="payment-card-number"
          className="customer-new-project-form__input"
          inputMode="numeric"
          value={paymentCardNumber}
          onChange={(event) => setPaymentCardNumber(formatCardNumber(event.target.value))}
          placeholder="0000 0000 0000 0000"
        />
      </div>

      <div className="customer-new-project-payment__row">
        <div className="customer-new-project-form__group">
          <label className="customer-new-project-form__label" htmlFor="payment-card-expiry">
            Срок действия
          </label>
          <input
            id="payment-card-expiry"
            className="customer-new-project-form__input"
            inputMode="numeric"
            value={paymentCardExpiry}
            onChange={(event) => setPaymentCardExpiry(formatCardExpiry(event.target.value))}
            placeholder="Укажите бюджет проекта"
            aria-label="Срок действия карты"
          />
        </div>
        <div className="customer-new-project-form__group">
          <label className="customer-new-project-form__label" htmlFor="payment-card-cvc">
            CVV
          </label>
          <input
            id="payment-card-cvc"
            className="customer-new-project-form__input"
            inputMode="numeric"
            value={paymentCardCvc}
            onChange={(event) => setPaymentCardCvc(sanitizeDigits(event.target.value).slice(0, 4))}
            placeholder="Укажите бюджет проекта"
            aria-label="CVV"
          />
        </div>
      </div>

      <p className="customer-new-project-payment__hint">При оплате вы должны убедиться, что средства на вашем счете зарезервированы</p>
    </div>
  )
}
