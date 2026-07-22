import CopyButton from "../components/CopyButton.jsx";
import ColorPalette from "./visual-brand/ColorPalette.jsx";
import ColorScales from "./visual-brand/ColorScales.jsx";
import ColorExtra from "./visual-brand/ColorExtra.jsx";
import Typography from "./visual-brand/Typography.jsx";
import DesignElements from "./visual-brand/DesignElements.jsx";
import DataViz from "./visual-brand/DataViz.jsx";

export default function Blocks({ blocks }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === "palette" ? (
          <ColorPalette key={i} />
        ) : block.type === "scales" ? (
          <ColorScales key={i} />
        ) : block.type === "extra" ? (
          <ColorExtra key={i} />
        ) : block.type === "typography" ? (
          <Typography key={i} />
        ) : block.type === "design" ? (
          <DesignElements key={i} />
        ) : block.type === "dataviz" ? (
          <DataViz key={i} />
        ) : block.type === "p" ? (
          <p className="ftext" key={i}>
            {block.text}
          </p>
        ) : block.type === "cards" ? (
          <div className="fblock" key={i}>
            {block.lead && <p className="ftext">{block.lead}</p>}
            <div className="fcards">
              {block.items.map((item) => (
                <div className="fcard" key={item.term}>
                  <div className="fcard__img" />
                  <div className="fcard__text">
                    <span className="fcard__term">{item.term}</span>
                    <p className="fcard__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : block.type === "chips" ? (
          <div className="fblock" key={i}>
            {block.lead && <p className="ftext">{block.lead}</p>}
            <div className={`fchips fchips--${block.cols}`}>
              {block.items.map((item) =>
                block.copy ? (
                  <div className="fchip fchip--copy" key={item}>
                    <span className="fchip__text">{item}</span>
                    <CopyButton text={item} />
                  </div>
                ) : (
                  <div className="fchip" key={item}>
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        ) : block.type === "bullets" ? (
          <ul className="fbullets" key={i}>
            {block.items.map((item, t) => (
              <li key={t}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="fvalues" key={i}>
            {block.items.map((item) => (
              <div className="fvalue" key={item.term}>
                <div className="fvalue__head">
                  <span className="fvalue__term">{item.term}</span>
                  <p className="fvalue__desc">{item.desc}</p>
                </div>
                <div className="fvalue__media">
                  <div className="fvalue__img" />
                  <div className="fvalue__img" />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
}
