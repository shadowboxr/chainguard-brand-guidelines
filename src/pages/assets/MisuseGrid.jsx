import ChainguardLogo from "./ChainguardLogo.jsx";

// Misuses block (Figma 37:8205): four cards, each a logo shown in a disallowed
// state with a diagonal strike, plus an uppercase caption. Reconstructed from
// the lockup component rather than static images so it recolors with the theme.
const MISUSES = [
  { state: "rotate", caption: "Do not rotate or stretch the logo" },
  { state: "recolor", caption: "Do not recolor the logo with any other brand colors" },
  { state: "wordmark", caption: "Do not use the wordmark alone" },
  { state: "effects", caption: "Do not apply any effects to the logo like drop shadows or glows" },
];

export default function MisuseGrid() {
  return (
    <div className="amisuses">
      {MISUSES.map((m) => (
        <div className="amisuse" key={m.state}>
          <div className="amisuse__box">
            <ChainguardLogo
              wordmarkOnly={m.state === "wordmark"}
              className={`amisuse__logo amisuse__logo--${m.state}`}
            />
            <svg className="amisuse__strike" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="0" x2="100" y2="100" stroke="var(--solar-500)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <p className="amisuse__cap">{m.caption}</p>
        </div>
      ))}
    </div>
  );
}
