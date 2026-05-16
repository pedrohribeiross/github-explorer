import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_SORT_OPTION } from '../domain'
import type { SortOption } from '../domain'
import type { SearchContextValue } from '../types'
import { searchContext } from './searchContext'

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [username, setUsername] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION)

  const value = useMemo<SearchContextValue>(
    () => ({ username, sortOption, setUsername, setSortOption }),
    [username, sortOption],
  )

  return <searchContext.Provider value={value}>{children}</searchContext.Provider>
}
