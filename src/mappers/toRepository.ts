import type { Repository } from '../domain'
import type { GitHubRepositoryResponse } from '../types'

export const toRepository = (data: GitHubRepositoryResponse): Repository => ({
  id: data.id,
  name: data.name,
  fullName: data.full_name,
  description: data.description,
  stargazersCount: data.stargazers_count,
  forksCount: data.forks_count,
  watchersCount: data.watchers_count,
  openIssuesCount: data.open_issues_count,
  language: data.language,
  htmlUrl: data.html_url,
  updatedAt: data.updated_at,
})
