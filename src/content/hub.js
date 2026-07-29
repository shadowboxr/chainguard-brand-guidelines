// Brand Hub homepage content + destinations.
//
// Internal routes (`to`) point at real in-app pages and are live.
// External URLs and form links (`href`) are PLACEHOLDERS — search "PLACEHOLDER"
// and swap in the real destinations. Nothing else needs to change.

export const HUB_LINKS = {
  mediaKit: "https://www.chainguard.dev", // PLACEHOLDER — external Media Kit
  slackAndrea: "https://chainguard.enterprise.slack.com", // PLACEHOLDER — Andrea Carrillo Slack DM
  asanaForm: "https://form.asana.com/", // PLACEHOLDER — marketing Asana request form
  creativeForm: "https://forms.gle/", // PLACEHOLDER — company creative request form
};

// Three connected categories. Each item is either an internal route (`to`) or
// an external link (`href` + `external: true`).
export const HUB_NAV = [
  {
    id: "foundation",
    label: "Foundation",
    caption: "Who we are and how we sound.",
    items: [
      { label: "About Chainguard", to: "/foundations#about-chainguard" },
      { label: "Voice and writing guidelines", to: "/foundations#voice-and-writing" },
      { label: "Visual brand framework", to: "/foundations#visual-brand-framework" },
    ],
  },
  {
    id: "visual-brand",
    label: "Visual brand",
    caption: "The system we build everything from.",
    items: [
      { label: "Color", to: "/visual-brand/color" },
      { label: "Typography", to: "/visual-brand/typography" },
      { label: "Design elements", to: "/visual-brand/design-elements" },
      { label: "Data visualization", to: "/visual-brand/data-visualization" },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    caption: "Ready-to-use, on-brand resources.",
    items: [
      { label: "Logos", to: "/assets/logo" },
      { label: "Iconography", to: "/assets/icons" },
      { label: "Illustrations", to: "/assets/illustrations" },
      { label: "Templates and tools", to: "/assets/templates" },
      { label: "Media Kit", href: HUB_LINKS.mediaKit, external: true },
    ],
  },
];
