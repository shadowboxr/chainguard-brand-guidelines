import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HUB_NAV, HUB_LINKS } from "../content/hub.js";
import StarIcon from "../components/StarIcon.jsx";
import IntroSequence from "../components/IntroSequence.jsx";
import { useEntrance } from "../entrance.js";

/* Brand Hub homepage — the elevated front door into the brand system. Reuses
   the existing shell, tokens, and terminal/block visual language. The hero is a
   full-bleed modular grid (headline + blurple lede on the left; a shortcuts
   panel and the internal-only notice on the right). The sidebar reveal that
   accompanies this entrance lives in Layout.jsx. */

const ExternalIcon = () => (
  <svg className="hub-ext__ic" width="12" height="12" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M8 4H2V16H14V10H16V18H0V2H8V4ZM8 12H6V10H8V12ZM10 10H8V8H10V10ZM12 8H10V6H12V8ZM18 8H16V4H14V2H10V0H18V8ZM14 6H12V4H14V6Z" fill="currentColor" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M12 12H0V10.5H12V12ZM6.75 6H8.25V7.5H6.75V9H5.25V7.5H3.75V6H5.25V0H6.75V6ZM3.75 6H2.25V4.5H3.75V6ZM9.75 6H8.25V4.5H9.75V6Z" fill="currentColor" />
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
  // Opening sequence: plays only on a fresh load of "/" (first visit or reload),
  // not when navigating to home from another page, and never under
  // prefers-reduced-motion. `phase` gates the entrance and is published as a
  // `data-intro` attribute on <html> so the shell reveals in step:
  //   "hold"   — everything hidden under the full-screen fill
  //   "frame"  — fill has locked onto the hero; the frame lines draw in
  //   "reveal" — the content loads in independently
  //   "off"    — no intro
  // `overlay` mounts the IntroSequence.
  const { isBoot, reduce } = useEntrance();
  const [phase, setPhase] = useState(() => (isBoot && !reduce ? "hold" : "off"));
  const [overlay, setOverlay] = useState(() => phase !== "off");

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;

  useEffect(() => {
    if (phase === "off") return undefined;
    const el = document.documentElement;
    el.setAttribute("data-intro", phase);
    return () => el.removeAttribute("data-intro");
  }, [phase]);

  return (
    <div className="hub">
      {/* ---- Hero: full-bleed modular grid ---- */}
      <header className="hub-hero">
        <div className="hub-hero__grid">
          <div className="hub-hero__left">
            <h1 className="hub-title">Welcome to the Chainguard brand&nbsp;hub</h1>
            <p className="hub-lede">
              Your go-to resource for everything brand—bringing together guidelines, assets, and tools to help every
              employee represent Chainguard clearly and consistently.
            </p>
          </div>

          <section className="hub-hero__panel hub-hero__shortcuts" aria-label="Brand shortcuts">
            <div className="hub-panel__head">
              <span className="cpal-note__icon"><ExternalIcon /></span>
              <span className="hub-panel__eyebrow t-label">Brand shortcuts</span>
            </div>
            <div className="hub-scuts">
              <a className="hub-scut" href="#" onClick={(e) => e.preventDefault()}>
                <DownloadIcon /><span>Download all logos</span>
              </a>
              <a className="hub-scut" href="#" onClick={(e) => e.preventDefault()}>
                <DownloadIcon /><span>Download all fonts</span>
              </a>
              <Link className="hub-scut" to="/assets/icons">
                <span>View all Chainguard icons</span>
              </Link>
            </div>
          </section>

          <section className="hub-hero__panel hub-hero__note" aria-label="Please note">
            <div className="hub-panel__head">
              <span className="cpal-note__icon"><StarIcon /></span>
              <span className="hub-panel__eyebrow t-label">Please note</span>
            </div>
            <p className="hub-panel__body">
              This is an internal-only resource. If you are looking for an external guide to share with partners, press,
              or other third parties, please visit the{" "}
              <a className="hub-note__link" href={HUB_LINKS.mediaKit} target="_blank" rel="noopener noreferrer">
                Media Kit<ExternalIcon />
              </a>
              .
            </p>
          </section>
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
              <ExternalIcon /><span>Message Andrea on Slack</span>
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
                <span className="hub-action__label">Asana request form</span>
                <span className="hub-action__desc t-body-sm">For members of the marketing team.</span>
              </a>
              <a className="hub-action hub-action--primary" href={HUB_LINKS.creativeForm} target="_blank" rel="noopener noreferrer">
                <span className="hub-action__audience t-label">Everyone else</span>
                <span className="hub-action__label">Company creative request</span>
                <span className="hub-action__desc t-body-sm">For everyone else at Chainguard.</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {overlay && (
        <IntroSequence
          onLanded={() => {
            // Fill locked onto the hero. Desktop: draw the frame (keep the
            // shrunken fill — it sits on the hero, identical blurple). Mobile:
            // no frame lines, so drop the fill and go straight to content.
            if (isMobile) {
              setOverlay(false);
              setPhase("reveal");
            } else {
              setPhase("frame");
            }
          }}
          onContent={() => {
            // Frame drawn: drop the fill and file the content in.
            setOverlay(false);
            setPhase("reveal");
          }}
        />
      )}
    </div>
  );
}
