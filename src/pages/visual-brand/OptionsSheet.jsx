import { useState, useEffect, useCallback } from "react";

/* Mobile-only "Options" bottom sheet for the interactive Visual Brand blocks
   (Building blocks, Patterns, The Cursor). On desktop those blocks render their
   controls as overlays on the demo; at <=600px the overlays are hidden (CSS) and
   everything collapses into this one sheet, which slides up from the bottom of
   the viewport. The trigger stays pinned to the card. `onOpen` lets a block treat
   opening as an interaction (e.g. pausing an auto-cycle). */

const GEAR = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 1v2M8 13v2M15 8h-2M3 8H1M12.95 3.05l-1.4 1.4M4.45 11.55l-1.4 1.4M12.95 12.95l-1.4-1.4M4.45 4.45l-1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const CLOSE = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function OptionsSheet({ children, label = "Options", onOpen }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={"osheet" + (open ? " is-open" : "")}>
      <button
        type="button"
        className="osheet__trigger"
        aria-expanded={open}
        onClick={() => { setOpen(true); onOpen && onOpen(); }}
      >
        <span className="osheet__gear" aria-hidden="true">{GEAR}</span>
        {label}
      </button>
      <div className="osheet__backdrop" onClick={close} />
      <div className="osheet__panel" role="dialog" aria-modal="true" aria-label={label}>
        <div className="osheet__head">
          <span className="osheet__title">{label}</span>
          <button type="button" className="osheet__close" aria-label="Close options" onClick={close}>{CLOSE}</button>
        </div>
        <div className="osheet__body">{children}</div>
      </div>
    </div>
  );
}
