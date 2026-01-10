/**
 * 星空背景Hook
 * 核心作用：管理星空背景的渲染和动画
 * 关联界面/功能模块：全局布局
 * 依赖文件/接口：constants/animation.ts
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { STAR_ANIMATION } from '@/constants/animation';
import { throttle } from '@/utils/helpers';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
}

export function useStarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = STAR_ANIMATION.particleCount.static;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (STAR_ANIMATION.starSize.max - STAR_ANIMATION.starSize.min) + STAR_ANIMATION.starSize.min,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleDelay: Math.random() * STAR_ANIMATION.twinkleInterval.max,
        });
      }

      setStars(newStars);
    };

    const createShootingStar = () => {
      const newShootingStar: ShootingStar = {
        id: Date.now(),
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        angle: Math.PI / 4 + (Math.random() - 0.5) * 1.2,
      };

      setShootingStars((prev) => {
        const current = [...prev, newShootingStar];
        if (current.length > STAR_ANIMATION.shootingStar.maxConcurrent) {
          return current.slice(-STAR_ANIMATION.shootingStar.maxConcurrent);
        }
        return current;
      });

      const duration = STAR_ANIMATION.shootingStar.trailLength / STAR_ANIMATION.shootingStar.speed * 1000;
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== newShootingStar.id));
      }, duration);
    };

    const scheduleShootingStar = () => {
      const delay = Math.random() * 
        (STAR_ANIMATION.shootingStarFrequency.max - STAR_ANIMATION.shootingStarFrequency.min) +
        STAR_ANIMATION.shootingStarFrequency.min;
      
      setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
      }, delay);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      stars.forEach((star) => {
        const twinkleProgress = ((now + star.twinkleDelay) % STAR_ANIMATION.twinkleInterval.max) / STAR_ANIMATION.twinkleInterval.max;
        const twinkleOpacity = 0.3 + Math.sin(twinkleProgress * Math.PI * 2) * 0.4;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
        ctx.fill();
      });

      shootingStars.forEach((shootingStar) => {
        const length = STAR_ANIMATION.shootingStar.trailLength;
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * length;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * length;

        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          endX,
          endY
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    scheduleShootingStar();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return { canvasRef, stars, shootingStars };
}
