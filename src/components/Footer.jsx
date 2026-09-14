import { site } from '../data/content'
import { href } from '../lib/router'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <a className="footer__mark" href={href('/')}>
          {site.mark}
        </a>
        <p>{site.name}</p>
      </div>

      <nav className="footer__nav" aria-label="Нижняя навигация">
        <a href={href('/work')}>Кейсы</a>
        <a href={href('/services')}>Услуги</a>
        <a href={href('/contact')}>Контакты</a>
      </nav>

      <div className="footer__meta">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <p>{site.location}</p>
      </div>
    </footer>
  )
}
