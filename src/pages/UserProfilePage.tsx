import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AsyncSection, Breadcrumb, RepositoryList, SortSelector, UserCard } from '../components'
import { useSortContext } from '../context'
import { useRepositories, useUser } from '../hooks'
import { ROUTE_PATHS } from '../routes'
import { sortRepositories } from '../utils'

export const UserProfilePage = () => {
  const { username = '' } = useParams<'username'>()
  const { sortOption, setSortOption } = useSortContext()

  const user = useUser(username)
  const repositories = useRepositories(username)

  const sortedRepositories = useMemo(
    () => sortRepositories(repositories.data ?? [], sortOption),
    [repositories.data, sortOption],
  )

  return (
    <section aria-labelledby="user-profile-title" className="d-flex flex-column gap-4">
      <h2 id="user-profile-title" className="visually-hidden">
        Perfil de {username}
      </h2>

      <Breadcrumb items={[{ label: 'Busca', to: ROUTE_PATHS.search }, { label: `@${username}` }]} />

      <AsyncSection state={user} notFoundMessage="Usuário não encontrado">
        {(loadedUser) => <UserCard user={loadedUser} />}
      </AsyncSection>

      <div className="card app-surface app-shadow border rounded-4">
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3">
            <h3 className="h5 mb-0">Repositórios</h3>
            <SortSelector value={sortOption} onChange={setSortOption} />
          </div>

          <AsyncSection state={repositories} notFoundMessage="Usuário não encontrado">
            {() => <RepositoryList username={username} repositories={sortedRepositories} />}
          </AsyncSection>
        </div>
      </div>
    </section>
  )
}
