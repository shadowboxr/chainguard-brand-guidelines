import { Link } from "react-router-dom";
import { HUB_NAV, HUB_LINKS } from "../content/hub.js";
import StarIcon from "../components/StarIcon.jsx";

/* Brand Hub homepage — the elevated front door into the brand system. Reuses
   the existing shell, tokens, and terminal/block visual language. Hero is a
   centered editorial opening; the internal-only notice reuses the shared
   asterisk call-out style (.cpal-note) used across the other pages. */

const ExternalIcon = () => (
  <svg className="hub-ext__ic" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M4.5 1.5H10.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    <path d="M10 2L4.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    <path d="M9 7.5V10.5H1.5V3H4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
);

const Arrow = () => (
  <svg className="hub-link__arw" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8 3.5L12.5 8 8 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

function HubLink({ item, index }) {
  const num = String(index + 1).padStart(2, "0");
  const inner = (
    <>
      <span className="hub-link__mark" aria-hidden="true">
        <span className="hub-link__num">{num}</span>
        <span className="hub-link__caret" />
      </span>
      <span className="hub-link__label">{item.label}</span>
      {item.external ? <span className="hub-ext">External<ExternalIcon /></span> : <Arrow />}
    </>
  );
  return item.external ? (
    <a
      className="hub-link hub-link--ext"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.label} (external, opens in a new tab)`}
    >
      {inner}
    </a>
  ) : (
    <Link className="hub-link" to={item.to}>
      {inner}
    </Link>
  );
}

export default function Home() {
  return (
    <div className="hub">
      {/* ---- Hero + introduction ---- */}
      <header className="hub-hero">
        <div className="hub-hero__inner">
          <h1 className="hub-title">
            Welcome to the<br />
            Chainguard Brand&nbsp;Hub
          </h1>
          <p className="hub-lede t-body-lg">
            Your go-to resource for everything brand—bringing together guidelines, assets, and tools to help every
            employee represent Chainguard clearly and consistently.
          </p>

          {/* Internal-only notice — shared asterisk call-out style */}
          <div className="cpal-note hub-note" role="note">
            <span className="cpal-note__icon"><StarIcon /></span>
            <p>
              Please note, this is an internal-only resource. If you are looking for an external guide to share with
              partners, press, or other third parties, please visit the{" "}
              <a className="hub-note__link" href={HUB_LINKS.mediaKit} target="_blank" rel="noopener noreferrer">
                Media Kit<ExternalIcon />
              </a>
              .
            </p>
          </div>
        </div>
      </header>

      {/* ---- Primary navigation ---- */}
      <section className="hub-nav" aria-labelledby="hub-nav-title">
        <div className="hub-section__head">
          <h2 className="hub-section__title" id="hub-nav-title">What will you create today?</h2>
          <p className="hub-section__sub t-body">
            Three connected parts of one system. Jump straight to what you need.
          </p>
        </div>

        <div className="hub-modules">
          {HUB_NAV.map((group, gi) => (
            <section className="hub-module" key={group.id} aria-labelledby={`mod-${group.id}`}>
              <div className="hub-module__head">
                <span className="hub-module__index t-label" aria-hidden="true">{String(gi + 1).padStart(2, "0")}</span>
                <h3 className="hub-module__title t-label" id={`mod-${group.id}`}>{group.label}</h3>
              </div>
              <p className="hub-module__caption">{group.caption}</p>
              <nav className="hub-links" aria-label={group.label}>
                {group.items.map((item, i) => (
                  <HubLink item={item} index={i} key={item.label} />
                ))}
              </nav>
            </section>
          ))}
        </div>
      </section>

      {/* ---- Brand support & requests ---- */}
      <section className="hub-support" aria-labelledby="hub-support-title">
        <div className="hub-section__head">
          <h2 className="hub-section__title" id="hub-support-title">Brand support &amp; requests</h2>
        </div>

        <div className="hub-support__grid">
          <div className="hub-support__card">
            <span className="hub-card__eyebrow t-label">Questions</span>
            <p className="hub-support__lead">
              Questions about the Chainguard brand, our guidelines, or how to apply them?
            </p>
            <p className="hub-support__meta t-body-sm">
              Reach out to <strong>Andrea Carrillo</strong> on Slack.
            </p>
            <a className="hub-btn hub-btn--primary" href={HUB_LINKS.slackAndrea} target="_blank" rel="noopener noreferrer">
              Message Andrea on Slack<ExternalIcon />
            </a>
          </div>

          <div className="hub-support__card">
            <span className="hub-card__eyebrow t-label">Creative requests</span>
            <p className="hub-support__lead">
              Need a public-facing, high-visibility asset that requires custom creative work? Submit the form that
              matches your team.
            </p>
            <div className="hub-actions">
              <a className="hub-action" href={HUB_LINKS.asanaForm} target="_blank" rel="noopener noreferrer">
                <span className="hub-action__audience t-label">Marketing team</span>
                <span className="hub-action__label">Asana request form<ExternalIcon /></span>
                <span className="hub-action__desc t-body-sm">For members of the marketing team.</span>
              </a>
              <a className="hub-action hub-action--primary" href={HUB_LINKS.creativeForm} target="_blank" rel="noopener noreferrer">
                <span className="hub-action__audience t-label">Everyone else</span>
                <span className="hub-action__label">Company creative request<ExternalIcon /></span>
                <span className="hub-action__desc t-body-sm">For everyone else at Chainguard.</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
