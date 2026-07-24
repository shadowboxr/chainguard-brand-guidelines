import { useRef, useState, useEffect, useCallback } from "react";

/* "Building blocks" (Figma 51:2842) — a weighted-random field of solid color
   blocks on the same square grid. Blurple is the always-on core and always
   carries the most weight; Fuchsia / Aqua are additive light accents. Some
   cells stay empty. Shuffle re-randomizes the layout.

   Shade tokens (b0..b4 / f0..f1 / a0..a1) map to CSS variables that flip with
   the theme (see .bblocks in components.css), so blocks recolor on light/dark
   without regenerating the layout. Tier 0 is the core/heaviest shade. */

const SIZES = [
  { label: "Large", cols: 4 },
  { label: "Medium", cols: 8 },
  { label: "Small", cols: 16 },
  { label: "Extra small", cols: 32 },
];

const HUES = [
  { key: "blurple", label: "Blurple", dot: "#6226FB", tokens: ["b0", "b1", "b2", "b3", "b4"], weight: 3 },
  { key: "fuchsia", label: "Fuchsia", dot: "#FD2BF2", tokens: ["f0", "f1"], weight: 1 },
  { key: "aqua", label: "Aqua", dot: "#2BBAFD", tokens: ["a0", "a1"], weight: 1 },
];

const EMPTY_RATE = 0.5; // fraction of cells left empty

function tokenFor(hue) {
  // Blurple leans on its core (b0) so the core always carries more weight.
  if (hue.key === "blurple" && Math.random() < 0.4) return "b0";
  return hue.tokens[Math.floor(Math.random() * hue.tokens.length)];
}

// Reusable block-field generator (Patterns will reuse this with a density arg).
// Distributes filled cells by hue weight so blurple always has the largest
// share and every active accent appears at least once, then shuffles positions.
function genCells(count, activeHues, emptyRate = EMPTY_RATE) {
  const active = HUES.filter((h) => activeHues[h.key]);
  const filled = Math.min(count, Math.max(active.length, Math.round(count * (1 - emptyRate))));
  const totalW = active.reduce((s, h) => s + h.weight, 0);

  const counts = active.map((h) => Math.max(1, Math.floor((filled * h.weight) / totalW)));
  // Reconcile to `filled`; blurple (index 0, highest weight) absorbs the remainder.
  let sum = counts.reduce((a, b) => a + b, 0);
  counts[0] = Math.max(1, counts[0] + (filled - sum));

  const toks = [];
  active.forEach((h, i) => { for (let k = 0; k < counts[i]; k++) toks.push(tokenFor(h)); });
  while (toks.length < count) toks.push(null);
  toks.length = count;

  // Fisher-Yates shuffle for random placement.
  for (let i = toks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toks[i], toks[j]] = [toks[j], toks[i]];
  }
  return toks;
}

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

export default function BuildingBlocks() {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [active, setActive] = useState({ blurple: true, fuchsia: false, aqua: false });
  const [cells, setCells] = useState([]);
  const cols = SIZES[sizeIdx].cols;

  const regen = useCallback(() => {
    setCells(genCells(cols * cols, active));
  }, [cols, active]);

  // Regenerate when the size or active hues change.
  useEffect(() => { regen(); }, [regen]);

  const toggle = (key) => {
    if (key === "blurple") return; // blurple is the always-on base
    setActive((a) => ({ ...a, [key]: !a[key] }));
  };

  return (
    <div className="bblocks">
      <div className="bblocks__grid" style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${cols},1fr)` }}>
        {cells.map((t, i) => (
          <div key={i} className="bb-cell" style={{ background: t ? `var(--bb-${t})` : "transparent" }} />
        ))}
      </div>

      <div className="bblocks__top">
        <Dropdown value={SIZES[sizeIdx]} options={SIZES} onPick={setSizeIdx} />
        <button type="button" className="bb-btn" onClick={regen}>Shuffle</button>
      </div>

      <div className="bblocks__bottom">
        {HUES.map((h) => {
          const on = active[h.key];
          return (
            <button
              type="button"
              key={h.key}
              className={"bb-tog" + (on ? " is-on" : "")}
              style={{ "--tog-color": h.dot }}
              aria-pressed={on}
              onClick={() => toggle(h.key)}
            >
              <span className="bb-tog__dot" />
              {h.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
