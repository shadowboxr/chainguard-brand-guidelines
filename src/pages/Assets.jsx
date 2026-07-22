import DocPage from "./DocPage.jsx";
import { SECTIONS, TOC, IDS } from "../content/assets.js";

export default function Assets() {
  return <DocPage sections={SECTIONS} toc={TOC} ids={IDS} title="Chainguard Assets" />;
}
