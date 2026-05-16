import { useParams } from 'react-router-dom'

export const RepositoryDetailPage = () => {
  const { username, repoName } = useParams<'username' | 'repoName'>()

  return (
    <section aria-labelledby="repository-detail-title">
      <h2 id="repository-detail-title" className="h4">
        {username} / {repoName}
      </h2>
    </section>
  )
}
