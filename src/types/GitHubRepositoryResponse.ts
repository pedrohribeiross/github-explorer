export interface GitHubRepositoryResponse {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  language: string | null
  html_url: string
  updated_at: string
}
