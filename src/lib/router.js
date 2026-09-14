import { useEffect, useState } from 'react'

const SECTIONS = new Set(['work', 'services', 'contact'])

export function parseHash(hash) {
  const raw = (hash || '').replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const parts = path.split('/').filter(Boolean)

  if (parts[0] === 'work' && parts[1]) {
    return { name: 'case', slug: parts[1] }
  }

  const section = SECTIONS.has(parts[0]) ? parts[0] : null
  return { name: 'home', section }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  useEffect(() => {
    if (route.name === 'case' || !route.section) {
      window.scrollTo(0, 0)
      return
    }

    const id = route.section
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 40)

    return () => window.clearTimeout(timer)
  }, [route.name, route.slug, route.section])

  return route
}

export function href(to) {
  return `#${to}`
}
