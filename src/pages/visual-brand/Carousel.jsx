import { useRef, useState, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";

const NAV = (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor" />
  </svg>
);

const SLIDES = [0, 1, 2, 3, 4, 5];

export default function Carousel() {
  const viewRef = useRef(null);
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  idxRef.current = idx;
  const dragRef = useRef(null);

  const slidesOf = useCallback(() => {
    const t = trackRef.current;
    return t ? [].slice.call(t.querySelectorAll(".tirl__slide")) : [];
  }, []);

  const step = useCallback((sl) => {
    return sl.length > 1 ? sl[1].offsetLeft - sl[0].offsetLeft : sl[0] ? sl[0].offsetWidth : 0;
  }, []);

  const maxTr = useCallback((view, sl) => {
    if (!sl.length) return 0;
    const l = sl[sl.length - 1];
    return Math.max(0, l.offsetLeft - sl[0].offsetLeft + l.offsetWidth - view.clientWidth);
  }, []);

  const apply = useCallback((i) => {
    const track = trackRef.current;
    const view = viewRef.current;
    if (!track || !view) return;
    const sl = slidesOf();
    const t = Math.min(i * step(sl), maxTr(view, sl));
    track.style.transform = "translateX(-" + Math.round(t) + "px)";
  }, [slidesOf, step, maxTr]);

  const go = useCallback((i) => {
    const sl = slidesOf();
    const ni = Math.max(0, Math.min(sl.length - 1, i));
    flushSync(() => setIdx(ni));
    apply(ni);
  }, [slidesOf, apply]);

  useEffect(() => {
    function rz() {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = "none";
      apply(idxRef.current);
      void track.offsetWidth;
      track.style.transition = "";
    }
    window.addEventListener("resize", rz);
    return () => window.removeEventListener("resize", rz);
  }, [apply]);

  const onPointerDown = useCallback((e) => {
    const view = viewRef.current;
    if (!view) return;
    const sl = slidesOf();
    dragRef.current = {
      sx: e.clientX,
      base: Math.min(idxRef.current * step(sl), maxTr(view, sl)),
      moved: false,
    };
    if (trackRef.current) trackRef.current.style.transition = "none";
  }, [slidesOf, step, maxTr]);

  const onPointerMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const view = viewRef.current;
    const track = trackRef.current;
    const sl = slidesOf();
    const dx = e.clientX - drag.sx;
    if (Math.abs(dx) > 4) drag.moved = true;
    if (track) track.style.transform = "translateX(-" + Math.round(Math.min(Math.max(drag.base - dx, 0), maxTr(view, sl))) + "px)";
  }, [slidesOf, maxTr]);

  const onPointerUp = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const track = trackRef.current;
    const sl = slidesOf();
    if (track) track.style.transition = "";
    if (drag.moved) go(Math.round((drag.base - (e.clientX - drag.sx)) / step(sl)));
    else apply(idxRef.current);
    dragRef.current = null;
  }, [slidesOf, step, go, apply]);

  return (
    <div className="tirl-wrap">
      <div
        className="tirl"
        ref={viewRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="tirl__track" ref={trackRef}>
          {SLIDES.map((i) => (
            <div className="tirl__slide" key={i} />
          ))}
        </div>
      </div>
      <div className="tirl__nav">
        <button
          type="button"
          className="tirl__arw tirl__arw--prev"
          data-dir="-1"
          aria-label="Previous"
          onClick={() => go(idx - 1)}
        >
          {NAV}
        </button>
        <div className="tirl__dots">
          {SLIDES.map((i) => (
            <button
              type="button"
              className={"tirl__dot" + (i === idx ? " is-on" : "")}
              data-i={i}
              aria-label={"Slide " + (i + 1)}
              key={i}
              onClick={() => go(i)}
            ></button>
          ))}
        </div>
        <button
          type="button"
          className="tirl__arw tirl__arw--next"
          data-dir="1"
          aria-label="Next"
          onClick={() => go(idx + 1)}
        >
          {NAV}
        </button>
      </div>
    </div>
  );
}
