import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'

export const NotFoundPage = () => {
  return (
    <section className="text-center py-5" aria-labelledby="not-found-title">
      <p className="display-1 fw-bold text-muted mb-2">404</p>
      <h2 id="not-found-title" className="h4 mb-3">
        Página não encontrada
      </h2>
      <p className="text-muted mb-4">A página que você procura não existe ou foi movida.</p>
      <Link to={ROUTE_PATHS.search} className="btn btn-primary">
        Voltar para a busca
      </Link>
    </section>
  )
}
