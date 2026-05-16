import { isAxiosError } from 'axios'
import type { ApiErrorInfo } from '../types'

interface DescribeApiErrorOptions {
  notFoundMessage: string
}

export const describeApiError = (error: Error, options: DescribeApiErrorOptions): ApiErrorInfo => {
  if (isAxiosError(error) && error.response?.status === 404) {
    return {
      kind: 'notFound',
      message: options.notFoundMessage,
      retriable: false,
    }
  }

  return {
    kind: 'unknown',
    message: 'Ocorreu um erro inesperado. Tente novamente',
    retriable: true,
  }
}
