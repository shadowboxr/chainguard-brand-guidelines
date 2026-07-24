import { useState } from "react";

/* "The cursor" (Figma 52:3021) — a non-interactive cursor block that blinks
   and changes to the next core color on every blink, looping. The neutral core
   is Ink in light mode and White in dark (via --chl-neutral). */

const CORES = ["#6226FB", "#FD2BF2", "#2BBAFD", "var(--chl-neutral)"];

export default function CursorBlink() {
  const [idx, setIdx] = useState(0);
  return (
    <div className="chl">
      <div
        className="chl__cursor"
        style={{ background: CORES[idx] }}
        onAnimationIteration={() => setIdx((i) => (i + 1) % CORES.length)}
      />
    </div>
  );
}
