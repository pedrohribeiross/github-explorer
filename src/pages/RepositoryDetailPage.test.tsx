import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { Repository } from '../domain'
import { getRepository } from '../services'
import { ROUTE_PATHS, buildRepositoryDetailPath } from '../routes'
import { createQueryClientWrapper } from '../test/renderWithQueryClient'
import { RepositoryDetailPage } from './RepositoryDetailPage'

jest.mock('../services', () => ({
  getRepository: jest.fn(),
}))

const mockedGetRepository = getRepository as jest.Mock

const repository: Repository = {
  id: 42,
  name: 'hello-world',
  fullName: 'octocat/hello-world',
  description: 'My first repository',
  stargazersCount: 1500,
  forksCount: 200,
  watchersCount: 1500,
  openIssuesCount: 12,
  language: 'TypeScript',
  htmlUrl: 'https://github.com/octocat/hello-world',
  updatedAt: '2024-06-01T00:00:00Z',
}

const renderDetailPage = () => {
  const Wrapper = createQueryClientWrapper()

  return render(
    <Wrapper>
      <MemoryRouter initialEntries={[buildRepositoryDetailPath('octocat', 'hello-world')]}>
        <Routes>
          <Route path={ROUTE_PATHS.repositoryDetail} element={<RepositoryDetailPage />} />
        </Routes>
      </MemoryRouter>
    </Wrapper>,
  )
}

describe('RepositoryDetailPage', () => {
  it('requests the repository using the route params', async () => {
    mockedGetRepository.mockResolvedValue(repository)

    renderDetailPage()

    await waitFor(() => expect(mockedGetRepository).toHaveBeenCalledWith('octocat', 'hello-world'))
  })

  it('renders the repository data on success', async () => {
    mockedGetRepository.mockResolvedValue(repository)

    renderDetailPage()

    expect(await screen.findByRole('heading', { name: 'hello-world' })).toBeInTheDocument()
    expect(screen.getByText('My first repository')).toBeInTheDocument()
    expect(screen.getByLabelText('1500 estrelas')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders an external link to the repository on GitHub', async () => {
    mockedGetRepository.mockResolvedValue(repository)

    renderDetailPage()

    const externalLink = await screen.findByRole('link', { name: 'Ver no GitHub' })

    expect(externalLink).toHaveAttribute('href', 'https://github.com/octocat/hello-world')
    expect(externalLink).toHaveAttribute('target', '_blank')
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('falls back to a placeholder when description and language are missing', async () => {
    mockedGetRepository.mockResolvedValue({
      ...repository,
      description: null,
      language: null,
    })

    renderDetailPage()

    expect(await screen.findByText('Sem descrição')).toBeInTheDocument()
  })

  it('shows a not-found message when the repository does not exist (404)', async () => {
    const notFoundError = new AxiosError('Not Found')
    notFoundError.response = {
      status: 404,
      data: {},
      statusText: 'Not Found',
      headers: {},
      config: {} as never,
    }
    mockedGetRepository.mockRejectedValue(notFoundError)

    renderDetailPage()

    expect(await screen.findByText('Repositório não encontrado')).toBeInTheDocument()
  })
})
