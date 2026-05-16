import type { Repository } from '../domain'
import { SORT_OPTIONS } from '../domain'
import { sortRepositories } from './sortRepositories'

const makeRepository = (overrides: Partial<Repository>): Repository => ({
  id: 1,
  name: 'repo',
  fullName: 'owner/repo',
  description: null,
  stargazersCount: 0,
  language: null,
  htmlUrl: 'https://github.com/owner/repo',
  updatedAt: '2020-01-01T00:00:00Z',
  ...overrides,
})

const alpha = makeRepository({
  id: 1,
  name: 'alpha',
  stargazersCount: 10,
  updatedAt: '2023-01-01T00:00:00Z',
})
const beta = makeRepository({
  id: 2,
  name: 'Beta',
  stargazersCount: 50,
  updatedAt: '2024-06-01T00:00:00Z',
})
const gamma = makeRepository({
  id: 3,
  name: 'gamma',
  stargazersCount: 5,
  updatedAt: '2022-03-01T00:00:00Z',
})

const repositories: Repository[] = [alpha, beta, gamma]

describe('sortRepositories', () => {
  it('orders by stars descending (default option)', () => {
    const result = sortRepositories(repositories, SORT_OPTIONS.starsDesc)

    expect(result.map((repo) => repo.id)).toEqual([2, 1, 3])
  })

  it('orders by stars ascending', () => {
    const result = sortRepositories(repositories, SORT_OPTIONS.starsAsc)

    expect(result.map((repo) => repo.id)).toEqual([3, 1, 2])
  })

  it('orders by name A–Z case-insensitively', () => {
    const result = sortRepositories(repositories, SORT_OPTIONS.nameAsc)

    expect(result.map((repo) => repo.name)).toEqual(['alpha', 'Beta', 'gamma'])
  })

  it('orders by most recently updated first', () => {
    const result = sortRepositories(repositories, SORT_OPTIONS.recent)

    expect(result.map((repo) => repo.id)).toEqual([2, 1, 3])
  })

  it('does not mutate the original array', () => {
    const original = [...repositories]

    sortRepositories(repositories, SORT_OPTIONS.starsDesc)

    expect(repositories).toEqual(original)
  })

  it('returns a new array instance', () => {
    const result = sortRepositories(repositories, SORT_OPTIONS.starsDesc)

    expect(result).not.toBe(repositories)
  })

  it('returns an empty array when given no repositories', () => {
    expect(sortRepositories([], SORT_OPTIONS.starsDesc)).toEqual([])
  })
})
