import DocPage from "./DocPage.jsx";
import { SECTIONS, TOC, IDS } from "../content/foundations.js";

export default function Foundations() {
  return <DocPage sections={SECTIONS} toc={TOC} ids={IDS} title="Foundation" />;
}
