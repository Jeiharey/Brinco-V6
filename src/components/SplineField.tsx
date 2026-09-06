import { lazy, Suspense, useEffect, useState } from "react";

// Spline needs a real browser (WebGL) — it must never try to render during
// server-side rendering. Lazy-loading it keeps it out of the server bundle
// entirely, and the `mounted` gate below stops it from rendering before
// hydration.
const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/7VW0oB-EfxRrY-Df/scene.splinecode";

export function SplineField({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Respect prefers-reduced-motion by not loading the interactive 3D scene
  // at all — just leave the dark background showing through.
  if (reduced) return null;
  if (!mounted) return null;

  return (
    <>
      <div aria-hidden className={className}>
        <Suspense fallback={null}>
          <Spline scene={SCENE_URL} style={{ width: "100%", height: "100%" }} />
        </Suspense>
      </div>
      {/* Covers the Spline free-tier watermark badge (bottom-right corner).
          Small and precisely positioned so it doesn't overlap real content —
          check this against the footer on short/narrow viewports after deploying. */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-0 bottom-0 z-30 h-9 w-36 bg-background"
      />
    </>
  );
}
