import { useRef, useState, useEffect, useLayoutEffect } from "react";

/* "The highlight" (Figma 52:3403) — a looping typewriter that reveals three
   highlighted lines with a smooth left-to-right wipe, the blinking cursor
   riding the leading edge: type "Hardened", enter, "Secure", enter,
   "Production ready", rest and blink, then delete (faster) and loop. */

const LINES = ["Hardened", "Secure", "Production ready"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Highlight() {
  const rootRef = useRef(null);
  const measRefs = useRef([]);
  const [w, setW] = useState([0, 0, 0]); // full pixel width of each line's highlight
  const [prog, setProg] = useState([0, 0, 0]); // 0..1 reveal per line
  const [active, setActive] = useState(0); // which line the cursor sits on
  const [fast, setFast] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Measure each line's natural width from a hidden, unconstrained copy. Must
  // run after the web font loads (otherwise the fallback font measures narrow
  // and the boxes clip); also re-measure on resize since type scales with the card.
  useLayoutEffect(() => {
    const measure = () => setW(measRefs.current.map((el) => (el ? Math.ceil(el.getBoundingClientRect().width) : 0)));
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (rootRef.current) ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) { setProg([1, 1, 1]); setActive(2); setFast(false); return; }
    let alive = true;
    (async () => {
      while (alive) {
        setFast(false); setActive(0); setProg([0, 0, 0]); await sleep(800); if (!alive) return;
        setProg([1, 0, 0]); await sleep(780); if (!alive) return;         // reveal "Hardened"
        setActive(1); await sleep(360); if (!alive) return;               // enter
        setProg([1, 1, 0]); await sleep(780); if (!alive) return;         // reveal "Secure"
        setActive(2); await sleep(360); if (!alive) return;               // enter
        setProg([1, 1, 1]); await sleep(780); if (!alive) return;         // reveal "Production ready"
        await sleep(2400); if (!alive) return;                            // rest, blink a few times
        setFast(true);
        setProg([1, 1, 0]); await sleep(420); if (!alive) return;         // delete line 3
        setActive(1); await sleep(130); if (!alive) return;
        setProg([1, 0, 0]); await sleep(420); if (!alive) return;         // delete line 2
        setActive(0); await sleep(130); if (!alive) return;
        setProg([0, 0, 0]); await sleep(420); if (!alive) return;         // delete line 1
        await sleep(450); if (!alive) return;
      }
    })();
    return () => { alive = false; };
  }, [reduce]);

  return (
    <div className={"hl" + (fast ? " is-fast" : "")} ref={rootRef} aria-label="Hardened, secure, production ready">
      {LINES.map((line, i) => (
        <div className="hl-row" key={i}>
          <div className="hl-reveal" style={{ width: Math.round(w[i] * prog[i]) + "px" }}>
            <div className="hl-hi"><span className="hl-hi__t">{line}</span></div>
          </div>
          {active === i && <div className="hl-cursor" />}
        </div>
      ))}

      {/* hidden measurers — natural width of each line for the reveal */}
      <div className="hl-measure" aria-hidden="true">
        {LINES.map((line, i) => (
          <div className="hl-hi" key={i} ref={(el) => (measRefs.current[i] = el)}>
            <span className="hl-hi__t">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
