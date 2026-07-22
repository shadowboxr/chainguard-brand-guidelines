import Carousel from "./Carousel.jsx";

function FText({ label, text }) {
  return (
    <div className="fsplit__row">
      <div className="fsplit__side">
        <h4 className="fsplit__label">{label}</h4>
      </div>
      <div className="fsplit__main">
        <p className="fsplit__body">{text}</p>
      </div>
    </div>
  );
}

export default function DataViz() {
  return (
    <div className="cdv">
      <p className="cxintro">Data allows us to communicate patterns, concepts, and our value with visual impact.</p>
      <div className="fsplit">
        <FText label="Keep it simple" text="Keep the focus on the data, and the story you are telling. Do not overcomplicate with visuals or design elements that do not add value." />
        <FText label="Use color with intent" text="Use color only when it adds emphasis or meaning; for example use Blurple to call attention to a key stat, or Lime/Solar to signify good/bad." />
        <FText label="Create structure" text="Use the grid to clearly organize the data, and make it easy to read, especially when creating longer lists or tables." />
      </div>
      <div className="dnote">
        <h3 className="dnote__title">Design notes</h3>
        <div className="fsplit">
          <div className="fsplit__row">
            <div className="fsplit__side">
              <h4 className="fsplit__label">Color</h4>
            </div>
            <div className="fsplit__main">
              <p className="fsplit__body">Data visualizations can be created using our core and secondary colors.</p>
              <ul className="fsplit__list">
                <li>Always consider if there is enough contrast between categories of a chart.</li>
                <li>Simple charts and visualizations (4 categories or less) can be monochromatic, using our tints and shades.</li>
                <li>When representing data, always reserve the use of Lime/Solar for good/bad, or increase/decrease.</li>
              </ul>
            </div>
          </div>
          <div className="fsplit__row">
            <div className="fsplit__side">
              <h4 className="fsplit__label">Type</h4>
            </div>
            <div className="fsplit__main">
              <p className="fsplit__body">Large-scale stats should always use Gellix Bold. Body copy should be Gellix Regular to ensure legibility. Labels can use Roobert SemiMono.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dv-ex">
        <h3 id="data-viz-examples" className="cpal-h3 fanchor">Data Visualization Examples</h3>
        <Carousel />
      </div>
    </div>
  );
}
