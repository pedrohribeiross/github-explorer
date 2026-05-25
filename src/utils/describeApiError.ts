import { isAxiosError } from 'axios'
import type { ApiErrorInfo } from '../types'

interface DescribeApiErrorOptions {
  notFoundMessage: string
}

export const describeApiError = (error: Error, options: DescribeApiErrorOptions): ApiErrorInfo => {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) {
      return {
        kind: 'notFound',
        message: options.notFoundMessage,
        retriable: false,
      }
    }

    if (status === 403) {
      return {
        kind: 'rateLimit',
        message:
          'Limite de requisições da API do GitHub atingido. Aguarde alguns minutos e tente novamente',
        retriable: false,
      }
    }

    if (error.response === undefined) {
      return {
        kind: 'network',
        message: 'Falha de conexão. Verifique sua internet e tente novamente',
        retriable: true,
      }
    }
  }

  return {
    kind: 'unknown',
    message: 'Ocorreu um erro inesperado. Tente novamente',
    retriable: true,
  }
}
