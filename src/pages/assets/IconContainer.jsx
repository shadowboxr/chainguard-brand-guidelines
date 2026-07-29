import { useRef, useState, useCallback, useEffect } from "react";
import OptionsSheet from "../visual-brand/OptionsSheet.jsx";

/* "The icon (Linky, in a container)" — interactive icon builder (Figma
   165:10324). Pick a background color (top-left) and container shape
   (bottom-left); Linky sits inside. Copy the CSS (top-right) or download the
   current selection as an SVG (bottom-right). On a white background Linky is
   Blurple; on Blurple/Ink it is white. */

// Linky glyph (from ChainguardLogo), native bbox ~78.843 × 69.101.
const LINKY_D =
  "M65.7798 41.7182C66.4102 39.5378 66.7527 37.1486 66.7527 34.5498C66.7527 18.2953 53.3457 0 39.9549 0C26.5643 0 13.1568 18.2953 13.1568 34.5498C13.1568 38.0938 13.7942 41.2482 14.9298 44.0143L6.88065 43.5606C3.60225 43.3757 0.581872 45.7192 1.0932 48.9708C1.29152 50.2321 1.66947 51.5231 2.34447 52.6379C0.0657903 54.245 -0.865032 57.1992 0.981326 59.5144C2.83483 61.8385 5.55626 63.98 9.29186 63.98C13.3436 63.98 15.7821 62.9302 17.263 61.6117C17.371 62.1875 17.594 62.7545 17.946 63.2903C19.7646 66.0582 22.7764 69.1007 27.229 69.1007C34.8035 69.1007 35.6483 64.3313 36.0722 61.938C36.1053 61.7507 36.1359 61.5778 36.1669 61.4231L41.2287 58.8852L46.2905 61.4231C46.3216 61.5778 46.3522 61.7502 46.3851 61.9375C46.8093 64.3308 47.6538 69.1007 55.2286 69.1007C59.6809 69.1007 62.693 66.0582 64.5115 63.2903C64.5829 63.1816 64.6492 63.0714 64.7099 62.9599C66.1372 63.5784 68.0261 63.98 70.532 63.98C74.2677 63.98 76.9892 61.8385 78.8429 59.5144C81.1128 56.6675 79.1845 52.8554 75.7144 51.7684L74.5681 51.4092C77.9348 49.6595 78.4303 46.3605 78.0697 43.4693C77.6622 40.2026 74.1124 38.7905 71.0136 39.8792L65.7798 41.7182Z";
const LINKY_VB = "0 0 78.843 69.101";
const LINKY_W = 78.843;
const LINKY_H = 69.101;
const FRAC = 0.58; // Linky width as a fraction of the container

// mark: Linky color on this background. White bg → Blurple Linky.
const COLORS = [
  { name: "Blurple", hex: "#6226FB", mark: "#FFFFFF" },
  { name: "Ink", hex: "#0D161C", mark: "#FFFFFF" },
  { name: "White", hex: "#FFFFFF", mark: "#6226FB" },
];
const SHAPES = [
  { key: "square", name: "Square", radiusCss: "0" },
  { key: "rounded", name: "Rounded", radiusCss: "22%" },
];

// Self-contained HTML + CSS snippet for the current selection.
function buildCss(color, shape) {
  return (
    `<div class="cg-icon" role="img" aria-label="Chainguard icon">\n` +
    `  <svg viewBox="${LINKY_VB}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n` +
    `    <path d="${LINKY_D}" fill="currentColor" />\n` +
    `  </svg>\n` +
    `</div>\n\n` +
    `<style>\n` +
    `  .cg-icon {\n` +
    `    --icon-size: 96px;            /* change to scale */\n` +
    `    display: inline-grid;\n` +
    `    place-items: center;\n` +
    `    width: var(--icon-size);\n` +
    `    height: var(--icon-size);\n` +
    `    background: ${color.hex};       /* ${color.name} */\n` +
    `    border-radius: ${shape.radiusCss};            /* ${shape.name} */\n` +
    `    color: ${color.mark};          /* Linky */\n` +
    `  }\n` +
    `  .cg-icon svg { width: ${Math.round(FRAC * 100)}%; height: auto; display: block; }\n` +
    `</style>`
  );
}

// Standalone SVG file for the current selection.
function buildSvg(color, shape) {
  const N = 96;
  const sc = (FRAC * N) / LINKY_W;
  const tx = ((N - LINKY_W * sc) / 2).toFixed(2);
  const ty = ((N - LINKY_H * sc) / 2).toFixed(2);
  const rx = shape.key === "rounded" ? (N * 0.22).toFixed(2) : "0";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}" viewBox="0 0 ${N} ${N}" fill="none">\n` +
    `  <rect width="${N}" height="${N}" rx="${rx}" fill="${color.hex}"/>\n` +
    `  <path transform="translate(${tx} ${ty}) scale(${sc.toFixed(4)})" d="${LINKY_D}" fill="${color.mark}"/>\n` +
    `</svg>\n`
  );
}

function Dropdown({ value, options, onPick, dot }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return (
    <div className={"cc-drop-wrap" + (open ? " is-open" : "")} ref={wrapRef}>
      <button type="button" className="cc-drop" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {dot ? <span className="cc-dot" style={{ background: value.hex }} /> : null}
        <span className="cc-drop__val">{value.name}</span>
        <span className="cc-drop__arw">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <div className="cc-drop-menu">
        {options.map((o, i) => (
          <button type="button" className="cc-drop-opt" key={o.key || o.name} onClick={() => { onPick(i); setOpen(false); }}>
            {dot ? <span className="cc-dot" style={{ background: o.hex }} /> : null}
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function IconContainer() {
  const [colorIdx, setColorIdx] = useState(0);
  const [shapeIdx, setShapeIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyT = useRef(0);
  const color = COLORS[colorIdx];
  const shape = SHAPES[shapeIdx];

  useEffect(() => () => window.clearTimeout(copyT.current), []);

  const copyCss = useCallback(() => {
    try { if (navigator.clipboard) navigator.clipboard.writeText(buildCss(color, shape)); } catch (e) {}
    setCopied(true);
    window.clearTimeout(copyT.current);
    copyT.current = window.setTimeout(() => setCopied(false), 1200);
  }, [color, shape]);

  const downloadSvg = useCallback(() => {
    const blob = new Blob([buildSvg(color, shape)], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chainguard-icon-${color.name.toLowerCase()}-${shape.key}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [color, shape]);

  // Defined once, rendered twice (desktop corners + mobile sheet); shared state.
  const colorDrop = <Dropdown value={color} options={COLORS} onPick={setColorIdx} dot />;
  const shapeDrop = <Dropdown value={shape} options={SHAPES} onPick={setShapeIdx} />;
  const copyBtn = (
    <button type="button" className={"cur-copy" + (copied ? " is-copied" : "")} onClick={copyCss}>
      {copied ? "Copied" : "Copy CSS"}
    </button>
  );
  const downloadBtn = (
    <button type="button" className="cur-copy" onClick={downloadSvg}>Download SVG</button>
  );

  return (
    <div
      className="iconc"
      style={{ "--iconc-bg": color.hex, "--iconc-mark": color.mark, "--iconc-r": shape.radiusCss }}
    >
      <div className="iconc-grid" aria-hidden="true">
        <span className="iconc-line iconc-line--v1" />
        <span className="iconc-line iconc-line--v2" />
        <span className="iconc-line iconc-line--h1" />
        <span className="iconc-line iconc-line--h2" />
      </div>

      <div className="iconc-box">
        <svg viewBox={LINKY_VB} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Linky on ${color.name}, ${shape.name} container`}>
          <path d={LINKY_D} fill="currentColor" />
        </svg>
      </div>

      {/* Desktop: controls in the four corners */}
      <div className="iconc-tl">{colorDrop}</div>
      <div className="iconc-tr">{copyBtn}</div>
      <div className="iconc-bl">{shapeDrop}</div>
      <div className="iconc-br">{downloadBtn}</div>

      {/* Mobile (<=600px): the same controls collapsed into a bottom sheet */}
      <OptionsSheet>
        <div className="osheet__field">
          <span className="osheet__lbl">Background</span>
          {colorDrop}
        </div>
        <div className="osheet__field">
          <span className="osheet__lbl">Shape</span>
          {shapeDrop}
        </div>
        <div className="osheet__field osheet__field--wide">{copyBtn}</div>
        <div className="osheet__field osheet__field--wide">{downloadBtn}</div>
      </OptionsSheet>
    </div>
  );
}
