export function SiteMock({ variant = 'after', theme = 'navy', compact = false }) {
  const isBefore = variant === 'before'

  return (
    <div className={`mock mock--${theme} ${compact ? 'mock--compact' : ''}`}>
      <div className="mock__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={`mock__screen ${isBefore ? 'mock__screen--before' : 'mock__screen--after'}`}>
        {isBefore ? <BeforeLayout /> : <AfterLayout />}
      </div>
    </div>
  )
}

function BeforeLayout() {
  return (
    <>
      <div className="mock__bar mock__bar--busy">
        <b />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="mock__ads">
        <span />
        <span />
        <span />
      </div>
      <div className="mock__dense">
        <p />
        <p />
        <p />
        <p />
        <p />
        <p />
      </div>
      <div className="mock__list">
        <span />
        <span />
        <span />
        <span />
      </div>
    </>
  )
}

function AfterLayout() {
  return (
    <>
      <div className="mock__bar">
        <b />
        <i />
        <i />
        <i />
      </div>
      <div className="mock__hero">
        <em />
        <em />
        <span className="mock__cta" />
      </div>
      <div className="mock__cards">
        <article>
          <s />
          <s />
        </article>
        <article>
          <s />
          <s />
        </article>
        <article>
          <s />
          <s />
        </article>
      </div>
    </>
  )
}
