import { useRef, useState, useCallback, useEffect, useMemo, useLayoutEffect } from "react";

/* Accessibility contrast checker (Figma 45:12084).
   Pick a color; the bottom scale shuffles the background; the endless carousel
   cycles every text color (from the color's own scale + the Ink/neutral scale)
   that passes WCAG >= 3:1 against that background. Copy hex on hover. */

// Brand scales (mirrors ColorScales.jsx).
const B = [["50", "#F8F6FE"], ["100", "#F1ECFE"], ["200", "#C8B6F6"], ["300", "#C0A8FD"], ["400", "#9D7AF6"], ["500", "#6226FB"], ["600", "#4104DD"], ["800", "#3200AF"], ["900", "#14003D"], ["950", "#090119"]];
const N = [["0", "#FFFFFF"], ["50", "#FBFBFF"], ["100", "#E7E8E8"], ["200", "#D0D2D3"], ["300", "#B7BABC"], ["400", "#9EA2A4"], ["500", "#7A7E81"], ["600", "#565C60"], ["700", "#3D4449"], ["800", "#192228"], ["900", "#0D161C"], ["950", "#060C10"]];
const FU = [["100", "#FEF5FE"], ["200", "#FDDFFC"], ["500", "#FD2BF2"], ["800", "#A10099"], ["900", "#480044"]];
const AQ = [["100", "#F5FCFF"], ["200", "#DFF4FE"], ["500", "#2BBAFD"], ["800", "#006A97"], ["900", "#003247"]];
const LI = [["100", "#F2FDF2"], ["200", "#E9FCEA"], ["500", "#04BD13"], ["800", "#108000"], ["900", "#083E00"]];
const SO = [["100", "#FEF6F6"], ["200", "#FCE0E0"], ["500", "#FD3964"], ["800", "#D40555"], ["900", "#640017"]];
const AM = [["100", "#FAF5E5"], ["500", "#F8C222"], ["900", "#654E0B"]];
const OR = [["100", "#FAEAE5"], ["500", "#F85722"], ["900", "#65220B"]];

// Dropdown order: 7 brand hues + Ink. `primary` is the default background step.
const COLORS = [
  { name: "Blurple", scale: B, primary: "500" },
  { name: "Fuchsia", scale: FU, primary: "500" },
  { name: "Aqua", scale: AQ, primary: "500" },
  { name: "Lime", scale: LI, primary: "500" },
  { name: "Solar", scale: SO, primary: "500" },
  { name: "Amber", scale: AM, primary: "500" },
  { name: "Orange", scale: OR, primary: "500" },
  { name: "Ink", scale: N, primary: "900" },
];

// WCAG relative luminance + contrast ratio.
function lum(hex) {
  const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}
function contrast(a, b) {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function tierOf(r) {
  if (r >= 7) return "AAA 7:1";
  if (r >= 4.5) return "AA 4.5:1";
  if (r >= 3) return "AA 3:1";
  return null;
}
function rgbOf(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");
}

const PITCH = 208; // chip width (152) + gap (56)
const CHIP_W = 152;

export default function ContrastChecker() {
  const [colorIdx, setColorIdx] = useState(0);
  const color = COLORS[colorIdx];

  const [dropOpen, setDropOpen] = useState(false);
  const [bgStep, setBgStep] = useState(color.primary);

  // Reset background to the color's primary step when the color changes.
  useEffect(() => {
    setBgStep(color.primary);
  }, [color]);

  const bg = useMemo(() => {
    const row = color.scale.find((r) => r[0] === bgStep) || color.scale[0];
    return { name: color.name, step: row[0], hex: row[1] };
  }, [color, bgStep]);

  // Text candidates = Ink scale + the color's own scale (deduped when Ink is selected).
  const passing = useMemo(() => {
    const cands = [];
    N.forEach((r) => cands.push({ name: "Ink", step: r[0], hex: r[1] }));
    if (color.name !== "Ink") color.scale.forEach((r) => cands.push({ name: color.name, step: r[0], hex: r[1] }));
    return cands
      .map((c) => ({ ...c, ratio: contrast(bg.hex, c.hex) }))
      .filter((c) => c.ratio >= 3)
      .map((c) => ({ ...c, tier: tierOf(c.ratio) }));
  }, [color, bg]);

  return (
    <div className="cc">
      <div className="cc__top">
        <ColorDropdown color={color} open={dropOpen} setOpen={setDropOpen} onPick={(i) => { setColorIdx(i); setDropOpen(false); }} />
        <span className="cc__title">CONTRAST CHECKER</span>
      </div>

      <Carousel bg={bg} passing={passing} />

      <ScaleBar color={color} bgStep={bgStep} onPick={setBgStep} />
    </div>
  );
}

function ColorDropdown({ color, open, setOpen, onPick }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, setOpen]);

  const dot = (c) => c.scale.find((r) => r[0] === c.primary)[1];

  return (
    <div className={"cc-drop-wrap" + (open ? " is-open" : "")} ref={wrapRef}>
      <button type="button" className="cc-drop" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="cc-dot" style={{ background: dot(color) }} />
        <span className="cc-drop__val">{color.name}</span>
        <span className="cc-drop__arw">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <div className="cc-drop-menu">
        {COLORS.map((c, i) => (
          <button type="button" className="cc-drop-opt" key={c.name} onClick={() => onPick(i)}>
            <span className="cc-dot" style={{ background: dot(c) }} />
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Carousel({ bg, passing }) {
  const viewRef = useRef(null);
  const trackRef = useRef(null);
  const [w, setW] = useState(0);
  const len = passing.length;
  // virtual index lives in the middle copy of a 3x track for seamless looping.
  const [vi, setVi] = useState(len);
  const [anim, setAnim] = useState(true);

  // Reset to the middle copy whenever the passing set changes (bg/color change).
  useEffect(() => {
    setAnim(false);
    setVi(len);
  }, [len, passing]);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Re-enable animation on the next frame after a silent recenter.
  useEffect(() => {
    if (!anim) {
      const id = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(id);
    }
  }, [anim]);

  const current = len ? passing[((vi % len) + len) % len] : null;

  const go = useCallback((dir) => {
    if (!len) return;
    setAnim(true);
    setVi((v) => v + dir);
  }, [len]);

  // After a slide, silently snap back into the middle copy if we drifted out.
  const onEnd = useCallback(() => {
    setVi((v) => {
      if (v < len || v >= 2 * len) {
        setAnim(false);
        return ((v % len) + len) % len + len;
      }
      return v;
    });
  }, [len]);

  // Triple the list so there is always a neighbour on both sides.
  const items = len ? [...passing, ...passing, ...passing] : [];
  const offset = w / 2 - CHIP_W / 2 - vi * PITCH;

  return (
    <div className="cc-carousel">
      <button type="button" className="cc-arw cc-arw--prev" aria-label="Previous" onClick={() => go(-1)} disabled={!len}>
        <Chev />
      </button>
      <div className="cc-view" ref={viewRef}>
        <div
          className="cc-track"
          ref={trackRef}
          style={{ transform: `translateX(${offset}px)`, transition: anim ? "transform .4s var(--ease-out)" : "none" }}
          onTransitionEnd={onEnd}
        >
          {items.map((c, i) => {
            const isCurrent = i === vi;
            return (
              <div
                key={i}
                className={"cc-chip" + (isCurrent ? " is-current" : "")}
                style={{ background: bg.hex, color: c.hex }}
              >
                Chainguard
              </div>
            );
          })}
        </div>
      </div>
      <button type="button" className="cc-arw cc-arw--next" aria-label="Next" onClick={() => go(1)} disabled={!len}>
        <Chev />
      </button>

      <div className="cc-info">
        <div className="cc-info__row">
          <span className="cc-info__key">Background:</span>
          <span className="cc-swatch" style={{ background: bg.hex }} />
          <span className="cc-info__name">{bg.name + " " + bg.step}</span>
          <span className="cc-info__wcag">{current ? "WCAG: " + current.tier : "—"}</span>
        </div>
        <div className="cc-info__row cc-info__row--text">
          <span className="cc-info__key">Text:</span>
          <span className="cc-swatch" style={{ background: current ? current.hex : "transparent" }} />
          <span className="cc-info__name">{current ? current.name + " " + current.step : "—"}</span>
          <span className="cc-info__wcag">{current ? "WCAG: " + current.tier : "—"}</span>
        </div>
      </div>
    </div>
  );
}

function ScaleBar({ color, bgStep, onPick }) {
  const barRef = useRef(null);
  const tipRef = useRef(null);
  const copiedRef = useRef(false);
  const revertRef = useRef(0);
  const [tip, setTip] = useState({ text: "", on: false });
  const n1 = color.scale.length - 1;

  const positionTip = (x, y) => {
    const t = tipRef.current;
    if (t) { t.style.left = x + "px"; t.style.top = y + "px"; }
  };
  const onMove = useCallback((ev) => {
    positionTip(ev.clientX, ev.clientY);
    if (copiedRef.current) return;
    const el = ev.target.closest && ev.target.closest("[data-copy]");
    if (el && ev.currentTarget.contains(el)) setTip({ text: "Copy " + (el.getAttribute("data-label") || "HEX"), on: true });
    else setTip((s) => (s.on ? { ...s, on: false } : s));
  }, []);
  const onLeave = useCallback(() => {
    if (!copiedRef.current) setTip((s) => (s.on ? { ...s, on: false } : s));
  }, []);
  const onCopy = useCallback((ev, val) => {
    ev.stopPropagation();
    try { if (navigator.clipboard) navigator.clipboard.writeText(val); } catch (e) {}
    positionTip(ev.clientX, ev.clientY);
    setTip({ text: "Copied", on: true });
    copiedRef.current = true;
    window.clearTimeout(revertRef.current);
    revertRef.current = window.setTimeout(() => { copiedRef.current = false; }, 1100);
  }, []);

  return (
    <div className="cc-bar" ref={barRef} style={{ "--n1": n1 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {color.scale.map(([step, hex]) => {
        const current = step === bgStep;
        return (
          <div
            key={step}
            className={"cc-seg" + (current ? " cc-seg--current" : "")}
            style={{ background: hex }}
            data-copy={hex}
            data-label="HEX"
            onClick={() => onPick(step)}
          >
            <span className="cc-seg__num" style={{ color: lum(hex) > 0.5 ? "var(--neutral-900)" : "#fff" }}>{step}</span>
            {current ? (
              <div className="cc-seg__vals" style={{ color: lum(hex) > 0.5 ? "var(--neutral-900)" : "#fff" }}>
                <button type="button" className="cc-row" data-copy={hex} data-label="HEX" onClick={(e) => onCopy(e, hex)}>{"HEX: " + hex}</button>
                <button type="button" className="cc-row" data-copy={rgbOf(hex)} data-label="RGB" onClick={(e) => onCopy(e, rgbOf(hex))}>{"RGB: " + rgbOf(hex)}</button>
              </div>
            ) : null}
          </div>
        );
      })}
      <div className={"cpal-tip" + (tip.on ? " is-on" : "")} aria-hidden="true" ref={tipRef}>{tip.text}</div>
    </div>
  );
}

function Chev() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
