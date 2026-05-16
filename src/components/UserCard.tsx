import type { User } from '../domain'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <article className="card">
      <div className="card-body">
        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-3">
          <img
            src={user.avatarUrl}
            alt={`Avatar de ${user.name ?? user.login}`}
            className="rounded-circle"
            width={96}
            height={96}
          />
          <div className="text-center text-sm-start">
            <h2 className="h5 mb-1">{user.name ?? user.login}</h2>
            <p className="text-muted mb-2">@{user.login}</p>
            {user.bio && <p className="mb-2">{user.bio}</p>}
            {user.email && (
              <p className="mb-2">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
            )}
            <div className="d-flex justify-content-center justify-content-sm-start gap-3">
              <span>
                <strong>{user.followers}</strong> seguidores
              </span>
              <span>
                <strong>{user.following}</strong> seguindo
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
