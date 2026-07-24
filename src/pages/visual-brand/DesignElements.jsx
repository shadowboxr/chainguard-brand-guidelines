import Cursor from "./Cursor.jsx";

function XSec({ id, title, intro, children }) {
  return (
    <section className="cxsec">
      <h3 id={id} className="cpal-h3 fanchor">{title}</h3>
      <p className="cxintro">{intro}</p>
      {children || <div className="cxph"></div>}
    </section>
  );
}

export default function DesignElements() {
  return (
    <div className="cde">
      <p className="cxintro">Our brand system is made up of various design elements that allow us to create a flexible, yet recognizable visual brand.</p>
      <XSec id="the-visible-grid" title="The visible grid" intro="The grid is the foundation of our visual brand. We keep the grid visible to add structure, and as a nod to the importance of the underlying foundation that is keeping our software supply chain secure." />
      <XSec id="building-blocks" title="Building blocks" intro="The individual building blocks create a design element that we can use to create pattern, structure, or meaning through our icons. They create a balance between structure and playfulness." />
      <XSec id="patterns" title="Patterns" intro="By combining the grid and building blocks, we create patterns that add texture and depth to our visual brand. The patterns are used as background elements, and are a flexible design element that gives us range." />
      <XSec id="the-cursor" title="The Cursor" intro="The cursor is a direct reference to our engineering audience. As a design element, it can be expanded into a highlight, or block text treatment that creates bold typographic moments.">
        <Cursor />
      </XSec>
    </div>
  );
}
