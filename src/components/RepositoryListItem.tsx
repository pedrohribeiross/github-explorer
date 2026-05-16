import type { Repository } from '../domain'

interface RepositoryListItemProps {
  repository: Repository
}

export const RepositoryListItem = ({ repository }: RepositoryListItemProps) => {
  return (
    <div className="d-flex justify-content-between align-items-start gap-3">
      <div>
        <h3 className="h6 mb-1">{repository.name}</h3>
        {repository.description && (
          <p className="text-muted small mb-1">{repository.description}</p>
        )}
        {repository.language && <span className="badge text-bg-light">{repository.language}</span>}
      </div>
      <span className="text-nowrap" aria-label={`${repository.stargazersCount} estrelas`}>
        ★ {repository.stargazersCount}
      </span>
    </div>
  )
}
