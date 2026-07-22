import ChainguardLogo from "./ChainguardLogo.jsx";

// Logo variants block (Figma 37:8557 / 37:8243): the full Blurple lockup on a
// white card, then Ink-on-neutral and White-on-Blurple variant tiles.
export default function LogoVariants() {
  return (
    <div className="alogo">
      <div className="alogo__main">
        <ChainguardLogo className="alogo__lockup alogo__lockup--blurple" />
      </div>
      <div className="alogo__variants">
        <div className="alogo__variant alogo__variant--ink">
          <ChainguardLogo className="alogo__mark alogo__mark--ink" />
        </div>
        <div className="alogo__variant alogo__variant--dark">
          <ChainguardLogo className="alogo__mark alogo__mark--white" />
        </div>
      </div>
    </div>
  );
}
