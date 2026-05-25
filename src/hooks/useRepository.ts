import { useCallback } from 'react'
import { getRepository } from '../services'
import { useFetch } from './useFetch'

export const useRepository = (owner: string, repo: string) => {
  const trimmedOwner = owner.trim()
  const trimmedRepo = repo.trim()
  const enabled = trimmedOwner.length > 0 && trimmedRepo.length > 0
  const fetcher = useCallback(
    (signal: AbortSignal) => getRepository(trimmedOwner, trimmedRepo, signal),
    [trimmedOwner, trimmedRepo],
  )
  return useFetch(fetcher, enabled)
}
