"use client";

import { useEffect, useRef } from "react";

/* imaginal dust — silver particles suspended in the void.
   they drift slowly upward and lean gently toward the cursor. */
export default function VoidField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const mouse = { x: -9999, y: -9999 };

    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      tw: number; // twinkle phase
      ts: number; // twinkle speed
    };
    let dust: P[] = [];

    const spawn = (count: number): P[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.05 - Math.random() * 0.16,
        tw: Math.random() * Math.PI * 2,
        ts: 0.008 + Math.random() * 0.02,
      }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dust = spawn(Math.round((w * h) / 16000));
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of dust) {
        // gentle pull toward the cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 40000 && d2 > 1) {
          const f = 0.012 / Math.sqrt(d2);
          p.vx += dx * f * 0.6;
          p.vy += dy * f * 0.6;
        }
        // damping keeps drift dreamlike
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 - 0.002;

        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.ts;

        // wrap through the void
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;

        const a = 0.12 + 0.5 * (0.5 + 0.5 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 216, 235, ${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="void-field" aria-hidden="true" />;
}
