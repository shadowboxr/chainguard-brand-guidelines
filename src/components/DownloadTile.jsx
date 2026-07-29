import { useCallback } from "react";

// Wraps a piece of artwork and reveals a "Download SVG" button on hover/focus
// (the download analog of the color palette's copy-hex affordance). `svg` is an
// SVG string or a function returning one; `filename` names the download.
const DL_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M12 12H0V10.5H12V12ZM6.75 6H8.25V7.5H6.75V9H5.25V7.5H3.75V6H5.25V0H6.75V6ZM3.75 6H2.25V4.5H3.75V6ZM9.75 6H8.25V4.5H9.75V6Z" fill="currentColor" />
  </svg>
);

export default function DownloadTile({ svg, filename, label = "Download SVG", className = "", children }) {
  const onClick = useCallback(() => {
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

  return (
    <div className={"dltile " + className}>
      {children}
      <button type="button" className="dltile__btn" onClick={onClick} aria-label={`${label} — ${filename}`}>
        {DL_ICON}
        <span>{label}</span>
      </button>
    </div>
  );
}
