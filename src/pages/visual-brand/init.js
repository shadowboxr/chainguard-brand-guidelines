export function cpTip(root) {
  if (!root) return function () {};
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
}

export function cscInit(root) {
  if (!root) return function () {};
  var tip = root.querySelector(".cpal-tip");
  var copied = false,
    revertT = 0;
  function segsOf(b) {
    return [].slice.call(b.querySelectorAll(".scale-seg"));
  }
  function curIdx(b) {
    return segsOf(b).findIndex(function (s) {
      return s.classList.contains("is-current");
    });
  }
  function updateNav(b) {
    var segs = segsOf(b),
      i = curIdx(b),
      p = b.querySelector(".scale-nav--prev"),
      n = b.querySelector(".scale-nav--next");
    if (p) p.disabled = i <= 0;
    if (n) n.disabled = i >= segs.length - 1;
  }
  function move(b, d) {
    var segs = segsOf(b),
      i = curIdx(b);
    if (i < 0) i = 0;
    var ni = Math.max(0, Math.min(segs.length - 1, i + d));
    if (ni !== i) {
      segs[i].classList.remove("is-current");
      segs[ni].classList.add("is-current");
      updateNav(b);
    }
  }
  var dark = document.documentElement.getAttribute("data-theme") === "dark";
  [].forEach.call(root.querySelectorAll(".scale-bar"), function (b) {
    if (dark) {
      var d = b.querySelector('.scale-seg[data-open="dark"]');
      if (d) {
        [].forEach.call(b.querySelectorAll(".scale-seg.is-current"), function (s) {
          s.classList.remove("is-current");
        });
        d.classList.add("is-current");
      }
    }
    updateNav(b);
  });

  function onMove(ev) {
    if (!tip) return;
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
    if (!copied && tip) tip.classList.remove("is-on");
  }
  function onClick(ev) {
    var nav = ev.target.closest && ev.target.closest(".scale-nav");
    if (nav && root.contains(nav)) {
      ev.preventDefault();
      var b = nav.closest(".scale-bar");
      if (b) move(b, nav.classList.contains("scale-nav--next") ? 1 : -1);
      return;
    }
    var el = ev.target.closest && ev.target.closest("[data-copy]");
    if (!el || !root.contains(el)) return;
    var val = el.getAttribute("data-copy");
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(val);
    } catch (e) {}
    if (tip) {
      tip.style.left = ev.clientX + "px";
      tip.style.top = ev.clientY + "px";
      tip.textContent = "Copied";
      tip.classList.add("is-on");
    }
    copied = true;
    window.clearTimeout(revertT);
    revertT = window.setTimeout(function () {
      copied = false;
    }, 1100);
  }
  var x0 = null,
    sbar = null;
  function ts(ev) {
    var b = ev.target.closest && ev.target.closest(".scale-bar");
    if (!b) {
      x0 = null;
      sbar = null;
      return;
    }
    sbar = b;
    x0 = ev.touches[0].clientX;
  }
  function te(ev) {
    if (x0 === null || !sbar) return;
    var dx = ev.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) {
      move(sbar, dx < 0 ? 1 : -1);
      if (ev.cancelable) ev.preventDefault();
    }
    x0 = null;
    sbar = null;
  }
  root.addEventListener("mousemove", onMove);
  root.addEventListener("mouseleave", onLeave);
  root.addEventListener("click", onClick);
  root.addEventListener("touchstart", ts, { passive: true });
  root.addEventListener("touchend", te, { passive: false });
  return function () {
    root.removeEventListener("mousemove", onMove);
    root.removeEventListener("mouseleave", onLeave);
    root.removeEventListener("click", onClick);
    root.removeEventListener("touchstart", ts);
    root.removeEventListener("touchend", te);
  };
}

export function cgCarousel(root) {
  if (!root) return function () {};
  var state = new Map();
  function wrapOf(el) {
    return el && el.closest ? el.closest(".tirl-wrap") : null;
  }
  function P(w) {
    return { view: w.querySelector(".tirl"), track: w.querySelector(".tirl__track"), slides: w.querySelectorAll(".tirl__slide") };
  }
  function st(w) {
    var s = state.get(w);
    if (!s) {
      s = { idx: 0 };
      state.set(w, s);
    }
    return s;
  }
  function step(sl) {
    return sl.length > 1 ? sl[1].offsetLeft - sl[0].offsetLeft : sl[0] ? sl[0].offsetWidth : 0;
  }
  function maxTr(view, sl) {
    if (!sl.length) return 0;
    var l = sl[sl.length - 1];
    return Math.max(0, l.offsetLeft - sl[0].offsetLeft + l.offsetWidth - view.clientWidth);
  }
  function paint(w) {
    var s = st(w),
      p = P(w);
    [].forEach.call(w.querySelectorAll(".tirl__dot"), function (d, k) {
      d.classList.toggle("is-on", k === s.idx);
    });

    var pv = w.querySelector(".tirl__arw--prev"),
      nx = w.querySelector(".tirl__arw--next"),
      last = p.slides.length - 1;
    if (pv) pv.disabled = s.idx <= 0;
    if (nx) nx.disabled = s.idx >= last;
  }
  function apply(w) {
    var s = st(w),
      p = P(w);
    if (!p.track) return;
    var t = Math.min(s.idx * step(p.slides), maxTr(p.view, p.slides));
    p.track.style.transform = "translateX(-" + Math.round(t) + "px)";
    paint(w);
  }
  function go(w, i) {
    var s = st(w),
      p = P(w);
    s.idx = Math.max(0, Math.min(p.slides.length - 1, i));
    apply(w);
  }
  function onClick(e) {
    var arw = e.target.closest && e.target.closest("[data-dir]");
    if (arw && root.contains(arw)) {
      var w = wrapOf(arw);
      if (w) go(w, st(w).idx + +arw.getAttribute("data-dir"));
      return;
    }
    var dot = e.target.closest && e.target.closest(".tirl__dot");
    if (dot && root.contains(dot)) {
      var w2 = wrapOf(dot);
      if (w2) go(w2, +dot.getAttribute("data-i"));
    }
  }
  var drag = null;
  function pd(e) {
    var view = e.target.closest && e.target.closest(".tirl");
    if (!view || !root.contains(view)) return;
    var w = wrapOf(view),
      p = P(w),
      s = st(w);
    drag = { w: w, sx: e.clientX, base: Math.min(s.idx * step(p.slides), maxTr(p.view, p.slides)), moved: false };
    if (p.track) p.track.style.transition = "none";
  }
  function pm(e) {
    if (!drag) return;
    var p = P(drag.w);
    var dx = e.clientX - drag.sx;
    if (Math.abs(dx) > 4) drag.moved = true;
    if (p.track) p.track.style.transform = "translateX(-" + Math.round(Math.min(Math.max(drag.base - dx, 0), maxTr(p.view, p.slides))) + "px)";
  }
  function pu(e) {
    if (!drag) return;
    var w = drag.w,
      p = P(w);
    if (p.track) p.track.style.transition = "";
    if (drag.moved) go(w, Math.round((drag.base - (e.clientX - drag.sx)) / step(p.slides)));
    else apply(w);
    drag = null;
  }
  function rz() {
    [].forEach.call(root.querySelectorAll(".tirl-wrap"), function (w) {
      var p = P(w);
      if (!p.track) return;
      p.track.style.transition = "none";
      apply(w);
      void p.track.offsetWidth;
      p.track.style.transition = "";
    });
  }
  root.addEventListener("click", onClick);
  root.addEventListener("pointerdown", pd);
  root.addEventListener("pointermove", pm);
  root.addEventListener("pointerup", pu);
  root.addEventListener("pointercancel", pu);
  window.addEventListener("resize", rz);
  [].forEach.call(root.querySelectorAll(".tirl-wrap"), function (w) {
    paint(w);
  });

  return function () {
    root.removeEventListener("click", onClick);
    root.removeEventListener("pointerdown", pd);
    root.removeEventListener("pointermove", pm);
    root.removeEventListener("pointerup", pu);
    root.removeEventListener("pointercancel", pu);
    window.removeEventListener("resize", rz);
  };
}

export function typoInit(root) {
  if (!root) return function () {};
  var FN = { gellix: "Gellix", poppins: "Poppins", roobert: "Roobert SemiMono", robotomono: "Roboto Mono" };
  function closeMenus(ex) {
    [].forEach.call(root.querySelectorAll(".tdrop-wrap.is-open"), function (w) {
      if (w !== ex) {
        w.classList.remove("is-open");
        var b = w.querySelector("[data-drop]");
        if (b) b.setAttribute("aria-expanded", "false");
      }
    });
  }
  function flip(row, font) {
    var t = row.querySelector("[data-specimen]");
    if (!t) return;
    t.classList.remove("tflip");
    void t.offsetWidth;
    t.classList.add("tflip");
    window.setTimeout(function () {
      row.setAttribute("data-font", font);
    }, 220);
    window.setTimeout(function () {
      t.classList.remove("tflip");
    }, 480);
  }
  function buildCss(row) {
    var f = FN[row.getAttribute("data-font")] || "Gellix";
    var size = +row.getAttribute("data-size");
    var lh = row.getAttribute("data-lh");
    var ls = Math.round((size * +row.getAttribute("data-spac")) / 100 * 100) / 100;
    var wt = row.getAttribute("data-wt");
    return 'font-family: "' + f + '", sans-serif;\nfont-size: ' + size + "px;\nline-height: " + lh + ";\nletter-spacing: " + ls + "px;\nfont-weight: " + wt + ";";
  }
  function onClick(ev) {
    var opt = ev.target.closest && ev.target.closest(".tdrop-opt");
    if (opt && root.contains(opt)) {
      var wrap = opt.closest(".tdrop-wrap"),
        row = opt.closest(".tspec__row"),
        f = opt.getAttribute("data-font");
      var v = wrap.querySelector(".tdrop__val");
      if (v) v.textContent = opt.textContent;
      wrap.classList.remove("is-open");
      var db = wrap.querySelector("[data-drop]");
      if (db) db.setAttribute("aria-expanded", "false");
      if (row.getAttribute("data-font") !== f) flip(row, f);
      return;
    }
    var drop = ev.target.closest && ev.target.closest("[data-drop]");
    if (drop && root.contains(drop)) {
      var w = drop.closest(".tdrop-wrap"),
        open = w.classList.contains("is-open");
      closeMenus(null);
      if (!open) {
        w.classList.add("is-open");
        drop.setAttribute("aria-expanded", "true");
      }
      return;
    }
    var cc = ev.target.closest && ev.target.closest("[data-copycss]");
    if (cc && root.contains(cc)) {
      var row2 = cc.closest(".tspec__row");
      try {
        if (navigator.clipboard) navigator.clipboard.writeText(buildCss(row2));
      } catch (e) {}
      var lab = cc.querySelector(".tcopy__t");
      if (lab) {
        var o = lab.textContent;
        lab.textContent = "Copied";
        cc.classList.add("is-copied");
        window.setTimeout(function () {
          lab.textContent = o;
          cc.classList.remove("is-copied");
        }, 1200);
      }
      return;
    }
    var np = ev.target.closest && ev.target.closest("[data-noop]");
    if (np) {
      ev.preventDefault();
      closeMenus(null);
      return;
    }
    if (!(ev.target.closest && ev.target.closest("[data-specimen]")) && !(ev.target.closest && ev.target.closest(".tirl-wrap"))) closeMenus(null);
  }
  root.addEventListener("click", onClick);
  var cc = cgCarousel(root);
  return function () {
    root.removeEventListener("click", onClick);
    cc && cc();
  };
}
