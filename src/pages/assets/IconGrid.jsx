import { useState } from "react";
import TemplateButton from "./TemplateButton.jsx";
import cgMark from "../../assets/icon-grid/chainguard-mark.svg";

// The Icons hero (Figma 197:7773): a lavender grid of the pixel-style icons that
// links out to the icon library. Each icon is a button that copies its SVG.
const LIBRARY_URL = "https://chainguard-icons.vercel.app/";

// Raw SVG source for every icon in the folder, keyed by path.
const RAW = import.meta.glob("../../assets/icon-grid/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Row-major grid order, matching the Figma layout.
const ICONS = [
  "calendar", "git-branch", "bug",
  "github", "shield", "heart",
  "download", "trophy", "users",
].map((name) => ({
  name,
  raw: RAW[`../../assets/icon-grid/${name}.svg`],
}));

// Display copy: recolor to currentColor (so it tracks the theme) and drop the
// intrinsic size so CSS controls it. The clipboard still gets the canonical
// Blurple source untouched.
const toDisplay = (raw) =>
  raw.replace(/#6226FB/gi, "currentColor").replace(/\s(width|height)="[^"]*"/g, "");

export default function IconGrid() {
  const [copied, setCopied] = useState(null);

  const copy = (icon) => {
    navigator.clipboard?.writeText(icon.raw);
    setCopied(icon.name);
    window.setTimeout(() => setCopied((c) => (c === icon.name ? null : c)), 1400);
  };

  return (
    <div className="cgig">
      <div className="cgig__grid">
        {ICONS.map((icon) => (
          <button
            type="button"
            key={icon.name}
            className={"cgig__cell" + (copied === icon.name ? " cgig__cell--copied" : "")}
            onClick={() => copy(icon)}
            aria-label={`Copy ${icon.name.replace(/-/g, " ")} icon as SVG`}
          >
            <span
              className="cgig__icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: toDisplay(icon.raw) }}
            />
            <span className="cgig__hint">{copied === icon.name ? "Copied" : "Copy SVG"}</span>
          </button>
        ))}
      </div>
      <div className="cgig__cta">
        <TemplateButton icon={cgMark} label="View library" href={LIBRARY_URL} />
      </div>
    </div>
  );
}
