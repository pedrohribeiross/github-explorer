import type { ReactNode } from 'react'
import type { AsyncState } from '../types'
import { ApiErrorMessage } from './ApiErrorMessage'
import { ErrorMessage } from './ErrorMessage'
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
  if (state.offline) {
    return (
      <ErrorMessage
        message="Você está offline. Verifique sua conexão e tente novamente"
        onRetry={state.retry}
        variant="offline"
      />
    )
  }

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
