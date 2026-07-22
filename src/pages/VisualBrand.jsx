import DocPage from "./DocPage.jsx";
import { SECTIONS, TOC, IDS } from "../content/visual-brand.js";

export default function VisualBrand() {
  return <DocPage sections={SECTIONS} toc={TOC} ids={IDS} title="Visual Brand" />;
}
