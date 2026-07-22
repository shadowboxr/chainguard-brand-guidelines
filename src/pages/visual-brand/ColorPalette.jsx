import { useRef, useState, useCallback } from "react";

const NOTE = "Note: We reserve use of our tertiary colors primarily to depict good/bad, positive/negative outcomes.";

const blurple = { name: "Blurple", fill: "var(--blurple-500)", h: 300, hex: "#6226FB", rows: [["HEX", "#6226FB"], ["CMYK", "64% 76% 0% 0%"], ["RGB", "98 38 251"], ["PMS", "2725 C"]] };

const CATS = [
  {
    title: "Core",
    list: "Blurple | White | Ink",
    cols: 3,
    items: [
      blurple,
      { name: "White", dark: true, fill: "var(--neutral-0)", h: 300, hex: "#FFFFFF", rows: [["HEX", "#FFFFFF"], ["CMYK", "0% 0% 0% 0%"], ["RGB", "255 255 255"]] },
      { name: "Ink", fill: "var(--neutral-900)", h: 300, hex: "#0D161C", rows: [["HEX", "#0D161C"], ["CMYK", "93% 76% 58% 81%"], ["RGB", "13 22 28"], ["PMS", "7547 C"]] },
    ],
    note: "",
  },
  {
    title: "Secondary",
    list: "Fuchsia | Aqua",
    cols: 2,
    items: [
      { name: "Fuchsia", fill: "var(--fuchsia-500)", h: 204, hex: "#FD2BF2", rows: [["HEX", "#FD2BF2"], ["CMYK", "11% 99% 4% 0%"], ["RGB", "253 43 242"], ["PMS", "232 C"]] },
      { name: "Aqua", fill: "var(--aqua-500)", h: 204, hex: "#2BBAFD", rows: [["HEX", "#2BBAFD"], ["CMYK", "77% 9% 6% 0%"], ["RGB", "43 186 253"], ["PMS", "299 C"]] },
    ],
    note: "",
  },
  {
    title: "Tertiary",
    list: "Lime | Solar | Amber | Orange",
    cols: 2,
    items: [
      { name: "Lime", fill: "var(--lime-500)", h: 150, hex: "#04BD13", rows: [["HEX", "#04BD13"], ["RGB", "4 189 19"]] },
      { name: "Solar", fill: "var(--solar-500)", h: 150, hex: "#FD3964", rows: [["HEX", "#FD3964"], ["RGB", "253 57 100"]] },
      { name: "Amber", dark: true, fill: "var(--amber-500)", h: 150, hex: "#F8C222", rows: [["HEX", "#F8C222"], ["RGB", "248 194 34"]] },
      { name: "Orange", fill: "var(--orange-500)", h: 150, hex: "#F85722", rows: [["HEX", "#F85722"], ["RGB", "248 87 34"]] },
    ],
    note: NOTE,
  },
];

function Swatch({ c }) {
  return (
    <div
      className={"cpal-sw" + (c.dark ? " is-dark" : "")}
      style={{ background: c.fill, height: c.h + "px" }}
      data-copy={c.hex}
      data-label="HEX"
    >
      <span className="cpal-name">{"Name: " + c.name}</span>
      <div className="cpal-rows">
        {c.rows.map((r, i) => (
          <button type="button" className="cpal-row" data-copy={r[1]} data-label={r[0]} key={i}>
            {r[0] + ": " + r[1]}
          </button>
        ))}
      </div>
    </div>
  );
}

function Category({ cat }) {
  return (
    <section className="cpal-cat">
      <div className="cpal-cat__head">
        <h3 className="cpal-cat__name">{cat.title}</h3>
        <span className="cpal-cat__list">{cat.list}</span>
      </div>
      <div className={"cpal-grid cpal-grid--" + cat.cols}>
        {cat.items.map((c, i) => (
          <Swatch c={c} key={i} />
        ))}
      </div>
      {cat.note ? (
        <div className="cpal-note">
          <span className="cpal-note__icon">*</span>
          <p>{cat.note}</p>
        </div>
      ) : null}
    </section>
  );
}

export default function ColorPalette() {
  const tipRef = useRef(null);
  const copiedRef = useRef(false);
  const revertRef = useRef(0);
  const [tip, setTip] = useState({ text: "", on: false });

  const positionTip = useCallback((x, y) => {
    const t = tipRef.current;
    if (t) {
      t.style.left = x + "px";
      t.style.top = y + "px";
    }
  }, []);

  const onMouseMove = useCallback((ev) => {
    positionTip(ev.clientX, ev.clientY);
    if (copiedRef.current) return;
    const el = ev.target.closest && ev.target.closest("[data-copy]");
    if (el && ev.currentTarget.contains(el)) {
      setTip({ text: "Copy " + (el.getAttribute("data-label") || "HEX"), on: true });
    } else {
      setTip((s) => (s.on ? { ...s, on: false } : s));
    }
  }, [positionTip]);

  const onMouseLeave = useCallback(() => {
    if (!copiedRef.current) setTip((s) => (s.on ? { ...s, on: false } : s));
  }, []);

  const onClick = useCallback((ev) => {
    const el = ev.target.closest && ev.target.closest("[data-copy]");
    if (!el || !ev.currentTarget.contains(el)) return;
    const val = el.getAttribute("data-copy");
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(val);
    } catch (e) {}
    positionTip(ev.clientX, ev.clientY);
    setTip({ text: "Copied", on: true });
    copiedRef.current = true;
    window.clearTimeout(revertRef.current);
    revertRef.current = window.setTimeout(() => {
      copiedRef.current = false;
    }, 1100);
  }, [positionTip]);

  return (
    <div className="cpal" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onClick}>
      <Swatch c={{ name: "Blurple", fill: "var(--blurple-500)", h: 300, hex: "#6226FB", rows: blurple.rows }} />
      <section className="cpal-body">
        <h3 className="cpal-h3">We have four color categories:</h3>
        <div className="cpal-cats">
          {CATS.map((cat, i) => (
            <Category cat={cat} key={i} />
          ))}
        </div>
      </section>
      <div className={"cpal-tip" + (tip.on ? " is-on" : "")} aria-hidden="true" ref={tipRef}>
        {tip.text}
      </div>
    </div>
  );
}
