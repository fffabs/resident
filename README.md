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

- `assets/og.jpg` — 1200×630 Open Graph / Twitter card
- `assets/apple-touch-icon.png` — 180×180 iOS home-screen icon
- `assets/favicon.svg` — SVG favicon, adapts to light/dark
- `assets/favicon-32.png` — 32×32 PNG favicon fallback

The `tools/` folder contains the source HTML used to render the cards via
headless Chrome (`tools/og.html` renders the 1200×630 card; the unused
square variant generator remains there if a square card is ever needed).

## Email signups

The homepage form posts directly to a [Loops](https://loops.so/) public
newsletter-form endpoint — no backend, no env vars. New emails land in the
`Prelaunch` user group on Loops via a hidden form field.
