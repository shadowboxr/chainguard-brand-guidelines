import { useRef, useState, useEffect, useCallback } from "react";

/* "The visible grid" — perfect-square grid that smoothly breathes between four
   sizes on a loop (Figma 51:2497). Interacting with the dropdown pauses the
   loop; after 20s of no interaction it resumes. */

// Square card, so each size is 100%/N → perfect squares (N columns).
const SIZES = [
  { label: "Large", pct: 25 },      // 4 cols
  { label: "Medium", pct: 12.5 },   // 8 cols
  { label: "Small", pct: 6.25 },    // 16 cols
  { label: "Extra small", pct: 3.125 }, // 32 cols
];

const IDLE_MS = 20000;
const STEP_MS = 2600;

function Dropdown({ value, options, onPick, onOpen }) {
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

export default function VisibleGrid() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const dirRef = useRef(1);
  const idleT = useRef(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Auto loop: bounce the size index Large <-> Extra small.
  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setIdx((i) => {
        let d = dirRef.current;
        if (i + d > SIZES.length - 1) d = -1;
        else if (i + d < 0) d = 1;
        dirRef.current = d;
        return i + d;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  useEffect(() => () => window.clearTimeout(idleT.current), []);

  // Any dropdown interaction pauses the loop and (re)arms the 20s idle timer.
  const interact = useCallback(() => {
    setPaused(true);
    window.clearTimeout(idleT.current);
    idleT.current = window.setTimeout(() => setPaused(false), IDLE_MS);
  }, []);

  const pick = useCallback((i) => { setIdx(i); interact(); }, [interact]);

  return (
    <div className="vgrid" style={{ "--vg-cell": SIZES[idx].pct + "%" }}>
      <div className="vgrid__tl">
        <Dropdown value={SIZES[idx]} options={SIZES} onPick={pick} onOpen={interact} />
      </div>
      <div className="vgrid__tr">The Grid</div>
    </div>
  );
}
