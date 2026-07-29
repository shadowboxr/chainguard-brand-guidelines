export const NAV = [
  { id: "home", label: "Brand Hub", path: "/" },
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
      { label: "Color", path: "/visual-brand/color" },
      { label: "Typography", path: "/visual-brand/typography" },
      { label: "Design elements", path: "/visual-brand/design-elements" },
      { label: "Data visualization", path: "/visual-brand/data-visualization" },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    path: "/assets",
    children: [
      { label: "Logo", path: "/assets/logo" },
      { label: "Icons", path: "/assets/icons" },
      { label: "Illustrations", path: "/assets/illustrations" },
      { label: "Templates and tools", path: "/assets/templates" },
    ],
  },
  // External CTA — links out to the marketing site for now.
  { id: "media-kit", label: "Media Kit", href: "https://www.chainguard.dev" },
];
