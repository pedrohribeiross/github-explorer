import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'

export const RouteErrorPage = () => {
  const error = useRouteError()

  const title = isRouteErrorResponse(error) ? `Erro ${error.status}` : 'Algo deu errado'

  return (
    <section
      aria-labelledby="route-error-title"
      className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3"
    >
      <p className="display-2 app-display-1-md fw-bold text-primary mb-3">
        <i className="bi bi-exclamation-triangle" aria-hidden="true" />
      </p>
      <h2 id="route-error-title" className="h3 fw-bold mb-2">
        {title}
      </h2>
      <p className="text-secondary mb-4">
        Ocorreu um erro inesperado ao carregar esta página. Tente novamente
      </p>
      <Link
        to={ROUTE_PATHS.search}
        className="btn app-btn-gradient app-shadow-accent w-100 app-w-sm-auto"
      >
        <i className="bi bi-house me-2" aria-hidden="true" />
        Voltar para a busca
      </Link>
    </section>
  )
}
