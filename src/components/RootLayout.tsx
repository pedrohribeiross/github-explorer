import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      <div className="container px-3 py-3 py-md-4 flex-grow-1 d-flex flex-column">
        <Outlet />
      </div>
    </main>
  )
}
