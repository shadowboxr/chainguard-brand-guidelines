import { useRef, useState, useEffect, useCallback } from "react";

/* "Building blocks" (Figma 51:2842) — a weighted field of solid color blocks on
   the shared square grid. Blurple is the always-on base and stays primary.
   Each hue has a CORE (500) shade and lighter ACCENT tints; cores are
   prioritised over accents — including over blurple's tints — so the Fuchsia /
   Aqua cores always show when enabled. "Core Only" drops the accents entirely.

   Shade tokens (b0..b4 / f0..f2 / a0..a2) map to CSS variables that flip with
   the theme (see .bblocks in components.css). Cores (b0/f0/a0) stay vivid in
   both themes; accents mirror to the dark end of each scale in dark mode. */

const SIZES = [
  { label: "Large", cols: 4 },
  { label: "Medium", cols: 8 },
  { label: "Small", cols: 16 },
  { label: "Extra small", cols: 32 },
];

// coreW keeps blurple primary; accentTotal is the hue's TOTAL accent weight
// (split evenly across its tiers) and is equal for every hue, so no hue's
// accents overpower another's regardless of how many tiers it has.
const HUES = [
  { key: "blurple", label: "Blurple", dot: "#6226FB", core: "b0", accents: ["b1", "b2", "b3", "b4"], coreW: 6, accentTotal: 2 },
  { key: "fuchsia", label: "Fuchsia", dot: "#FD2BF2", core: "f0", accents: ["f1", "f2"], coreW: 4, accentTotal: 2 },
  { key: "aqua", label: "Aqua", dot: "#2BBAFD", core: "a0", accents: ["a1", "a2"], coreW: 4, accentTotal: 2 },
];

const EMPTY_RATE = 0.5;

// Reusable block-field generator (Patterns will reuse this with a density arg).
// Guarantees each active hue's core appears, weights cores over accents, keeps
// blurple primary, then shuffles positions.
function genCells(count, activeHues, coreOnly, emptyRate = EMPTY_RATE) {
  const active = HUES.filter((h) => activeHues[h.key]);
  const filled = Math.min(count, Math.max(active.length, Math.round(count * (1 - emptyRate))));

  const sw = [];
  active.forEach((h) => {
    sw.push({ token: h.core, w: h.coreW });
    if (!coreOnly) h.accents.forEach((a) => sw.push({ token: a, w: h.accentTotal / h.accents.length }));
  });

  // One guaranteed core per active hue (so Fuchsia / Aqua cores always show).
  const toks = active.map((h) => h.core);
  const remaining = Math.max(0, filled - active.length);
  const totalW = sw.reduce((s, x) => s + x.w, 0);

  // Largest-remainder allocation of the rest, proportional to weight.
  const exact = sw.map((x) => (remaining * x.w) / totalW);
  const alloc = exact.map(Math.floor);
  let deficit = remaining - alloc.reduce((a, b) => a + b, 0);
  const order = exact.map((v, i) => [i, v - Math.floor(v)]).sort((a, b) => b[1] - a[1]);
  for (let k = 0; k < deficit; k++) alloc[order[k % order.length][0]]++;
  sw.forEach((x, i) => { for (let k = 0; k < alloc[i]; k++) toks.push(x.token); });

  while (toks.length < count) toks.push(null);
  toks.length = count;
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
  const [coreOnly, setCoreOnly] = useState(false);
  const [cells, setCells] = useState([]);
  const cols = SIZES[sizeIdx].cols;

  const regen = useCallback(() => {
    setCells(genCells(cols * cols, active, coreOnly));
  }, [cols, active, coreOnly]);

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
        <div className="bblocks__hues">
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
        <button
          type="button"
          className={"bb-tog bb-tog--core" + (coreOnly ? " is-on" : "")}
          aria-pressed={coreOnly}
          onClick={() => setCoreOnly((c) => !c)}
        >
          <span className="bb-tog__dot" />
          Core Only
        </button>
      </div>
    </div>
  );
}
