interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="alert alert-danger w-100 d-flex flex-column gap-3" role="alert">
    <div className="d-flex align-items-start gap-2">
      <i className="bi bi-exclamation-triangle-fill fs-5 flex-shrink-0" aria-hidden="true" />
      <p className="mb-0">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        className="btn btn-outline-danger w-100 app-w-sm-auto align-self-sm-start"
        onClick={onRetry}
      >
        <i className="bi bi-arrow-clockwise me-2" aria-hidden="true" />
        Tentar novamente
      </button>
    )}
  </div>
)
