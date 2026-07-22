import ContrastChecker from "./ContrastChecker.jsx";

function TRow({ label, desc }) {
  return (
    <div className="fsplit__row">
      <div className="fsplit__side fsplit__side--tall">
        <h4 className="fsplit__label">{label}</h4>
        <p className="fsplit__desc">{desc}</p>
      </div>
      <div className="fsplit__main">
        <div className="fsplit__media"></div>
      </div>
    </div>
  );
}

function PRow({ label, items }) {
  return (
    <div className="fsplit__row">
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
    </div>
  );
}

export default function ColorExtra() {
  return (
    <div className="cextra">
      <section className="cxsec">
        <h3 id="themes" className="cpal-h3 fanchor">Color themes</h3>
        <p className="cxintro">Our expanded palette gives our brand flexibility without losing consistency. The tints and shades create a spectrum of color that is both useful for dark/light mode, and modern monochromatic design. We group our colors into “themes” so that this expanded use of color stays consistent.</p>
        <div className="fsplit">
          <TRow label="Light mode" desc="This is our core color theme. It allows us to lead with bold Ink type, supported by our blocks in full color, and accents in the Light and Air tints." />
          <TRow label="Dark mode" desc="Our dark mode variation creates a sleek, modern look that reflects the dark mode many of our engineers prefer to work in. Dark mode relies on bold white type, and our dark and deep color shades." />
          <TRow label="Monochromatic tone-on-tone" desc="Can be used in light blurple, fuschia, and aqua; or dark blurple, fuschia, and aqua; for when you’d like to give visual variety to a repeatable system (examples include webinar meta images or book covers)." />
          <TRow label="Blurple core" desc="This color-drench option emphasizes our core color, and creates a very bold look for impactful statements and advertising opportunities." />
        </div>
      </section>
      <section className="cxsec">
        <h3 id="print" className="cpal-h3 fanchor">Print</h3>
        <p className="cxintro">Our colors are optimized for digital, so please use the following guidelines to ensure consistency in print applications.</p>
        <div className="fsplit">
          <PRow label="Recommended" items={["Use Pantone colors whenever possible. If Pantone printing is not available, use the approved CMYK values.", "Print on black or dark backgrounds whenever possible to help the brand colors appear more vibrant.", "For vinyl applications, prioritize Pantone printing. This has produced the most consistent color results with vendors."]} />
          <PRow label="Avoid" items={["Avoid printing on fabric when possible, as color reproduction can be less consistent.", "Do not combine fabric and vinyl graphics within the same space unless the colors can be closely matched, as differences will be more noticeable side by side.", "For swag, use a black or white base when the item color cannot be accurately matched to an approved Pantone."]} />
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
