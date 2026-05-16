import type { UseQueryResult } from '@tanstack/react-query'
import type { AsyncState } from '../types'

export const toAsyncState = <TData>(
  query: UseQueryResult<TData, Error>,
  enabled: boolean,
): AsyncState<TData> => {
  const paused = query.fetchStatus === 'paused'

  return {
    data: query.data ?? null,
    loading: enabled && query.isPending && !paused,
    offline: enabled && paused,
    error: query.error ?? null,
    retry: () => {
      void query.refetch()
    },
  }
}
