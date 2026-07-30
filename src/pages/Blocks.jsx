import CopyButton from "../components/CopyButton.jsx";
import ColorPalette from "./visual-brand/ColorPalette.jsx";
import ColorScales from "./visual-brand/ColorScales.jsx";
import ColorExtra from "./visual-brand/ColorExtra.jsx";
import Typography from "./visual-brand/Typography.jsx";
import DesignElements from "./visual-brand/DesignElements.jsx";
import DataViz from "./visual-brand/DataViz.jsx";
import DataVizTool from "./visual-brand/DataVizTool.jsx";
import { SIMPLIFIED, DIAGRAMS } from "./visual-brand/previewSets.js";
import Carousel from "./visual-brand/Carousel.jsx";
import Terminal from "./visual-brand/Terminal.jsx";

const DV_SETS = { simplified: SIMPLIFIED, diagrams: DIAGRAMS };
import MisuseGrid from "./assets/MisuseGrid.jsx";
import LogoVariants from "./assets/LogoVariants.jsx";
import Linky from "./assets/Linky.jsx";
import IconContainer from "./assets/IconContainer.jsx";
import IconGrid from "./assets/IconGrid.jsx";
import ProductLogos from "./assets/ProductLogos.jsx";
import StarIcon from "../components/StarIcon.jsx";
import TemplateButton from "./assets/TemplateButton.jsx";
import driveIcon from "../assets/templates/google-drive.svg";

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
        ) : block.type === "productlogos" ? (
          <ProductLogos key={i} />
        ) : block.type === "carousel" ? (
          block.tool === "dataviz" ? <DataVizTool key={i} examples={DV_SETS[block.set]} /> : <Carousel key={i} />
        ) : block.type === "terminal" ? (
          <Terminal key={i} />
        ) : block.type === "subhead" ? (
          <h3 className={"cpal-h3 fanchor" + (block.icon ? " cpal-h3--icon" : "")} id={block.id} key={i}>
            {block.icon && <img className="cpal-h3__icon" src={block.icon} alt="" />}
            {block.label}
          </h3>
        ) : block.type === "note" ? (
          <div className="cpal-note" key={i}>
            <span className="cpal-note__icon"><StarIcon /></span>
            <p>{block.text}</p>
          </div>
        ) : block.type === "iconcontainer" ? (
          <IconContainer key={i} />
        ) : block.type === "icongrid" ? (
          <IconGrid key={i} />
        ) : block.type === "media" ? (
          block.src ? (
            <img className="cxmedia" src={block.src} alt={block.alt || ""} key={i} />
          ) : (
            <div className="cxph" key={i} />
          )
        ) : block.type === "mediacards" ? (
          <div className="amediacards" key={i}>
            {block.items.map((it, k) => (
              <div className="amediacard" key={k}>
                {it.variant ? <Linky variant={it.variant} /> : <div className="cxph" />}
                {it.caption && <p className="fsplit__desc">{it.caption}</p>}
              </div>
            ))}
          </div>
        ) : block.type === "split" ? (
          <div className="fsplit" key={i}>
            {block.rows.map((r, k) => (
              <div className="fsplit__row" key={k}>
                <div className={"fsplit__side" + (r.desc || r.button ? " fsplit__side--tall" : "")}>
                  <h4 className="fsplit__label">{r.label}</h4>
                  {r.desc && <p className="fsplit__desc">{r.desc}</p>}
                  {r.button && (
                    <TemplateButton
                      icon={r.button.icon}
                      label={r.button.label}
                      href={r.button.href}
                      copy={r.button.copy}
                    />
                  )}
                </div>
                <div className="fsplit__main">
                  {r.lightDark ? (
                    <>
                      <img
                        className="fsplit__media fsplit__media--light"
                        src={r.lightDark.light}
                        alt={r.alt || ""}
                      />
                      <img
                        className="fsplit__media fsplit__media--dark"
                        src={r.lightDark.dark}
                        alt=""
                        aria-hidden="true"
                      />
                    </>
                  ) : r.media ? (
                    r.src ? (
                      r.href ? (
                        <a
                          className="fsplit__medialink"
                          href={r.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={r.src} alt={r.alt || ""} />
                          <span className="fsplit__scrim" aria-hidden="true" />
                          <span className="tmplbtn">
                            <span className="tmplbtn__icon">
                              <img src={driveIcon} alt="" />
                            </span>
                            <span className="tmplbtn__label">Open template</span>
                          </span>
                        </a>
                      ) : (
                        <img className="fsplit__media" src={r.src} alt={r.alt || ""} />
                      )
                    ) : (
                      <div className="fsplit__media" />
                    )
                  ) : (
                    <p className="fsplit__body">{r.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : block.type === "p" ? (
          <p className={"ftext" + (block.lead ? " ftext--lead" : "")} key={i}>
            {block.text}
          </p>
        ) : block.type === "cards" ? (
          <div className="fblock" key={i}>
            {block.lead && <p className="ftext">{block.lead}</p>}
            <div className="fcards">
              {block.items.map((item) => (
                <div className="fcard" key={item.term}>
                  {item.img ? (
                    <img className="fcard__img" src={item.img.src} alt={item.img.alt || ""} />
                  ) : (
                    <div className="fcard__img" />
                  )}
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
          block.lead ? (
            <div className="fblock" key={i}>
              <p className="ftext">{block.lead}</p>
              <ul className="fbullets">
                {block.items.map((item, t) => (
                  <li key={t}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="fbullets" key={i}>
              {block.items.map((item, t) => (
                <li key={t}>{item}</li>
              ))}
            </ul>
          )
        ) : (
          <div className="fvalues" key={i}>
            {block.items.map((item) => (
              <div className="fvalue" key={item.term}>
                <div className="fvalue__head">
                  <span className="fvalue__term">{item.term}</span>
                  <p className="fvalue__desc">{item.desc}</p>
                </div>
                <div className="fvalue__media">
                  {(item.imgs || [null, null]).map((img, m) =>
                    img ? (
                      <img className="fvalue__img" src={img.src} alt={img.alt || ""} key={m} />
                    ) : (
                      <div className="fvalue__img" key={m} />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
}
