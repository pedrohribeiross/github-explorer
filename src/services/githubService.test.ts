import { githubClient } from '../api'
import type { GitHubRepositoryResponse, GitHubUserResponse } from '../types'
import { getRepository, getUser, getUserRepositories } from './githubService'

jest.mock('../api', () => ({
  githubClient: { get: jest.fn() },
}))

const mockedGet = githubClient.get as jest.Mock

const userResponse: GitHubUserResponse = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/1',
  bio: 'Mascot',
  email: 'octocat@github.com',
  followers: 100,
  following: 10,
  public_repos: 8,
}

const repositoryResponse: GitHubRepositoryResponse = {
  id: 42,
  name: 'hello-world',
  full_name: 'octocat/hello-world',
  description: 'My first repo',
  stargazers_count: 1500,
  forks_count: 200,
  watchers_count: 1500,
  open_issues_count: 12,
  language: 'TypeScript',
  html_url: 'https://github.com/octocat/hello-world',
  updated_at: '2024-06-01T00:00:00Z',
}

describe('githubService', () => {
  describe('getUser', () => {
    it('requests the user endpoint with the given username', async () => {
      mockedGet.mockResolvedValue({ data: userResponse })

      await getUser('octocat')

      expect(mockedGet).toHaveBeenCalledWith('/users/octocat', { signal: undefined })
    })

    it('maps the API response to the domain User shape', async () => {
      mockedGet.mockResolvedValue({ data: userResponse })

      const result = await getUser('octocat')

      expect(result).toEqual({
        login: 'octocat',
        name: 'The Octocat',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1',
        bio: 'Mascot',
        email: 'octocat@github.com',
        followers: 100,
        following: 10,
        publicRepos: 8,
      })
    })

    it('propagates errors from the client', async () => {
      const error = new Error('not found')
      mockedGet.mockRejectedValue(error)

      await expect(getUser('ghost')).rejects.toThrow('not found')
    })
  })

  describe('getUserRepositories', () => {
    it('requests the repos endpoint with per_page 100', async () => {
      mockedGet.mockResolvedValue({ data: [repositoryResponse] })

      await getUserRepositories('octocat')

      expect(mockedGet).toHaveBeenCalledWith('/users/octocat/repos', {
        params: { per_page: 100 },
        signal: undefined,
      })
    })

    it('maps each API repository to the domain Repository shape', async () => {
      mockedGet.mockResolvedValue({ data: [repositoryResponse] })

      const result = await getUserRepositories('octocat')

      expect(result).toEqual([
        {
          id: 42,
          name: 'hello-world',
          fullName: 'octocat/hello-world',
          description: 'My first repo',
          stargazersCount: 1500,
          forksCount: 200,
          watchersCount: 1500,
          openIssuesCount: 12,
          language: 'TypeScript',
          htmlUrl: 'https://github.com/octocat/hello-world',
          updatedAt: '2024-06-01T00:00:00Z',
        },
      ])
    })

    it('returns an empty array when the user has no repositories', async () => {
      mockedGet.mockResolvedValue({ data: [] })

      const result = await getUserRepositories('octocat')

      expect(result).toEqual([])
    })
  })

  describe('getRepository', () => {
    it('requests the repository endpoint with owner and repo', async () => {
      mockedGet.mockResolvedValue({ data: repositoryResponse })

      await getRepository('octocat', 'hello-world')

      expect(mockedGet).toHaveBeenCalledWith('/repos/octocat/hello-world', { signal: undefined })
    })

    it('maps the API response to the domain Repository shape', async () => {
      mockedGet.mockResolvedValue({ data: repositoryResponse })

      const result = await getRepository('octocat', 'hello-world')

      expect(result).toEqual({
        id: 42,
        name: 'hello-world',
        fullName: 'octocat/hello-world',
        description: 'My first repo',
        stargazersCount: 1500,
        forksCount: 200,
        watchersCount: 1500,
        openIssuesCount: 12,
        language: 'TypeScript',
        htmlUrl: 'https://github.com/octocat/hello-world',
        updatedAt: '2024-06-01T00:00:00Z',
      })
    })
  })
})
