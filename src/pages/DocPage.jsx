import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CopyButton from "../components/CopyButton.jsx";
import Blocks from "./Blocks.jsx";

export default function DocPage({ sections: S, toc: P, ids: M, title: H }) {
  const [active, setActive] = useState(M[0]);
  const listRef = useRef(null);
  const [indicatorTop, setIndicatorTop] = useState(4);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash, location.key]);

  useEffect(() => {
    let sc = document.querySelector(".layout__main");
    if (!sc) return;
    let tk = false,
      run = () => {
        tk = false;
        let a = M[0];
        for (let id of M) {
          let el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 120) a = id;
          else break;
        }
        if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 4) a = M[M.length - 1];
        setActive(a);
      },
      os = () => {
        tk || ((tk = true), requestAnimationFrame(run));
      };
    return run(), sc.addEventListener("scroll", os, { passive: true }), window.addEventListener("resize", os), () => {
      sc.removeEventListener("scroll", os), window.removeEventListener("resize", os);
    };
  }, [M]);

  useLayoutEffect(() => {
    let t = listRef.current?.querySelector(`[data-tocid="${active}"]`);
    t && setIndicatorTop(t.offsetTop + Math.min(20, (t.offsetHeight - 16) / 2));
  }, [active]);

  let onTocClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fpage">
      <header className="fhero">
        <div className="fhero__inner">
          <h1 className="fhero__title">{H}</h1>
        </div>
      </header>
      <div className="fbody">
        <div className="fbody__inner">
          <div className="fmain">
            {S.map((e) => (
              <section className="fsection" key={e.id}>
                {e.desc ? (
                  <div className="fhead2">
                    <h2 className="fheading fhead2__title" id={e.id}>
                      {e.label}
                    </h2>
                    <p className="ftext">{e.desc}</p>
                  </div>
                ) : (
                  <h2 className="fheading fheading--divider" id={e.id}>
                    {e.label}
                  </h2>
                )}
                {e.layout === "columns" ? (
                  <div className="frows">
                    {e.rows.map((e) => (
                      <div className="frow" key={e.id}>
                        <div className="frow__label">{e.label}</div>
                        <div className="frow__body">
                          <p className="ftext">{e.text}</p>
                          <CopyButton text={e.text} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : e.layout === "stacked" ? (
                  <div className="fsubs">
                    {e.subs.map((e) => (
                      <div className="fsub" key={e.id}>
                        <h3 className="fsubheading" id={e.id}>
                          {e.label}
                        </h3>
                        <div className="fsub__body">
                          <Blocks blocks={e.blocks} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="fblocks">
                    <Blocks blocks={e.blocks} />
                  </div>
                )}
              </section>
            ))}
          </div>
          <nav className="toc" aria-label="On this page">
            <ul className="toc__list" ref={listRef}>
              <span className="toc__indicator" style={{ top: indicatorTop }} />
              {P.map((t) => (
                <li className="toc__item" key={t.id}>
                  <button
                    type="button"
                    data-tocid={t.id}
                    className={"toc__link" + (active === t.id ? " toc__link--active" : "")}
                    onClick={() => onTocClick(t.id)}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
