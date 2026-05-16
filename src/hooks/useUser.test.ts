import { renderHook, waitFor } from '@testing-library/react'
import type { User } from '../domain'
import { getUser } from '../services'
import { createQueryClientWrapper } from '../test/renderWithQueryClient'
import { useUser } from './useUser'

jest.mock('../services', () => ({
  getUser: jest.fn(),
}))

const mockedGetUser = getUser as jest.Mock

const user: User = {
  login: 'octocat',
  name: 'The Octocat',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1',
  bio: 'Mascot',
  email: 'octocat@github.com',
  followers: 100,
  following: 10,
}

describe('useUser', () => {
  it('starts in loading state when a username is provided', () => {
    mockedGetUser.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useUser('octocat'), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current).toEqual({ data: null, loading: true, error: null })
  })

  it('returns the user on success', async () => {
    mockedGetUser.mockResolvedValue(user)

    const { result } = renderHook(() => useUser('octocat'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current).toEqual({ data: user, loading: false, error: null })
    expect(mockedGetUser).toHaveBeenCalledWith('octocat')
  })

  it('exposes the error when the request fails', async () => {
    const error = new Error('not found')
    mockedGetUser.mockRejectedValue(error)

    const { result } = renderHook(() => useUser('ghost'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.error).toBe(error))

    expect(result.current).toEqual({ data: null, loading: false, error })
  })

  it('does not fetch and is not loading when the username is empty', () => {
    const { result } = renderHook(() => useUser('   '), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current).toEqual({ data: null, loading: false, error: null })
    expect(mockedGetUser).not.toHaveBeenCalled()
  })
})
