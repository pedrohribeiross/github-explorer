import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { Repository } from '../domain'
import { buildRepositoryDetailPath } from '../routes'
import { RepositoryList } from './RepositoryList'

const makeRepository = (overrides: Partial<Repository> = {}): Repository => ({
  id: 1,
  name: 'repo-one',
  fullName: 'octocat/repo-one',
  description: 'First repository',
  stargazersCount: 10,
  forksCount: 2,
  watchersCount: 10,
  openIssuesCount: 1,
  language: 'TypeScript',
  htmlUrl: 'https://github.com/octocat/repo-one',
  updatedAt: '2024-06-01T00:00:00Z',
  ...overrides,
})

const renderList = (repositories: readonly Repository[]) =>
  render(
    <MemoryRouter>
      <RepositoryList username="octocat" repositories={repositories} />
    </MemoryRouter>,
  )

describe('RepositoryList', () => {
  it('shows an empty-state message when there are no repositories', () => {
    renderList([])

    expect(screen.getByText('Nenhum repositório encontrado')).toBeInTheDocument()
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('renders one list item per repository', () => {
    renderList([
      makeRepository({ id: 1, name: 'repo-one' }),
      makeRepository({ id: 2, name: 'repo-two' }),
    ])

    expect(screen.getByRole('heading', { name: 'repo-one' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'repo-two' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('preserves the order of the repositories as provided', () => {
    renderList([
      makeRepository({ id: 3, name: 'zeta' }),
      makeRepository({ id: 1, name: 'alpha' }),
      makeRepository({ id: 2, name: 'mid' }),
    ])

    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent)

    expect(headings).toEqual(['zeta', 'alpha', 'mid'])
  })

  it('links each item to its repository detail route', () => {
    renderList([makeRepository({ id: 1, name: 'repo-one' })])

    const item = screen.getByRole('listitem')
    const link = within(item).getByRole('link')

    expect(link).toHaveAttribute('href', buildRepositoryDetailPath('octocat', 'repo-one'))
  })

  it('shows the star count and language for a repository', () => {
    renderList([makeRepository({ name: 'repo-one', stargazersCount: 1500, language: 'Go' })])

    expect(screen.getByLabelText('1500 estrelas')).toBeInTheDocument()
    expect(screen.getByText('Go')).toBeInTheDocument()
  })
})
