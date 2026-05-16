export interface AsyncState<TData> {
  data: TData | null
  loading: boolean
  offline: boolean
  error: Error | null
  retry: () => void
}
