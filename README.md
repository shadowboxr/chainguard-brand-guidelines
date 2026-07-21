# Chainguard Brand Guidelines

A self-contained, single-file brand guidelines site. All CSS, JavaScript, and
fonts are inlined into `index.html` — there is **no build step, no dependencies,
and no network requests** at runtime. It works offline by opening the file
directly in a browser.

## Contents

| File          | Purpose                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `index.html`  | The entire site (React app + styles + fonts, all inlined).              |
| `404.html`    | Identical copy of `index.html`. Lets deep links / refresh work on GitHub Pages (see **Routing** below). |
| `_redirects`  | SPA fallback rule for Netlify / Cloudflare Pages.                       |
| `.nojekyll`   | Tells GitHub Pages to serve files as-is (no Jekyll processing).         |

## View locally

Just open the file — no server needed:

```bash
open index.html
```

Or serve it (any static server works):

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Use the **Dark** toggle in the top bar to switch themes. Navigate with the left
sidebar (Foundation / Visual Brand / …) and the "On this page" rail on the right.

## Routing (read before deploying)

The app uses **client-side routing with real paths** (e.g. `/visual-brand`), not
hash URLs. That means:

- Clicking links inside the app always works.
- Opening or refreshing a deep link (e.g. `.../visual-brand`) requires the host
  to serve `index.html` for unknown paths. The included `404.html` and
  `_redirects` handle this.
- Because routes are **absolute** (`/foundations`), the site must be served from
  the **domain root**, not a sub-path.

## Deploy

### Easiest — Netlify / Vercel / Cloudflare Pages
Drag this folder onto the host's dashboard (or connect the repo). Served at root
with the `_redirects` fallback, everything works with zero config.

### GitHub Pages
Works cleanly when served from the **root** of a domain:

- **User/org site:** put these files in a repo named `<username>.github.io`.
  Enable Pages → served at `https://<username>.github.io/` ✅
- **Custom domain:** any repo + a custom domain (served at root) ✅
- **Project page** (`https://<username>.github.io/<repo>/`): the site loads, but
  the absolute-path routing does **not** work at a sub-path. Use one of the
  root options above, or a host from the "Easiest" section.

To enable Pages: **Settings → Pages → Source: Deploy from a branch → `main` / root.**

## Editing

`index.html` is a compiled bundle (minified). Content and styles are edited by
targeted find-and-replace within the file rather than by hand. If you change
`index.html`, copy it over `404.html` so the fallback stays in sync:

```bash
cp index.html 404.html
```
