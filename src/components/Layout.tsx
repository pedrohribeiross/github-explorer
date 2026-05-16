import { Link, Outlet } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'

export const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark text-white py-3">
        <div className="container">
          <Link to={ROUTE_PATHS.search} className="text-white text-decoration-none">
            <h1 className="h4 mb-0">GitHub Explorer</h1>
          </Link>
        </div>
      </header>

      <main className="flex-grow-1 py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-light border-top py-3">
        <div className="container">
          <small className="text-muted">GitHub Explorer</small>
        </div>
      </footer>
    </div>
  )
}
