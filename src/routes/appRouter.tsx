import { createBrowserRouter } from 'react-router-dom'
import {
  NotFoundPage,
  RepositoryDetailPage,
  RouteErrorPage,
  SearchPage,
  UserProfilePage,
} from '../pages'
import { RootLayout } from '../components'
import { ROUTE_PATHS } from './paths'

export const appRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { path: ROUTE_PATHS.search, element: <SearchPage /> },
          { path: ROUTE_PATHS.userProfile, element: <UserProfilePage /> },
          { path: ROUTE_PATHS.repositoryDetail, element: <RepositoryDetailPage /> },
          { path: ROUTE_PATHS.notFound, element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
