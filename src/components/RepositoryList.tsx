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
    return <p className="text-muted mb-0">Nenhum repositório encontrado</p>
  }

  return (
    <ul className="list-group">
      {repositories.map((repository) => (
        <li key={repository.id} className="list-group-item list-group-item-action p-0">
          <Link
            to={buildRepositoryDetailPath(username, repository.name)}
            className="d-block text-reset text-decoration-none p-3"
          >
            <RepositoryListItem repository={repository} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
