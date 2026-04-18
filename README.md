# Portfolio

A single-page personal portfolio built with **React**, **TypeScript**, and **Vite**. It includes dark/light themes, smooth motion, a command palette, and optional Lenis smooth scrolling.

## Features

- **Hero** — Large typography, staggered line reveals, scramble text on the tagline
- **Work** — Project rows that expand like an accordion with summaries and links
- **About** — Copy plus animated count-up statistics
- **Stack** — Skills grouped by category
- **Contact** — Validated form, copy-to-clipboard email, submit via `mailto`
- **Nav** — Blurred backdrop on scroll, active section highlighting
- **Command palette** — Jump to sections with `Ctrl` + `K` (Windows/Linux) or `⌘` + `K` (macOS)
- **Custom cursor** — Desktop only (`hover: hover`); in light mode the cursor uses a high-contrast dark green
- **Lenis** — Smooth scrolling (disabled when `prefers-reduced-motion: reduce`)
- **Theme** — Light/dark preference stored under the `localStorage` key `pf-theme`

## Tech stack

| Package | Role |
|--------|------|
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 8](https://vite.dev/) | Build tool and dev server |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scroll |

## Setup

```bash
git clone <repo-url>
cd Portfolio
npm install
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start the dev server at [http://localhost:5173](http://localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Customization

Copy, project list, social links, location, and contact details live in one file:

**`src/data/site.ts`**

- `profile` — name, initials (top-left mark), title, location, email, socials
- `projects` — featured work entries
- `stackGroups` — stack section groups
- `marqueeItems` — scrolling strip under the hero
- `sections` — IDs for the command palette and scroll spy (must match HTML `id` attributes)

Edit the document title, meta description, and font links in `index.html`.

## Deployment

```bash
npm run build
```

Output is written to `dist/`. Follow the [Vite static deploy guide](https://vite.dev/guide/static-deploy.html) for **Netlify**, **Vercel**, **GitHub Pages**, or any static host.

## Project structure

```
Portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── public/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── data/
    ├── hooks/
    └── components/
```
<img width="1901" height="1040" alt="Ekran görüntüsü 2026-04-18 233210" src="https://github.com/user-attachments/assets/5f584e1a-bfcd-46bf-9ee1-fd9f19689d21" />

## Accessibility

- When the system **prefers reduced motion** is enabled, Lenis and the custom cursor are turned off and motion is shortened.
- The command palette closes with `Escape`; the theme control exposes an `aria-label`.

## License

Private project — `"private": true` in `package.json`. Add your own license if you open-source or fork it.

