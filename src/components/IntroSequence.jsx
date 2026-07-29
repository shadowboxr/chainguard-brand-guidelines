import { useEffect, useRef, useState } from "react";
import { WHITE_LOGO } from "./Sidebar.jsx";

/* Homepage opening sequence (Figma 166:15129).

   On an Ink (black) backdrop the "Chainguard Design" lockup fades in on its own
   — no fill behind it. Then a Blurple block builds slowly around it (pushing out
   to full width, then filling in its height) and morphs (FLIP) to form the live
   hero blurple block (.hub-hero__left). The backdrop clears as the box forms;
   the block stays solid, so it reads as building into the hero. Once formed, the
   logo fades away, the block is swapped for the real hero, and Home leads its
   entrance with the title, then everything else.

   The lockup is a separate layer on top of the block (so the building fill
   doesn't clip it) that tracks the block's box as it morphs.

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
  const [shown, setShown] = useState(false); // then the block builds to full width
  const [open, setOpen] = useState(false); // then fills in the height
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
    at(720, () => setShown(true)); // 2) block builds out to full width (push either side)
    at(1320, () => setOpen(true)); // 3) fill in the height

    at(2000, () => {
      // 4) morph to form the hero box, revealing the (still-empty) page frame.
      const el = document.querySelector(".hub-hero__left");
      if (el) {
        const r = el.getBoundingClientRect();
        setMorph({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) });
      }
      setClearBackdrop(true);
    });
    at(2700, () => setFadeLogo(true)); // 5) hero box formed — the logo fades away
    at(3080, () => {
      // 6) swap the block for the real hero and lead Home's entrance with the title
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
  return (
    <div className="cg-intro" aria-hidden="true">
      {/* Ink backdrop clears as the hero box forms — the block stays solid. */}
      <div className={"cg-intro__backdrop" + (clearBackdrop ? " is-clearing" : "")} />
      <div
        className={"cg-intro__block" + (shown ? " is-shown" : "") + (open ? " is-open" : "") + (morph ? " is-morphing" : "")}
        style={boxStyle}
      />
      {/* Lockup layer on top of the block, tracking its box. */}
      <div className="cg-intro__logo-wrap" style={boxStyle}>
        <div className={"cg-intro__logo" + (fadeLogo ? " is-out" : logoIn ? " is-in" : "")}>
          <img src={WHITE_LOGO} alt="" width={30} height={26} />
          <span>Chainguard Design</span>
        </div>
      </div>
    </div>
  );
}
