import { useState, useEffect } from "react";
import { useLocation, Outlet, Link } from "react-router-dom";
import Sidebar, { WHITE_LOGO } from "./Sidebar.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function useMediaQuery() {
  const q = "(max-width: 900px)";
  const [matches, setMatches] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return matches;
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery();
  const isHome = location.pathname === "/";
  // Home entrance: the sidebar starts hidden (full-bleed hero) and reveals on
  // first scroll, or after 5s of no scroll. Every visit to Home resets it.
  const [navRevealed, setNavRevealed] = useState(!isHome);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!isHome) {
      setNavRevealed(true);
      return;
    }
    setNavRevealed(false);
    const main = document.querySelector(".layout__main");
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setNavRevealed(true);
    };
    const onScroll = () => {
      if ((main?.scrollTop || 0) > 4) reveal();
    };
    const timer = window.setTimeout(reveal, 5000);
    main?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      main?.removeEventListener("scroll", onScroll);
    };
  }, [isHome, location.pathname]);

  const collapsed = isHome && !navRevealed && !isMobile;
  // Reset the scroll container to the top on page change (but not for in-page
  // hash links — DocPage scrolls those to their anchor).
  useEffect(() => {
    if (location.hash) return;
    document.querySelector(".layout__main")?.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <div className="layout">
      {!isMobile && (
        <aside className={"layout__sidebar" + (collapsed ? " is-collapsed" : "")}>
          <Sidebar />
        </aside>
      )}
      {/* Full-bleed home: a logo anchored top-left until the sidebar reveals. */}
      {isHome && !isMobile && (
        <Link to="/" className={"topbar__brand" + (navRevealed ? " is-hidden" : "")} aria-label="Chainguard — Brand Hub home">
          <img src={WHITE_LOGO} alt="" width={28} height={24} />
        </Link>
      )}
      {isMobile && (
        <div className={"drawer" + (open ? " drawer--open" : "")} role="dialog" aria-modal="true" aria-hidden={!open}>
          <div className="drawer__scrim" onClick={() => setOpen(false)} />
          <div className="drawer__panel">
            <button type="button" className="drawer__close" aria-label="Close navigation" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
      <div className="layout__main">
        <header className="topbar">
          <button
            type="button"
            className="topbar__menu"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="topbar__spacer" />
          <ThemeToggle />
          <span className="topbar__label t-label">Brand Guidelines</span>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
