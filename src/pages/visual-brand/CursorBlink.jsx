import { useState } from "react";

/* "The cursor" (Figma 52:3021) — a non-interactive cursor block that blinks
   and shuffles to a random core color on every blink, looping through all core
   colors. The neutral core is Ink in light mode and White in dark
   (via --chl-neutral). */

const CORES = [
  "#6226FB", // Blurple
  "#FD2BF2", // Fuchsia
  "#2BBAFD", // Aqua
  "#04BD13", // Lime
  "#FD3964", // Solar
  "#F8C222", // Amber
  "#F85722", // Orange
  "var(--chl-neutral)", // Ink (light) / White (dark)
];

export default function CursorBlink() {
  const [idx, setIdx] = useState(0);
  return (
    <div className="chl">
      <div
        className="chl__cursor"
        style={{ background: CORES[idx] }}
        onAnimationIteration={() =>
          setIdx((i) => {
            let n;
            do { n = Math.floor(Math.random() * CORES.length); } while (n === i);
            return n;
          })
        }
      />
    </div>
  );
}
