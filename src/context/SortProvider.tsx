import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_SORT_OPTION } from '../domain'
import type { SortOption } from '../domain'
import type { SortContextValue } from '../types'
import { sortContext } from './sortContext'

interface SortProviderProps {
  children: ReactNode
}

export const SortProvider = ({ children }: SortProviderProps) => {
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION)

  const value = useMemo<SortContextValue>(() => ({ sortOption, setSortOption }), [sortOption])

  return <sortContext.Provider value={value}>{children}</sortContext.Provider>
}
