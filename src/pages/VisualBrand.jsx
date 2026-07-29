import DocPage from "./DocPage.jsx";
import { PAGES } from "../content/visual-brand.js";

// Blocky download arrow (Figma 161:10112) — currentColor so it inherits the
// button's text color.
const DL_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M12 12H0V10.5H12V12ZM6.75 6H8.25V7.5H6.75V9H5.25V7.5H3.75V6H5.25V0H6.75V6ZM3.75 6H2.25V4.5H3.75V6ZM9.75 6H8.25V4.5H9.75V6Z" fill="currentColor" />
  </svg>
);

// Download-all-fonts button that sits under the scrollspy on the Typography page.
const FONTS_BUTTON = (
  <a className="toc__dl" href="#" onClick={(e) => e.preventDefault()}>
    {DL_ICON}
    <span>Download all fonts</span>
  </a>
);

// One page per Visual Brand topic (page = "color" | "typography" |
// "design-elements" | "data-visualization"). Hero stays "Visual brand".
export default function VisualBrand({ page }) {
  const p = PAGES[page] || PAGES.color;
  return (
    <DocPage
      sections={p.sections}
      toc={p.toc}
      ids={p.toc.map((t) => t.id)}
      title="Visual brand"
      tocFooter={page === "typography" ? FONTS_BUTTON : null}
    />
  );
}
