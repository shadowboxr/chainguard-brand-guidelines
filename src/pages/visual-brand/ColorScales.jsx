import { useRef, useState, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";

const ARROW = (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
  </svg>
);

const B = [["50", "#F8F6FE"], ["100", "#F1ECFE"], ["200", "#C8B6F6"], ["300", "#C0A8FD"], ["400", "#9D7AF6"], ["500", "#6226FB"], ["600", "#4104DD"], ["800", "#3200AF"], ["900", "#14003D"], ["950", "#090119"]];
const N = [["0", "#FFFFFF"], ["50", "#FBFBFF"], ["100", "#E7E8E8"], ["200", "#D0D2D3"], ["300", "#B7BABC"], ["400", "#9EA2A4"], ["500", "#7A7E81"], ["600", "#565C60"], ["700", "#3D4449"], ["800", "#192228"], ["900", "#0D161C"], ["950", "#060C10"]];
const FU = [["100", "#FEF5FE"], ["200", "#FDDFFC"], ["500", "#FD2BF2"], ["800", "#A10099"], ["900", "#480044"]];
const AQ = [["100", "#F5FCFF"], ["200", "#DFF4FE"], ["500", "#2BBAFD"], ["800", "#006A97"], ["900", "#003247"]];
const LI = [["100", "#F2FDF2"], ["200", "#E9FCEA"], ["500", "#04BD13"], ["800", "#108000"], ["900", "#083E00"]];
const SO = [["100", "#FEF6F6"], ["200", "#FCE0E0"], ["500", "#FD3964"], ["800", "#D40555"], ["900", "#640017"]];
const AM = [["100", "#FAF5E5"], ["500", "#F8C222"], ["900", "#654E0B"]];
const OR = [["100", "#FAEAE5"], ["500", "#F85722"], ["900", "#65220B"]];

function rgb(h) {
  h = h.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function txt(h) {
  const c = rgb(h);
  return (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000 > 165 ? "var(--neutral-900)" : "#fff";
}

// Compute the initial "current" segment index for a bar.
function initialCurrent(shades, open, ink, dark) {
  if (ink) {
    if (dark) {
      const di = shades.findIndex((x) => x[0] === "900");
      if (di >= 0) return di;
    }
    return shades.findIndex((x) => x[0] === "0");
  }
  return shades.findIndex((x) => x[0] === open);
}

function Segment({ step, hex, kind, isCurrent }) {
  const c = rgb(hex);
  const r = c[0] + " " + c[1] + " " + c[2];
  let cls = "scale-seg";
  const attr = {};
  if (kind === "open") {
    cls += " scale-seg--open";
  } else if (kind === "light") {
    attr["data-open"] = "light";
  } else if (kind === "dark") {
    attr["data-open"] = "dark";
  }
  if (isCurrent) cls += " is-current";
  return (
    <div className={cls} {...attr} style={{ background: hex, color: txt(hex) }} data-copy={hex} data-label="HEX">
      <span className="scale-seg__num">{step}</span>
      <div className="scale-seg__vals">
        <button type="button" className="cpal-row" data-copy={hex} data-label="HEX">{"HEX: " + hex}</button>
        <button type="button" className="cpal-row" data-copy={r} data-label="RGB">{"RGB: " + r}</button>
      </div>
    </div>
  );
}

function Bar({ shades, open, h, ink, dark, registerSwipe }) {
  const n1 = shades.length - 1;
  const [current, setCurrent] = useState(() => initialCurrent(shades, open, ink, dark));
  const barRef = useRef(null);
  const currentRef = useRef(current);
  currentRef.current = current;

  const move = useCallback(
    (d) => {
      flushSync(() => {
        setCurrent((i) => {
          if (i < 0) i = 0;
          return Math.max(0, Math.min(shades.length - 1, i + d));
        });
      });
    },
    [shades.length]
  );

  useEffect(() => {
    registerSwipe(barRef.current, move);
  }, [registerSwipe, move]);

  return (
    <div className="scale-bar" style={{ "--n1": n1, height: h + "px" }} ref={barRef}>
      {shades.map((x, i) => {
        let kind = "";
        if (ink) {
          if (x[0] === "0") kind = "light";
          else if (x[0] === "900") kind = "dark";
        } else if (x[0] === open) {
          kind = "open";
        }
        return <Segment key={i} step={x[0]} hex={x[1]} kind={kind} isCurrent={i === current} />;
      })}
      <button type="button" className="scale-nav scale-nav--prev" aria-label="Previous shade" disabled={current <= 0} onClick={() => move(-1)}>
        {ARROW}
      </button>
      <button type="button" className="scale-nav scale-nav--next" aria-label="Next shade" disabled={current >= shades.length - 1} onClick={() => move(1)}>
        {ARROW}
      </button>
    </div>
  );
}

function Card({ title, label, children }) {
  return (
    <section className="cpal-cat">
      <div className="cpal-cat__head">
        <h3 className="cpal-cat__name">{title}</h3>
        {label ? <span className="cpal-cat__list">{label}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Sub({ name, label, children }) {
  return (
    <div className="scale-sub">
      <div className="scale-sub__head">
        <span className="scale-sub__name">{name}</span>
        <span className="cpal-cat__list">{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function ColorScales() {
  const rootRef = useRef(null);
  const tipRef = useRef(null);
  const copiedRef = useRef(false);
  const revertRef = useRef(0);
  const [tip, setTip] = useState({ text: "", on: false });
  const swipeRef = useRef([]);
  const [dark] = useState(() => (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark"));

  const registerSwipe = useCallback((el, move) => {
    if (el) swipeRef.current.push({ el, move });
  }, []);

  const positionTip = useCallback((x, y) => {
    const t = tipRef.current;
    if (t) {
      t.style.left = x + "px";
      t.style.top = y + "px";
    }
  }, []);

  const onMouseMove = useCallback(
    (ev) => {
      positionTip(ev.clientX, ev.clientY);
      if (copiedRef.current) return;
      const el = ev.target.closest && ev.target.closest("[data-copy]");
      if (el && ev.currentTarget.contains(el)) {
        setTip({ text: "Copy " + (el.getAttribute("data-label") || "HEX"), on: true });
      } else {
        setTip((s) => (s.on ? { ...s, on: false } : s));
      }
    },
    [positionTip]
  );

  const onMouseLeave = useCallback(() => {
    if (!copiedRef.current) setTip((s) => (s.on ? { ...s, on: false } : s));
  }, []);

  const onClick = useCallback(
    (ev) => {
      // nav buttons are handled by their own onClick; ignore them here
      if (ev.target.closest && ev.target.closest(".scale-nav")) return;
      const el = ev.target.closest && ev.target.closest("[data-copy]");
      if (!el || !ev.currentTarget.contains(el)) return;
      const val = el.getAttribute("data-copy");
      try {
        if (navigator.clipboard) navigator.clipboard.writeText(val);
      } catch (e) {}
      positionTip(ev.clientX, ev.clientY);
      setTip({ text: "Copied", on: true });
      copiedRef.current = true;
      window.clearTimeout(revertRef.current);
      revertRef.current = window.setTimeout(() => {
        copiedRef.current = false;
      }, 1100);
    },
    [positionTip]
  );

  // Touch swipe on bars.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let x0 = null;
    let sentry = null;
    function ts(ev) {
      const b = ev.target.closest && ev.target.closest(".scale-bar");
      if (!b) {
        x0 = null;
        sentry = null;
        return;
      }
      sentry = swipeRef.current.find((s) => s.el === b) || null;
      x0 = ev.touches[0].clientX;
    }
    function te(ev) {
      if (x0 === null || !sentry) return;
      const dx = ev.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) {
        sentry.move(dx < 0 ? 1 : -1);
        if (ev.cancelable) ev.preventDefault();
      }
      x0 = null;
      sentry = null;
    }
    root.addEventListener("touchstart", ts, { passive: true });
    root.addEventListener("touchend", te, { passive: false });
    return () => {
      root.removeEventListener("touchstart", ts);
      root.removeEventListener("touchend", te);
    };
  }, []);

  return (
    <div className="cscales" ref={rootRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onClick}>
      <h3 id="scales" className="cpal-h3 fanchor">Color Scales</h3>
      <div className="cpal-cats">
        <Card title="Blurple Scale" label="10 step: 50 - 950">
          <Bar shades={B} open="500" h={300} ink={false} dark={dark} registerSwipe={registerSwipe} />
        </Card>
        <Card title="Ink Scale" label="12 step: 0 - 950">
          <Bar shades={N} open={null} h={300} ink={true} dark={dark} registerSwipe={registerSwipe} />
        </Card>
        <Card title="Secondary Scales" label="">
          <Sub name="Fuchsia" label="5 step: 100 - 900">
            <Bar shades={FU} open="500" h={204} ink={false} dark={dark} registerSwipe={registerSwipe} />
          </Sub>
          <Sub name="Aqua" label="5 step: 100 - 900">
            <Bar shades={AQ} open="500" h={204} ink={false} dark={dark} registerSwipe={registerSwipe} />
          </Sub>
        </Card>
        <Card title="Tertiary Scales" label="">
          <Sub name="Lime" label="5 step: 100 - 900">
            <Bar shades={LI} open="500" h={150} ink={false} dark={dark} registerSwipe={registerSwipe} />
          </Sub>
          <Sub name="Solar" label="5 step: 100 - 900">
            <Bar shades={SO} open="500" h={150} ink={false} dark={dark} registerSwipe={registerSwipe} />
          </Sub>
          <Sub name="Amber" label="3 step: 100 - 900">
            <Bar shades={AM} open="500" h={150} ink={false} dark={dark} registerSwipe={registerSwipe} />
          </Sub>
          <Sub name="Orange" label="3 step: 100 - 900">
            <Bar shades={OR} open="500" h={150} ink={false} dark={dark} registerSwipe={registerSwipe} />
          </Sub>
        </Card>
      </div>
      <div className={"cpal-tip" + (tip.on ? " is-on" : "")} aria-hidden="true" ref={tipRef}>
        {tip.text}
      </div>
    </div>
  );
}
