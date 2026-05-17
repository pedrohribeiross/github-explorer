import { Link, Outlet } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'

export const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="app-surface border-bottom py-2 py-md-3">
        <div className="container px-3">
          <Link to={ROUTE_PATHS.search} className="link-body-emphasis text-decoration-none">
            <h1 className="h4 mb-0 text-truncate">GitHub Explorer</h1>
          </Link>
        </div>
      </header>

      <main className="flex-grow-1 py-3 py-md-4">
        <div className="container px-3">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-surface border-top py-2 py-md-3">
        <div className="container px-3">
          <small className="text-secondary">GitHub Explorer</small>
        </div>
      </footer>
    </div>
  )
}
