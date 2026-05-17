import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import type { BreadcrumbItem } from '../types'

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Trilha de navegação" className="app-surface rounded-3 px-3 py-2">
      <ol className="breadcrumb mb-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={`${item.label}-${index}`}
              className={`breadcrumb-item${isLast ? ' active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.to && !isLast ? (
                <Link to={item.to} className="text-decoration-none">
                  {item.label}
                </Link>
              ) : (
                <Fragment>{item.label}</Fragment>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
