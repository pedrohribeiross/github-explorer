import type { ReactNode } from 'react'
import type { AsyncState } from '../types'
import { ApiErrorMessage } from './ApiErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'

interface AsyncSectionProps<TData> {
  state: AsyncState<TData>
  notFoundMessage: string
  children: (data: TData) => ReactNode
}

export const AsyncSection = <TData,>({
  state,
  notFoundMessage,
  children,
}: AsyncSectionProps<TData>) => {
  if (state.loading) {
    return <LoadingSpinner />
  }

  if (state.error) {
    return (
      <ApiErrorMessage
        error={state.error}
        notFoundMessage={notFoundMessage}
        onRetry={state.retry}
      />
    )
  }

  if (state.data === null) {
    return null
  }

  return <>{children(state.data)}</>
}
