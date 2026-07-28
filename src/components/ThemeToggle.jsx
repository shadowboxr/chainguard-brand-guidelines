import { useState, useEffect, useCallback } from "react";

/* Three-way color-theme control (Figma 153:9476). System / Light / Dark, with a
   blurple indicator that slides between segments and a tooltip on each. "System"
   follows the OS preference and keeps tracking it live; the choice persists. */

const STORAGE_KEY = "cg-theme";

// Chainguard's blocky icon set — paths lifted from the Figma export, recolored
// to currentColor so the active/inactive states are driven by CSS.
const ICONS = {
  system: "M24 25H6V5H24V25ZM8 23H22V7H8V23ZM20 13V21H10V13H20ZM16 11H10V9H16V11Z",
  light:
    "M15.833 25H14.167V21.667H15.833V25ZM8.33301 23.333H6.66699V21.667H8.33301V23.333ZM23.333 23.333H21.667V21.667H23.333V23.333ZM10 21.667H8.33301V20H10V21.667ZM21.667 21.667H20V20H21.667V21.667ZM18.333 20H11.667V18.333H18.333V20ZM11.667 18.333H10V11.667H11.667V18.333ZM20 18.333H18.333V11.667H20V18.333ZM8.33301 15.833H5V14.167H8.33301V15.833ZM25 15.833H21.667V14.167H25V15.833ZM18.333 11.667H11.667V10H18.333V11.667ZM10 10H8.33301V8.33301H10V10ZM21.667 10H20V8.33301H21.667V10ZM8.33301 8.33301H6.66699V6.66699H8.33301V8.33301ZM15.833 8.33301H14.167V5H15.833V8.33301ZM23.333 8.33301H21.667V6.66699H23.333V8.33301Z",
  dark:
    "M20.4004 24H11.4004V22.2002H20.4004V24ZM11.4004 22.2002H9.59961V20.4004H11.4004V22.2002ZM22.2002 22.2002H20.4004V20.4004H22.2002V22.2002ZM9.59961 20.4004H7.7998V18.5996H9.59961V20.4004ZM24 20.4004H22.2002V16.7998H20.4004V15H22.2002V13.2002H24V20.4004ZM7.7998 18.5996H6V9.59961H7.7998V18.5996ZM20.4004 18.5996H15V16.7998H20.4004V18.5996ZM15 16.7998H13.2002V15H15V16.7998ZM13.2002 15H11.4004V9.59961H13.2002V15ZM9.59961 9.59961H7.7998V7.7998H9.59961V9.59961ZM16.7998 7.7998H15V9.59961H13.2002V7.7998H9.59961V6H16.7998V7.7998Z",
};

const OPTIONS = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

function getStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "system";
  } catch (e) {
    return "system";
  }
}

export default function ThemeToggle() {
  const [choice, setChoice] = useState(getStored);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved = choice === "system" ? (mq.matches ? "dark" : "light") : choice;
      document.documentElement.setAttribute("data-theme", resolved);
    };
    apply();
    // Keep tracking the OS while "System" is selected.
    if (choice === "system") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [choice]);

  const pick = useCallback((id) => {
    setChoice(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {}
  }, []);

  const idx = OPTIONS.findIndex((o) => o.id === choice);

  return (
    <div className="ttoggle" role="radiogroup" aria-label="Color theme">
      <span className="ttoggle__slider" style={{ "--i": idx }} aria-hidden="true" />
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={choice === o.id}
          className={"ttoggle__seg" + (choice === o.id ? " is-on" : "")}
          onClick={() => pick(o.id)}
        >
          <svg className="ttoggle__ic" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d={ICONS[o.id]} fill="currentColor" />
          </svg>
          <span className="ttoggle__tip" role="tooltip">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
