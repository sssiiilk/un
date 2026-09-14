import { useEffect, useId, useState } from 'react'
import { href } from '../lib/router'
import { site } from '../data/content'

const NAV_ITEMS = [
  { href: href('/work'), label: 'Кейсы', section: 'work' },
  { href: href('/services'), label: 'Услуги', section: 'services' },
  { href: href('/contact'), label: 'Контакты', section: 'contact' },
]

function SiteHeader({ shellClass, markClass, navClass, toggleClass }) {
  const [open, setOpen] = useState(false)
  const navId = useId()

  const handleNavClick = (event, item) => {
    event.preventDefault()
    setOpen(false)

    window.location.hash = item.href.slice(1)

    window.setTimeout(() => {
      document
        .getElementById(item.section)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  useEffect(() => {
    const closeMenu = () => setOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 721px)')
    const syncMenuState = (event) => {
      if (event.matches) {
        setOpen(false)
      }
    }

    if (media.addEventListener) {
      media.addEventListener('change', syncMenuState)
    } else {
      media.addListener(syncMenuState)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', syncMenuState)
      } else {
        media.removeListener(syncMenuState)
      }
    }
  }, [])

  return (
    <header className={`${shellClass}${open ? ' is-open' : ''}`}>
      <a className={markClass} href={href('/')}>
        {site.mark}
      </a>
      <button
        type="button"
        className={`${toggleClass}${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Закрыть' : 'Меню'}
      </button>
      <nav
        id={navId}
        className={`${navClass}${open ? ' is-open' : ''}`}
        aria-label="Разделы"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) => handleNavClick(event, item)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export function HeroBar() {
  return (
    <SiteHeader
      shellClass="hero__bar"
      markClass="hero__mark"
      navClass="hero__nav"
      toggleClass="nav-toggle nav-toggle--hero"
    />
  )
}

export function Header() {
  return (
    <SiteHeader
      shellClass="header"
      markClass="header__mark"
      navClass="header__nav"
      toggleClass="nav-toggle nav-toggle--paper"
    />
  )
}
