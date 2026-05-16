interface LoadingSpinnerProps {
  label?: string
}

export const LoadingSpinner = ({ label = 'Carregando…' }: LoadingSpinnerProps) => {
  return (
    <div className="d-flex justify-content-center py-5" role="status">
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  )
}
