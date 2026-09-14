import { useEffect, useState } from 'react'
import {
  cases,
  homeCaseIntro,
  homeContacts,
  homeInsight,
  processSteps,
} from '../data/content'
import { href } from '../lib/router'
import Velaris from '@/components/ui/velaris'
import StackingCards, {
  StackingCardItem,
} from '@/components/ui/stacking-cards'
import { HeroBar } from '../components/Header'
import { ArrowRight } from 'lucide-react'

const HERO_COLORS = ['#003E97', '#003E97', '#5b82c4', '#d8e4f4']
const CASE_COLORS = ['#1d3356', '#3c5f9a', '#5b63a0']
const COMPACT_CASES_QUERY = '(max-width: 860px)'
const HOME_MESH = {
  bg: '#4a6eb0',
  colors: HERO_COLORS,
}

function CaseCard({ item, index }) {
  return (
    <a
      href={href(`/work/${item.slug}`)}
      className="cases-flip"
      style={{
        backgroundColor: CASE_COLORS[index % CASE_COLORS.length],
      }}
    >
      <div className="cases-flip__main">
        <div className="cases-flip__copy">
          <h3>{item.client}</h3>
          <p>{item.summary}</p>
        </div>
        <div className="cases-flip__image">
          <img src={item.image} alt="" />
        </div>
      </div>
      <div className="cases-flip__foot">
        <ul className="cases-flip__tags">
          {item.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="cases-flip__go">
          Смотреть кейс полностью
          <span className="cases-flip__go-icon" aria-hidden="true">
            <ArrowRight size={22} strokeWidth={2} />
          </span>
        </span>
      </div>
    </a>
  )
}

function useCompactCases() {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(COMPACT_CASES_QUERY).matches
      : false,
  )

  useEffect(() => {
    const media = window.matchMedia(COMPACT_CASES_QUERY)
    const syncLayout = (event) => setIsCompact(event.matches)

    if (media.addEventListener) {
      media.addEventListener('change', syncLayout)
    } else {
      media.addListener(syncLayout)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', syncLayout)
      } else {
        media.removeListener(syncLayout)
      }
    }
  }, [])

  return isCompact
}

export function Home() {
  const isCompactCases = useCompactCases()

  const caseCards = cases.map((item, index) => {
    if (isCompactCases) {
      return (
        <article key={item.slug} className="cases-list__item">
          <CaseCard item={item} index={index} />
        </article>
      )
    }

    return (
      <StackingCardItem
        key={item.slug}
        index={index}
        className="cases-stack__item"
      >
        <CaseCard item={item} index={index} />
      </StackingCardItem>
    )
  })

  return (
    <>
      <Velaris
        bg={HOME_MESH.bg}
        colors={HOME_MESH.colors}
        speed={1.8}
        grain={0.12}
        height="100svh"
        className="hero-stage"
      >
        <section className="hero">
          <HeroBar />

          <div className="hero__copy">
            <h1>un.</h1>
            <p>
              Создание и развитие
              <br />
              цифровых
              <br />
              образовательных
              <br />
              продуктов
            </p>
          </div>
        </section>
      </Velaris>

      <section id="work" className="section section--work cases-stack">
        <div className="cases-stack__layout">
          <header className="cases-head">
            <h2>Кейсы</h2>
            <div className="cases-head__intro">
              <p>{homeCaseIntro}</p>
            </div>
          </header>

          {isCompactCases ? (
            <div className="cases-list">{caseCards}</div>
          ) : (
            <StackingCards totalCards={cases.length} className="cases-stack__track">
              {caseCards}
            </StackingCards>
          )}
        </div>
      </section>

      <section className="section insight">
        <div className="insight__layout">
          <h2>{homeInsight.title}</h2>
          <div className="insight__copy">
            {homeInsight.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section process">
        <div className="process__layout">
          <header className="process__head">
            <h2>Как мы работаем</h2>
            
          </header>

          <div className="process__list">
            {processSteps.map((step) => (
              <article key={step.number} className="process-step">
                <span className="process-step__number">{step.number}</span>
                <div className="process-step__body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Velaris
        bg={HOME_MESH.bg}
        colors={HOME_MESH.colors}
        speed={0.9}
        grain={0.1}
        vignette={0.45}
        height="clamp(72px, 14vw, 264px)"
        className="home-divider"
      />

      <section id="contact" className="section contact">
        <div className="contact__layout">
          <div className="contact__copy">
            <h2>Контакты</h2>
            <p>
              Если для Вас это актуально, то пришлите ответ на email письмо с темой "Превью" и мы пришлем превью проекта персонально для Вашего учебного заведения
            </p>
          </div>

          <div className="contact__meta">
            {homeContacts.map((item) => (
              <div key={item.label} className="contact__item">
                <span>{item.label}</span>
                <a href={item.href}>{item.value}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
