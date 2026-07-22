import { useRef, useState, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import Carousel from "./Carousel.jsx";

const FN = { gellix: "Gellix", poppins: "Poppins", roobert: "Roobert SemiMono", robotomono: "Roboto Mono" };

const ARW = (
  <span className="tdrop__arw">
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
    </svg>
  </span>
);

const DLI = (
  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10H0V8.75H10V10ZM5.625 5H6.875V6.25H5.625V7.5H4.375V6.25H3.125V5H4.375V0H5.625V5ZM3.125 5H1.875V3.75H3.125V5ZM8.125 5H6.875V3.75H8.125V5Z" fill="currentColor" />
  </svg>
);

// tRow(label, fdV, fdL, faV, faL, size, leadT, leadC, spacT, spacP, wnum, wname, text, cls)
const HEADING_ROW = {
  label: "Heading",
  fdV: "gellix", fdL: "Gellix", faV: "poppins", faL: "Poppins",
  size: 64, leadT: "100%", leadC: "1", spacT: "-3%", spacP: -3,
  wnum: 700, wname: "Bold",
  text: "The trusted source for open source",
  cls: "tspec__text--heading",
};
const BODY_ROW = {
  label: "Body",
  fdV: "gellix", fdL: "Gellix", faV: "poppins", faL: "Poppins",
  size: 16, leadT: "150%", leadC: "1.5", spacT: "-3%", spacP: -3,
  wnum: 400, wname: "Regular",
  text: "Developers and AI agents are pulling open source at a pace that’s outrunning reactive security. Chainguard delivers the industry’s largest zero-CVE, built-from-source container image catalog for engineers who refuse to choose between velocity and trust.",
  cls: "tspec__text--body",
};
const MONO_ROW = {
  label: "",
  fdV: "roobert", fdL: "Roobert SemiMono", faV: "robotomono", faL: "Roboto Mono",
  size: 16, leadT: "150%", leadC: "1.5", spacT: "6%", spacP: 6,
  wnum: 500, wname: "Medium",
  text: "Only Chainguard can deliver the security and compliance your organization needs while being the partner that engineering teams can count on.",
  cls: "tspec__text--mono",
};

function buildCss(dataFont, size, lh, spac, wt) {
  const f = FN[dataFont] || "Gellix";
  const ls = Math.round(((size * spac) / 100) * 100) / 100;
  return 'font-family: "' + f + '", sans-serif;\nfont-size: ' + size + "px;\nline-height: " + lh + ";\nletter-spacing: " + ls + "px;\nfont-weight: " + wt + ";";
}

function TDL({ href, label, noop, onNoop }) {
  const rest = noop ? {} : { target: "_blank", rel: "noopener" };
  return (
    <a
      className="tdl"
      href={href}
      {...(noop ? { "data-noop": "" } : {})}
      {...rest}
      onClick={noop ? onNoop : undefined}
    >
      {DLI}
      <span>{label}</span>
    </a>
  );
}

function TSpecRow({ row, registerClose, closeOthers }) {
  const [dataFont, setDataFont] = useState(row.fdV);
  const [valLabel, setValLabel] = useState(row.fdL);
  const [open, setOpen] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [copied, setCopied] = useState(false);
  const specimenRef = useRef(null);
  const flipT = useRef([]);
  const copyT = useRef(0);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    registerClose(close);
  }, [registerClose, close]);

  useEffect(() => () => {
    flipT.current.forEach((t) => window.clearTimeout(t));
    window.clearTimeout(copyT.current);
  }, []);

  const doFlip = useCallback((font) => {
    // remove + reflow + add tflip (retrigger animation)
    setFlipping(false);
    if (specimenRef.current) void specimenRef.current.offsetWidth;
    setFlipping(true);
    flipT.current.push(
      window.setTimeout(() => setDataFont(font), 220),
      window.setTimeout(() => setFlipping(false), 480)
    );
  }, []);

  const pickOption = useCallback(
    (font, optLabel) => {
      setValLabel(optLabel);
      setOpen(false);
      if (dataFont !== font) doFlip(font);
    },
    [dataFont, doFlip]
  );

  const toggleDrop = useCallback(() => {
    flushSync(() => {
      setOpen((o) => {
        const next = !o;
        if (next) closeOthers(close);
        return next;
      });
    });
  }, [closeOthers, close]);

  const copyCss = useCallback(() => {
    const css = buildCss(dataFont, row.size, row.leadC, row.spacP, row.wnum);
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(css);
    } catch (e) {}
    setCopied(true);
    window.clearTimeout(copyT.current);
    copyT.current = window.setTimeout(() => setCopied(false), 1200);
  }, [dataFont, row]);

  return (
    <div className="tspec__row" data-font={dataFont} data-size={row.size} data-lh={row.leadC} data-spac={row.spacP} data-wt={row.wnum}>
      <div className="tspec__ctrl">
        <div className="tspec__cl">
          {row.label ? <span className="tpill tpill--label">{row.label}</span> : null}
          <div className={"tdrop-wrap" + (open ? " is-open" : "")}>
            <button type="button" className="tpill tdrop" data-drop aria-expanded={open ? "true" : "false"} onClick={toggleDrop}>
              <span className="tdrop__val">{valLabel}</span>
              {ARW}
            </button>
            <div className="tdrop-menu">
              <button type="button" className="tdrop-opt" data-font={row.fdV} onClick={() => pickOption(row.fdV, row.fdL)}>
                {row.fdL}
              </button>
              <button type="button" className="tdrop-opt" data-font={row.faV} onClick={() => pickOption(row.faV, row.faL)}>
                {row.faL}
              </button>
            </div>
          </div>
        </div>
        <div className="tspec__cr">
          <span className="tspec__meta">{"Leading: " + row.leadT + " | Spacing: " + row.spacT + " | Weight: " + row.wname}</span>
          <button type="button" className={"tpill tcopy" + (copied ? " is-copied" : "")} data-copycss onClick={copyCss}>
            <span className="tcopy__t">{copied ? "Copied" : "Copy CSS"}</span>
          </button>
        </div>
      </div>
      <p
        className={"tspec__text " + row.cls + (flipping ? " tflip" : "")}
        data-specimen
        contentEditable="true"
        spellCheck="false"
        suppressContentEditableWarning
        ref={specimenRef}
      >
        {row.text}
      </p>
    </div>
  );
}

function XSec({ id, title, intro, children }) {
  return (
    <section className="cxsec">
      <h3 id={id} className="cpal-h3 fanchor">{title}</h3>
      <p className="cxintro">{intro}</p>
      {children || <div className="cxph"></div>}
    </section>
  );
}

function FMedia({ label, desc }) {
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

export default function Typography() {
  const closersRef = useRef([]);

  const registerClose = useCallback((fn) => {
    if (!closersRef.current.includes(fn)) closersRef.current.push(fn);
  }, []);

  const closeMenus = useCallback(() => {
    closersRef.current.forEach((c) => c());
  }, []);

  const closeOthers = useCallback((except) => {
    closersRef.current.forEach((c) => {
      if (c !== except) c();
    });
  }, []);

  // Click-outside: close all dropdowns unless the click is on a specimen,
  // a carousel, a dropdown trigger, an option, or a copy-css button.
  const onClickCapture = useCallback(
    (ev) => {
      const t = ev.target;
      if (
        (t.closest && t.closest(".tdrop-opt")) ||
        (t.closest && t.closest("[data-drop]")) ||
        (t.closest && t.closest("[data-copycss]"))
      ) {
        return; // handled by the element's own onClick
      }
      if (t.closest && t.closest("[data-noop]")) {
        ev.preventDefault();
        closeMenus();
        return;
      }
      if (!(t.closest && t.closest("[data-specimen]")) && !(t.closest && t.closest(".tirl-wrap"))) {
        closeMenus();
      }
    },
    [closeMenus]
  );

  const onNoop = useCallback(
    (ev) => {
      ev.preventDefault();
      closeMenus();
    },
    [closeMenus]
  );

  return (
    <div className="typo" onClick={onClickCapture}>
      <section className="typo-fonts">
        <h3 id="fonts" className="cpal-h3 fanchor">Fonts</h3>
        <p className="cxintro">Our primary font is Gellix, and we use Roobert SemiMono as a secondary accent. To maintain a consistent look, we also have Google font alternatives for use on Docs and slides.</p>
        {/* Gellix — info card, specimen card, and IRL carousel are separate blocks */}
        <div className="tcard">
          <div className="tcard__head">
            <span className="tcard__name">Gellix</span>
            <span className="cpal-cat__list">Web font alternative: Poppins</span>
          </div>
          <p className="tcard__desc">Gellix is our primary typeface: modern, friendly, and built for clarity. Its geometric forms and balanced proportions make it just as effective in dense technical content as it is in bold, expressive headlines. We use Gellix across every Chainguard touchpoint to maintain consistency and confidence. Heavier weights bring impact to headlines and key statements, while lighter weights create breathing room in longer-form content.</p>
        </div>
        <div className="tspec">
          <TSpecRow row={HEADING_ROW} registerClose={registerClose} closeOthers={closeOthers} />
          <TSpecRow row={BODY_ROW} registerClose={registerClose} closeOthers={closeOthers} />
          <div className="tspec__dl">
            <TDL href="#" label="Download Gellix Family" noop onNoop={onNoop} />
            <TDL href="https://fonts.google.com/specimen/Poppins" label="Download Poppins" />
          </div>
        </div>
        <h4 className="tirl__title">Gellix IRL</h4>
        <Carousel />

        {/* Roobert SemiMono */}
        <div className="tcard">
          <div className="tcard__head">
            <span className="tcard__name">Roobert Semimono</span>
            <span className="cpal-cat__list">Web font alternative: Roboto Mono</span>
          </div>
          <p className="tcard__desc">Roobert SemiMono is our secondary typeface; technical, precise, and unmistakably Chainguard. Its semi-monospaced design nods to engineering environments, creating a bridge between clarity and code. We use Roobert SemiMono to highlight technical details, product interfaces, and type accents (like eyebrow text).</p>
        </div>
        <div className="tspec">
          <TSpecRow row={MONO_ROW} registerClose={registerClose} closeOthers={closeOthers} />
          <div className="tspec__dl">
            <TDL href="#" label="Download Roobert SemiMono" noop onNoop={onNoop} />
            <TDL href="https://fonts.google.com/specimen/Roboto+Mono" label="Download Roboto Mono" />
          </div>
        </div>
        <h4 className="tirl__title">Roobert SemiMono IRL</h4>
        <Carousel />
      </section>
      <XSec id="hierarchy" title="Hierarchy" intro="Our bold, modern primary typeface is an important and recognizable element of our brand system. We use Gellix Bold at scale to display headlines with impact and personality, supported by smaller Gellix Regular for body copy.">
        <div className="cpal-note">
          <span className="cpal-note__icon">*</span>
          <p>We reserve all-caps Roobert Semimono for labels (like eyebrows, date/time, and our website url)</p>
        </div>
        <div className="cxph"></div>
      </XSec>
      <XSec id="alignment" title="Alignment" intro="We align type primarily to the left, and in some select applications, center. Left alignment is used as the default for most content applications, since it is the most clear and easy to read. We reserve center alignment for more striking applications like a homepage hero, an out-of-home campaign, and bold statement presentation slides." />
      <XSec id="capitalization" title="Capitalization" intro="As outlined in our Writing Style Guide, we use sentence case for all of our headlines. We only use capital letters at the start of the sentence, or when mentioning a proper noun like a person, place, company, or product (like Chainguard Containers, or The Guardener). We reserve all-caps for labels, like eyebrow text." />
      <XSec id="cursor-highlight" title="The cursor and highlight" intro="Our brand system uses two elements alongside our typeface: the cursor and the highlight.">
        <div className="fsplit">
          <FMedia label="The cursor" desc="Inspired by a terminal, the cursor grounds eyebrow text elements and other labels. It is an opportunity to introduce our core colors and speak directly to our engineering audience." />
          <FMedia label="The highlight" desc="The highlight element combines the highlighting capability in a terminal with our building blocks, to create an opportunity for emphasis on a couple words of a headline." />
        </div>
      </XSec>
    </div>
  );
}
