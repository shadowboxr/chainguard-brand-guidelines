import { useRef, useState, useCallback, useEffect } from "react";

/* "The cursor" — interactive blinking-cursor demo (Figma 51:668).
   Pick a color (top-left) and an animation preset (bottom-left); the feel label
   (top-right) tracks the preset, and Copy CSS (bottom-right) copies the
   preset's animation CSS. The cursor block is 1x wide x 2x tall in a 3x3 grid. */

const COLORS = [
  { name: "Blurple", hex: "#6226FB" },
  { name: "Fuchsia", hex: "#FD2BF2" },
  { name: "Aqua", hex: "#2BBAFD" },
  { name: "Lime", hex: "#04BD13" },
  { name: "Solar", hex: "#FD3964" },
  { name: "Amber", hex: "#F8C222" },
  { name: "Orange", hex: "#F85722" },
  { name: "Ink", hex: "#0D161C" },
];

const PRESETS = [
  {
    key: "standard",
    label: "Standard",
    feel: "Active / Neutral",
    cls: "",
    anim: "cursor-blink",
    dur: "1.1s",
    keyframes: "    0%, 50%       { opacity: 1; }\n    50.01%, 100%  { opacity: 0; }",
  },
  {
    key: "confident",
    label: "Confident",
    feel: "Secure / Resolved",
    cls: "cur-block--confident",
    anim: "confident-blink",
    dur: "1.5s",
    keyframes: "    0%, 80%       { opacity: 1; }\n    80.01%, 100%  { opacity: 0; }",
  },
  {
    key: "alert",
    label: "Alert",
    feel: "Protective / Responsive",
    cls: "cur-block--alert",
    anim: "alert-blink",
    dur: "1.2s",
    keyframes: "    0%, 16%, 32%       { opacity: 1; }\n    8%, 24%, 40%, 100%  { opacity: 0; }",
  },
];

// Full, self-contained snippet: markup + color + adaptable size + animation.
// The developer scales the whole cursor by changing --cursor-size.
function buildSnippet(color, preset) {
  return (
    `<span class="cg-cursor"></span>\n\n` +
    `<style>\n` +
    `  .cg-cursor {\n` +
    `    --cursor-size: 24px;              /* 1x unit — change to scale */\n` +
    `    display: inline-block;\n` +
    `    width: var(--cursor-size);\n` +
    `    height: calc(var(--cursor-size) * 2);   /* 1x wide, 2x tall */\n` +
    `    background: ${color.hex};            /* ${color.name} */\n` +
    `    animation: ${preset.anim} ${preset.dur} steps(1, end) infinite;\n` +
    `  }\n\n` +
    `  @keyframes ${preset.anim} {\n${preset.keyframes}\n  }\n` +
    `</style>`
  );
}

// Small dropdown matching the contrast-checker style (optional color dot).
function Dropdown({ value, options, onPick, dot }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return (
    <div className={"cc-drop-wrap" + (open ? " is-open" : "")} ref={wrapRef}>
      <button type="button" className="cc-drop" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {dot ? <span className="cc-dot" style={{ background: value.hex }} /> : null}
        <span className="cc-drop__val">{value.name || value.label}</span>
        <span className="cc-drop__arw">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <div className="cc-drop-menu">
        {options.map((o, i) => (
          <button type="button" className="cc-drop-opt" key={i} onClick={() => { onPick(i); setOpen(false); }}>
            {dot ? <span className="cc-dot" style={{ background: o.hex }} /> : null}
            {o.name || o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Cursor() {
  const [colorIdx, setColorIdx] = useState(0);
  const [presetIdx, setPresetIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyT = useRef(0);
  const color = COLORS[colorIdx];
  const preset = PRESETS[presetIdx];

  useEffect(() => () => window.clearTimeout(copyT.current), []);

  const copyCss = useCallback(() => {
    try { if (navigator.clipboard) navigator.clipboard.writeText(buildSnippet(color, preset)); } catch (e) {}
    setCopied(true);
    window.clearTimeout(copyT.current);
    copyT.current = window.setTimeout(() => setCopied(false), 1200);
  }, [color, preset]);

  return (
    <div className="cur">
      <div className="cur-grid" aria-hidden="true">
        <span className="cur-line cur-line--v1" />
        <span className="cur-line cur-line--v2" />
        <span className="cur-line cur-line--h1" />
        <span className="cur-line cur-line--h2" />
      </div>

      <span className="cur-lbl cur-lbl--top">1x</span>
      <span className="cur-lbl cur-lbl--bottom">1x</span>
      <span className="cur-lbl cur-lbl--left">2x</span>
      <span className="cur-lbl cur-lbl--right">2x</span>

      {/* keyed so the blink animation restarts cleanly when the preset changes */}
      <div key={preset.key} className={"cur-block " + preset.cls} style={{ background: color.hex }} />

      <div className="cur-tl">
        <Dropdown value={color} options={COLORS} onPick={setColorIdx} dot />
      </div>
      <div className="cur-tr">{preset.feel}</div>
      <div className="cur-bl">
        <Dropdown value={preset} options={PRESETS} onPick={setPresetIdx} />
      </div>
      <div className="cur-br">
        <button type="button" className={"cur-copy" + (copied ? " is-copied" : "")} onClick={copyCss}>
          {copied ? "Copied" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}
