import type { Repository } from '../domain'
import { RepositoryListItem } from './RepositoryListItem'

interface RepositoryListProps {
  repositories: readonly Repository[]
}

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  if (repositories.length === 0) {
    return <p className="text-muted mb-0">Nenhum repositório encontrado</p>
  }

  return (
    <ul className="list-group">
      {repositories.map((repository) => (
        <li key={repository.id} className="list-group-item">
          <RepositoryListItem repository={repository} />
        </li>
      ))}
    </ul>
  )
}
