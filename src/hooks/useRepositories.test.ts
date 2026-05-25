import { renderHook, waitFor } from '@testing-library/react'
import type { Repository } from '../domain'
import { getUserRepositories } from '../services'
import { useRepositories } from './useRepositories'

jest.mock('../services', () => ({
  getUserRepositories: jest.fn(),
}))

const mockedGetUserRepositories = getUserRepositories as jest.Mock

const repository: Repository = {
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
}

describe('useRepositories', () => {
  it('returns the repositories on success', async () => {
    mockedGetUserRepositories.mockResolvedValue([repository])

    const { result } = renderHook(() => useRepositories('octocat'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual([repository])
    expect(result.current.error).toBeNull()
    expect(mockedGetUserRepositories).toHaveBeenCalledWith('octocat', expect.any(AbortSignal))
  })

  it('returns an empty list when the user has no repositories', async () => {
    mockedGetUserRepositories.mockResolvedValue([])

    const { result } = renderHook(() => useRepositories('octocat'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual([])
  })

  it('exposes the error when the request fails', async () => {
    const error = new Error('network error')
    mockedGetUserRepositories.mockRejectedValue(error)

    const { result } = renderHook(() => useRepositories('octocat'))

    await waitFor(() => expect(result.current.error).toBe(error))
  })

  it('does not fetch when the username is empty', () => {
    const { result } = renderHook(() => useRepositories(''))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(mockedGetUserRepositories).not.toHaveBeenCalled()
  })
})
