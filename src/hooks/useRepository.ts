import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api'
import type { Repository } from '../domain'
import { getRepository } from '../services'
import type { AsyncState } from '../types'
import { toAsyncState } from './toAsyncState'

export const useRepository = (owner: string, repo: string): AsyncState<Repository> => {
  const trimmedOwner = owner.trim()
  const trimmedRepo = repo.trim()
  const enabled = trimmedOwner.length > 0 && trimmedRepo.length > 0

  const query = useQuery({
    queryKey: queryKeys.repository(trimmedOwner, trimmedRepo),
    queryFn: () => getRepository(trimmedOwner, trimmedRepo),
    enabled,
  })

  return toAsyncState(query, enabled)
}
