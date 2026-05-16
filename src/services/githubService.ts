import { githubClient } from '../api'
import type { Repository, User } from '../domain'
import { toRepository, toUser } from '../mappers'
import type { GitHubRepositoryResponse, GitHubUserResponse } from '../types'

export const getUser = async (username: string): Promise<User> => {
  const { data } = await githubClient.get<GitHubUserResponse>(`/users/${username}`)
  return toUser(data)
}

export const getUserRepositories = async (username: string): Promise<Repository[]> => {
  const { data } = await githubClient.get<GitHubRepositoryResponse[]>(`/users/${username}/repos`, {
    params: { per_page: 100 },
  })
  return data.map(toRepository)
}

export const getRepository = async (owner: string, repo: string): Promise<Repository> => {
  const { data } = await githubClient.get<GitHubRepositoryResponse>(`/repos/${owner}/${repo}`)
  return toRepository(data)
}
