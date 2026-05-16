import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api'
import type { User } from '../domain'
import { getUser } from '../services'
import type { AsyncState } from '../types'
import { toAsyncState } from './toAsyncState'

export const useUser = (username: string): AsyncState<User> => {
  const trimmedUsername = username.trim()
  const enabled = trimmedUsername.length > 0

  const query = useQuery({
    queryKey: queryKeys.user(trimmedUsername),
    queryFn: () => getUser(trimmedUsername),
    enabled,
  })

  return toAsyncState(query, enabled)
}
