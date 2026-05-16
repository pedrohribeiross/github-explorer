import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from '../context'
import { buildUserProfilePath } from '../routes'
import { isValidUsername } from '../utils'

export const SearchPage = () => {
  const inputId = useId()
  const navigate = useNavigate()
  const { setUsername } = useSearchContext()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = inputValue.trim()

    if (!isValidUsername(trimmed)) {
      setError('Informe um nome de usuário válido do GitHub')
      return
    }

    setError(null)
    setUsername(trimmed)
    navigate(buildUserProfilePath(trimmed))
  }

  return (
    <section aria-labelledby="search-page-title">
      <h2 id="search-page-title" className="h4 mb-4">
        Buscar usuário do GitHub
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor={inputId} className="form-label">
            Nome de usuário
          </label>
          <input
            id={inputId}
            type="text"
            className={error ? 'form-control is-invalid' : 'form-control'}
            placeholder="ex.: octocat"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            autoComplete="off"
            aria-describedby={error ? `${inputId}-error` : undefined}
          />
          {error && (
            <div id={`${inputId}-error`} className="invalid-feedback">
              {error}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>
    </section>
  )
}
