export const NAV = [
  {
    id: "foundations",
    label: "Foundation",
    path: "/foundations",
    children: [
      { label: "About Chainguard", path: "/foundations", hash: "about-chainguard" },
      { label: "Voice and writing guidelines", path: "/foundations", hash: "voice-and-writing" },
      { label: "Visual brand framework", path: "/foundations", hash: "visual-brand-framework" },
    ],
  },
  {
    id: "visual-brand",
    label: "Visual Brand",
    path: "/visual-brand",
    children: [
      { label: "Color", path: "/visual-brand", hash: "color" },
      { label: "Typography", path: "/visual-brand", hash: "typography" },
      { label: "Design elements", path: "/visual-brand", hash: "design-elements" },
      { label: "Data visualization", path: "/visual-brand", hash: "data-visualization" },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    path: "/assets",
    children: [
      { label: "Logos", path: "/assets/logos", blurb: "Linky, the wordmark, and product lockups." },
      { label: "Icons", path: "/assets/icons", blurb: "The Chainguard icon library and usage rules." },
      { label: "Illustrations", path: "/assets/illustrations", blurb: "Spot illustrations and the graphic scan system." },
      { label: "Templates and tools", path: "/assets/templates", blurb: "Slide decks, social templates, and generative tools." },
    ],
  },
  { id: "media-kit", label: "Media Kit", path: "/media-kit" },
];
