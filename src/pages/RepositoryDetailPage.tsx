import { Link, useParams } from 'react-router-dom'
import { AsyncSection } from '../components'
import { useRepository } from '../hooks'
import { buildUserProfilePath } from '../routes'

export const RepositoryDetailPage = () => {
  const { username = '', repoName = '' } = useParams<'username' | 'repoName'>()
  const repository = useRepository(username, repoName)

  return (
    <section aria-labelledby="repository-detail-title" className="d-flex flex-column gap-3">
      <Link to={buildUserProfilePath(username)} className="text-decoration-none">
        ← Voltar para o perfil
      </Link>

      <AsyncSection state={repository} notFoundMessage="Repositório não encontrado">
        {(loadedRepository) => (
          <article className="card">
            <div className="card-body d-flex flex-column gap-3">
              <h2 id="repository-detail-title" className="h4 mb-0">
                {loadedRepository.name}
              </h2>

              <p className="mb-0">{loadedRepository.description ?? 'Sem descrição'}</p>

              <div className="d-flex flex-wrap gap-3">
                <span aria-label={`${loadedRepository.stargazersCount} estrelas`}>
                  ★ {loadedRepository.stargazersCount}
                </span>
                {loadedRepository.language && (
                  <span className="badge text-bg-light align-self-center">
                    {loadedRepository.language}
                  </span>
                )}
              </div>

              <a
                href={loadedRepository.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary align-self-start"
              >
                Ver no GitHub
              </a>
            </div>
          </article>
        )}
      </AsyncSection>
    </section>
  )
}
