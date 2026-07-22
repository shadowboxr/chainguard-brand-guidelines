import { DE_HTML } from "./html.js";

export default function DesignElements() {
  return <div className="cde" dangerouslySetInnerHTML={{ __html: DE_HTML }} />;
}
