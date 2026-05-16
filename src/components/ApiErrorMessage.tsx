import { describeApiError } from '../utils'
import { ErrorMessage } from './ErrorMessage'

interface ApiErrorMessageProps {
  error: Error
  notFoundMessage: string
  onRetry?: () => void
}

export const ApiErrorMessage = ({ error, notFoundMessage, onRetry }: ApiErrorMessageProps) => {
  const { message, retriable } = describeApiError(error, { notFoundMessage })

  return <ErrorMessage message={message} onRetry={retriable ? onRetry : undefined} />
}
