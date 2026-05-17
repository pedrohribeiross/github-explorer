import type { Repository } from '../domain'
import { formatCompactNumber } from '../utils'

interface RepositoryListItemProps {
  repository: Repository
}

export const RepositoryListItem = ({ repository }: RepositoryListItemProps) => {
  return (
    <div className="d-flex justify-content-between align-items-start gap-3">
      <div className="flex-grow-1 app-min-w-0">
        <h3 className="h6 fw-semibold text-primary mb-1 text-break">{repository.name}</h3>
        {repository.description && (
          <p className="small text-tertiary mb-2 text-break">{repository.description}</p>
        )}
        {repository.language && (
          <span className="d-inline-flex align-items-center gap-2 small text-tertiary">
            <span
              className="d-inline-block rounded-circle bg-primary flex-shrink-0"
              style={{ width: '0.75rem', height: '0.75rem' }}
              aria-hidden="true"
            />
            {repository.language}
          </span>
        )}
      </div>
      <span
        className="d-inline-flex align-items-center gap-1 text-nowrap flex-shrink-0 small"
        style={{ color: 'var(--app-stars)' }}
        aria-label={`${repository.stargazersCount} estrelas`}
      >
        <i className="bi bi-star-fill" aria-hidden="true" />
        {formatCompactNumber(repository.stargazersCount)}
      </span>
    </div>
  )
}
