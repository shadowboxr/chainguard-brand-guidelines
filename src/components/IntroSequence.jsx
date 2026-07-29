import { useEffect, useRef, useState } from "react";
import { WHITE_LOGO } from "./Sidebar.jsx";

/* Homepage opening sequence (Figma 166:15129).

   On an Ink (black) backdrop the "Chainguard Design" lockup fades in on its own
   — no fill behind it. The lockup then stays fixed where it appeared while a
   Blurple square grows in uniformly behind it and then fades away in place. Only
   after the lockup is gone does the square morph (FLIP) to form the live hero
   blurple block (.hub-hero__left); the backdrop clears as the box forms, and the
   block stays solid so it reads as building into the hero. The block is then
   swapped for the real hero, and Home leads its entrance with the title, then
   everything else.

   The lockup is a separate layer on top of the block (so the building fill
   doesn't clip it), pinned to the centred start position so it never moves.

   Home skips it entirely under prefers-reduced-motion. `onReveal` starts Home's
   entrance; `onDone` swaps the block out for the real hero. */

export default function IntroSequence({ onReveal, onDone }) {
  const timers = useRef([]);
  // Read the latest callbacks through a ref so the timeline effect can run once
  // on mount — depending on the (inline, unstable) callbacks would re-run the
  // effect on every parent re-render and clear the pending timers mid-sequence.
  const cbRef = useRef();
  cbRef.current = { onReveal, onDone };
  const [rect, setRect] = useState(null); // centered start geometry (px)
  const [logoIn, setLogoIn] = useState(false); // lockup fades in by itself
  const [open, setOpen] = useState(false); // then a perfect square grows in behind it
  const [morph, setMorph] = useState(null); // hero-block target rect (px)
  const [clearBackdrop, setClearBackdrop] = useState(false); // Ink backdrop clears
  const [fadeLogo, setFadeLogo] = useState(false); // lockup fades away

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = Math.round(Math.max(240, Math.min(360, Math.min(w, h) * 0.4)));
    setRect({ left: Math.round((w - size) / 2), top: Math.round((h - size) / 2), width: size, height: size });

    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(40, () => setLogoIn(true)); // 1) lockup appears by itself on black
    at(760, () => setOpen(true)); // 2) a perfect square grows in uniformly behind it
    at(1600, () => setFadeLogo(true)); // 3) lockup fades away in place (before the block moves)

    at(2250, () => {
      // 4) morph to form the hero box, revealing the (still-empty) page frame.
      const el = document.querySelector(".hub-hero__left");
      if (el) {
        const r = el.getBoundingClientRect();
        setMorph({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) });
      }
      setClearBackdrop(true);
    });
    at(2960, () => {
      // 5) swap the block for the real hero and lead Home's entrance with the title
      cbRef.current.onReveal?.();
      cbRef.current.onDone?.();
    });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // Run once on mount — callbacks are read live via cbRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!rect) return null;
  const box = morph || rect;
  const boxStyle = { left: box.left, top: box.top, width: box.width, height: box.height };
  const rectStyle = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  return (
    <div className="cg-intro" aria-hidden="true">
      {/* Ink backdrop clears as the hero box forms — the block stays solid. */}
      <div className={"cg-intro__backdrop" + (clearBackdrop ? " is-clearing" : "")} />
      <div
        className={"cg-intro__block" + (open ? " is-open" : "") + (morph ? " is-morphing" : "")}
        style={boxStyle}
      />
      {/* Lockup layer, pinned to the centred start position — it never moves;
          it fades out in place before the block morphs away. */}
      <div className="cg-intro__logo-wrap" style={rectStyle}>
        <div className={"cg-intro__logo" + (fadeLogo ? " is-out" : logoIn ? " is-in" : "")}>
          <img src={WHITE_LOGO} alt="" width={30} height={26} />
          <span>Chainguard Design</span>
        </div>
      </div>
    </div>
  );
}
