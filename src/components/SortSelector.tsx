import { useId } from 'react'
import { SORT_OPTIONS } from '../domain'
import type { SortOption } from '../domain'

const sortOptionLabels: Record<SortOption, string> = {
  [SORT_OPTIONS.starsDesc]: 'Estrelas (decrescente)',
  [SORT_OPTIONS.starsAsc]: 'Estrelas (crescente)',
  [SORT_OPTIONS.nameAsc]: 'Nome (A–Z)',
  [SORT_OPTIONS.recent]: 'Mais recentes',
}

const sortOptionOrder: SortOption[] = [
  SORT_OPTIONS.starsDesc,
  SORT_OPTIONS.starsAsc,
  SORT_OPTIONS.nameAsc,
  SORT_OPTIONS.recent,
]

interface SortSelectorProps {
  value: SortOption
  onChange: (sortOption: SortOption) => void
}

export const SortSelector = ({ value, onChange }: SortSelectorProps) => {
  const selectId = useId()

  return (
    <div className="flex-shrink-0">
      <label htmlFor={selectId} className="form-label">
        Ordenar por
      </label>
      <select
        id={selectId}
        className="form-select"
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
