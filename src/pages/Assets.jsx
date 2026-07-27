import DocPage from "./DocPage.jsx";
import { PAGES } from "../content/assets.js";

// One page per Assets topic (page = "logo" | "icons" | "illustrations" |
// "templates"). Hero stays "Chainguard Assets".
export default function Assets({ page }) {
  const p = PAGES[page] || PAGES.logo;
  return <DocPage sections={p.sections} toc={p.toc} ids={p.toc.map((t) => t.id)} title="Chainguard Assets" />;
}
