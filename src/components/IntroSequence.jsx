import { useEffect, useRef, useState } from "react";
import { WHITE_LOGO } from "./Sidebar.jsx";

/* Homepage opening sequence (Figma 166:15129).

   The whole screen starts Blurple with the "Chainguard Design" lockup centred on
   it. It holds, the lockup fades out gently, then the fill shrinks down to the
   live hero blurple block (.hub-hero__left), revealing the site as it retreats.
   When it lands it is swapped for the real hero and Home runs its entrance
   cascade.

   The lockup sits on its own layer above the fill and tracks the fill's box, so
   it stays centred in the shrinking block.

   Home skips it entirely under prefers-reduced-motion. `onLanded` fires once the
   fill locks onto the hero (Home swaps it out and draws the frame lines);
   `onContent` fires after the frame has drawn (Home runs the content cascade). */

const fullBox = () =>
  typeof window === "undefined" ? null : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };

export default function IntroSequence({ onLanded, onContent }) {
  const timers = useRef([]);
  // Read the latest callbacks through a ref so the timeline effect can run once
  // on mount — depending on the (inline, unstable) callbacks would re-run the
  // effect on every parent re-render and clear the pending timers mid-sequence.
  const cbRef = useRef();
  cbRef.current = { onLanded, onContent };
  // Start full-screen synchronously so there's no first-paint flash of the page.
  const [box, setBox] = useState(fullBox); // current fill geometry (px)
  const [fadeLogo, setFadeLogo] = useState(false); // lockup fades out on the full fill
  const [shrinking, setShrinking] = useState(false);

  useEffect(() => {
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(1000, () => setFadeLogo(true)); // hold the full fill, then fade the lockup out (.6s)
    at(1680, () => {
      // Shrink the full-screen fill down to the hero block.
      const el = document.querySelector(".hub-hero__left");
      const r = el && el.getBoundingClientRect();
      if (r) setBox({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) });
      setShrinking(true);
    });
    // Fill locks onto the hero (+100ms settle) → swap it out and draw the frame.
    at(1680 + 740 + 100, () => cbRef.current.onLanded?.());
    // Frame has drawn → trigger the content cascade.
    at(1680 + 740 + 100 + 560, () => cbRef.current.onContent?.());

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // Run once on mount — callbacks are read live via cbRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!box) return null;
  const boxStyle = { left: box.left, top: box.top, width: box.width, height: box.height };
  return (
    <div className="cg-intro" aria-hidden="true">
      <div className={"cg-intro__fill" + (shrinking ? " is-shrinking" : "")} style={boxStyle} />
      {/* Lockup layer — tracks the fill's box so it stays centred; fades out
          gently before the shrink. */}
      <div className={"cg-intro__logo-wrap" + (shrinking ? " is-shrinking" : "")} style={boxStyle}>
        <div className={"cg-intro__logo" + (fadeLogo ? " is-out" : "")}>
          <img src={WHITE_LOGO} alt="" width={30} height={26} />
          <span>Chainguard Design</span>
        </div>
      </div>
    </div>
  );
}
