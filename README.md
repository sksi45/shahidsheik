# Sushmita Dasari — Portfolio

An interactive personal portfolio with two complete looks, dark and light, switched by pulling a hanging cord in the top-right corner.

Built with React, TypeScript, Vite, Tailwind CSS, GSAP, Framer Motion and Lenis.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

The finished site is written to `dist/`. Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). No server code is needed.

## Edit the content

Every fact on the site lives in **`src/data/portfolio.ts`**: name, links, roles, stats, education, skills, projects, experience, recognition and certifications. Change it there and the whole site follows.

Other things you may want to change:

| What | Where |
|---|---|
| Résumé PDF (download buttons) | `public/assets/Sushmita_Dasari_Resume.pdf` |
| Theme colours (dark and light) | top of `src/index.css` |
| Hero video | `public/assets/hero-walk.webm` (Chrome, Firefox, Edge) and `hero-walk.mov` (Safari) |
| Spinning figure in Skills | `public/assets/spin-sprite.webp` (80 frames, 10 × 8 grid, 300 × 830 each) |

## How the site is put together

| File | What it does |
|---|---|
| `src/components/PullCord.tsx` | The pull cord that switches dark / light mode |
| `src/lib/theme.ts` | Theme switching, saved between visits, with the circular reveal |
| `src/components/Hero.tsx`, `HeroVideo.tsx` | Hero with the giant name and the walking video |
| `src/components/Expertise.tsx`, `fx/TechOrbit.tsx` | Skills, with the figure that turns as you scroll inside three skill orbits |
| `src/components/Projects.tsx`, `ProjectVisual.tsx` | Project cards and case-study overlays |
| `src/components/Experience.tsx` | Timeline, recognition and certifications |
| `src/components/Contact.tsx` | Contact links and footer |

## Notes

- The hero and Skills videos use transparent backgrounds, so they sit directly on the page in both themes.
- Visitors who have "reduce motion" turned on get still images and no auto-animation; the cord still works.
