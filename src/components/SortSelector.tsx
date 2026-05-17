import { useId } from 'react'
import { SORT_OPTIONS } from '../domain'
import type { SortOption } from '../domain'

const sortOptionLabels: Record<SortOption, string> = {
  [SORT_OPTIONS.starsDesc]: 'Mais estrelas',
  [SORT_OPTIONS.starsAsc]: 'Menos estrelas',
  [SORT_OPTIONS.nameAsc]: 'Nome (A–Z)',
  [SORT_OPTIONS.nameDesc]: 'Nome (Z–A)',
  [SORT_OPTIONS.recent]: 'Mais recentes',
}

const sortOptionOrder: SortOption[] = [
  SORT_OPTIONS.starsDesc,
  SORT_OPTIONS.starsAsc,
  SORT_OPTIONS.nameAsc,
  SORT_OPTIONS.nameDesc,
  SORT_OPTIONS.recent,
]

interface SortSelectorProps {
  value: SortOption
  onChange: (sortOption: SortOption) => void
}

export const SortSelector = ({ value, onChange }: SortSelectorProps) => {
  const selectId = useId()

  return (
    <div className="d-flex align-items-center gap-2 w-100 app-w-sm-auto app-flex-sm-none">
      <label htmlFor={selectId} className="form-label mb-0 d-flex align-items-center">
        <i
          className="bi bi-arrow-down-up text-tertiary"
          style={{ fontSize: '1rem' }}
          aria-hidden="true"
        />
        <span className="visually-hidden">Ordenar por</span>
      </label>
      <select
        id={selectId}
        className="form-select app-surface w-100 app-w-sm-auto"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {sortOptionOrder.map((option) => (
          <option key={option} value={option}>
            {sortOptionLabels[option]}
          </option>
        ))}
      </select>
    </div>
  )
}
