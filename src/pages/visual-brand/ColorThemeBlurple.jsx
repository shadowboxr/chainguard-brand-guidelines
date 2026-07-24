/* "Color themes" — Blurple core color-drench (Figma 56:3715).
   A single Blurple-drenched block with a centered white headline. Static demo —
   fixed colors that never follow the site's dark/light theme. */

import { nameFor } from "./paletteNames.js";

export default function ColorThemeBlurple() {
  return (
    <div className="cdrench" aria-hidden="true" data-cname={nameFor("#6226fb")}>
      <span data-cname={nameFor("#ffffff")}>Secure-by-default open source software</span>
    </div>
  );
}
