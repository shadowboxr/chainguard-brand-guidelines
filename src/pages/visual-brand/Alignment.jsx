/* "Alignment" demo (Figma 63:3861 left / 149:4022 center). A looping animation
   that shifts the same specimen — eyebrow (Roobert SemiMono + cursor), heading
   (Gellix Bold), body (Gellix Regular) — between left and center alignment. The
   dashed guide box clings to the text column in each state and glides between
   them; the corner tag and the two alignment layers crossfade in sync. Sizing
   is container-relative (cqi) so it scales at any width, and it's theme-reactive
   (it demonstrates alignment, not fixed color values). */

const SPECIMEN = (
  <>
    <div className="talign__group">
      <div className="talign__eyebrow">
        <span className="talign__brand">Chainguard</span>
        <span className="talign__cursor" />
      </div>
      <h4 className="talign__heading">
        Build safely
        <br />
        with AI
      </h4>
    </div>
    <p className="talign__body">
      We believe in a world where engineering teams can build at machine speed, confident that every line of code is hardened, trusted, and ready for production.
    </p>
  </>
);

export default function Alignment() {
  return (
    <div className="talign" aria-hidden="true">
      <div className="talign__guide" />

      <div className="talign__stage">
        <div className="talign__block talign__block--left">{SPECIMEN}</div>
        <div className="talign__block talign__block--center">{SPECIMEN}</div>
      </div>
    </div>
  );
}
