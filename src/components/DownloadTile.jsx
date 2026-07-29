import { useCallback } from "react";

// Wraps a piece of artwork; clicking anywhere on the tile downloads it (the
// download analog of the color palette's click-to-copy-hex). A "Download SVG"
// hint fades in on hover/focus. `svg` is an SVG string or a function returning
// one; `filename` names the download.
const DL_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M12 12H0V10.5H12V12ZM6.75 6H8.25V7.5H6.75V9H5.25V7.5H3.75V6H5.25V0H6.75V6ZM3.75 6H2.25V4.5H3.75V6ZM9.75 6H8.25V4.5H9.75V6Z" fill="currentColor" />
  </svg>
);

export default function DownloadTile({ svg, filename, label = "Download SVG", className = "", children }) {
  const download = useCallback(() => {
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

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        download();
      }
    },
    [download]
  );

  return (
    <div
      className={"dltile " + className}
      role="button"
      tabIndex={0}
      aria-label={`${label} — ${filename}`}
      onClick={download}
      onKeyDown={onKeyDown}
    >
      {children}
      <span className="dltile__hint" aria-hidden="true">
        {DL_ICON}
        <span>{label}</span>
      </span>
    </div>
  );
}
