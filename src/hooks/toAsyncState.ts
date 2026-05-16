import type { UseQueryResult } from '@tanstack/react-query'
import type { AsyncState } from '../types'

export const toAsyncState = <TData>(
  query: UseQueryResult<TData, Error>,
  enabled: boolean,
): AsyncState<TData> => ({
  data: query.data ?? null,
  loading: enabled && query.isPending,
  error: query.error ?? null,
})
