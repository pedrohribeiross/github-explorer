import type { Repository, SortOption } from '../domain'
import { SORT_OPTIONS } from '../domain'

type Comparator = (a: Repository, b: Repository) => number

const comparators: Record<SortOption, Comparator> = {
  [SORT_OPTIONS.starsDesc]: (a, b) => b.stargazersCount - a.stargazersCount,
  [SORT_OPTIONS.starsAsc]: (a, b) => a.stargazersCount - b.stargazersCount,
  [SORT_OPTIONS.recent]: (a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
}

export const sortRepositories = (
  repositories: readonly Repository[],
  sortOption: SortOption,
): Repository[] => [...repositories].sort(comparators[sortOption])
