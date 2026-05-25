import { useContext } from 'react'
import type { SortContextValue } from '../types'
import { sortContext } from './sortContext'

export const useSortContext = (): SortContextValue => {
  const value = useContext(sortContext)

  if (value === undefined) {
    throw new Error('useSortContext must be used within a SortProvider')
  }

  return value
}
