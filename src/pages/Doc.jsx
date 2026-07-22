export function Doc({ eyebrow, title, lede, children }) {
  return (
    <article className="doc">
      <p className="doc__eyebrow t-label">{eyebrow}</p>
      <h1 className="doc__title t-hero-sm">{title}</h1>
      <p className="doc__lede t-body-lg">{lede}</p>
      <div className="doc__body">{children}</div>
    </article>
  );
}

export function Placeholder() {
  return (
    <>
      <section className="doc__section">
        <h2 className="t-subsection">Overview</h2>
        <p className="t-body">
          This is placeholder content for the Chainguard brand guidelines. Copy, examples, and downloadable assets will
          live here. The layout follows a documentation pattern with a persistent left navigation and a single scrolling
          content column.
        </p>
        <p className="t-body">
          Everything on this page is built on the Chainguard 4px spacing system and the shared color and type tokens, so
          it stays consistent across light and dark modes.
        </p>
      </section>
      <section className="doc__section">
        <h2 className="t-subsection">Guidelines</h2>
        <ul className="doc__list">
          <li className="t-body">Use Gellix for headings and body copy.</li>
          <li className="t-body">Use Roobert SemiMono for labels and eyebrows, set in uppercase.</li>
          <li className="t-body">Lead with Blurple; reach for secondary accents sparingly.</li>
          <li className="t-body">Respect clear space and the 4px grid in every layout.</li>
        </ul>
      </section>
      <div className="doc__callout">
        <span className="t-label">Coming soon</span>
        <p className="t-body">Detailed specs and asset downloads for this section are being written.</p>
      </div>
    </>
  );
}
