import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api'
import type { Repository } from '../domain'
import { getUserRepositories } from '../services'
import type { AsyncState } from '../types'
import { toAsyncState } from './toAsyncState'

export const useRepositories = (username: string): AsyncState<Repository[]> => {
  const trimmedUsername = username.trim()
  const enabled = trimmedUsername.length > 0

  const query = useQuery({
    queryKey: queryKeys.repositories(trimmedUsername),
    queryFn: () => getUserRepositories(trimmedUsername),
    enabled,
  })

  return toAsyncState(query, enabled)
}
