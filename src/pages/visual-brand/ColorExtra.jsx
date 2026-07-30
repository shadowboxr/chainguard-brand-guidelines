import { useRef, useState, useCallback } from "react";
import Carousel from "./Carousel.jsx";
import ContrastChecker from "./ContrastChecker.jsx";
import ColorThemeBars from "./ColorThemeBars.jsx";
import ColorThemeMono from "./ColorThemeMono.jsx";
import ColorThemeBlurple from "./ColorThemeBlurple.jsx";
import boothAvoid1 from "../../assets/booth/booth-avoid-1.jpg";
import boothAvoid2 from "../../assets/booth/booth-avoid-2.jpg";
import boothAvoid3 from "../../assets/booth/booth-avoid-3.jpg";
import boothGood1 from "../../assets/booth/booth-good-1.jpg";
import boothGood2 from "../../assets/booth/booth-good-2.jpg";
import boothGood3 from "../../assets/booth/booth-good-3.jpg";

// On-brand environments to emulate (Chainguard-owned booth, print, OOH).
const GOOD_BOOTHS = [
  { src: boothGood1, alt: "Chainguard booth graphic in production" },
  { src: boothGood2, alt: "Chainguard event booth on the show floor" },
  { src: boothGood3, alt: "Chainguard out-of-home billboard" },
];
// Off-brand third-party booths to avoid (non-Chainguard).
const AVOID_BOOTHS = [
  { src: boothAvoid1, alt: "Cluttered booth with heavy text and low contrast" },
  { src: boothAvoid2, alt: "Generic booth with weak brand presence" },
  { src: boothAvoid3, alt: "Off-brand booth with mismatched styling" },
];

function TRow({ label, desc, media }) {
  return (
    <div className="fsplit__row">
      <div className="fsplit__side fsplit__side--tall">
        <h4 className="fsplit__label">{label}</h4>
        <p className="fsplit__desc">{desc}</p>
      </div>
      <div className="fsplit__main">
        {media || <div className="fsplit__media"></div>}
      </div>
    </div>
  );
}

function PRow({ label, items, images, strike }) {
  return (
    <div className="fsplit__row fsplit__row--print">
      <div className="fsplit__side">
        <h4 className="fsplit__label">{label}</h4>
      </div>
      <div className="fsplit__main">
        <ul className="fsplit__list">
          {items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
      <Carousel images={images} strike={strike} />
    </div>
  );
}

export default function ColorExtra() {
  const tipRef = useRef(null);
  const [tip, setTip] = useState({ text: "", on: false });

  // Cursor-following callout that names the color under the pointer, reusing the
  // copy-hex tooltip style. Elements carry data-cname (e.g. "Blurple 500").
  const onTipMove = useCallback((ev) => {
    const t = tipRef.current;
    if (t) { t.style.left = ev.clientX + "px"; t.style.top = ev.clientY + "px"; }
    const el = ev.target.closest && ev.target.closest("[data-cname]");
    const name = el && el.getAttribute("data-cname");
    if (name) setTip({ text: name, on: true });
    else setTip((s) => (s.on ? { ...s, on: false } : s));
  }, []);
  const onTipLeave = useCallback(() => setTip((s) => (s.on ? { ...s, on: false } : s)), []);

  return (
    <div className="cextra">
      <section className="cxsec">
        <h3 id="themes" className="cpal-h3 fanchor">Color themes</h3>
        <p className="cxintro">Our expanded palette gives our brand flexibility without losing consistency. The tints and shades create a spectrum of color that is both useful for dark/light mode, and modern monochromatic design. We group our colors into “themes” so that this expanded use of color stays consistent.</p>
        <div className="fsplit" onMouseMove={onTipMove} onMouseLeave={onTipLeave}>
          <TRow label="Light mode" desc="This is our core color theme. It allows us to lead with bold Ink type, supported by our blocks in full color, and accents in the Light and Air tints." media={<ColorThemeBars />} />
          <TRow label="Dark mode" desc="Our dark mode variation creates a sleek, modern look that reflects the dark mode many of our engineers prefer to work in. Dark mode relies on bold white type, and our dark and deep color shades." media={<ColorThemeBars mode="dark" />} />
          <TRow label="Monochromatic tone-on-tone" desc="Can be used in light blurple, fuschia, and aqua; or dark blurple, fuschia, and aqua; for when you’d like to give visual variety to a repeatable system (examples include webinar meta images or book covers)." media={<ColorThemeMono />} />
          <TRow label="Blurple core" desc="This color-drench option emphasizes our core color, and creates a very bold look for impactful statements and advertising opportunities." media={<ColorThemeBlurple />} />
        </div>
        <div className={"cpal-tip" + (tip.on ? " is-on" : "")} aria-hidden="true" ref={tipRef}>{tip.text}</div>
      </section>
      <section className="cxsec">
        <h3 id="print" className="cpal-h3 fanchor">Print</h3>
        <p className="cxintro">Our colors are optimized for digital, so please use the following guidelines to ensure consistency in print applications.</p>
        <div className="fsplit">
          <PRow label="Recommended" images={GOOD_BOOTHS} items={["Use Pantone colors whenever possible. If Pantone printing is not available, use the approved CMYK values.", "Print on black or dark backgrounds whenever possible to help the brand colors appear more vibrant.", "For vinyl applications, prioritize Pantone printing. This has produced the most consistent color results with vendors."]} />
          <PRow label="Avoid" images={AVOID_BOOTHS} strike items={["Avoid printing on fabric when possible, as color reproduction can be less consistent.", "Do not combine fabric and vinyl graphics within the same space unless the colors can be closely matched, as differences will be more noticeable side by side.", "For swag, use a black or white base when the item color cannot be accurately matched to an approved Pantone."]} />
        </div>
      </section>
      <section className="cxsec">
        <h3 id="accessibility" className="cpal-h3 fanchor">Accessibility</h3>
        <p className="cxintro">Our goal is to make our brand accessible to everyone, regardless of ability or device. We follow WCAG AA standards. Use the approved text and background color combinations below to maintain accessible contrast.</p>
        <ContrastChecker />
      </section>
    </div>
  );
}
