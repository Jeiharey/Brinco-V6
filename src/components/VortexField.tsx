import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * BRINCO hero visual — a dot-mesh wave in red on black with a dark glowing
 * vortex at its centre. Reacts to the cursor with a slow parallax tilt and a
 * brightness lift near the pointer. Respects prefers-reduced-motion and
 * lowers particle density on small / low-power devices.
 */
export function VortexField({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);

    const rings = lowPower ? 60 : 110;
    const perRing = lowPower ? 90 : 170;
    const innerR = 1.15;
    const outerR = 7.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 5.2, 9.6);
    camera.lookAt(0, 0, 0);

    const count = rings * perRing;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const angles = new Float32Array(count);

    const hot = new THREE.Color("#ff6a4d");
    const core = new THREE.Color("#e8342a");
    const cool = new THREE.Color("#4a0f0c");

    let i = 0;
    for (let r = 0; r < rings; r++) {
      const t = r / (rings - 1);
      const radius = innerR + Math.pow(t, 1.5) * (outerR - innerR);
      for (let a = 0; a < perRing; a++) {
        const ang = (a / perRing) * Math.PI * 2 + t * 2.4;
        radii[i] = radius;
        angles[i] = ang;
        positions[i * 3] = Math.cos(ang) * radius;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(ang) * radius;
        const c = t < 0.22 ? hot.clone().lerp(core, t / 0.22) : core.clone().lerp(cool, (t - 0.22) / 0.78);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: lowPower ? 0.045 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const group = new THREE.Group();
    scene.add(group);
    group.add(points);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const start = performance.now();
    let raf = 0;

    const frame = () => {
      const time = ((performance.now() - start) / 1000) * (reduced ? 0.18 : 1);

      pointer.x += (target.x - pointer.x) * 0.035;
      pointer.y += (target.y - pointer.y) * 0.035;

      for (let k = 0; k < count; k++) {
        const r = radii[k]!;
        const ang = angles[k]! + time * (0.42 / (r * 0.55));
        const wave =
          Math.sin(r * 1.25 - time * 1.15) * (0.85 / (1 + r * 0.28)) +
          Math.sin(ang * 3 + time * 0.55) * 0.12;
        const funnel = -1.9 / (1 + Math.pow(r - innerR + 0.35, 2) * 2.6);
        pos.array[k * 3] = Math.cos(ang) * r;
        pos.array[k * 3 + 1] = wave + funnel;
        pos.array[k * 3 + 2] = Math.sin(ang) * r;
      }
      pos.needsUpdate = true;

      group.rotation.x = pointer.y * 0.14;
      group.rotation.z = pointer.x * 0.16;
      group.position.x = pointer.x * 0.32;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div aria-hidden className={className}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,52,42,0.28) 0%, rgba(232,52,42,0.08) 40%, rgba(0,0,0,0) 70%)",
          filter: "blur(24px)",
        }}
      />
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  );
}
