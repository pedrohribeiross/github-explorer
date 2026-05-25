import { useCallback } from 'react'
import { getUserRepositories } from '../services'
import { useFetch } from './useFetch'

export const useRepositories = (username: string) => {
  const trimmed = username.trim()
  const fetcher = useCallback(
    (signal: AbortSignal) => getUserRepositories(trimmed, signal),
    [trimmed],
  )
  return useFetch(fetcher, trimmed.length > 0)
}
