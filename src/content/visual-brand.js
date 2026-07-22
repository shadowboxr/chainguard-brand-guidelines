export const SECTIONS = [
  {
    id: "color",
    label: "Color",
    desc: "Chainguard Blurple is iconic. Our expanded color palette expresses our bold, quirky, confident brand.",
    blocks: [{ type: "palette" }, { type: "scales" }, { type: "extra" }],
  },
  { id: "typography", label: "Typography", blocks: [{ type: "typography" }] },
  { id: "design-elements", label: "Design elements", blocks: [{ type: "design" }] },
  { id: "data-visualization", label: "Data visualization", blocks: [{ type: "dataviz" }] },
];

export const TOC = [
  { id: "color", label: "Color" },
  { id: "scales", label: "Scales" },
  { id: "themes", label: "Themes" },
  { id: "print", label: "Print" },
  { id: "accessibility", label: "Accessibility" },
  { id: "typography", label: "Typography" },
  { id: "design-elements", label: "Design elements" },
  { id: "data-visualization", label: "Data visualization" },
];
export const IDS = TOC.map((e) => e.id);
