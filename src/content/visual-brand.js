// Visual Brand is split into one page per topic (Color, Typography, Design
// elements, Data visualization). Each renders through DocPage with its own
// sections + right-rail TOC; the hero stays "Visual Brand" across all four.

const COLOR = {
  sections: [
    {
      id: "color",
      label: "Color",
      desc: "Chainguard Blurple is iconic. Our expanded color palette expresses our bold, quirky, confident brand.",
      blocks: [{ type: "palette" }, { type: "scales" }, { type: "extra" }],
    },
  ],
  toc: [
    { id: "color", label: "Color" },
    { id: "scales", label: "Scales", sub: true },
    { id: "themes", label: "Themes", sub: true },
    { id: "print", label: "Print", sub: true },
    { id: "accessibility", label: "Accessibility", sub: true },
  ],
};

const TYPOGRAPHY = {
  sections: [{ id: "typography", label: "Typography", blocks: [{ type: "typography" }] }],
  toc: [
    { id: "typography", label: "Typography" },
    { id: "fonts", label: "Fonts", sub: true },
    { id: "hierarchy", label: "Hierarchy", sub: true },
    { id: "alignment", label: "Alignment", sub: true },
    { id: "capitalization", label: "Capitalization", sub: true },
    { id: "cursor-highlight", label: "The cursor and highlight", sub: true },
  ],
};

const DESIGN = {
  sections: [{ id: "design-elements", label: "Design elements", blocks: [{ type: "design" }] }],
  toc: [
    { id: "design-elements", label: "Design elements" },
    { id: "the-visible-grid", label: "The visible grid", sub: true },
    { id: "building-blocks", label: "Building blocks", sub: true },
    { id: "patterns", label: "Patterns", sub: true },
    { id: "the-cursor", label: "The Cursor", sub: true },
  ],
};

const DATAVIZ = {
  sections: [{ id: "data-visualization", label: "Data visualization", blocks: [{ type: "dataviz" }] }],
  toc: [
    { id: "data-visualization", label: "Data visualization" },
    { id: "data-viz-examples", label: "Examples", sub: true },
  ],
};

export const PAGES = {
  color: COLOR,
  typography: TYPOGRAPHY,
  "design-elements": DESIGN,
  "data-visualization": DATAVIZ,
};
