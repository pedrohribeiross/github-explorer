export interface Repository {
  id: number
  name: string
  fullName: string
  description: string | null
  stargazersCount: number
  language: string | null
  htmlUrl: string
  updatedAt: string
}
