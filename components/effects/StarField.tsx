/**
 * 星空背景组件
 * 核心作用：渲染纯黑背景和星空特效
 * 关联界面/功能模块：全局布局
 * 依赖文件/接口：constants/animation.ts
 */

'use client';

import { useRef } from 'react';
import { useEffect } from 'react';
import { STAR_ANIMATION } from '@/constants/animation';

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
  length: number;
  speed: number;
  opacity: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.className = 'fixed inset-0 w-full h-full pointer-events-none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      stars.length = 0;
      const starCount = STAR_ANIMATION.particleCount.static;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (STAR_ANIMATION.starSize.max - STAR_ANIMATION.starSize.min) + STAR_ANIMATION.starSize.min,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleDelay: Math.random() * STAR_ANIMATION.twinkleInterval.max,
        });
      }
    };

    const createShootingStar = () => {
      const shootingStar: ShootingStar = {
        id: Date.now(),
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.5,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 1.2,
        length: STAR_ANIMATION.shootingStar.trailLength,
        speed: STAR_ANIMATION.shootingStar.speed * 2,
        opacity: 1,
      };

      shootingStars.push(shootingStar);
    };

    const updateShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.length -= star.speed;
        star.opacity -= 0.015;

        if (star.length <= 0 || star.opacity <= 0) {
          shootingStars.splice(i, 1);
        }
      }
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
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          endX,
          endY
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(0.2, `rgba(255, 255, 255, ${shootingStar.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${shootingStar.opacity * 0.5})`);
        gradient.addColorStop(0.8, `rgba(255, 255, 255, ${shootingStar.opacity * 0.2})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
        ctx.fill();
      });

      updateShootingStars();

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    scheduleShootingStar();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}