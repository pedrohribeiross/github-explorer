import { Link } from 'react-router-dom'
import type { Repository } from '../domain'
import { buildRepositoryDetailPath } from '../routes'
import { RepositoryListItem } from './RepositoryListItem'

interface RepositoryListProps {
  username: string
  repositories: readonly Repository[]
}

export const RepositoryList = ({ username, repositories }: RepositoryListProps) => {
  if (repositories.length === 0) {
    return <p className="text-center text-tertiary py-5 mb-0">Nenhum repositório encontrado</p>
  }

  return (
    <ul className="list-unstyled d-flex flex-column gap-3 w-100 mb-0">
      {repositories.map((repository) => (
        <li key={repository.id}>
          <Link
            to={buildRepositoryDetailPath(username, repository.name)}
            className="app-repo-card d-block text-reset text-decoration-none app-surface border rounded-3 p-3"
          >
            <RepositoryListItem repository={repository} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
