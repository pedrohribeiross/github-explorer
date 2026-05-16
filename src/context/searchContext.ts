import { createContext } from 'react'
import type { SearchContextValue } from '../types'

export const searchContext = createContext<SearchContextValue | undefined>(undefined)
