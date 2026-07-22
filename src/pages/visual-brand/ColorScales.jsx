import { useRef, useEffect } from "react";
import { CSC_HTML } from "./html.js";
import { cscInit } from "./init.js";

export default function ColorScales() {
  var ref = useRef(null);
  useEffect(function () {
    return cscInit(ref.current);
  }, []);
  return <div className="cscales" ref={ref} dangerouslySetInnerHTML={{ __html: CSC_HTML }} />;
}
