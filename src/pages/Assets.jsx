import DocPage from "./DocPage.jsx";
import { PAGES } from "../content/assets.js";

// Blocky download arrow (Figma 161:10112) — matches the Typography button.
const DL_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M12 12H0V10.5H12V12ZM6.75 6H8.25V7.5H6.75V9H5.25V7.5H3.75V6H5.25V0H6.75V6ZM3.75 6H2.25V4.5H3.75V6ZM9.75 6H8.25V4.5H9.75V6Z" fill="currentColor" />
  </svg>
);

// Download-all-logos button that sits under the scrollspy on the Logo page.
const LOGOS_BUTTON = (
  <a className="toc__dl" href="#" onClick={(e) => e.preventDefault()}>
    {DL_ICON}
    <span>Download all logos</span>
  </a>
);

// One page per Assets topic (page = "logo" | "icons" | "illustrations" |
// "templates"). Hero stays "Chainguard Assets".
export default function Assets({ page }) {
  const p = PAGES[page] || PAGES.logo;
  return (
    <DocPage
      sections={p.sections}
      toc={p.toc}
      ids={p.toc.map((t) => t.id)}
      title="Chainguard Assets"
      tocFooter={page === "logo" ? LOGOS_BUTTON : null}
    />
  );
}
