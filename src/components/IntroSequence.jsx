import { useEffect, useRef, useState } from "react";
import { WHITE_LOGO } from "./Sidebar.jsx";

/* Homepage opening sequence (Figma 166:15129).

   A small Blurple block appears, then scales up smoothly from the center to
   reveal the "Chainguard Design" lockup. It cycles smoothly through the core
   palette — ending on Ink second-to-last, then back to Blurple — and finally
   morphs (FLIP) onto the live hero blurple block (.hub-hero__left). The hero
   lands first, then Home stacks the rest of the page in after it.

   Home skips it entirely under prefers-reduced-motion. `onReveal` fires as the
   morph begins (Home starts its entrance), `onDone` fires once the block has
   landed + the overlay faded. */

// Flash order after the initial Blurple reveal: the remaining core hues, then Ink
// (second-to-last), then back to Blurple (var(--primary)) to land on the hero.
const FLASH = ["#FD2BF2", "#2BBAFD", "#04BD13", "#FD3964", "#F8C222", "#F85722", "#0D161C", "var(--primary)"];

export default function IntroSequence({ onReveal, onDone }) {
  const timers = useRef([]);
  const [rect, setRect] = useState(null); // centered start geometry (px)
  const [shown, setShown] = useState(false); // small block fades in
  const [open, setOpen] = useState(false); // scales up smoothly to full size
  const [logoIn, setLogoIn] = useState(false);
  const [bg, setBg] = useState("var(--primary)");
  const [morph, setMorph] = useState(null); // hero-block target rect (px)
  const [fade, setFade] = useState(false); // backdrop + logo fade out

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = Math.round(Math.max(240, Math.min(360, Math.min(w, h) * 0.4)));
    setRect({ left: Math.round((w - size) / 2), top: Math.round((h - size) / 2), width: size, height: size });

    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(40, () => setShown(true)); // 1) small block appears
    at(380, () => setOpen(true)); // 2) scale up smoothly from center
    at(780, () => setLogoIn(true)); // 3) reveal the lockup as it settles

    const FLASH_START = 1320;
    const STEP = 165; // slower, smoother cycle (crossfades via CSS transition)
    FLASH.forEach((c, i) => at(FLASH_START + i * STEP, () => setBg(c))); // 4) cycle the palette
    const flashEnd = FLASH_START + FLASH.length * STEP; // landed on Blurple

    at(flashEnd + 240, () => {
      // 5) morph onto the live hero block + hand off to the site (hero lands first)
      const el = document.querySelector(".hub-hero__left");
      if (el) {
        const r = el.getBoundingClientRect();
        setMorph({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) });
      }
      setFade(true);
      onReveal && onReveal();
    });
    at(flashEnd + 240 + 820, () => onDone && onDone()); // 6) remove overlay once landed

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [onReveal, onDone]);

  if (!rect) return null;
  const box = morph || rect;
  return (
    <div className={"cg-intro" + (fade ? " cg-intro--fade" : "")} aria-hidden="true">
      <div
        className={"cg-intro__block" + (shown ? " is-shown" : "") + (open ? " is-open" : "") + (morph ? " is-morphing" : "")}
        style={{ left: box.left, top: box.top, width: box.width, height: box.height, background: bg }}
      >
        <div className={"cg-intro__logo" + (logoIn && !fade ? " is-in" : "")}>
          <img src={WHITE_LOGO} alt="" width={30} height={26} />
          <span>Chainguard Design</span>
        </div>
      </div>
    </div>
  );
}
