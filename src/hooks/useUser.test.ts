import { renderHook, waitFor } from '@testing-library/react'
import type { User } from '../domain'
import { getUser } from '../services'
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
  publicRepos: 8,
}

describe('useUser', () => {
  it('returns the user on success', async () => {
    mockedGetUser.mockResolvedValue(user)

    const { result } = renderHook(() => useUser('octocat'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(user)
    expect(result.current.error).toBeNull()
    expect(mockedGetUser).toHaveBeenCalledWith('octocat', expect.any(AbortSignal))
  })

  it('exposes the error when the request fails', async () => {
    const error = new Error('not found')
    mockedGetUser.mockRejectedValue(error)

    const { result } = renderHook(() => useUser('ghost'))

    await waitFor(() => expect(result.current.error).toBe(error))
    expect(result.current.data).toBeNull()
  })

  it('does not fetch when the username is empty', () => {
    const { result } = renderHook(() => useUser('   '))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(mockedGetUser).not.toHaveBeenCalled()
  })
})
