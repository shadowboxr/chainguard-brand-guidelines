import { useEffect, useRef, useState } from "react";
import { WHITE_LOGO } from "./Sidebar.jsx";

/* Homepage opening sequence (Figma 166:15129).

   The "Chainguard Design" lockup is present from the start; a Blurple block
   builds slowly around it — pushing out to full width, then filling in its
   height — and then morphs (FLIP) to form the live hero blurple block
   (.hub-hero__left). Only the light backdrop clears; the block stays solid, so
   it reads as building into the hero. Once the hero box is formed the logo
   fades away, the block is swapped for the real hero, and Home leads its
   entrance with the title, then everything else.

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
  const [shown, setShown] = useState(false); // builds out to full width
  const [open, setOpen] = useState(false); // then fills in the height
  const [morph, setMorph] = useState(null); // hero-block target rect (px)
  const [clearBackdrop, setClearBackdrop] = useState(false); // light backdrop clears
  const [fadeLogo, setFadeLogo] = useState(false); // lockup fades away

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = Math.round(Math.max(240, Math.min(360, Math.min(w, h) * 0.4)));
    setRect({ left: Math.round((w - size) / 2), top: Math.round((h - size) / 2), width: size, height: size });

    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(40, () => setShown(true)); // 1) build out to full width (push either side)
    at(800, () => setOpen(true)); // 2) fill in the height

    at(1650, () => {
      // 3) morph to form the hero box, revealing the (still-empty) page frame.
      const el = document.querySelector(".hub-hero__left");
      if (el) {
        const r = el.getBoundingClientRect();
        setMorph({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) });
      }
      setClearBackdrop(true);
    });
    at(2400, () => setFadeLogo(true)); // 4) hero box formed — the logo fades away
    at(2760, () => {
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
  return (
    <div className="cg-intro" aria-hidden="true">
      {/* Only the light backdrop clears — the block below stays solid. */}
      <div className={"cg-intro__backdrop" + (clearBackdrop ? " is-clearing" : "")} />
      <div
        className={"cg-intro__block" + (shown ? " is-shown" : "") + (open ? " is-open" : "") + (morph ? " is-morphing" : "")}
        style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
      >
        <div className={"cg-intro__logo" + (fadeLogo ? " is-out" : "")}>
          <img src={WHITE_LOGO} alt="" width={30} height={26} />
          <span>Chainguard Design</span>
        </div>
      </div>
    </div>
  );
}
