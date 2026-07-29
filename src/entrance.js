import { useRef } from "react";

/* Per-load entrance tracking. All state lives for the lifetime of one page load
   and resets on a full reload — so entrance animations play on a fresh load but
   not on client-side navigation back to a page already seen this session.

   - isBoot: this mount is the very first page rendered in this load (a direct
     load / reload of this route), not a navigation from another page. Used by
     the Home intro, which should only run on a fresh load of "/".
   - firstVisit: this route key hasn't been shown yet in this load. Used by the
     doc pages, which fade in the first time each page is visited. */
let bootConsumed = false;
const visited = new Set();

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useEntrance(key) {
  // Compute once per component instance (ref-guarded so React StrictMode's
  // double-invoked render doesn't consume the flags twice).
  const ref = useRef(null);
  if (ref.current === null) {
    const isBoot = !bootConsumed;
    bootConsumed = true;
    const firstVisit = !visited.has(key);
    visited.add(key);
    ref.current = { isBoot, firstVisit, reduce: reduced() };
  }
  return ref.current;
}
