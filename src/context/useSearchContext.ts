import { useContext } from 'react'
import type { SearchContextValue } from '../types'
import { searchContext } from './searchContext'

export const useSearchContext = (): SearchContextValue => {
  const value = useContext(searchContext)

  if (value === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }

  return value
}
