import { motion, useScroll } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';
import { scrollToId } from '../lib/scroll';
import SectionLabel from './ui/SectionLabel';
import SplitText from './ui/SplitText';
import Magnetic from './ui/Magnetic';
import Reveal from './ui/Reveal';

function BackToTop() {
  const { scrollYProgress } = useScroll();
  return (
    <Magnetic strength={0.5}>
      <button
        type="button"
        onClick={() => scrollToId('home')}
        aria-label="Back to top"
        className="group relative grid h-16 w-16 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg"
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
          <motion.circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="1" style={{ pathLength: scrollYProgress }} />
        </svg>
        <ArrowUp size={18} className="transition-transform duration-500 group-hover:-translate-y-1" />
      </button>
    </Magnetic>
  );
}

const links = [
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin, note: 'Connect' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-4 pt-24 md:px-8 md:pt-32" aria-labelledby="contact-title">
      <SectionLabel index="05">Contact</SectionLabel>

      <h2 id="contact-title" className="mt-8 text-[clamp(2.6rem,6.4vw,6.8rem)] leading-[0.9] font-medium tracking-[-0.055em] md:mt-10">
        <SplitText text="Have an idea?" className="block" />
        <SplitText text="Let's make it happen." delay={0.15} className="block font-serif font-normal tracking-[-0.035em] italic" />
      </h2>

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <Reveal>
            <p className="max-w-[40ch] text-muted">
              International production / application support opportunities, professional collaborations or a good engineering conversation — my inbox is open.
            </p>
            <Magnetic strength={0.15} className="mt-6 max-w-full">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex max-w-full items-center gap-3 text-[clamp(1.35rem,2.8vw,2.5rem)] font-medium tracking-[-0.035em]"
              >
                Connect with me on LinkedIn
                <ArrowUpRight size={20} className="shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <ul className="md:col-span-4 md:col-start-9">
          {links.map((l, i) => (
            <Reveal as="li" key={l.label} delay={i * 0.06}>
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center justify-between gap-4 border-t border-line py-3.5 transition-colors last:border-b"
              >
                <span className="flex items-center gap-4">
                  <l.icon size={17} strokeWidth={1.5} className="text-muted transition-colors group-hover:text-fg" />
                  <span className="text-lg tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5">
                    {l.label}
                  </span>
                </span>
                <span className="flex items-center gap-3 font-mono text-[11px] text-muted">
                  {l.note}
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>

      <footer className="mt-20 border-t border-line md:mt-28">
        <div className="flex flex-col-reverse gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-muted">
            <p>
              © {new Date().getFullYear()} {profile.name}. Production &amp; application support portfolio.
            </p>
            <p className="font-mono text-[11px] tracking-[0.12em] text-faint uppercase">React · TypeScript · GSAP · Framer Motion · Lenis</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-muted uppercase sm:block">Back to top</span>
            <BackToTop />
          </div>
        </div>
      </footer>
    </section>
  );
}
