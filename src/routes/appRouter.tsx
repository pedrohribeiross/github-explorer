import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage, RepositoryDetailPage, SearchPage, UserProfilePage } from '../pages'
import App from '../App'
import { ROUTE_PATHS } from './paths'

export const appRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: ROUTE_PATHS.search, element: <SearchPage /> },
      { path: ROUTE_PATHS.userProfile, element: <UserProfilePage /> },
      { path: ROUTE_PATHS.repositoryDetail, element: <RepositoryDetailPage /> },
      { path: ROUTE_PATHS.notFound, element: <NotFoundPage /> },
    ],
  },
])
