import { useRef, useEffect } from "react";
import { DV_HTML } from "./html.js";
import { cgCarousel } from "./init.js";

export default function DataViz() {
  var ref = useRef(null);
  useEffect(function () {
    return cgCarousel(ref.current);
  }, []);
  return <div className="cdv" ref={ref} dangerouslySetInnerHTML={{ __html: DV_HTML }} />;
}
