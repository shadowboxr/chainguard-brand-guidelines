import CopyButton from "../components/CopyButton.jsx";
import ColorPalette from "./visual-brand/ColorPalette.jsx";
import ColorScales from "./visual-brand/ColorScales.jsx";
import ColorExtra from "./visual-brand/ColorExtra.jsx";
import Typography from "./visual-brand/Typography.jsx";
import DesignElements from "./visual-brand/DesignElements.jsx";
import DataViz from "./visual-brand/DataViz.jsx";
import Carousel from "./visual-brand/Carousel.jsx";
import MisuseGrid from "./assets/MisuseGrid.jsx";
import LogoVariants from "./assets/LogoVariants.jsx";
import StarIcon from "../components/StarIcon.jsx";

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
        ) : block.type === "logovariants" ? (
          <LogoVariants key={i} />
        ) : block.type === "misuses" ? (
          <MisuseGrid key={i} />
        ) : block.type === "carousel" ? (
          <Carousel key={i} />
        ) : block.type === "subhead" ? (
          <h3 className="cpal-h3 fanchor" id={block.id} key={i}>
            {block.label}
          </h3>
        ) : block.type === "note" ? (
          <div className="cpal-note" key={i}>
            <span className="cpal-note__icon"><StarIcon /></span>
            <p>{block.text}</p>
          </div>
        ) : block.type === "media" ? (
          <div className="cxph" key={i} />
        ) : block.type === "mediacards" ? (
          <div className="amediacards" key={i}>
            {block.items.map((it, k) => (
              <div className="amediacard" key={k}>
                <div className="cxph" />
                {it.caption && <p className="fsplit__desc">{it.caption}</p>}
              </div>
            ))}
          </div>
        ) : block.type === "split" ? (
          <div className="fsplit" key={i}>
            {block.rows.map((r, k) => (
              <div className="fsplit__row" key={k}>
                <div className={"fsplit__side" + (r.desc ? " fsplit__side--tall" : "")}>
                  <h4 className="fsplit__label">{r.label}</h4>
                  {r.desc && <p className="fsplit__desc">{r.desc}</p>}
                </div>
                <div className="fsplit__main">
                  {r.media ? <div className="fsplit__media" /> : <p className="fsplit__body">{r.body}</p>}
                </div>
              </div>
            ))}
          </div>
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
