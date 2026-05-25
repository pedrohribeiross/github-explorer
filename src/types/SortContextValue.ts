import type { SortOption } from '../domain'

export interface SortContextValue {
  sortOption: SortOption
  setSortOption: (sortOption: SortOption) => void
}
