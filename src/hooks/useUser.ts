import { useCallback } from 'react'
import { getUser } from '../services'
import { useFetch } from './useFetch'

export const useUser = (username: string) => {
  const trimmed = username.trim()
  const fetcher = useCallback((signal: AbortSignal) => getUser(trimmed, signal), [trimmed])
  return useFetch(fetcher, trimmed.length > 0)
}
