/* hex -> human palette name ("Blurple 500") for the color-theme callout tooltip.
   Covers every shade used by the color-theme frames (bars, monochromatic,
   blurple core). Keep in sync with the scales in ColorScales.jsx. */

const SCALES = {
  Neutral: [["0", "#ffffff"], ["50", "#fbfbff"], ["100", "#e7e8e8"], ["200", "#d0d2d3"], ["300", "#b7babc"], ["400", "#9ea2a4"], ["500", "#7a7e81"], ["600", "#565c60"], ["700", "#3d4449"], ["800", "#192228"], ["900", "#0d161c"], ["950", "#060c10"]],
  Blurple: [["50", "#f8f6fe"], ["100", "#f1ecfe"], ["200", "#c8b6f6"], ["300", "#c0a8fd"], ["400", "#9d7af6"], ["500", "#6226fb"], ["600", "#4104dd"], ["800", "#3200af"], ["900", "#14003d"], ["950", "#090119"]],
  Fuchsia: [["100", "#fef5fe"], ["200", "#fddffc"], ["500", "#fd2bf2"], ["800", "#a10099"], ["900", "#480044"]],
  Aqua: [["100", "#f5fcff"], ["200", "#dff4fe"], ["500", "#2bbafd"], ["800", "#006a97"], ["900", "#003247"]],
  Lime: [["100", "#f2fdf2"], ["200", "#e9fcea"], ["500", "#04bd13"], ["800", "#108000"], ["900", "#083e00"]],
  Solar: [["100", "#fef6f6"], ["200", "#fce0e0"], ["500", "#fd3964"], ["800", "#d40555"], ["900", "#640017"]],
  Amber: [["100", "#faf5e5"], ["500", "#f8c222"], ["900", "#654e0b"]],
  Orange: [["100", "#faeae5"], ["500", "#f85722"], ["900", "#65220b"]],
};

const NAMES = {};
for (const [hue, steps] of Object.entries(SCALES)) {
  for (const [step, hex] of steps) NAMES[hex.toLowerCase()] = hue + " " + step;
}

export function nameFor(hex) {
  return NAMES[String(hex).toLowerCase()] || "";
}
