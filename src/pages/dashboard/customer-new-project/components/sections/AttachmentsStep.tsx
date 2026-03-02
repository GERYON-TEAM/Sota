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
    { id: 'card', title: 'Банковская карта' },
    { id: 'deal', title: 'Безопасная сделка' },
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
                <span className={`customer-new-project-payment-method__icon${method.id === 'transfer' ? ' is-rotated' : ''}`}>↔</span>
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
        <input
          className="customer-new-project-form__input"
          inputMode="numeric"
          value={paymentCardExpiry}
          onChange={(event) => setPaymentCardExpiry(formatCardExpiry(event.target.value))}
          placeholder="00 / 00"
          aria-label="Срок действия карты"
        />
        <input
          className="customer-new-project-form__input"
          inputMode="numeric"
          value={paymentCardCvc}
          onChange={(event) => setPaymentCardCvc(sanitizeDigits(event.target.value).slice(0, 4))}
          placeholder="000"
          aria-label="CVC"
        />
      </div>

      <p className="customer-new-project-payment__hint">При оплате вы должны убедиться, что средства на вашем счете зарезервированы</p>
    </div>
  )
}
