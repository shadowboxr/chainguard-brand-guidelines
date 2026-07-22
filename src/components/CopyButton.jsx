import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="fcopy"
      aria-label={copied ? "Copied" : "Copy text"}
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M2.5 7.5 6 11l5.5-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <rect x="4.25" y="4.25" width="7.5" height="7.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M9.5 2.25H3.5a1.25 1.25 0 0 0-1.25 1.25v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
