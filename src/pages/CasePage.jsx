import { getCase, cases } from '../data/content'
import { HeroBar } from '../components/Header'
import { href } from '../lib/router'
import Velaris from '@/components/ui/velaris'
import { ArrowRight } from 'lucide-react'

const DEFAULT_CASE_MESH = {
  bg: '#4a6eb0',
  colors: ['#003E97', '#003E97', '#5b82c4', '#d8e4f4'],
}
const BAND_HEIGHT = 'clamp(72px, 14vw, 264px)'
const HERO_HEIGHT = 'clamp(320px, 52vw, 620px)'

function CaseBand({ bg, colors }) {
  return (
    <Velaris
      bg={bg}
      colors={colors}
      speed={0.9}
      grain={0.1}
      vignette={0.45}
      height={BAND_HEIGHT}
      className="case-page__banner case-page__banner--band"
    />
  )
}

function CaseNote({ title, text }) {
  if (!text) {
    return null
  }

  return (
    <section className="case-page__note">
      {title ? <h2 className="case-page__note-title">{title}</h2> : null}
      <p>{text}</p>
    </section>
  )
}

function CaseGalleryImage({ src, fit = 'cover', wide = false }) {
  if (!src) {
    return null
  }

  const fitClass = fit === 'contain' ? ' case-page__ph--wide-contain' : ''

  return (
    <div className={`case-page__ph${wide ? ` case-page__ph--wide${fitClass}` : ' case-page__ph--thumb'}`}>
      <img src={src} alt="" />
    </div>
  )
}

export function CasePage({ slug }) {
  const item = getCase(slug)
  const index = cases.findIndex((entry) => entry.slug === slug)
  const next = index >= 0 ? cases[(index + 1) % cases.length] : null

  if (!item) {
    return (
      <section className="section">
        <p>Такого кейса нет.</p>
        <a className="text-link" href={href('/')}>
          На главную
        </a>
      </section>
    )
  }

  const headline =
    item.headline || 'Создание и развитие цифровых образовательных продуктов'
  const mood = item.mood || 'Концепция и настроение'
  const gallery = item.gallery || []
  const featureImage = item.featureImage || gallery[0]
  const introMedia = item.introMedia
  const introIsVideo = introMedia && /\.(mp4|webm)$/i.test(introMedia)
  const meshBg = item.meshBg || DEFAULT_CASE_MESH.bg
  const meshColors = item.meshColors || DEFAULT_CASE_MESH.colors
  const splitLeftTitle = item.splitLeftTitle || 'Что было сделано'
  const splitRightTitle = item.splitRightTitle || 'Что изменилось'
  const analysisTitle = item.analysisTitle
  const analysis = item.analysis || item.situation
  const finalTitle = item.finalTitle
  const finalResult = item.finalResult

  return (
    <article className={`case-page${item.meshColors ? ` case-page--${item.slug}` : ''}`}>
      <Velaris
        bg={meshBg}
        colors={meshColors}
        speed={1.1}
        grain={0.1}
        vignette={0.45}
        height={HERO_HEIGHT}
        className="case-page__hero"
      >
        <div className="case-page__hero-frame">
          <HeroBar />
          {item.heroTitle ? (
            <div className="case-page__hero-body">
              <p className="case-page__hero-title">{item.heroTitle}</p>
              {item.heroTags?.length ? (
                <ul className="case-page__hero-tags">
                  {item.heroTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </Velaris>

      <div className="case-page__inner">
        <section className="case-page__intro">
          <div>
            <h1>{headline}</h1>
            <p>{mood}</p>
          </div>
          <div className="case-page__ph case-page__ph--hero">
            {introIsVideo ? (
              <video
                src={introMedia}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : introMedia ? (
              <img src={introMedia} alt="" />
            ) : null}
          </div>
        </section>
      </div>

      <CaseBand bg={meshBg} colors={meshColors} />

      <div className="case-page__inner">
        <section className="case-page__split">
          <div>
            <h2>{splitLeftTitle}</h2>
            {item.work.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div>
            <h2>{splitRightTitle}</h2>
            <p>{item.result}</p>
          </div>
        </section>
      </div>

      <CaseBand bg={meshBg} colors={meshColors} />

      <div className="case-page__inner">
        <CaseNote title={analysisTitle} text={analysis} />

        <section className="case-page__gallery" aria-label="Главный кадр проекта">
          <CaseGalleryImage src={featureImage} fit={item.featureImageFit} wide />
        </section>

        <CaseNote title={finalTitle} text={finalResult} />

        <section className="case-page__gallery" aria-label="Кадры проекта">
          <CaseGalleryImage src={gallery[0]} wide />
          <div className="case-page__thumbs">
            {[1, 2, 3].map((slot) => (
              <CaseGalleryImage key={slot} src={gallery[slot]} />
            ))}
          </div>
        </section>

        {next ? (
          <a className="case-page__next" href={href(`/work/${next.slug}`)}>
            Следующий кейс — {next.client}
            <span className="case-page__next-icon" aria-hidden="true">
              <ArrowRight size={22} strokeWidth={2} />
            </span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
