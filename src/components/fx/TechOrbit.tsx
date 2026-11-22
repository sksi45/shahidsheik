import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/theme';

/**
 * An abstract operations graphic sits at the centre of three tilted skill orbits.
 *
 * — The graphic rotates with scrolling and returns smoothly when scrolling stops;
 *   when scrolling stops she eases back round to face front.
 * — Each ring carries two skill categories, has a visible orbit path and a glowing comet.
 *   Skills nearer the viewer grow and pass in front of her; those behind soften out of focus.
 *
 * All 3D is projected by hand onto a flat stage, so layering in front of / behind her is exact
 * in every browser. Drag or arrow keys spin her too.
 */

const SPRITE = { frames: 360, fw: 300, fh: 830 };
const PERSPECTIVE = 1500;

type Ring = {
  items: string[];
  at: number; // ring height on her body, 0 = head, 1 = feet
  r: number; // radius as a share of the max radius
  elev: number; // how much we look down on it (deg)
  roll: number; // tilt in the screen plane (deg)
  speed: number; // idle orbit speed (deg/s), sign = direction
};



export default function TechOrbit({ rings: groups }: { rings: string[][] }) {
  const stage = useRef<HTMLDivElement>(null);
  const figureWrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const backSvg = useRef<SVGSVGElement>(null);
  const frontSvg = useRef<SVGSVGElement>(null);
  const pills = useRef<(HTMLSpanElement | null)[]>([]);

  const rings: Ring[] = [
    { items: groups[0] ?? [], at: 0.3, r: 0.82, elev: 16, roll: -9, speed: 9 },
    { items: groups[1] ?? [], at: 0.5, r: 1, elev: 12, roll: 6, speed: -7 },
    { items: groups[2] ?? [], at: 0.7, r: 0.9, elev: 18, roll: -3, speed: 8 },
  ];
  const flat = rings.flatMap((ring, ri) => ring.items.map((name, k) => ({ name, ri, k })));

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const st = stage.current!;
    const ctx = canvas.current!.getContext('2d')!;

    // ── state ───────────────────────────────────────────────────────
    const ringAngle = rings.map((_, i) => i * 40);
    let spin = 0; // her rotation (deg)
    let spinTarget = 0;
    let lastScrollAt = 0;
    let boost = 0; // extra orbit speed from scrolling / dragging
    let dragging = false;
    let lastX = 0;
    let visible = false;
    let raf = 0;
    let last = performance.now();
    let frame = -1;
    let W = 0,
      H = 0,
      figH = 0,
      figW = 0,
      figTop = 0,
      Rmax = 0;

    // ── abstract systems illustration (no template-owner portrait) ──
    const paintFigure = (force = false) => {
      const deg = ((-spin % 360) + 360) % 360;
      const f = Math.round(deg) % 360;
      if (f === frame && !force) return;
      frame = f;
      const c = canvas.current!;
      c.dataset.frame = String(f);
      ctx.clearRect(0, 0, c.width, c.height);
      const fg = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#ffffff';
      ctx.save();
      ctx.translate(c.width / 2, c.height / 2);
      ctx.rotate((spin * Math.PI) / 180);
      ctx.strokeStyle = fg;
      ctx.fillStyle = fg;
      ctx.globalAlpha = 0.42;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.ellipse(0, 0, 112 + i * 18, 190 + i * 18, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.globalAlpha = 0.72;
      ctx.strokeRect(-74, -105, 148, 210);
      ctx.fillRect(-48, -72, 96, 8);
      ctx.fillRect(-48, -48, 68, 5);
      ctx.fillRect(-48, -28, 82, 5);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-52, 58); ctx.lineTo(52, 58);
      ctx.moveTo(-52, 76); ctx.lineTo(28, 76);
      ctx.stroke();
      ctx.restore();
    };
    paintFigure(true);
    figureWrap.current?.classList.add('is-ready');

    // ── layout ──────────────────────────────────────────────────────
    const layout = () => {
      W = st.clientWidth;
      H = st.clientHeight;
      figH = H * 0.94;
      figW = figH * (SPRITE.fw / SPRITE.fh);
      figTop = H - figH;
      Rmax = Math.min(W * (W < 640 ? 0.47 : 0.4), figH * 0.62);
      const fw = figureWrap.current!;
      fw.style.height = `${figH}px`;
      fw.style.width = `${figW}px`;
      fw.style.left = `${(W - figW) / 2}px`;
      fw.style.top = `${figTop}px`;
      for (const svg of [backSvg.current!, frontSvg.current!]) svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    };

    /** 3D point on a ring → screen position, scale and depth (z > 0 is toward the viewer). */
    const project = (ring: Ring, a: number) => {
      const R = Rmax * ring.r;
      const rad = (a * Math.PI) / 180;
      const e = (ring.elev * Math.PI) / 180;
      const lx = R * Math.cos(rad);
      const lz = R * Math.sin(rad);
      let x = lx;
      let y = lz * Math.sin(e);
      const z = lz * Math.cos(e);
      const ro = (ring.roll * Math.PI) / 180;
      [x, y] = [x * Math.cos(ro) - y * Math.sin(ro), x * Math.sin(ro) + y * Math.cos(ro)];
      const s = PERSPECTIVE / (PERSPECTIVE - z);
      const cx = W / 2;
      const cy = figTop + figH * ring.at;
      return { x: cx + x * s, y: cy + y * s, z, s, R };
    };

    // ── orbit paths + comets (back half behind her, front half in front) ──
    const ns = 'http://www.w3.org/2000/svg';
    const pathEls = rings.map(() => {
      const back = document.createElementNS(ns, 'path');
      const front = document.createElementNS(ns, 'path');
      const cometB = document.createElementNS(ns, 'circle');
      const cometF = document.createElementNS(ns, 'circle');
      back.setAttribute('class', 'orbit-path orbit-path--back');
      front.setAttribute('class', 'orbit-path orbit-path--front');
      cometB.setAttribute('class', 'orbit-comet');
      cometF.setAttribute('class', 'orbit-comet');
      backSvg.current!.append(back, cometB);
      frontSvg.current!.append(front, cometF);
      return { back, front, cometB, cometF };
    });
    let cometA = 0;

    const render = () => {
      paintFigure();
      rings.forEach((ring, ri) => {
        let dB = '';
        let dF = '';
        let prevFront: boolean | null = null;
        for (let i = 0; i <= 96; i++) {
          const p = project(ring, (i / 96) * 360);
          const front = p.z >= 0;
          const seg = `${prevFront === front ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          if (front) dF += seg;
          else dB += seg;
          prevFront = front;
        }
        const el = pathEls[ri];
        el.back.setAttribute('d', dB);
        el.front.setAttribute('d', dF);
        const c = project(ring, cometA * (ri % 2 ? -1 : 1) * (1 + ri * 0.25) + ri * 120);
        const onFront = c.z >= 0;
        for (const [node, show] of [
          [el.cometF, onFront],
          [el.cometB, !onFront],
        ] as const) {
          node.setAttribute('cx', c.x.toFixed(1));
          node.setAttribute('cy', c.y.toFixed(1));
          node.setAttribute('r', (3 * c.s).toFixed(2));
          node.style.opacity = show ? (onFront ? '1' : '0.45') : '0';
        }
      });
      flat.forEach((it, idx) => {
        const el = pills.current[idx];
        if (!el) return;
        const ring = rings[it.ri];
        const p = project(ring, ringAngle[it.ri] + (it.k / ring.items.length) * 360);
        const depth = (p.z / p.R + 1) / 2; // 0 back … 1 front
        el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(-50%, -50%) scale(${(p.s * (0.82 + depth * 0.22)).toFixed(3)})`;
        el.style.zIndex = String(p.z >= 0 ? 30 + Math.round(depth * 20) : 1 + Math.round(depth * 3));
        el.style.opacity = (0.28 + depth * 0.72).toFixed(3);
        const b = (p.z < 0 ? Math.min(2.4, (-p.z / p.R) * 2.4) : 0).toFixed(1);
        if (el.dataset.blur !== b) {
          el.dataset.blur = b;
          el.style.filter = +b > 0.05 ? `blur(${b}px)` : '';
        }
      });
    };

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      // she settles back to face front once the scrolling stops
      if (!dragging && performance.now() - lastScrollAt > 140) spinTarget = Math.round(spinTarget / 360) * 360;
      spin += (spinTarget - spin) * Math.min(1, dt * (dragging ? 18 : 7));
      // orbits: slow idle drift + scroll/drag boost that decays
      boost *= Math.pow(0.04, dt);
      rings.forEach((ring, i) => {
        ringAngle[i] += (reduced ? 0 : ring.speed) * dt + boost * dt * Math.sign(ring.speed);
      });
      cometA += (reduced ? 0 : 70) * dt + Math.abs(boost) * dt * 0.5;
      render();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    // ── input: scroll turns her; drag and arrow keys too ────────────
    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!visible || reduced) return;
      spinTarget -= dy * 0.75;
      boost = Math.max(-260, Math.min(260, boost + dy * 1.2));
      lastScrollAt = performance.now();
    };
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      st.setPointerCapture(e.pointerId);
      start();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      spinTarget -= dx * 0.9;
      boost = Math.max(-260, Math.min(260, boost + dx * 2));
    };
    const up = () => {
      dragging = false;
      lastScrollAt = performance.now();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      spinTarget += e.key === 'ArrowLeft' ? 360 : -360;
      boost = e.key === 'ArrowLeft' ? -200 : 200;
      lastScrollAt = performance.now() + 900; // let the full turn play out
      start();
    };

    st.addEventListener('pointerdown', down);
    st.addEventListener('pointermove', move);
    st.addEventListener('pointerup', up);
    st.addEventListener('pointercancel', up);
    st.addEventListener('keydown', key);
    window.addEventListener('scroll', onScroll, { passive: true });

    const near = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) paintFigure(true);
      },
      { rootMargin: '900px 0px' },
    );
    const vis = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start();
    });
    near.observe(st);
    vis.observe(st);
    const mo = new MutationObserver(() => paintFigure(true));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const ro = new ResizeObserver(() => {
      layout();
      render();
    });
    ro.observe(st);
    layout();
    render();

    return () => {
      cancelAnimationFrame(raf);
      near.disconnect();
      vis.disconnect();
      mo.disconnect();
      ro.disconnect();
      pathEls.forEach((p) => Object.values(p).forEach((n) => n.remove()));
      window.removeEventListener('scroll', onScroll);
      st.removeEventListener('pointerdown', down);
      st.removeEventListener('pointermove', move);
      st.removeEventListener('pointerup', up);
      st.removeEventListener('pointercancel', up);
      st.removeEventListener('keydown', key);
    };
    // rings are derived from props; re-run only when the skill groups change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  return (
    <div
      ref={stage}
      tabIndex={0}
      role="img"
      aria-label={`Abstract systems graphic at the centre of three skill orbits: ${groups.flat().join(', ')}. Scroll, drag or use the arrow keys to rotate the graphic.`}
      data-cursor="pull"
      data-cursor-label="Spin"
      className="orbit-stage relative h-[78svh] max-h-[760px] min-h-[520px] cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing md:h-[94svh] md:max-h-[980px] md:min-h-[640px]"
    >
      <div aria-hidden="true" className="orbit-floor" />
      <svg ref={backSvg} aria-hidden="true" className="absolute inset-0 z-[5] h-full w-full" />
      <div ref={figureWrap} className="spin-figure absolute z-10" aria-hidden="true">
        <canvas ref={canvas} width={SPRITE.fw} height={SPRITE.fh} className="block h-full w-full" />
      </div>
      <svg ref={frontSvg} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[29] h-full w-full" />
      {flat.map((it, i) => (
        <span
          key={`${it.ri}-${it.name}`}
          ref={(el) => {
            pills.current[i] = el;
          }}
          aria-hidden="true"
          className="orbit-pill absolute top-0 left-0 flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-[12px] whitespace-nowrap shadow-[var(--shadow)] md:px-4 md:py-2 md:text-[15px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-fg" style={{ opacity: 0.35 + it.ri * 0.3 }} />
          {it.name}
        </span>
      ))}
    </div>
  );
}
