'use client';

import { useEffect, useRef } from 'react';

const CELL_SIZE = 14;
const DENSITY_CHARS = ['@', '#', '&', '%', '*', '+', '=', '-', ':', '.', ' '];

const SPROUT_DATA = [
  { x: 0, y: 0, t: 0.05 },
  { x: 0, y: -1, t: 0.1 },
  { x: 0, y: -2, t: 0.15 },
  { x: 0, y: -3, t: 0.2 },
  { x: 0, y: -4, t: 0.25 },
  { x: 0, y: -5, t: 0.3 },
  { x: 0, y: -6, t: 0.35 },
  { x: 0, y: -7, t: 0.4 },
  { x: -1, y: -4, t: 0.5 },
  { x: -2, y: -5, t: 0.55 },
  { x: -3, y: -5, t: 0.6 },
  { x: -2, y: -4, t: 0.62 },
  { x: 1, y: -5, t: 0.52 },
  { x: 2, y: -6, t: 0.57 },
  { x: 3, y: -6, t: 0.62 },
  { x: 2, y: -5, t: 0.64 },
  { x: -1, y: -8, t: 0.75 },
  { x: 1, y: -8, t: 0.75 },
  { x: 0, y: -9, t: 0.8 },
  { x: -1, y: -10, t: 0.85 },
  { x: 1, y: -10, t: 0.85 },
  { x: 0, y: -11, t: 0.9 },
  { x: 0, y: -13, t: 0.98 },
];

function noise(x: number, y: number, t: number) {
  return Math.sin(x * 0.1 + t) + Math.cos(y * 0.1 - t) + Math.sin((x + y) * 0.05 + t * 0.5);
}

export function GrowthAsciiCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let time = 0;
    let raf = 0;
    let visible = true;

    const simStartTime = Date.now() + 1500;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.ceil(canvas.width / CELL_SIZE);
      rows = Math.ceil(canvas.height / CELL_SIZE);
      ctx.font = `${CELL_SIZE}px "VT323", monospace`;
      ctx.textBaseline = 'top';
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      let progress = 0;
      if (now > simStartTime) {
        const duration = 12000;
        progress = Math.min((now - simStartTime) / duration, 1.0);
      }

      const baseSoilHeight = Math.floor(rows * 0.65);
      const rootX = Math.floor(cols / 2);

      for (let x = 0; x < cols; x++) {
        const surfaceOffset = Math.sin(x * 0.1 + time * 0.02) * 2 + Math.cos(x * 0.05) * 2;
        const columnSurface = Math.floor(baseSoilHeight + surfaceOffset);

        let rootY = baseSoilHeight;
        if (x === rootX) {
          rootY = columnSurface;
        }

        for (let y = columnSurface; y < rows; y++) {
          const depth = y - columnSurface;
          const flowVal = noise(x, y, time * 0.03);

          let charIndex = Math.floor(depth * 0.5 + flowVal * 3 + 2);
          charIndex = Math.max(0, Math.min(charIndex, DENSITY_CHARS.length - 2));

          let alpha = 1.0;
          if (progress > 0) {
            const distToRoot = Math.sqrt((x - rootX) ** 2 + (y - rootY) ** 2);
            if (distToRoot < 3 && progress > 0.1) {
              alpha = 0.2;
              charIndex = DENSITY_CHARS.length - 2;
            }
          }

          if (depth < 2) ctx.fillStyle = `rgba(85, 85, 85, ${alpha})`;
          else if (depth < 6) ctx.fillStyle = `rgba(51, 51, 51, ${alpha})`;
          else ctx.fillStyle = `rgba(17, 17, 17, ${alpha})`;

          ctx.fillText(DENSITY_CHARS[charIndex], x * CELL_SIZE, y * CELL_SIZE);
        }
      }

      if (progress > 0) {
        ctx.fillStyle = '#FFFFFF';
        const currentSurfaceAtRoot = Math.floor(
          baseSoilHeight + (Math.sin(rootX * 0.1 + time * 0.02) * 2 + Math.cos(rootX * 0.05) * 2),
        );

        SPROUT_DATA.forEach((block) => {
          if (progress >= block.t) {
            let swayX = 0;
            if (block.y < -4) {
              swayX = Math.round(Math.sin(time * 0.05 + block.y * 0.1) * 0.6);
            }
            const drawX = (rootX + block.x + swayX) * CELL_SIZE;
            const drawY = (currentSurfaceAtRoot + block.y) * CELL_SIZE;
            ctx.fillRect(drawX + 1, drawY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          }
        });
      }

      time++;
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? 'block h-full w-full'} aria-hidden="true" />;
}