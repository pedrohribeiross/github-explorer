import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'

export const RouteErrorPage = () => {
  const error = useRouteError()

  const title = isRouteErrorResponse(error) ? `Erro ${error.status}` : 'Algo deu errado'

  return (
    <section className="text-center py-5" aria-labelledby="route-error-title">
      <h2 id="route-error-title" className="h4 mb-3">
        {title}
      </h2>
      <p className="text-muted mb-4">
        Ocorreu um erro inesperado ao carregar esta página. Tente novamente
      </p>
      <Link to={ROUTE_PATHS.search} className="btn btn-primary">
        Voltar para a busca
      </Link>
    </section>
  )
}
