# Chainguard Brand Guidelines

The Chainguard brand guidelines site — a Vite + React app that builds to a
single, self-contained `dist/index.html`. All JS, CSS, and fonts are inlined
into that one file, so the built output has **no external requests** and works
offline (open it directly, or serve it anywhere static).

> **Editing:** always edit `src/` and rebuild. Never hand-edit the built file.
> See [CLAUDE.md](./CLAUDE.md) for the project map and conventions.

## Develop

```bash
npm install      # install dependencies
npm run dev      # local dev server with hot reload
```

## Build

```bash
npm run build    # emits a single self-contained dist/index.html
npm run preview  # preview the built file
```

`dist/index.html` is the portable, offline copy — one file, everything inlined,
openable via `file://`. It is generated output (gitignored); don't commit it.

## Structure

```
index.html            Vite entry shell (mounts src/main.jsx)
src/
  main.jsx            entry — StrictMode + HashRouter + <App/>
  App.jsx             route definitions
  content/            all copy/data (nav, foundations, visual-brand)
  components/         shell components (sidebar, layout, ...)
  pages/              page layouts + the visual-brand blocks
  styles/             tokens.css, layout.css, components.css, fonts.css
  assets/fonts/       the 9 inlined .woff2 files
```

## Routing

The app uses **hash routing** (e.g. `#/visual-brand`). The server only ever
serves `/`, so deep links and refreshes work with no rewrite rules or SPA
fallback config.

## Deploy

Hosted on **Vercel**, which builds on push to `main`:

- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

These are pinned in [`vercel.json`](./vercel.json), so a fresh clone deploys
with no dashboard configuration.
