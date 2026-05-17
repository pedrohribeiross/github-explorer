import { useParams } from 'react-router-dom'
import { AsyncSection, Breadcrumb } from '../components'
import { useRepository } from '../hooks'
import { ROUTE_PATHS, buildUserProfilePath } from '../routes'

export const RepositoryDetailPage = () => {
  const { username = '', repoName = '' } = useParams<'username' | 'repoName'>()
  const repository = useRepository(username, repoName)

  return (
    <section aria-labelledby="repository-detail-title" className="d-flex flex-column gap-4">
      <Breadcrumb
        items={[
          { label: 'Busca', to: ROUTE_PATHS.search },
          { label: `@${username}`, to: buildUserProfilePath(username) },
          { label: repoName },
        ]}
      />

      <AsyncSection state={repository} notFoundMessage="Repositório não encontrado">
        {(loadedRepository) => (
          <article className="card app-surface app-shadow border rounded-4">
            <div className="card-body p-3 p-md-4 d-flex flex-column gap-4">
              <div>
                <h2 id="repository-detail-title" className="fs-3 fw-bold mb-1 text-break">
                  {loadedRepository.name}
                </h2>
                <p className="mb-0 text-tertiary">
                  <span className="text-primary">{username}</span>
                  <span> / </span>
                  <span>{loadedRepository.name}</span>
                </p>
              </div>

              <p className="text-secondary mb-0">
                {loadedRepository.description ?? 'Sem descrição'}
              </p>

              <div className="row row-cols-2 row-cols-md-4 g-3">
                <div className="col">
                  <div className="app-surface border rounded-3 p-3 h-100 d-flex align-items-center gap-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-3 p-2 flex-shrink-0"
                      style={{
                        color: 'var(--app-stars)',
                        backgroundColor: 'rgba(250, 204, 21, 0.1)',
                      }}
                      aria-hidden="true"
                    >
                      <i className="bi bi-star-fill fs-5" />
                    </span>
                    <div>
                      <div
                        className="fs-5 fw-bold lh-1"
                        aria-label={`${loadedRepository.stargazersCount} estrelas`}
                      >
                        {loadedRepository.stargazersCount}
                      </div>
                      <div className="small text-tertiary">Estrelas</div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="app-surface border rounded-3 p-3 h-100 d-flex align-items-center gap-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-3 p-2 flex-shrink-0"
                      style={{
                        color: 'var(--app-forks)',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      }}
                      aria-hidden="true"
                    >
                      <i className="bi bi-signpost-split fs-5" />
                    </span>
                    <div>
                      <div
                        className="fs-5 fw-bold lh-1"
                        aria-label={`${loadedRepository.forksCount} forks`}
                      >
                        {loadedRepository.forksCount}
                      </div>
                      <div className="small text-tertiary">Forks</div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="app-surface border rounded-3 p-3 h-100 d-flex align-items-center gap-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-3 p-2 flex-shrink-0"
                      style={{
                        color: 'var(--app-watchers)',
                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                      }}
                      aria-hidden="true"
                    >
                      <i className="bi bi-eye fs-5" />
                    </span>
                    <div>
                      <div
                        className="fs-5 fw-bold lh-1"
                        aria-label={`${loadedRepository.watchersCount} watchers`}
                      >
                        {loadedRepository.watchersCount}
                      </div>
                      <div className="small text-tertiary">Watchers</div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="app-surface border rounded-3 p-3 h-100 d-flex align-items-center gap-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-3 p-2 flex-shrink-0"
                      style={{
                        color: 'var(--app-issues)',
                        backgroundColor: 'rgba(248, 113, 113, 0.1)',
                      }}
                      aria-hidden="true"
                    >
                      <i className="bi bi-exclamation-circle fs-5" />
                    </span>
                    <div>
                      <div
                        className="fs-5 fw-bold lh-1"
                        aria-label={`${loadedRepository.openIssuesCount} issues`}
                      >
                        {loadedRepository.openIssuesCount}
                      </div>
                      <div className="small text-tertiary">Issues</div>
                    </div>
                  </div>
                </div>
              </div>

              {loadedRepository.language && (
                <div>
                  <p className="small fw-medium text-secondary mb-2">Linguagem Principal</p>
                  <span className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill app-surface border">
                    <span
                      className="d-inline-block rounded-circle bg-primary flex-shrink-0"
                      style={{ width: '0.75rem', height: '0.75rem' }}
                      aria-hidden="true"
                    />
                    <span className="text-primary">{loadedRepository.language}</span>
                  </span>
                </div>
              )}

              <hr className="my-0 border-secondary" />

              <a
                href={loadedRepository.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn app-btn-gradient app-shadow-accent w-100 app-w-sm-auto align-self-sm-start"
              >
                Ver no GitHub
                <i className="bi bi-box-arrow-up-right ms-2" aria-hidden="true" />
              </a>
            </div>
          </article>
        )}
      </AsyncSection>
    </section>
  )
}
