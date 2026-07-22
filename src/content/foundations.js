export const SECTIONS = [
  {
    id: "about-chainguard",
    label: "About Chainguard",
    layout: "columns",
    rows: [
      { id: "who-we-are", label: "Who we are", text: "The trusted source for open source." },
      { id: "company-mission", label: "Company mission", text: "Make all open source software trustworthy so engineers can build safely with AI." },
      { id: "company-vision", label: "Company vision", text: "We believe in a world where engineering teams can build at machine speed, confident that every line of code is hardened, trusted, and ready for production." },
      { id: "product-vision", label: "Product vision", text: "We make open source better in every way that matters to engineering teams – trusted, secure, and effortless to use." },
    ],
  },
  {
    id: "voice-and-writing",
    label: "Voice and writing guidelines",
    layout: "stacked",
    subs: [
      {
        id: "voice-and-tone",
        label: "Voice and tone",
        blocks: [
          { type: "p", text: "Voice and tone are important, related parts of writing style. Voice communicates our brand personality and values, and it doesn’t change much. Tone is more subtle, and is often thought of as the attitude and emotional context of a piece. Tone will change depending on who we are writing for, why we’re talking to them, and in what channel." },
          {
            type: "cards",
            lead: "We consider our voice to be:",
            items: [
              { term: "Confident", desc: "We write with clarity and authority, grounded in our deep expertise – never boastful, but always sure of the value we provide." },
              { term: "Quirky", desc: "We let our individuality show with wit, humor, and not taking ourselves too seriously, keeping our content fresh and human." },
              { term: "Empowering", desc: "We focus on lifting up engineering and security teams, giving them the knowledge and resources to build faster and better, so they can do their most meaningful work." },
              { term: "Built by engineers, for engineers", desc: "Our voice reflects real-world experience. We are practical and straightforward, a trusted peer who’s been there with you before." },
            ],
          },
        ],
      },
      {
        id: "tone",
        label: "Tone",
        blocks: [
          { type: "p", text: "Tone fluctuates depending on the channel and medium. At the most basic level, you can think of tone on a spectrum and can start to show more personality and less formality depending on the channel and purpose of the message. If the goal is engagement and memorability, turn the playfulness and quirk up. If the goal is credibility and clarity, turn it down and focus on straightforward communication." },
          { type: "chips", lead: "You might use a lighter, more playful tone when creating:", cols: 1, items: ["Social posts", "Campaign headlines and taglines", "Top-of-funnel content like a This Sh*t Is Hard blog post", "Memorable brand experiences, like event booths"] },
          { type: "chips", lead: "Use a more direct tone when creating:", cols: 1, items: ["Research and data-driven guides", "Product documentation and updates", "Sales enablement materials", "Executive thought leadership", "Direct email communication"] },
        ],
      },
      {
        id: "writing-guidelines",
        label: "Writing guidelines",
        blocks: [
          { type: "bullets", items: ["All headlines are sentence case. Capitalize the first letter of the headline, along with the first letter of the word following a colon and proper nouns, and leave the following words lowercase", "Spell out numbers zero through nine, numerals for 10 onwards (double digits). When you list a range, it will always be numerals, i.e., “Between 1-10, rank this program.”", "Know your time and dates. Month, day: Spell out the month and use figures for the day (February 12)", "When writing times, use a.m. and p.m., not PM/AM or pm/am.", "Default to Pacific Time (PT) unless you are writing for a regional audience, in which case you should use the local timezone", "We always use the Oxford comma", "Commas and periods inside of quotations, always", "Use the proper naming conventions for product names"] },
          { type: "chips", cols: 2, copy: true, items: ["Chainguard Containers", "Chainguard Libraries", "Chainguard VMs", "Chainguard Actions", "Chainguard Agent Skills", "The Guardener"] },
          { type: "bullets", items: ["Ensure acronyms are capitalized and properly used"] },
          { type: "chips", cols: 4, copy: true, items: ["SBOMs", "CVEs", "SLSA", "SLA"] },
        ],
      },
    ],
  },
  {
    id: "visual-brand-framework",
    label: "Visual brand framework",
    layout: "blocks",
    blocks: [
      { type: "p", text: "Keeping the software supply chain safe should be boring, but our brand doesn’t have to be. We have built a bold, vibrant culture at Chainguard – we aim to build a brand that reflects this, creates community, and builds trust." },
      { type: "p", text: "Our brand creative philosophy is rooted in 3 values:" },
      {
        type: "valuecards",
        items: [
          { term: "For builders", desc: "Our visual brand and many of our design elements are inspired by the idea of building, and our audience of builders. From our colorful building blocks and visible grid system, to our cursor element and terminal-inspired designs." },
          { term: "Clarity > everything", desc: "We serve a very technical audience, who value clarity over “fluff”. We approach all of our brand creative work with clarity, hierarchy, and technical accuracy." },
          { term: "With intent", desc: "Our brand system allows for some flexibility and expression, but we always use color and elements with intent. We use restraint with our colors and building blocks, always sure our message remains clear." },
        ],
      },
    ],
  },
];

export const TOC = SECTIONS.flatMap((e) =>
  e.layout === "stacked"
    ? [{ id: e.id, label: e.label }, ...e.subs.map((s) => ({ id: s.id, label: s.label, sub: true }))]
    : [{ id: e.id, label: e.label }]
);
export const IDS = TOC.map((e) => e.id);
