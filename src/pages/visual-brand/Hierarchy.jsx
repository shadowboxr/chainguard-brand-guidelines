/* "Hierarchy" type-scale demo (Figma 63:3861). Left column shows the live
   hierarchy — eyebrow (Roobert SemiMono + cursor), heading (Gellix Bold), body
   (Gellix Regular) — over the inset "page"; the right white card annotates each
   row. Sizing is container-relative so it scales proportionally at any width.
   Theme-reactive (it demonstrates type, not fixed color values). */

export default function Hierarchy() {
  return (
    <div className="thier">
      <div className="thier__panel" aria-hidden="true" />
      <div className="thier__lines" aria-hidden="true" />

      <div className="thier__eyebrow">
        <span className="thier__brand">Chainguard</span>
        <span className="thier__cursor" aria-hidden="true" />
      </div>
      <h4 className="thier__heading">Build safely with AI</h4>
      <p className="thier__body">We believe in a world where engineering teams can build at machine speed, confident that every line of code is hardened, trusted, and ready for production.</p>

      <div className="thier__lbl thier__lbl--e"><span className="thier__lbl-k">Eyebrow:</span> Roobert Semimono</div>
      <div className="thier__lbl thier__lbl--h"><span className="thier__lbl-k">Headings:</span> Gellix Bold</div>
      <div className="thier__lbl thier__lbl--b"><span className="thier__lbl-k">Body:</span> Gellix Regular</div>
    </div>
  );
}
