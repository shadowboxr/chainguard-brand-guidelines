/* "Color themes" palette strips (Figma 54:3415 light / 55:3491 dark).
   The full palette as vertical bars — neutral/Ink 0-950 then blurple, fuchsia,
   aqua, lime, solar, amber, orange. Light mode runs each hue tint -> saturated;
   dark mode runs saturated -> deep. Purely decorative — no labels, no copy.
   Behaves like the color scales: equal at rest, the hovered bar expands to ~50%
   of the width (--ct-grow = count-1 so the math lands on 50% for either length).
   Colors are hard-coded so a strip always shows its own mode regardless of the
   site's dark/light theme. */

const LIGHT_BARS = [
  // Neutral / Ink (0 -> 950)
  "#ffffff", "#fbfbff", "#e7e8e8", "#d0d2d3", "#b7babc", "#9ea2a4",
  "#7a7e81", "#565c60", "#3d4449", "#192228", "#0d161c", "#060c10",
  // Blurple (tint -> default)
  "#f1ecfe", "#c8b6f6", "#c0a8fd", "#9d7af6", "#6226fb",
  // Fuchsia / Aqua / Lime (subtle -> soft -> default)
  "#fef5fe", "#fddffc", "#fd2bf2",
  "#f5fcff", "#dff4fe", "#2bbafd",
  "#f2fdf2", "#e9fcea", "#04bd13",
  // Solar / Amber / Orange (subtle -> default)
  "#fef6f6", "#fd3964",
  "#faf5e5", "#f8c222",
  "#faeae5", "#f85722",
];

const DARK_BARS = [
  // Neutral / Ink (0 -> 950)
  "#ffffff", "#fbfbff", "#e7e8e8", "#d0d2d3", "#b7babc", "#9ea2a4",
  "#7a7e81", "#565c60", "#3d4449", "#192228", "#0d161c", "#060c10",
  // Blurple (default -> deep: 400 -> 950)
  "#9d7af6", "#6226fb", "#4104dd", "#3200af", "#14003d", "#090119",
  // Fuchsia / Aqua / Lime (default -> strong -> deep)
  "#fd2bf2", "#a10099", "#480044",
  "#2bbafd", "#006a97", "#003247",
  "#04bd13", "#108000", "#083e00",
  // Solar / Amber / Orange (default -> deep)
  "#fd3964", "#640017",
  "#f8c222", "#654e0b",
  "#f85722", "#65220b",
];

import { nameFor } from "./paletteNames.js";

const THEMES = { light: LIGHT_BARS, dark: DARK_BARS };

export default function ColorThemeBars({ mode = "light" }) {
  const bars = THEMES[mode] || LIGHT_BARS;
  return (
    <div className={"ctheme ctheme--" + mode} style={{ "--ct-grow": bars.length - 1 }} aria-hidden="true">
      {bars.map((hex, i) => (
        <div key={i} className="ctheme__bar" style={{ background: hex }} data-cname={nameFor(hex)} />
      ))}
    </div>
  );
}
