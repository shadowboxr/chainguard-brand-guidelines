import { useRef, useState, useEffect } from "react";
import OptionsSheet from "./OptionsSheet.jsx";

/* "Dot grid" (Figma 51:2842) — a fully-filled grid of blocks in a single core
   color. Unlike the block sections, every cell is filled and only one core
   color shows at a time. The user can switch grid sizes (default: Small). */

const SIZES = [
  { label: "Large", cols: 4 },
  { label: "Medium", cols: 8 },
  { label: "Small", cols: 16 },
  { label: "Extra small", cols: 32 },
];
const DEFAULT_SIZE = 2; // Small

// Single core color at a time — no accents, no multi-select.
const COLORS = [
  { key: "blurple", label: "Blurple", token: "b0", dot: "#6226FB" },
  { key: "fuchsia", label: "Fuchsia", token: "f0", dot: "#FD2BF2" },
  { key: "aqua", label: "Aqua", token: "a0", dot: "#2BBAFD" },
];

function Dropdown({ value, options, onPick }) {
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
        <span className="cc-drop__val">{value.label}</span>
        <span className="cc-drop__arw">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <div className="cc-drop-menu">
        {options.map((o, i) => (
          <button type="button" className="cc-drop-opt" key={o.label} onClick={() => { onPick(i); setOpen(false); }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DotGrid() {
  const [sizeIdx, setSizeIdx] = useState(DEFAULT_SIZE);
  const [colorKey, setColorKey] = useState("blurple");
  const [dotSize, setDotSize] = useState(25); // % of the cell (5-95)
  const cols = SIZES[sizeIdx].cols;
  const count = cols * cols;
  const color = COLORS.find((c) => c.key === colorKey);

  const fieldRef = useRef(null);
  const [copied, setCopied] = useState(false);
  // Serialize the field to a standalone SVG: one centered square per cell, sized
  // by the dot slider, in the active core color read off the rendered element.
  const copyGrid = () => {
    const el = fieldRef.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const fill = cs.getPropertyValue(`--bb-${color.token}`).trim() || color.dot;
    const bg = cs.backgroundColor;
    const CELL = 24;
    const size = cols * CELL;
    const d = CELL * (dotSize / 100);
    const off = (CELL - d) / 2;
    let rects = "";
    for (let i = 0; i < count; i++) {
      const x = ((i % cols) * CELL + off).toFixed(2);
      const y = (Math.floor(i / cols) * CELL + off).toFixed(2);
      rects += `<rect x="${x}" y="${y}" width="${d.toFixed(2)}" height="${d.toFixed(2)}" fill="${fill}"/>`;
    }
    const svg =
      `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${size}" height="${size}" fill="${bg}"/>${rects}</svg>`;
    navigator.clipboard?.writeText(svg);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  const copyBtn = <button type="button" className="bb-btn" onClick={copyGrid}>{copied ? "Copied" : "Copy SVG"}</button>;

  const sizeDrop = <Dropdown value={SIZES[sizeIdx]} options={SIZES} onPick={setSizeIdx} />;
  const dotSizeCtrl = (
    <label className="bb-density">
      <span className="bb-density__label">Dot size</span>
      <input type="range" min="5" max="95" value={dotSize} onChange={(e) => setDotSize(+e.target.value)} aria-label="Dot size" />
    </label>
  );
  const colorToggles = COLORS.map((c) => {
    const on = c.key === colorKey;
    return (
      <button type="button" key={c.key} className={"bb-tog" + (on ? " is-on" : "")} style={{ "--tog-color": c.dot }} aria-pressed={on} onClick={() => setColorKey(c.key)}>
        <span className="bb-tog__dot" />
        {c.label}
      </button>
    );
  });

  return (
    <div ref={fieldRef} className="bblocks bblocks--dots" style={{ "--dg-c": `var(--bb-${color.token})`, "--dg-size": dotSize + "%" }}>
      <div className="bblocks__grid" style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${cols},1fr)` }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="dg-cell"><span className="dg-dot" /></div>
        ))}
      </div>

      {/* Desktop: controls overlaid on the demo */}
      <div className="bblocks__top">
        <div className="bblocks__topleft">
          {sizeDrop}
          {dotSizeCtrl}
        </div>
        <div className="bblocks__topright">{copyBtn}</div>
      </div>
      <div className="bblocks__bottom">
        <div className="bblocks__hues">{colorToggles}</div>
      </div>

      {/* Mobile (<=600px): the same controls collapsed into a bottom sheet */}
      <OptionsSheet>
        <div className="osheet__field">
          <span className="osheet__lbl">Size</span>
          {sizeDrop}
        </div>
        <div className="osheet__field osheet__field--wide">{dotSizeCtrl}</div>
        <div className="osheet__field osheet__field--wide">
          <span className="osheet__lbl">Color</span>
          <div className="osheet__toggles">{colorToggles}</div>
        </div>
        <div className="osheet__field osheet__field--wide">{copyBtn}</div>
      </OptionsSheet>
    </div>
  );
}
