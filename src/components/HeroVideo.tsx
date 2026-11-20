import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The hero film: Sushmita walks toward the camera and settles into a portrait.
 * It is one transparent video (VP9-alpha WebM for Chrome/Firefox/Edge, HEVC-alpha for Safari),
 * so the page itself is the backdrop.
 *
 * Each frame is painted onto a canvas, and the "falling into shadow" fade is painted *on her*
 * (source-atop) in the page's background colour. She stays fully opaque, so nothing behind
 * her — like the giant name — ever shows through.
 *   light — clean white studio, soft fade at the very bottom
 *   dark  — rim light (CSS), lower body sinking into the dark
 * It plays once after the loader, then holds on the final frame with a gentle "breathing" idle.
 */

const SRC = {
  webm: '/assets/hero-walk.webm',
  hevc: '/assets/hero-walk.mov',
  start: '/assets/hero-walk-start.webp',
  end: '/assets/hero-walk-end.webp',
  width: 620,
  height: 906,
};

// Only Safari plays HEVC-with-alpha; everyone else gets VP9-alpha.
const isSafari = () => /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);

/** Shadow fade per theme: [position 0–1, opacity of background colour]. */
const FADE: Record<'dark' | 'light', [number, number][]> = {
  dark: [
    [0.36, 0],
    [0.6, 0.45],
    [0.82, 0.88],
    [1, 1],
  ],
  light: [
    [0.8, 0],
    [1, 1],
  ],
};

function bgRgb() {
  const hex = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim().replace('#', '');
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex, 16);
  return Number.isNaN(n) ? [8, 8, 8] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function HeroVideo({ play }: { play: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stillRef = useRef<HTMLImageElement | null>(null);
  const reduce = useReducedMotion();
  const [ended, setEnded] = useState(false);
  const [src] = useState(() => (typeof navigator !== 'undefined' && isSafari() ? { url: SRC.hevc, type: 'video/quicktime' } : { url: SRC.webm, type: 'video/webm' }));

  // Paint the current frame (or a still) plus the theme's shadow fade.
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const video = videoRef.current;
    let started = false;
    let raf = 0;
    let vfc = 0;

    const still = new Image();
    still.src = reduce ? SRC.end : SRC.start;
    stillRef.current = still;

    const paint = () => {
      const source: CanvasImageSource | null = video && started && video.readyState >= 2 ? video : still.complete && still.naturalWidth ? still : null;
      if (!source) return;
      const { width: w, height: h } = canvas;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(source, 0, 0, w, h);
      const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      const [r, g, b] = bgRgb();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      for (const [at, a] of FADE[theme]) grad.addColorStop(at, `rgba(${r},${g},${b},${a})`);
      ctx.globalCompositeOperation = 'source-atop'; // only on her pixels
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    };

    const v = video as (HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number; cancelVideoFrameCallback?: (id: number) => void }) | null;
    const loop = () => {
      paint();
      if (!v || v.paused || v.ended) return;
      if (v.requestVideoFrameCallback) vfc = v.requestVideoFrameCallback(loop);
      else raf = requestAnimationFrame(loop);
    };

    const onPlay = () => {
      started = true;
      loop();
    };
    const onEnded = () => {
      paint();
      setEnded(true);
    };
    still.onload = paint;
    v?.addEventListener('play', onPlay);
    v?.addEventListener('seeked', paint);
    v?.addEventListener('ended', onEnded);

    // Repaint when the lights switch so the fade matches the new background.
    const mo = new MutationObserver(paint);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    paint();
    return () => {
      cancelAnimationFrame(raf);
      if (vfc && v?.cancelVideoFrameCallback) v.cancelVideoFrameCallback(vfc);
      mo.disconnect();
      v?.removeEventListener('play', onPlay);
      v?.removeEventListener('seeked', paint);
      v?.removeEventListener('ended', onEnded);
    };
  }, [reduce]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !play || reduce) return;
    v.currentTime = 0;
    v.play()?.catch(() => {
      // autoplay blocked → show the final pose
      if (stillRef.current) stillRef.current.src = SRC.end;
      setEnded(true);
    });
  }, [play, reduce]);

  const replay = () => {
    const v = videoRef.current;
    if (!v || reduce) return;
    setEnded(false);
    v.currentTime = 0;
    void v.play();
  };

  return (
    <div className={`hero-film relative mx-auto h-full w-fit ${ended || reduce ? 'is-idle' : ''}`}>
      <div aria-hidden="true" className="hero-film__pool" />
      <canvas
        ref={canvasRef}
        width={SRC.width}
        height={SRC.height}
        role="img"
        aria-label={
          reduce ? 'Sushmita Dasari in a black blazer, smiling' : 'Sushmita Dasari walks toward the camera in a black blazer and smiles'
        }
        onDoubleClick={replay}
        className="hero-film__media block h-full w-auto max-w-none select-none"
      />
      {!reduce && (
        // Decodes the film; the canvas above is what you see.
        <video
          ref={videoRef}
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          width={SRC.width}
          height={SRC.height}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src={src.url} type={src.type} />
        </video>
      )}
    </div>
  );
}
