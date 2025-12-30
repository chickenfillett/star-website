'use client';

import { motion } from 'framer-motion';
import { useClickSpark } from '@/hooks/useClickSpark';

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

export default function ClickSparkEffect() {
  const { particles } = useClickSpark();

  const getShapeStyle = (shape: 'circle' | 'star' | 'diamond', size: number, rotation: number) => {
    switch (shape) {
      case 'star':
        return {
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          transform: `rotate(${rotation}deg)`,
        };
      case 'diamond':
        return {
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          transform: `rotate(${rotation}deg)`,
        };
      default:
        return {};
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            borderRadius: particle.shape === 'circle' ? '50%' : '0',
            ...getShapeStyle(particle.shape, particle.size, particle.rotation),
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: particle.rotation,
          }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
            opacity: 0,
            scale: 0,
            rotate: particle.rotation + 180,
          }}
          transition={{
            duration: 0.5,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
