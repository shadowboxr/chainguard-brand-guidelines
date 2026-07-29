import { useRef } from "react";

/* Per-load entrance tracking. State lives for the lifetime of one page load and
   resets on a full reload, so the Home intro plays on a fresh load of "/" but
   not on client-side navigation back to home this session.

   isBoot: this mount is the very first page rendered in this load (a direct load
   / reload of this route), not a navigation from another page. */
let bootConsumed = false;

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useEntrance() {
  // Compute once per component instance (ref-guarded so React StrictMode's
  // double-invoked render doesn't consume the flag twice).
  const ref = useRef(null);
  if (ref.current === null) {
    const isBoot = !bootConsumed;
    bootConsumed = true;
    ref.current = { isBoot, reduce: reduced() };
  }
  return ref.current;
}
