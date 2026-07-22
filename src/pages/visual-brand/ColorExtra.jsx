import { CXHTML } from "./html.js";

export default function ColorExtra() {
  return <div className="cextra" dangerouslySetInnerHTML={{ __html: CXHTML }} />;
}
