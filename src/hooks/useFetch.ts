import { useCallback, useEffect, useReducer } from 'react'
import axios from 'axios'
import type { FetchState } from '../types'

type State<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

type Action<T> =
  | { type: 'start' }
  | { type: 'success'; data: T }
  | { type: 'failure'; error: Error }
  | { type: 'idle' }

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'start':
      return { data: state.data, loading: true, error: null }
    case 'success':
      return { data: action.data, loading: false, error: null }
    case 'failure':
      return { data: state.data, loading: false, error: action.error }
    case 'idle':
      return { data: state.data, loading: false, error: state.error }
  }
}

export const useFetch = <T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  enabled: boolean = true,
): FetchState<T> => {
  const [state, dispatch] = useReducer(reducer<T>, {
    data: null,
    loading: enabled,
    error: null,
  })
  const [reloadKey, retry] = useReducer((k: number) => k + 1, 0)

  useEffect(() => {
    if (!enabled) {
      dispatch({ type: 'idle' })
      return
    }
    const controller = new AbortController()
    dispatch({ type: 'start' })
    fetcher(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) dispatch({ type: 'success', data: result })
      })
      .catch((err: Error) => {
        if (controller.signal.aborted || axios.isCancel(err)) return
        dispatch({ type: 'failure', error: err })
      })
    return () => controller.abort()
  }, [fetcher, enabled, reloadKey])

  const stableRetry = useCallback(() => retry(), [])

  return { ...state, retry: stableRetry }
}
