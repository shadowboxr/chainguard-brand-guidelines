import ChainguardLogo, { lockupSvg } from "./ChainguardLogo.jsx";
import DownloadTile from "../../components/DownloadTile.jsx";

// Logo variants block (Figma 37:8557 / 37:8243): the full Blurple lockup on a
// white card, then Ink-on-neutral and White-on-Blurple variant tiles. Each tile
// reveals a Download SVG button on hover/focus.
export default function LogoVariants() {
  return (
    <div className="alogo">
      <DownloadTile className="alogo__main" svg={() => lockupSvg("#6226FB")} filename="chainguard-logo-blurple.svg">
        <ChainguardLogo className="alogo__lockup alogo__lockup--blurple" />
      </DownloadTile>
      <div className="alogo__variants">
        <DownloadTile className="alogo__variant alogo__variant--ink" svg={() => lockupSvg("#0D161C")} filename="chainguard-logo-ink.svg">
          <ChainguardLogo className="alogo__mark alogo__mark--ink" />
        </DownloadTile>
        <DownloadTile className="alogo__variant alogo__variant--dark" svg={() => lockupSvg("#FFFFFF")} filename="chainguard-logo-white.svg">
          <ChainguardLogo className="alogo__mark alogo__mark--white" />
        </DownloadTile>
      </div>
    </div>
  );
}
