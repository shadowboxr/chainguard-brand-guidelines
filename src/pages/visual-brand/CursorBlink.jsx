import { useState } from "react";

/* "The cursor" (Figma 52:3021) — a non-interactive cursor block that blinks and
   cycles through Blurple, Fuchsia, and Aqua in order on every blink. */

const CORES = [
  "#6226FB", // Blurple
  "#FD2BF2", // Fuchsia
  "#2BBAFD", // Aqua
];

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
