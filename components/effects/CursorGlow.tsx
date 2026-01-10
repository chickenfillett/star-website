'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { throttle } from '@/utils/helpers';

interface CursorGlowProps {
  className?: string;
}

export default function CursorGlow({ className = '' }: CursorGlowProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  const throttledMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 16),
    []
  );

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', throttledMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [throttledMouseMove]);

  return (
    <>
      <motion.div
        className={`fixed pointer-events-none z-40 ${className}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovering ? 0.6 : 0.3,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div
          ref={glowRef}
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(100, 150, 255, 0.15) 0%, rgba(150, 100, 255, 0.08) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.8 : 0.4 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(100, 150, 255, 0.4) 50%, transparent 100%)',
            filter: 'blur(1px)',
          }}
        />
      </motion.div>
    </>
  );
}