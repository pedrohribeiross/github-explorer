interface LoadingSpinnerProps {
  label?: string
}

export const LoadingSpinner = ({ label = 'Carregando…' }: LoadingSpinnerProps) => {
  return (
    <div className="d-flex justify-content-center w-100 py-5" role="status">
      <div
        className="spinner-border text-primary"
        style={{ width: '3rem', height: '3rem', borderWidth: '0.25rem' }}
        aria-hidden="true"
      />
      <span className="visually-hidden">{label}</span>
    </div>
  )
}
