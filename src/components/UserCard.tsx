import type { User } from '../domain'
import { formatCompactNumber } from '../utils'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <article className="card app-surface app-shadow border rounded-4">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start gap-4">
          <img
            src={user.avatarUrl}
            alt={`Avatar de ${user.name ?? user.login}`}
            className="rounded-circle border border-4 border-primary flex-shrink-0 shadow"
            width={128}
            height={128}
          />
          <div className="flex-grow-1">
            <h2 className="h3 fw-bold mb-1">{user.name ?? user.login}</h2>
            <p className="text-tertiary mb-3">@{user.login}</p>
            {user.bio && <p className="text-secondary mb-3">{user.bio}</p>}
            {user.email && (
              <p className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 text-secondary mb-0">
                <i className="bi bi-envelope" aria-hidden="true" />
                <a href={`mailto:${user.email}`} className="text-decoration-none">
                  {user.email}
                </a>
              </p>
            )}
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row row-cols-2 row-cols-md-3 g-3 text-center text-md-start">
          <div className="col">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-people fs-4 text-primary" aria-hidden="true" />
              <div>
                <div className="fs-4 fw-bold lh-1" aria-label={`${user.followers} seguidores`}>
                  {formatCompactNumber(user.followers)}
                </div>
                <div className="small text-tertiary">Seguidores</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-person-plus fs-4 text-primary" aria-hidden="true" />
              <div>
                <div className="fs-4 fw-bold lh-1" aria-label={`${user.following} seguindo`}>
                  {formatCompactNumber(user.following)}
                </div>
                <div className="small text-tertiary">Seguindo</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-diagram-2 fs-4 text-primary" aria-hidden="true" />
              <div>
                <div className="fs-4 fw-bold lh-1" aria-label={`${user.publicRepos} repositórios`}>
                  {formatCompactNumber(user.publicRepos)}
                </div>
                <div className="small text-tertiary">Repositórios</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
