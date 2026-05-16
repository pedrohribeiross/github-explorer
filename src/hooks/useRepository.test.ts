import { renderHook, waitFor } from '@testing-library/react'
import type { Repository } from '../domain'
import { getRepository } from '../services'
import { createQueryClientWrapper } from '../test/renderWithQueryClient'
import { useRepository } from './useRepository'

jest.mock('../services', () => ({
  getRepository: jest.fn(),
}))

const mockedGetRepository = getRepository as jest.Mock

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

describe('useRepository', () => {
  it('starts in loading state when owner and repo are provided', () => {
    mockedGetRepository.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useRepository('octocat', 'hello-world'), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current).toEqual({
      data: null,
      loading: true,
      offline: false,
      error: null,
      retry: expect.any(Function),
    })
  })

  it('returns the repository on success', async () => {
    mockedGetRepository.mockResolvedValue(repository)

    const { result } = renderHook(() => useRepository('octocat', 'hello-world'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current).toEqual({
      data: repository,
      loading: false,
      offline: false,
      error: null,
      retry: expect.any(Function),
    })
    expect(mockedGetRepository).toHaveBeenCalledWith('octocat', 'hello-world')
  })

  it('exposes the error when the request fails', async () => {
    const error = new Error('not found')
    mockedGetRepository.mockRejectedValue(error)

    const { result } = renderHook(() => useRepository('octocat', 'ghost-repo'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.error).toBe(error))

    expect(result.current).toEqual({
      data: null,
      loading: false,
      offline: false,
      error,
      retry: expect.any(Function),
    })
  })

  it('does not fetch when owner or repo is missing', () => {
    const { result } = renderHook(() => useRepository('octocat', ''), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current).toEqual({
      data: null,
      loading: false,
      offline: false,
      error: null,
      retry: expect.any(Function),
    })
    expect(mockedGetRepository).not.toHaveBeenCalled()
  })
})
