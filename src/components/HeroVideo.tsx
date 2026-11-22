import { useReducedMotion } from 'framer-motion';

/** Theme-responsive abstract systems artwork; no template-owner portrait or footage. */
export default function HeroVideo({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`hero-film relative mx-auto flex h-full w-fit items-end justify-center overflow-hidden ${play && !reduce ? 'hero-film--active' : ''}`} role="img" aria-label="Abstract production systems artwork with connected service nodes">
      <svg viewBox="0 0 620 906" className="block h-full w-auto max-w-none" aria-hidden="true">
        <defs>
          <linearGradient id="ops-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--fg)" stopOpacity=".22" />
            <stop offset="1" stopColor="var(--fg)" stopOpacity=".025" />
          </linearGradient>
          <radialGradient id="ops-glow">
            <stop stopColor="var(--fg)" stopOpacity=".16" />
            <stop offset="1" stopColor="var(--fg)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="330" cy="700" rx="250" ry="210" fill="url(#ops-glow)" />
        <g fill="none" stroke="var(--fg)" strokeOpacity=".28" strokeWidth="1.5">
          <path d="M150 280 L310 190 L470 310 L360 475 L170 520 L150 280" />
          <path d="M310 190 L360 475 L470 310 M150 280 L360 475 M170 520 L470 310" strokeDasharray="5 8" />
        </g>
        <g fill="url(#ops-glass)" stroke="var(--fg)" strokeOpacity=".42">
          <rect x="205" y="92" width="210" height="128" rx="18" />
          <rect x="60" y="250" width="190" height="140" rx="18" />
          <rect x="370" y="265" width="190" height="140" rx="18" />
          <rect x="210" y="450" width="230" height="160" rx="18" />
          <rect x="95" y="650" width="430" height="110" rx="18" />
        </g>
        <g fill="var(--fg)" opacity=".8">
          <circle cx="310" cy="155" r="12" /><circle cx="155" cy="315" r="10" />
          <circle cx="465" cy="330" r="10" /><circle cx="325" cy="530" r="13" />
        </g>
        <g fill="var(--fg)" opacity=".56" fontFamily="monospace" fontSize="17" letterSpacing="3">
          <text x="235" y="120">SERVICE</text><text x="94" y="280">SIGNALS</text>
          <text x="404" y="295">INCIDENT</text><text x="255" y="485">RESOLUTION</text>
          <text x="135" y="700">OBSERVE  /  TRACE  /  RESTORE</text>
        </g>
        <g stroke="var(--fg)" strokeOpacity=".45" strokeWidth="2">
          <path d="M250 165h120M110 345h90M410 360h90M260 570h130M135 730h350" />
        </g>
      </svg>
    </div>
  );
}
