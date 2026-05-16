import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const MAX_RETRIES = 1

const isClientError = (error: Error): boolean => {
  const status = isAxiosError(error) ? error.response?.status : undefined
  return status !== undefined && status >= 400 && status < 500
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => !isClientError(error) && failureCount < MAX_RETRIES,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
