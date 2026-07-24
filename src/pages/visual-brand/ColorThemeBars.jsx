/* "Color themes" — Light mode palette strip (Figma 54:3415).
   The full light-mode palette as 32 vertical bars: neutral/Ink 0-950, then
   blurple, fuchsia, aqua, lime, solar, amber, orange (each light tints ->
   saturated default). Purely decorative — no labels, no copy. Collapsed to a
   thin band by default; hovering grows every bar to 50% of the box height
   (see .ctheme in components.css). Colors are hard-coded so the strip always
   shows the LIGHT-mode palette regardless of the site's dark/light theme. */

const LIGHT_BARS = [
  // Neutral / Ink (0 -> 950)
  "#ffffff", "#fbfbff", "#e7e8e8", "#d0d2d3", "#b7babc", "#9ea2a4",
  "#7a7e81", "#565c60", "#3d4449", "#192228", "#0d161c", "#060c10",
  // Blurple
  "#f1ecfe", "#c8b6f6", "#c0a8fd", "#9d7af6", "#6226fb",
  // Fuchsia
  "#fef5fe", "#fddffc", "#fd2bf2",
  // Aqua
  "#f5fcff", "#dff4fe", "#2bbafd",
  // Lime
  "#f2fdf2", "#e9fcea", "#04bd13",
  // Solar
  "#fef6f6", "#fd3964",
  // Amber
  "#faf5e5", "#f8c222",
  // Orange
  "#faeae5", "#f85722",
];

export default function ColorThemeBars() {
  return (
    <div className="ctheme ctheme--light" aria-hidden="true">
      {LIGHT_BARS.map((hex, i) => (
        <div key={i} className="ctheme__bar" style={{ background: hex }} />
      ))}
    </div>
  );
}
