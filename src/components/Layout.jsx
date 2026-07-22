import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

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
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const isMobile = useMediaQuery();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="layout">
      {!isMobile && (
        <aside className="layout__sidebar">
          <Sidebar />
        </aside>
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
          <button
            type="button"
            className="topbar__theme"
            aria-label="Toggle color theme"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <span className="topbar__label t-label">Brand Guidelines</span>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
