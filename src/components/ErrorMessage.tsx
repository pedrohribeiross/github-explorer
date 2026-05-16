interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="alert alert-danger" role="alert">
      <p className={onRetry ? 'mb-2' : 'mb-0'}>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
