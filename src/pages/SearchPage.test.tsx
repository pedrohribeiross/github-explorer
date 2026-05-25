import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom'
import { ROUTE_PATHS } from '../routes'
import { SearchPage } from './SearchPage'

const UserProfileStub = () => {
  const { username } = useParams<'username'>()
  return <div>perfil de {username}</div>
}

const profileTextFor = (username: string) => (_: string, element: Element | null) => {
  if (element?.textContent !== `perfil de ${username}`) {
    return false
  }
  return Array.from(element.children).every(
    (child) => child.textContent !== `perfil de ${username}`,
  )
}

const renderSearchPage = () => {
  render(
    <MemoryRouter initialEntries={[ROUTE_PATHS.search]}>
      <Routes>
        <Route path={ROUTE_PATHS.search} element={<SearchPage />} />
        <Route path={ROUTE_PATHS.userProfile} element={<UserProfileStub />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SearchPage', () => {
  it('renders the search form', () => {
    renderSearchPage()

    expect(screen.getByRole('heading', { name: 'GitHub Explorer' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nome de usuário')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar usuário' })).toBeInTheDocument()
  })

  it('navigates to the user profile route on valid submission', async () => {
    const user = userEvent.setup()
    renderSearchPage()

    await user.type(screen.getByLabelText('Nome de usuário'), 'octocat')
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }))

    expect(screen.getByText(profileTextFor('octocat'))).toBeInTheDocument()
  })

  it('trims surrounding whitespace before navigating', async () => {
    const user = userEvent.setup()
    renderSearchPage()

    await user.type(screen.getByLabelText('Nome de usuário'), '  octocat  ')
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }))

    expect(screen.getByText(profileTextFor('octocat'))).toBeInTheDocument()
  })

  it('shows a validation message and stays on the page for an invalid username', async () => {
    const user = userEvent.setup()
    renderSearchPage()

    await user.type(screen.getByLabelText('Nome de usuário'), '-invalid-')
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }))

    expect(screen.getByText('Informe um nome de usuário válido do GitHub')).toBeInTheDocument()
    expect(screen.queryByText(/^perfil de /)).not.toBeInTheDocument()
  })

  it('clears the validation message after a successful submission', async () => {
    const user = userEvent.setup()
    renderSearchPage()

    const input = screen.getByLabelText('Nome de usuário')

    await user.type(input, '-invalid-')
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }))
    expect(screen.getByText('Informe um nome de usuário válido do GitHub')).toBeInTheDocument()

    await user.clear(input)
    await user.type(input, 'octocat')
    await user.click(screen.getByRole('button', { name: 'Buscar usuário' }))

    expect(screen.getByText(profileTextFor('octocat'))).toBeInTheDocument()
  })
})
