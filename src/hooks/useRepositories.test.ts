import { renderHook, waitFor } from '@testing-library/react'
import type { Repository } from '../domain'
import { getUserRepositories } from '../services'
import { createQueryClientWrapper } from '../test/renderWithQueryClient'
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
  language: 'TypeScript',
  htmlUrl: 'https://github.com/octocat/hello-world',
  updatedAt: '2024-06-01T00:00:00Z',
}

describe('useRepositories', () => {
  it('starts in loading state when a username is provided', () => {
    mockedGetUserRepositories.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useRepositories('octocat'), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current).toEqual({ data: null, loading: true, error: null })
  })

  it('returns the repositories on success', async () => {
    mockedGetUserRepositories.mockResolvedValue([repository])

    const { result } = renderHook(() => useRepositories('octocat'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current).toEqual({ data: [repository], loading: false, error: null })
    expect(mockedGetUserRepositories).toHaveBeenCalledWith('octocat')
  })

  it('returns an empty list when the user has no repositories', async () => {
    mockedGetUserRepositories.mockResolvedValue([])

    const { result } = renderHook(() => useRepositories('octocat'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current).toEqual({ data: [], loading: false, error: null })
  })

  it('exposes the error when the request fails', async () => {
    const error = new Error('network error')
    mockedGetUserRepositories.mockRejectedValue(error)

    const { result } = renderHook(() => useRepositories('octocat'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.error).toBe(error))

    expect(result.current).toEqual({ data: null, loading: false, error })
  })

  it('does not fetch and is not loading when the username is empty', () => {
    const { result } = renderHook(() => useRepositories(''), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current).toEqual({ data: null, loading: false, error: null })
    expect(mockedGetUserRepositories).not.toHaveBeenCalled()
  })
})
