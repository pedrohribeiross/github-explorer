type ErrorMessageVariant = 'error' | 'offline'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  variant?: ErrorMessageVariant
}

const VARIANT_CONFIG: Record<
  ErrorMessageVariant,
  { alertClass: string; icon: string; buttonClass: string }
> = {
  error: {
    alertClass: 'alert-danger',
    icon: 'bi-exclamation-triangle-fill',
    buttonClass: 'btn-outline-danger',
  },
  offline: {
    alertClass: 'alert-warning',
    icon: 'bi-wifi-off',
    buttonClass: 'btn-outline-warning',
  },
}

export const ErrorMessage = ({ message, onRetry, variant = 'error' }: ErrorMessageProps) => {
  const { alertClass, icon, buttonClass } = VARIANT_CONFIG[variant]

  return (
    <div className={`alert ${alertClass} w-100 d-flex flex-column gap-3`} role="alert">
      <div className="d-flex align-items-start gap-2">
        <i className={`bi ${icon} fs-5 flex-shrink-0`} aria-hidden="true" />
        <p className="mb-0">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          className={`btn ${buttonClass} w-100 app-w-sm-auto align-self-sm-start`}
          onClick={onRetry}
        >
          <i className="bi bi-arrow-clockwise me-2" aria-hidden="true" />
          Tentar novamente
        </button>
      )}
    </div>
  )
}
