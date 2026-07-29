import { useCallback, useEffect, useRef, useState } from "react";

// Wraps a piece of artwork; clicking anywhere on the tile downloads it, with a
// cursor-following tooltip ("Download SVG" → "Downloaded") mirroring the color
// palette's click-to-copy-hex. `svg` is an SVG string or a function returning
// one; `filename` names the download.
export default function DownloadTile({ svg, filename, label = "Download SVG", className = "", children }) {
  const tipRef = useRef(null);
  const timerRef = useRef(0);
  const doneRef = useRef(false);
  const [tip, setTip] = useState({ text: label, on: false });

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const position = (x, y) => {
    const t = tipRef.current;
    if (t) { t.style.left = x + "px"; t.style.top = y + "px"; }
  };

  const doDownload = useCallback(() => {
    const out = typeof svg === "function" ? svg() : svg;
    const blob = new Blob([out], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [svg, filename]);

  const onMove = (e) => {
    position(e.clientX, e.clientY);
    if (doneRef.current) return;
    setTip((s) => (s.on && s.text === label ? s : { text: label, on: true }));
  };
  const onLeave = () => {
    if (!doneRef.current) setTip((s) => (s.on ? { ...s, on: false } : s));
  };
  const onClick = (e) => {
    doDownload();
    position(e.clientX, e.clientY);
    setTip({ text: "Downloaded", on: true });
    doneRef.current = true;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      doneRef.current = false;
      setTip({ text: label, on: false });
    }, 1100);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doDownload(); }
  };

  return (
    <div
      className={"dltile " + className}
      role="button"
      tabIndex={0}
      aria-label={`${label} — ${filename}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
      <div className={"cpal-tip" + (tip.on ? " is-on" : "")} aria-hidden="true" ref={tipRef}>
        {tip.text}
      </div>
    </div>
  );
}
