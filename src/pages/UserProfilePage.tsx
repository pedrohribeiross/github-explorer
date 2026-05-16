import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorMessage, LoadingSpinner, RepositoryList, SortSelector, UserCard } from '../components'
import { useSearchContext } from '../context'
import { useRepositories, useUser } from '../hooks'
import { sortRepositories } from '../utils'

export const UserProfilePage = () => {
  const { username = '' } = useParams<'username'>()
  const { sortOption, setSortOption, setUsername } = useSearchContext()

  useEffect(() => {
    setUsername(username)
  }, [username, setUsername])

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

      {user.loading && <LoadingSpinner />}
      {user.error && <ErrorMessage message="Não foi possível carregar o usuário" />}
      {user.data && <UserCard user={user.data} />}

      <div>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-3">
          <h3 className="h5 mb-0">Repositórios</h3>
          <SortSelector value={sortOption} onChange={setSortOption} />
        </div>

        {repositories.loading && <LoadingSpinner />}
        {repositories.error && <ErrorMessage message="Não foi possível carregar os repositórios" />}
        {repositories.data && <RepositoryList repositories={sortedRepositories} />}
      </div>
    </section>
  )
}
