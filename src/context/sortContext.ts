import { createContext } from 'react'
import type { SortContextValue } from '../types'

export const sortContext = createContext<SortContextValue | undefined>(undefined)
