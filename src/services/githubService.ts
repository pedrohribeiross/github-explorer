import { githubClient } from '../api'
import type { Repository, User } from '../domain'
import { toRepository, toUser } from '../mappers'
import type { GitHubRepositoryResponse, GitHubUserResponse } from '../types'

export const getUser = async (username: string, signal?: AbortSignal): Promise<User> => {
  const { data } = await githubClient.get<GitHubUserResponse>(`/users/${username}`, { signal })
  return toUser(data)
}

export const getUserRepositories = async (
  username: string,
  signal?: AbortSignal,
): Promise<Repository[]> => {
  const { data } = await githubClient.get<GitHubRepositoryResponse[]>(`/users/${username}/repos`, {
    params: { per_page: 100 },
    signal,
  })
  return data.map(toRepository)
}

export const getRepository = async (
  fullName: string,
  signal?: AbortSignal,
): Promise<Repository> => {
  const { data } = await githubClient.get<GitHubRepositoryResponse>(`/repos/${fullName}`, {
    signal,
  })
  return toRepository(data)
}
