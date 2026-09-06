import { useEffect, useRef } from "react";

/**
 * BRINCO ambient background — a soft, colourful blob of light that drifts
 * and reacts to the cursor, approximating a glass-refraction gradient look.
 * Pure canvas 2D (no WebGL dependency), so it's cheap enough to run behind
 * every page. Falls back to a slow automatic drift on touch devices where
 * there's no cursor to react to.
 */
export function GlassField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(hover: hover)").matches;

    const blobs = [
      { hue: 24, sat: 90, baseX: 0.5, baseY: 0.62, r: 0.42, speed: 0.55, phase: 0 },
      { hue: 320, sat: 85, baseX: 0.62, baseY: 0.5, r: 0.38, speed: 0.4, phase: 2.1 },
      { hue: 265, sat: 80, baseX: 0.4, baseY: 0.72, r: 0.4, speed: 0.48, phase: 4.2 },
      { hue: 175, sat: 70, baseX: 0.55, baseY: 0.85, r: 0.36, speed: 0.35, phase: 1.3 },
    ];

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pointer = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let ambientT = 0;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };
    if (!isTouch && !reduced) window.addEventListener("pointermove", onMove, { passive: true });

    const start = performance.now();
    let raf = 0;

    const frame = () => {
      const t = (performance.now() - start) / 1000;

      if (isTouch || reduced) {
        // No cursor available (or reduced-motion) — drift gently on its own.
        ambientT += reduced ? 0.0015 : 0.004;
        target.x = 0.5 + Math.sin(ambientT) * 0.16;
        target.y = 0.6 + Math.cos(ambientT * 0.8) * 0.12;
      }

      pointer.x += (target.x - pointer.x) * 0.03;
      pointer.y += (target.y - pointer.y) * 0.03;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      for (const b of blobs) {
        const wobbleX = Math.sin(t * b.speed + b.phase) * 0.05;
        const wobbleY = Math.cos(t * b.speed * 0.8 + b.phase) * 0.05;
        const px = (b.baseX + wobbleX + (pointer.x - 0.5) * 0.18) * w * dpr;
        const py = (b.baseY + wobbleY + (pointer.y - 0.5) * 0.14) * h * dpr;
        const radius = b.r * Math.max(w, h) * dpr;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0, `hsla(${b.hue}, ${b.sat}%, 58%, 0.55)`);
        grad.addColorStop(0.5, `hsla(${b.hue}, ${b.sat}%, 48%, 0.22)`);
        grad.addColorStop(1, `hsla(${b.hue}, ${b.sat}%, 40%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className={className}>
      <canvas ref={canvasRef} className="h-full w-full" style={{ filter: "blur(38px)" }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(6,6,8,0.35)" }} />
    </div>
  );
}
