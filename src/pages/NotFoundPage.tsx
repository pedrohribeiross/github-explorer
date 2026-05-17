import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'

export const NotFoundPage = () => {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3"
    >
      <p className="display-2 app-display-1-md fw-bold text-primary mb-3">404</p>
      <h2 id="not-found-title" className="h3 fw-bold mb-2">
        Página não encontrada
      </h2>
      <p className="text-secondary mb-4">A página que você procura não existe ou foi movida.</p>
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
