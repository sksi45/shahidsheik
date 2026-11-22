# Shahid Sheik — Production & Application Support Portfolio

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

Portfolio content lives in **`src/data/portfolio.ts`**: profile, links, support case studies, skills, experience and education.

Other things you may want to change:

| What | Where |
|---|---|
| Résumé PDF (download buttons) | Contact section (resume link is intentionally omitted until a verified PDF is added) |
| Theme colours (dark and light) | top of `src/index.css` |
| Hero video | Abstract systems artwork in `src/components/HeroVideo.tsx` |
| Spinning figure in Skills | Theme-sensitive abstract artwork |

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

- The hero artwork is abstract and contains no template-owner portrait or personal footage.
- Visitors who have "reduce motion" turned on get still images and no auto-animation; the cord still works.
