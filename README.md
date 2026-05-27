# Resident

AI that lives with your data.

The marketing site for [resident.computer](https://resident.computer/) — a small, static HTML + CSS site.

## Pages

- `index.html` — homepage
- `roadmap.html` — product roadmap with vertical timeline
- `investors.html` — concise pitch for pre-seed investors
- `vortex.html` — standalone file-type vortex animation

## Stack

Plain HTML and CSS, no build step. The animated logo and chip outlines use SVG
filters (goo/metaball blur + alpha threshold). Drop the directory on any
static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, a plain bucket).

## Fonts

The site uses **Suisse Intl** by Swiss Typefaces. The font files are licensed
commercially and are excluded from this repo (see `.gitignore`). To run the
site locally with the intended typography, place the licensed `.woff`/`.woff2`
files under `assets/fonts/` with the structure:

```
assets/fonts/
  suisseintl-regular/SuisseIntl-Regular-WebS.woff2
  suisseintl-medium/SuisseIntl-Medium-WebS.woff2
  suisseintl-semibold/SuisseIntl-SemiBold-WebS.woff2
  suisseintl-bold/SuisseIntl-Bold-WebS.woff2
```

Without the files, the page falls back to the system sans-serif stack.

## Social assets

- `assets/og.png` — 1200×630 Open Graph card
- `assets/og-square.png` — 1200×1200 variant for square slots
- `assets/apple-touch-icon.png` — 180×180 iOS home-screen icon
- `assets/favicon.svg` — SVG favicon, adapts to light/dark

The `tools/` folder contains the source HTML used to render the PNGs via
headless Chrome.

## Email signups

The homepage form posts to `/api/subscribe`, a Vercel serverless function
that forwards the email to a [Loops](https://loops.so/) audience.

Required env var (set in Vercel → Settings → Environment Variables):

| Name | Value |
|---|---|
| `LOOPS_API_KEY` | API key from loops.so → Settings → API |

See `.env.example` for the local file format.
