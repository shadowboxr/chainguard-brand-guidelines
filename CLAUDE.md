# Chainguard Brand Guidelines

The Chainguard brand guidelines site, built with Vite + React and hash-based
routing. `npm run build` emits `dist/` — a small `index.html` plus hashed,
cacheable assets (JS, CSS, and the woff2 fonts) under `dist/assets/`. Vercel
builds this on push and serves `dist/`.

## The one hard rule

**Never edit `dist/` or any built `index.html`. Always edit `src/` and rebuild.**
`dist/` is generated output and is gitignored. The root `index.html` is only the
Vite entry shell (`<div id="root">` + the module script) — the real app lives in
`src/`.

## Where things live

- **Copy / content edits** → `src/content/`
  - `nav.js` — left-nav sections and items (also drives the route table)
  - `foundations.js` — all Foundation copy/data (`SECTIONS`, `TOC`, `IDS`)
  - `visual-brand.js` — all Visual Brand section/data (`SECTIONS`, `TOC`, `IDS`)
- **Styling** → `src/styles/`, in this order of preference:
  1. `tokens.css` — color, type, spacing variables (4px grid), resets, type-scale helpers
  2. `layout.css` — app shell: sidebar, nav, topbar, drawer
  3. `components.css` — page/component styles (doc, cards, foundations, TOC, visual-brand blocks, stub)
  - `fonts.css` — `@font-face` for the 9 inlined woff2 in `src/assets/fonts/`
- **Routes / nav** → `src/content/nav.js` + `src/App.jsx`
- **Pages / components** → `src/pages/`, `src/components/`
  - `pages/DocPage.jsx` — the shared hero + scrollspy "On this page" layout used by
    both Foundation and Visual Brand
  - `pages/visual-brand/` — the interactive Visual Brand blocks (color palette,
    color scales, typography specimens, carousels, etc.)

## Brand constants

- **Blurple** `#6226FB` (primary), **Ink** `#0D161C`
- **Gellix** for headings and body; **Roobert SemiMono** (uppercase) for labels/eyebrows
- **4px spacing grid**; sentence-case headlines

## Commands

- `npm install` — install dependencies
- `npm run dev` — local dev server with HMR
- `npm run build` — produce the built site in `dist/`
- `npm run preview` — preview the built site

**Run `npm run build` as a check before finishing any task** — the build must
succeed and emit `dist/` (index.html + assets).
