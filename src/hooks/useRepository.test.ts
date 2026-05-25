import { renderHook, waitFor } from '@testing-library/react'
import type { Repository } from '../domain'
import { getRepository } from '../services'
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
  forksCount: 200,
  watchersCount: 1500,
  openIssuesCount: 12,
  language: 'TypeScript',
  htmlUrl: 'https://github.com/octocat/hello-world',
  updatedAt: '2024-06-01T00:00:00Z',
}

describe('useRepository', () => {
  it('returns the repository on success', async () => {
    mockedGetRepository.mockResolvedValue(repository)

    const { result } = renderHook(() => useRepository('octocat', 'hello-world'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(repository)
    expect(mockedGetRepository).toHaveBeenCalledWith('octocat/hello-world', expect.any(AbortSignal))
  })

  it('exposes the error when the request fails', async () => {
    const error = new Error('not found')
    mockedGetRepository.mockRejectedValue(error)

    const { result } = renderHook(() => useRepository('octocat', 'ghost-repo'))

    await waitFor(() => expect(result.current.error).toBe(error))
  })

  it('does not fetch when owner or repo is missing', () => {
    const { result } = renderHook(() => useRepository('octocat', ''))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(mockedGetRepository).not.toHaveBeenCalled()
  })
})
