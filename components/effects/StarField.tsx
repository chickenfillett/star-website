/**
 * 星空背景组件
 * 核心作用：渲染固定定位的画布，绘制闪烁星星与流星
 * 关联界面/功能模块：全局布局（LayoutWrapper 首个子元素）
 * 依赖文件/接口：constants/animation.ts
 */

'use client';

import { useEffect, useRef } from 'react';
import { STAR_ANIMATION } from '@/constants/animation';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: { r: number; g: number; b: number };
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  speed: number;
  opacity: number;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const STAR_COUNT = 120;
const MAX_SHOOTING_STARS = STAR_ANIMATION.shootingStar.maxConcurrent;

// 将 "rgba(r, g, b, a)" 解析为 { r, g, b }，便于按帧动态合成透明度
function parseRgb(rgba: string): RgbColor {
  const match = rgba.match(/rgba?\(([^)]+)\)/);
  if (!match) return { r: 255, g: 255, b: 255 };
  const parts = match[1].split(',').map((s) => parseFloat(s.trim()));
  return {
    r: Number.isFinite(parts[0]) ? parts[0] : 255,
    g: Number.isFinite(parts[1]) ? parts[1] : 255,
    b: Number.isFinite(parts[2]) ? parts[2] : 255,
  };
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let shootingStarTimer: ReturnType<typeof setTimeout> | null = null;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const colorPalette: RgbColor[] = STAR_ANIMATION.colors.map(parseRgb);

    const generateStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.5 + Math.random() * 1.5,
          baseOpacity: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const createShootingStar = () => {
      if (shootingStars.length >= MAX_SHOOTING_STARS) return;
      shootingStars.push({
        id: Date.now() + Math.random(),
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.5,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 1.2,
        length: 100 + Math.random() * 100,
        speed: 6 + Math.random() * 6,
        opacity: 1,
      });
    };

    const scheduleNextShootingStar = () => {
      const delay = 3000 + Math.random() * 7000; // 3-10s
      shootingStarTimer = setTimeout(() => {
        createShootingStar();
        scheduleNextShootingStar();
      }, delay);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now() / 1000;

      // 绘制星星：基于每颗星的相位与速度做正弦闪烁
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(now * star.twinkleSpeed + star.twinklePhase);
        const opacity = star.baseOpacity * (0.4 + 0.6 * twinkle);
        const { r, g, b } = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      }

      // 绘制并更新流星：拖尾使用白到透明的线性渐变
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const endX = s.x + Math.cos(s.angle) * s.length;
        const endY = s.y + Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${s.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // 流星头部高亮点
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.length -= s.speed;
        s.opacity -= 0.012;

        if (s.opacity <= 0 || s.length <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    scheduleNextShootingStar();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      if (shootingStarTimer) clearTimeout(shootingStarTimer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
