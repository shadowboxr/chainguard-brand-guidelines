import { useRef, useEffect } from "react";
import { TYPO_HTML } from "./html.js";
import { typoInit } from "./init.js";

export default function Typography() {
  var ref = useRef(null);
  useEffect(function () {
    return typoInit(ref.current);
  }, []);
  return <div className="typo" ref={ref} dangerouslySetInnerHTML={{ __html: TYPO_HTML }} />;
}
