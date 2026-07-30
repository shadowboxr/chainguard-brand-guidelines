// Assets content (Figma node 37:7165). Split into one page per topic (Logo,
// Icons, Illustrations, Templates and tools), each rendered by DocPage with its
// own right-rail TOC. The hero stays "Chainguard Assets" across all four. Real
// copy is used where the design provides it; other body copy is on-topic
// placeholder while the page is filled in.

import partnerLogos from "../assets/partner-logos.svg";

const LOGO = {
  sections: [
    {
      id: "logo",
      label: "Logo",
      desc: "Our logo is the most recognizable expression of the Chainguard brand. Use the approved lockups and variants, keep clear space around them, and never alter the artwork.",
      blocks: [
        { type: "subhead", id: "logo-variants", label: "Logo variants" },
        {
          type: "p",
          text: "Our logo appears in a few core color variants to ensure legibility and consistency across all applications. Use the Blurple version on light backgrounds, Ink on light neutrals, and White on dark backgrounds. These combinations protect contrast, clarity, and recognition no matter where Chainguard shows up.",
        },
        { type: "logovariants" },

        { type: "subhead", id: "misuses", label: "Misuses" },
        {
          type: "p",
          text: "Consistent use keeps the logo strong. Avoid the modifications below — they weaken recognition and break our visual system.",
        },
        { type: "misuses" },

        { type: "subhead", id: "linky", label: "Linky, the Chainguard mark" },
        {
          type: "p",
          text: "Linky is our mascot and the heart of the logo. When space is tight or the wordmark isn’t needed, Linky can stand alone as the Chainguard mark.",
        },
        {
          type: "mediacards",
          items: [
            { variant: "flat", caption: "Linky, our mascot and standalone mark." },
            { variant: "space", caption: "Give Linky room to breathe with ample clear space." },
          ],
        },

        { type: "subhead", id: "icon", label: "The icon (Linky, in a container)" },
        {
          type: "p",
          text: "For app icons, avatars, and favicons, Linky sits inside a container. Use the containerized icon only where a square or rounded app mark is required.",
        },
        { type: "iconcontainer" },

        { type: "subhead", id: "product-logos", label: "Product logos" },
        {
          type: "p",
          text: "Each Chainguard product pairs the logo with its product name in a consistent lockup. Use the approved product logos rather than setting the names yourself.",
        },
        { type: "note", text: "The product logos should only be used in Blurple, white, or Ink." },
        { type: "productlogos" },

        { type: "subhead", id: "co-branded", label: "Co-branded logos" },
        {
          type: "p",
          text: "When partnering with another brand, use the co-branded lockup with balanced spacing and a clear divider between the two logos.",
        },
        { type: "media", src: partnerLogos, alt: "Chainguard co-branded partner lockup" },
      ],
    },
  ],
  toc: [
    { id: "logo", label: "Logo" },
    { id: "logo-variants", label: "Logo variants", sub: true },
    { id: "misuses", label: "Misuses", sub: true },
    { id: "linky", label: "Linky, the mark", sub: true },
    { id: "icon", label: "The icon", sub: true },
    { id: "product-logos", label: "Product logos", sub: true },
    { id: "co-branded", label: "Co-branded logos", sub: true },
  ],
};

const ICONS = {
  sections: [
    {
      id: "icons",
      label: "Icons",
      blocks: [
        {
          type: "p",
          text: "Our icon system is clear, geometric, and built on the same grid as the rest of the brand. Icons add meaning and wayfinding without competing with the content around them.",
        },
        { type: "media" },

        { type: "subhead", id: "custom-icons", label: "Custom icons" },
        {
          type: "p",
          text: "When the library doesn’t cover a concept, custom icons follow the same stroke weight, corner radius, and grid so they sit naturally alongside the core set.",
        },
        { type: "media" },
      ],
    },
  ],
  toc: [
    { id: "icons", label: "Icons" },
    { id: "custom-icons", label: "Custom icons", sub: true },
  ],
};

const ILLUSTRATIONS = {
  sections: [
    {
      id: "illustrations",
      label: "Illustrations",
      blocks: [
        { type: "subhead", id: "high-fidelity", label: "High-fidelity" },
        {
          type: "p",
          text: "High-fidelity illustrations bring product screens and key moments to life with realistic detail.",
        },
        {
          type: "note",
          text: "Product screens should have a soft rounded corner to create contrast against our geometric components.",
        },
        { type: "carousel", tool: "dataviz" },

        { type: "subhead", id: "simplified", label: "Simplified" },
        {
          type: "p",
          text: "Simplified illustrations reduce a concept to its essentials — ideal for smaller sizes and supporting moments.",
        },
        {
          type: "note",
          text: "Simplified product illustrations are often framed within a rounded rectangle to create some contrast between the illustration and surrounding content.",
        },
        { type: "carousel", tool: "dataviz", set: "simplified" },

        { type: "subhead", id: "terminal", label: "The terminal" },
        {
          type: "p",
          text: "The terminal is a signature Chainguard motif — a direct nod to the engineers we build for. Use it to ground technical stories.",
        },
        { type: "media" },

        { type: "subhead", id: "diagrams", label: "Diagrams" },
        {
          type: "p",
          text: "Diagrams explain systems and flows using the grid, building blocks, and our core colors — always with intent.",
        },
        { type: "carousel", tool: "dataviz", set: "diagrams" },
      ],
    },
  ],
  toc: [
    { id: "illustrations", label: "Illustrations" },
    { id: "high-fidelity", label: "High-fidelity", sub: true },
    { id: "simplified", label: "Simplified", sub: true },
    { id: "terminal", label: "The terminal", sub: true },
    { id: "diagrams", label: "Diagrams", sub: true },
  ],
};

const TEMPLATES = {
  sections: [
    {
      id: "templates",
      label: "Templates and tools",
      blocks: [
        {
          type: "p",
          text: "Start from an approved template so everything you make stays on-brand. These cover the tools we reach for most.",
        },

        { type: "subhead", id: "google-workspace", label: "Google Workspace" },
        { type: "p", text: "Branded templates for the documents and decks we create every day." },
        {
          type: "split",
          rows: [
            {
              label: "Google Slides",
              desc: "If you are creating a deck for a keynote, event or other high-visibility public presentation, please work with Creative and Product Marketing. We reserve the use of the dark mode template for these custom use cases.",
              media: true,
            },
            {
              label: "Google Docs",
              desc: "Select the template named Chainguard Google Doc Template for pre-created paragraph styles, and footer.",
              media: true,
            },
          ],
        },

        { type: "subhead", id: "claude", label: "Claude" },
        { type: "p", text: "Generative tools to speed up on-brand work in Claude." },
        {
          type: "split",
          rows: [
            {
              label: "/chainguard-slides Skill",
              body: "Use this skill to export directly to Google as Google Slides. Use this as a starting point, always making sure that the slides are built on our template, and logo placement is consistent. Available to the whole org, under “Customize”.",
            },
            {
              label: "Claude Design",
              body: "For slide imagery: try the Chainguard Brand Design System (WEB) in Claude Design to create diagrams, workflows, and other imagery aligned to the visual brand. For icons: use go/icons to visit the library and download icons for slides. If an icon you need is not in our library, use the Chainguard Iconography design system in Claude Design.",
            },
          ],
        },
      ],
    },
  ],
  toc: [
    { id: "templates", label: "Templates and tools" },
    { id: "google-workspace", label: "Google Workspace", sub: true },
    { id: "claude", label: "Claude", sub: true },
  ],
};

export const PAGES = {
  logo: LOGO,
  icons: ICONS,
  illustrations: ILLUSTRATIONS,
  templates: TEMPLATES,
};
