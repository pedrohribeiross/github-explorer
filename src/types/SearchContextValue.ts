import type { SortOption } from '../domain'

export interface SearchContextValue {
  username: string
  sortOption: SortOption
  setUsername: (username: string) => void
  setSortOption: (sortOption: SortOption) => void
}
