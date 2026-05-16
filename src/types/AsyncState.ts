export interface AsyncState<TData> {
  data: TData | null
  loading: boolean
  error: Error | null
  retry: () => void
}
