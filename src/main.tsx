import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { SearchProvider } from './context'
import { appRouter } from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <RouterProvider router={appRouter} />
    </SearchProvider>
  </StrictMode>,
)
