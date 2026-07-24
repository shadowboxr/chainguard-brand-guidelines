/* "Color themes" — Monochromatic tone-on-tone (Figma 56:3698).
   Three hues (fuchsia, blurple, lime), each shown twice: a light-bg block with
   a darker text tone, and a dark-bg block with a brighter text tone. Static
   demo — no interaction. Colors are hard-coded so it never follows the site's
   dark/light theme. */

const ROWS = [
  { light: { bg: "#fef5fe", fg: "#a10099" }, dark: { bg: "#480044", fg: "#fd2bf2" } }, // Fuchsia
  { light: { bg: "#f1ecfe", fg: "#6226fb" }, dark: { bg: "#090119", fg: "#6226fb" } }, // Blurple
  { light: { bg: "#f2fdf2", fg: "#108000" }, dark: { bg: "#083e00", fg: "#04bd13" } }, // Lime
];

const LABEL = "Prevent AI attacks";

export default function ColorThemeMono() {
  return (
    <div className="cmono" aria-hidden="true">
      {ROWS.flatMap((r, i) =>
        [r.light, r.dark].map((c, j) => (
          <div className="cmono__cell" key={i + "-" + j} style={{ background: c.bg, color: c.fg }}>
            <span>{LABEL}</span>
          </div>
        ))
      )}
    </div>
  );
}
