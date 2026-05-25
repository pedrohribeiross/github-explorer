export const SORT_OPTIONS = {
  starsDesc: 'starsDesc',
  starsAsc: 'starsAsc',
  recent: 'recent',
} as const

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

export const DEFAULT_SORT_OPTION: SortOption = SORT_OPTIONS.starsDesc
