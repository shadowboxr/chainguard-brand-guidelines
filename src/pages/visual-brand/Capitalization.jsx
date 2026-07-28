/* "Capitalization" demo (Figma 150:4111). Rotates through four specimen screens
   — Headings, Body, Eyebrow, Proper noun — each showing its capitalization rule
   with the relevant capital letters highlighted in blurple, plus a top-left
   category label and top-right rule label. Screens hand off with the same
   sequential fade pattern used elsewhere (each fades out before the next fades
   in). Container-relative (cqi), theme-reactive, respects reduced-motion. */

function Screen({ n, cat, rule, children }) {
  return (
    <div className={`tcap__screen tcap__screen--${n}`}>
      <div className="tcap__labels">
        <span className="tcap__cat">{cat}</span>
        <span className="tcap__rule">{rule}</span>
      </div>
      <div className="tcap__specimen">{children}</div>
    </div>
  );
}

export default function Capitalization() {
  return (
    <div className="tcap" aria-hidden="true">
      <Screen n="1" cat="Headings" rule="Sentence case">
        <h4 className="tcap__heading">
          <span className="tcap__hl">B</span>uild safely with AI
        </h4>
      </Screen>
      <Screen n="2" cat="Body" rule="Sentence case">
        <p className="tcap__body">
          <span className="tcap__hl">W</span>e believe in a world where engineering teams can build at machine speed, confident that every line of code is hardened, trusted, and ready for production.
        </p>
      </Screen>
      <Screen n="3" cat="Eyebrow" rule="All caps">
        <span className="tcap__eyebrow">Chainguard</span>
      </Screen>
      <Screen n="4" cat="Proper noun" rule="Title case">
        <h4 className="tcap__proper">
          <span className="tcap__hl">C</span>hainguard <span className="tcap__hl">C</span>ontainers
        </h4>
      </Screen>
    </div>
  );
}
