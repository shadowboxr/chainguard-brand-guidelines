import { useState } from "react";

// Segmented "icon + label" button (Figma 195:7208 / 195:7621). Renders either a
// copy-to-clipboard button (when `copy` is set) or an external link (when `href`
// is set). The label uppercases via CSS; on copy it briefly reads "Copied".
export default function TemplateButton({ icon, label, href, copy }) {
  const [copied, setCopied] = useState(false);
  const inner = (
    <>
      <span className="tmplbtn__icon">
        <img src={icon} alt="" />
      </span>
      <span className="tmplbtn__label">{copied ? "Copied" : label}</span>
    </>
  );

  if (copy) {
    return (
      <button
        type="button"
        className="tmplbtn"
        onClick={() => {
          navigator.clipboard?.writeText(copy);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        }}
      >
        {inner}
      </button>
    );
  }

  return (
    <a className="tmplbtn" href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  );
}
