import { useState, useCallback, useEffect } from 'react';
import { CLICK_SPARK } from '@/constants/animation';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  delay: number;
  shape: 'circle' | 'star' | 'diamond';
  rotation: number;
}

export function useClickSpark() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState(0);

  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    const baseId = clickCount * CLICK_SPARK.particleCount;

    for (let i = 0; i < CLICK_SPARK.particleCount; i++) {
      const angle = (Math.PI * 2 * i) / CLICK_SPARK.particleCount;
      const distance = CLICK_SPARK.distance.min + Math.random() * (CLICK_SPARK.distance.max - CLICK_SPARK.distance.min);
      const size = CLICK_SPARK.size.min + Math.random() * (CLICK_SPARK.size.max - CLICK_SPARK.size.min);
      const color = CLICK_SPARK.colors[Math.floor(Math.random() * CLICK_SPARK.colors.length)];
      const delay = Math.random() * CLICK_SPARK.delayMax;
      const shape = CLICK_SPARK.shapes[Math.floor(Math.random() * CLICK_SPARK.shapes.length)] as 'circle' | 'star' | 'diamond';
      const rotation = Math.random() * 360;

      newParticles.push({
        id: baseId + i,
        x,
        y,
        angle,
        distance,
        size,
        color,
        delay,
        shape,
        rotation,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
    setClickCount((prev) => prev + 1);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id >= baseId && p.id < baseId + CLICK_SPARK.particleCount));
    }, CLICK_SPARK.duration * 1000 + 100);
  }, [clickCount]);

  useEffect(() => {
    let lastClickTime = 0;

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastClickTime < CLICK_SPARK.throttle) return;
      lastClickTime = now;

      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        createParticles(e.clientX, e.clientY);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [createParticles]);

  return { particles };
}
