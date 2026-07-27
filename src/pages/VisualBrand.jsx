import DocPage from "./DocPage.jsx";
import { PAGES } from "../content/visual-brand.js";

// One page per Visual Brand topic (page = "color" | "typography" |
// "design-elements" | "data-visualization"). Hero stays "Visual Brand".
export default function VisualBrand({ page }) {
  const p = PAGES[page] || PAGES.color;
  return <DocPage sections={p.sections} toc={p.toc} ids={p.toc.map((t) => t.id)} title="Visual Brand" />;
}
