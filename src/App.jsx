import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { CasePage } from './pages/CasePage'
import { useRoute } from './lib/router'
import { getCase } from './data/content'
import { useEffect } from 'react'

export default function App() {
  const route = useRoute()
  const onHome = route.name === 'home'
  const onCase = route.name === 'case'
  const showPaperHeader = !onHome && !onCase

  useEffect(() => {
    if (route.name === 'case') {
      const item = getCase(route.slug)
      document.title = item
        ? `${item.client} — un.`
        : 'un. — цифровые решения для образования'
      return
    }

    document.title = 'un. — цифровые решения для образования'
  }, [route])

  return (
    <div className="shell">
      <a className="skip" href="#content">
        К содержанию
      </a>
      {showPaperHeader ? <Header /> : null}
      <main id="content">
        {route.name === 'case' ? <CasePage slug={route.slug} /> : <Home />}
      </main>
      <Footer />
    </div>
  )
}
