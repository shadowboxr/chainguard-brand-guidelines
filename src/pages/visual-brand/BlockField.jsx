import { useRef, useState, useEffect, useCallback, useMemo } from "react";

/* Shared block-field engine behind "Building blocks" and "Patterns"
   (Figma 51:2842 / 51:2932). Props:
   - autoCycle: auto-advance the block size until the user interacts (then
     pause; resume after 20s idle). Used by Building blocks.
   - grid: overlay the visible gridlines behind the blocks. Used by Patterns.
   - densitySlider: show a 0-100% density slider that drives how many blocks
     are filled (stable layout — dragging reveals/hides cells). Used by
     Patterns. Without it, a fixed ~50% fill with guaranteed cores is used. */

const SIZES = [
  { label: "Large", cols: 4 },
  { label: "Medium", cols: 8 },
  { label: "Small", cols: 16 },
  { label: "Extra small", cols: 32 },
];

// coreW keeps blurple primary; accentTotal is each hue's total accent weight
// (split evenly across its tiers) and is equal for every hue.
const HUES = [
  { key: "blurple", label: "Blurple", dot: "#6226FB", core: "b0", accents: ["b1", "b2", "b3", "b4"], coreW: 6, accentTotal: 2 },
  { key: "fuchsia", label: "Fuchsia", dot: "#FD2BF2", core: "f0", accents: ["f1", "f2"], coreW: 4, accentTotal: 2 },
  { key: "aqua", label: "Aqua", dot: "#2BBAFD", core: "a0", accents: ["a1", "a2"], coreW: 4, accentTotal: 2 },
];

const FIXED_FILL = 0.5;
const STEP_MS = 2600;
const IDLE_MS = 20000;

// Weighted field of shade tokens. Guarantees each active hue's core, weights
// cores over accents, keeps blurple primary, then shuffles positions.
function genCells(count, activeHues, coreOnly, fillRate) {
  const active = HUES.filter((h) => activeHues[h.key]);
  if (active.length === 0) return new Array(count).fill(null);
  const filled = Math.min(count, Math.max(0, Math.round(count * fillRate)));
  if (filled === 0) return new Array(count).fill(null);

  const sw = [];
  active.forEach((h) => {
    sw.push({ token: h.core, w: h.coreW });
    if (!coreOnly) h.accents.forEach((a) => sw.push({ token: a, w: h.accentTotal / h.accents.length }));
  });

  const toks = [];
  for (const h of active) { if (toks.length < filled) toks.push(h.core); } // guarantee cores (capped)
  const remaining = filled - toks.length;
  if (remaining > 0) {
    const totalW = sw.reduce((s, x) => s + x.w, 0);
    const exact = sw.map((x) => (remaining * x.w) / totalW);
    const alloc = exact.map(Math.floor);
    const deficit = remaining - alloc.reduce((a, b) => a + b, 0);
    const order = exact.map((v, i) => [i, v - Math.floor(v)]).sort((a, b) => b[1] - a[1]);
    for (let k = 0; k < deficit; k++) alloc[order[k % order.length][0]]++;
    sw.forEach((x, i) => { for (let k = 0; k < alloc[i]; k++) toks.push(x.token); });
  }

  while (toks.length < count) toks.push(null);
  toks.length = count;
  for (let i = toks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toks[i], toks[j]] = [toks[j], toks[i]];
  }
  return toks;
}

function shuffledRanks(count) {
  const idx = [...Array(count).keys()];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const rank = new Array(count);
  idx.forEach((cell, order) => { rank[cell] = order; });
  return rank;
}

function Dropdown({ value, options, onPick, onOpen }) {
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
      <button type="button" className="cc-drop" aria-expanded={open} onClick={() => { setOpen((o) => !o); onOpen && onOpen(); }}>
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

export default function BlockField({ autoCycle = false, grid = false, densitySlider = false }) {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [active, setActive] = useState({ blurple: true, fuchsia: false, aqua: false });
  const [coreOnly, setCoreOnly] = useState(false);
  const [density, setDensity] = useState(50);
  const [base, setBase] = useState({ tokens: [], rank: [] });
  const cols = SIZES[sizeIdx].cols;
  const count = cols * cols;

  // Auto-cycle plumbing (Building blocks only).
  const dirRef = useRef(1);
  const idleT = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (!autoCycle) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [autoCycle]);

  useEffect(() => {
    if (!autoCycle || paused || reduce) return;
    const id = window.setInterval(() => {
      setSizeIdx((i) => {
        let d = dirRef.current;
        if (i + d > SIZES.length - 1) d = -1;
        else if (i + d < 0) d = 1;
        dirRef.current = d;
        return i + d;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [autoCycle, paused, reduce]);

  useEffect(() => () => window.clearTimeout(idleT.current), []);

  const interact = useCallback(() => {
    if (!autoCycle) return;
    setPaused(true);
    window.clearTimeout(idleT.current);
    idleT.current = window.setTimeout(() => setPaused(false), IDLE_MS);
  }, [autoCycle]);

  // Base layout: for the slider, a full weighted grid + a stable reveal order;
  // otherwise a fixed ~50% fill with guaranteed cores.
  const regenBase = useCallback(() => {
    if (densitySlider) {
      setBase({ tokens: genCells(count, active, coreOnly, 1), rank: shuffledRanks(count) });
    } else {
      setBase({ tokens: genCells(count, active, coreOnly, FIXED_FILL), rank: [] });
    }
  }, [count, active, coreOnly, densitySlider]);

  useEffect(() => { regenBase(); }, [regenBase]);

  const cells = useMemo(() => {
    if (!densitySlider) return base.tokens;
    const show = Math.round(count * (density / 100));
    return base.tokens.map((t, i) => (base.rank[i] < show ? t : null));
  }, [base, density, densitySlider, count]);

  const toggle = (key) => { interact(); setActive((a) => ({ ...a, [key]: !a[key] })); };
  const shuffle = () => { interact(); regenBase(); };

  return (
    <div className={"bblocks" + (grid ? " bblocks--grid" : "")} style={grid ? { "--bb-cell": 100 / cols + "%" } : undefined}>
      <div className="bblocks__grid" style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${cols},1fr)` }}>
        {cells.map((t, i) => (
          <div key={i} className="bb-cell" style={{ background: t ? `var(--bb-${t})` : "transparent" }} />
        ))}
      </div>

      <div className="bblocks__top">
        <div className="bblocks__topleft">
          <Dropdown value={SIZES[sizeIdx]} options={SIZES} onPick={(i) => { interact(); setSizeIdx(i); }} onOpen={interact} />
          {densitySlider && (
            <label className="bb-density">
              <span className="bb-density__label">Density</span>
              <input type="range" min="0" max="100" value={density} onChange={(e) => setDensity(+e.target.value)} aria-label="Density" />
            </label>
          )}
        </div>
        <button type="button" className="bb-btn" onClick={shuffle}>Shuffle</button>
      </div>

      <div className="bblocks__bottom">
        <div className="bblocks__hues">
          {HUES.map((h) => {
            const on = active[h.key];
            return (
              <button type="button" key={h.key} className={"bb-tog" + (on ? " is-on" : "")} style={{ "--tog-color": h.dot }} aria-pressed={on} onClick={() => toggle(h.key)}>
                <span className="bb-tog__dot" />
                {h.label}
              </button>
            );
          })}
        </div>
        <button type="button" className={"bb-tog bb-tog--core" + (coreOnly ? " is-on" : "")} aria-pressed={coreOnly} onClick={() => { interact(); setCoreOnly((c) => !c); }}>
          <span className="bb-tog__dot" />
          Core Only
        </button>
      </div>
    </div>
  );
}
