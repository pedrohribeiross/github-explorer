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

  const exampleUsernames = ['torvalds', 'gaearon', 'tj']

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
    <section
      aria-labelledby="search-page-title"
      className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center"
    >
      <span
        className="d-inline-flex align-items-center justify-content-center rounded-circle app-surface border mb-4"
        style={{ width: '5rem', height: '5rem' }}
        aria-hidden="true"
      >
        <i className="bi bi-search fs-2 text-primary" />
      </span>

      <h1 id="search-page-title" className="display-6 fw-bold mb-2">
        GitHub Explorer
      </h1>
      <p className="text-secondary mb-4">Busque e explore perfis do GitHub</p>

      <div className="w-100 col-12 col-sm-10 col-md-8 col-lg-6">
        <div className="app-surface app-shadow border rounded-4 p-4 text-start">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor={inputId} className="form-label fw-medium">
                Nome de usuário
              </label>
              <input
                id={inputId}
                type="text"
                className={error ? 'form-control is-invalid' : 'form-control'}
                placeholder="Digite o username do GitHub"
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

            <button type="submit" className="btn app-btn-gradient app-shadow-accent w-100">
              <i className="bi bi-search me-2" aria-hidden="true" />
              Buscar usuário
            </button>
          </form>
        </div>

        <p className="d-flex flex-wrap align-items-center gap-2 mt-3 mb-0 small text-secondary">
          <span>Exemplos:</span>
          {exampleUsernames.map((example) => (
            <button
              key={example}
              type="button"
              className="btn btn-link p-0 px-1 py-2 text-decoration-none link-primary"
              onClick={() => {
                setInputValue(example)
                setError(null)
              }}
            >
              {example}
            </button>
          ))}
        </p>
      </div>
    </section>
  )
}
