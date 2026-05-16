export interface GitHubRepositoryResponse {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
  updated_at: string
}
