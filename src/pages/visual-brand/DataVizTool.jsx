import { useState, useEffect } from "react";
import Carousel from "./Carousel.jsx";
import dv1Light from "../../assets/dataviz/dv-1-light.svg";
import dv1Dark from "../../assets/dataviz/dv-1-dark.svg";
import dv2Light from "../../assets/dataviz/dv-2-light.svg";
import dv2Dark from "../../assets/dataviz/dv-2-dark.svg";
import dv3Light from "../../assets/dataviz/dv-3-light.svg";
import dv3Dark from "../../assets/dataviz/dv-3-dark.svg";
import dv4Light from "../../assets/dataviz/dv-4-light.svg";
import dv4Dark from "../../assets/dataviz/dv-4-dark.svg";

/* Full-width data-viz tool (Figma 194:5978). A carousel of example charts, each
   with a light and dark rendering. A per-preview light/dark toggle (the nav
   theme-toggle control, but two segments) swaps the shown version WITHOUT
   changing the site theme. It defaults to the current theme and follows it if
   the theme changes, but the reader can flip it to compare both. */

const EXAMPLES = [
  { light: dv1Light, dark: dv1Dark, alt: "Migrating Dockerfile progress view" },
  { light: dv2Light, dark: dv2Dark, alt: "Data visualization example 2" },
  { light: dv3Light, dark: dv3Dark, alt: "Data visualization example 3" },
  { light: dv4Light, dark: dv4Dark, alt: "Data visualization example 4" },
];

// Light / Dark segment icons — same blocky set as the nav theme toggle.
const ICONS = {
  light:
    "M15.833 25H14.167V21.667H15.833V25ZM8.33301 23.333H6.66699V21.667H8.33301V23.333ZM23.333 23.333H21.667V21.667H23.333V23.333ZM10 21.667H8.33301V20H10V21.667ZM21.667 21.667H20V20H21.667V21.667ZM18.333 20H11.667V18.333H18.333V20ZM11.667 18.333H10V11.667H11.667V18.333ZM20 18.333H18.333V11.667H20V18.333ZM8.33301 15.833H5V14.167H8.33301V15.833ZM25 15.833H21.667V14.167H25V15.833ZM18.333 11.667H11.667V10H18.333V11.667ZM10 10H8.33301V8.33301H10V10ZM21.667 10H20V8.33301H21.667V10ZM8.33301 8.33301H6.66699V6.66699H8.33301V8.33301ZM15.833 8.33301H14.167V5H15.833V8.33301ZM23.333 8.33301H21.667V6.66699H23.333V8.33301Z",
  dark:
    "M20.4004 24H11.4004V22.2002H20.4004V24ZM11.4004 22.2002H9.59961V20.4004H11.4004V22.2002ZM22.2002 22.2002H20.4004V20.4004H22.2002V22.2002ZM9.59961 20.4004H7.7998V18.5996H9.59961V20.4004ZM24 20.4004H22.2002V16.7998H20.4004V15H22.2002V13.2002H24V20.4004ZM7.7998 18.5996H6V9.59961H7.7998V18.5996ZM20.4004 18.5996H15V16.7998H20.4004V18.5996ZM15 16.7998H13.2002V15H15V16.7998ZM13.2002 15H11.4004V9.59961H13.2002V15ZM9.59961 9.59961H7.7998V7.7998H9.59961V9.59961ZM16.7998 7.7998H15V9.59961H13.2002V7.7998H9.59961V6H16.7998V7.7998Z",
};

const MODES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

function effectiveTheme() {
  if (typeof document === "undefined") return "light";
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "light" || t === "dark") return t;
  return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function DataVizTool({ examples = EXAMPLES }) {
  const [mode, setMode] = useState(effectiveTheme);

  // Follow the site theme when it changes; a manual toggle overrides until then.
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() => setMode(effectiveTheme()));
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const idx = MODES.findIndex((m) => m.id === mode);
  const images = examples.map((e) => ({ src: mode === "dark" ? e.dark : e.light, alt: e.alt }));

  return (
    <div className="dvtool">
      <div className="ttoggle dvtool__toggle" data-mode={mode} role="radiogroup" aria-label="Preview theme">
        <span className="ttoggle__slider" style={{ "--i": idx }} aria-hidden="true" />
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              className={"ttoggle__seg" + (mode === m.id ? " is-on" : "")}
              onClick={() => setMode(m.id)}
            >
              <svg className="ttoggle__ic" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <path d={ICONS[m.id]} fill="currentColor" />
              </svg>
              <span className="ttoggle__tip" role="tooltip">{m.label}</span>
            </button>
          ))}
      </div>
      <Carousel images={images} full />
    </div>
  );
}
