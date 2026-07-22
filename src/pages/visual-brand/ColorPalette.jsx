import { useRef, useEffect } from "react";
import { CPAL_HTML } from "./html.js";

export default function ColorPalette() {
  var ref = useRef(null);
  useEffect(function () {
    var root = ref.current;
    if (!root) return;
    var tip = document.createElement("div");
    tip.className = "cpal-tip";
    tip.setAttribute("aria-hidden", "true");
    root.appendChild(tip);
    var copied = false,
      revertT = 0;
    function onMove(ev) {
      tip.style.left = ev.clientX + "px";
      tip.style.top = ev.clientY + "px";
      if (copied) return;
      var el = ev.target.closest && ev.target.closest("[data-copy]");
      if (el && root.contains(el)) {
        tip.textContent = "Copy " + (el.getAttribute("data-label") || "HEX");
        tip.classList.add("is-on");
      } else {
        tip.classList.remove("is-on");
      }
    }
    function onLeave() {
      if (!copied) tip.classList.remove("is-on");
    }
    function onClick(ev) {
      var el = ev.target.closest && ev.target.closest("[data-copy]");
      if (!el || !root.contains(el)) return;
      var val = el.getAttribute("data-copy");
      try {
        if (navigator.clipboard) navigator.clipboard.writeText(val);
      } catch (e) {}
      tip.style.left = ev.clientX + "px";
      tip.style.top = ev.clientY + "px";
      tip.textContent = "Copied";
      tip.classList.add("is-on");
      copied = true;
      window.clearTimeout(revertT);
      revertT = window.setTimeout(function () {
        copied = false;
      }, 1100);
    }
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("click", onClick);
    return function () {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("click", onClick);
      if (tip.parentNode) tip.parentNode.removeChild(tip);
    };
  }, []);
  return <div className="cpal" ref={ref} dangerouslySetInnerHTML={{ __html: CPAL_HTML }} />;
}
