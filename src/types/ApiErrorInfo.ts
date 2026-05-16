export type ApiErrorKind = 'notFound' | 'rateLimit' | 'network' | 'unknown'

export interface ApiErrorInfo {
  kind: ApiErrorKind
  message: string
  retriable: boolean
}
