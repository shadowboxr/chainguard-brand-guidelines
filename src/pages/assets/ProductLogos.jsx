import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import OptionsSheet from "../visual-brand/OptionsSheet.jsx";

// Full logos + icons imported as raw SVG strings so we can recolor them (they
// ship as single-color Blurple with no background) and offer them as downloads.
import actionsFull from "../../assets/product-logos/full/actions.svg?raw";
import agentFull from "../../assets/product-logos/full/agent-skills.svg?raw";
import containersFull from "../../assets/product-logos/full/containers.svg?raw";
import librariesFull from "../../assets/product-logos/full/libraries.svg?raw";
import osFull from "../../assets/product-logos/full/os-packages.svg?raw";
import vmsFull from "../../assets/product-logos/full/vms.svg?raw";
import actionsIcon from "../../assets/product-logos/icons/actions.svg?raw";
import agentIcon from "../../assets/product-logos/icons/agent-skills.svg?raw";
import containersIcon from "../../assets/product-logos/icons/containers.svg?raw";
import librariesIcon from "../../assets/product-logos/icons/libraries.svg?raw";
import osIcon from "../../assets/product-logos/icons/os-packages.svg?raw";
import vmsIcon from "../../assets/product-logos/icons/vms.svg?raw";

/* "Product logos" — interactive picker (Figma 168:16095). Choose a product
   (top-left), a color (top-right), and full-logo vs icon-only (bottom-left);
   download the current selection as SVG (bottom-right). The source art has no
   background, so on a White fill the canvas turns Blurple. Grid lines frame the
   selected art; the icon matches the Linky-in-a-container size. */

const PRODUCTS = [
  { name: "Actions", slug: "actions", full: actionsFull, icon: actionsIcon },
  { name: "Agent Skills", slug: "agent-skills", full: agentFull, icon: agentIcon },
  { name: "Containers", slug: "containers", full: containersFull, icon: containersIcon },
  { name: "Libraries", slug: "libraries", full: librariesFull, icon: librariesIcon },
  { name: "OS Packages", slug: "os-packages", full: osFull, icon: osIcon },
  { name: "VMs", slug: "vms", full: vmsFull, icon: vmsIcon },
];
const COLORS = [
  { name: "Blurple", slug: "blurple", hex: "#6226FB" },
  { name: "Ink", slug: "ink", hex: "#0D161C" },
  { name: "White", slug: "white", hex: "#FFFFFF" },
];
const MODES = [
  { name: "Full logo", key: "full" },
  { name: "Icon only", key: "icon" },
];

// The art is single-color Blurple; swap it for the chosen color.
const recolor = (raw, hex) => raw.replace(/#6226FB/gi, hex);
const dataUrl = (svg) => "data:image/svg+xml," + encodeURIComponent(svg);

function Dropdown({ value, options, onPick, dot }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return (
    <div className={"cc-drop-wrap" + (open ? " is-open" : "")} ref={wrapRef}>
      <button type="button" className="cc-drop" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {dot ? <span className="cc-dot" style={{ background: value.hex }} /> : null}
        <span className="cc-drop__val">{value.name}</span>
        <span className="cc-drop__arw">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <div className="cc-drop-menu">
        {options.map((o, i) => (
          <button type="button" className="cc-drop-opt" key={o.slug || o.key || o.name} onClick={() => { onPick(i); setOpen(false); }}>
            {dot ? <span className="cc-dot" style={{ background: o.hex }} /> : null}
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductLogos() {
  const [productIdx, setProductIdx] = useState(3); // Libraries (matches Figma)
  const [colorIdx, setColorIdx] = useState(0);
  const [modeIdx, setModeIdx] = useState(0);
  const product = PRODUCTS[productIdx];
  const color = COLORS[colorIdx];
  const mode = MODES[modeIdx];
  const isIcon = mode.key === "icon";

  const svg = recolor(isIcon ? product.icon : product.full, color.hex);
  const artRef = useRef(null);
  const [frame, setFrame] = useState({ w: 118, h: 118 });

  // Frame the art: icon is a fixed 118px square (Linky-in-a-container size); the
  // full logo is measured so the grid lines sit on its bounding box.
  const measure = useCallback(() => {
    if (isIcon) { setFrame({ w: 118, h: 118 }); return; }
    const el = artRef.current;
    if (el) { const r = el.getBoundingClientRect(); setFrame({ w: r.width, h: r.height }); }
  }, [isIcon]);

  useLayoutEffect(() => {
    measure();
    const el = artRef.current;
    const ro = el ? new ResizeObserver(measure) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro && ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [measure, productIdx, modeIdx]);

  const download = useCallback(() => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chainguard-${product.slug}-${mode.key}-${color.slug}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [svg, product, mode, color]);

  const productDrop = <Dropdown value={product} options={PRODUCTS} onPick={setProductIdx} />;
  const colorDrop = <Dropdown value={color} options={COLORS} onPick={setColorIdx} dot />;
  const modeDrop = <Dropdown value={mode} options={MODES} onPick={setModeIdx} />;
  const downloadBtn = <button type="button" className="cur-copy" onClick={download}>Download SVG</button>;

  return (
    <div
      className={"plt" + (color.slug === "white" ? " plt--white" : "")}
      style={{ "--plw": frame.w + "px", "--plh": frame.h + "px" }}
    >
      <div className="plt-grid" aria-hidden="true">
        <span className="plt-line plt-line--v1" />
        <span className="plt-line plt-line--v2" />
        <span className="plt-line plt-line--h1" />
        <span className="plt-line plt-line--h2" />
      </div>

      <img
        ref={artRef}
        className={"plt-art " + (isIcon ? "plt-art--icon" : "plt-art--full")}
        src={dataUrl(svg)}
        alt={`${product.name} ${isIcon ? "icon" : "logo"} in ${color.name}`}
        onLoad={measure}
      />

      {/* Desktop: controls in the four corners */}
      <div className="plt-tl">{productDrop}</div>
      <div className="plt-tr">{colorDrop}</div>
      <div className="plt-bl">{modeDrop}</div>
      <div className="plt-br">{downloadBtn}</div>

      {/* Mobile (<=600px): the same controls collapsed into a bottom sheet */}
      <OptionsSheet>
        <div className="osheet__field">
          <span className="osheet__lbl">Product</span>
          {productDrop}
        </div>
        <div className="osheet__field">
          <span className="osheet__lbl">Color</span>
          {colorDrop}
        </div>
        <div className="osheet__field">
          <span className="osheet__lbl">Format</span>
          {modeDrop}
        </div>
        <div className="osheet__field osheet__field--wide">{downloadBtn}</div>
      </OptionsSheet>
    </div>
  );
}
