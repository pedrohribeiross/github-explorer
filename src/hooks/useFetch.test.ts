import { act, renderHook, waitFor } from '@testing-library/react'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  it('starts loading and resolves with data on success', async () => {
    const fetcher = jest.fn().mockResolvedValue('payload')

    const { result } = renderHook(() => useFetch(fetcher))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBe('payload')
    expect(result.current.error).toBeNull()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('exposes the error when the fetcher rejects', async () => {
    const error = new Error('boom')
    const fetcher = jest.fn().mockRejectedValue(error)

    const { result } = renderHook(() => useFetch(fetcher))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe(error)
    expect(result.current.data).toBeNull()
  })

  it('does not fetch when enabled is false', () => {
    const fetcher = jest.fn().mockResolvedValue('payload')

    const { result } = renderHook(() => useFetch(fetcher, false))

    expect(fetcher).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
  })

  it('refetches when retry is called', async () => {
    const fetcher = jest.fn().mockResolvedValueOnce('first').mockResolvedValueOnce('second')

    const { result } = renderHook(() => useFetch(fetcher))

    await waitFor(() => expect(result.current.data).toBe('first'))

    act(() => result.current.retry())

    await waitFor(() => expect(result.current.data).toBe('second'))
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('aborts the in-flight request when the component unmounts', async () => {
    const fetcher = jest.fn((signal: AbortSignal) => {
      return new Promise<string>((_, reject) => {
        signal.addEventListener('abort', () =>
          reject(Object.assign(new Error('aborted'), { name: 'CanceledError' })),
        )
      })
    })

    const { result, unmount } = renderHook(() => useFetch(fetcher))

    expect(result.current.loading).toBe(true)
    unmount()

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(result.current.error).toBeNull()
  })

  it('does not set error when a previous fetcher is cancelled via signal', async () => {
    const firstFetcher = jest.fn(
      (signal: AbortSignal) =>
        new Promise<string>((resolve, reject) => {
          signal.addEventListener('abort', () =>
            reject(Object.assign(new Error('aborted'), { name: 'CanceledError' })),
          )
          setTimeout(() => resolve('late'), 50)
        }),
    )
    const secondFetcher = jest.fn().mockResolvedValue('second')

    const { result, rerender } = renderHook(
      ({ fetcher }: { fetcher: (signal: AbortSignal) => Promise<string> }) => useFetch(fetcher),
      { initialProps: { fetcher: firstFetcher } },
    )

    rerender({ fetcher: secondFetcher })

    await waitFor(() => expect(result.current.data).toBe('second'))
    expect(result.current.error).toBeNull()
  })
})
