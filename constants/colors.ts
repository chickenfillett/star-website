/**
 * 色彩体系常量定义
 * 核心作用：定义网站所有色彩值，确保设计一致性
 * 关联界面/功能模块：所有界面组件
 * 依赖文件/接口：tailwind.config.js, app/globals.css
 */

export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  
  gray: {
    50: 'rgba(255, 255, 255, 0.03)',
    100: 'rgba(255, 255, 255, 0.08)',
    200: 'rgba(255, 255, 255, 0.15)',
    300: 'rgba(255, 255, 255, 0.25)',
    400: 'rgba(255, 255, 255, 0.35)',
    500: 'rgba(255, 255, 255, 0.5)',
  },
  
  blue: {
    50: 'rgba(100, 150, 255, 0.1)',
    100: 'rgba(100, 150, 255, 0.15)',
    200: 'rgba(100, 150, 255, 0.25)',
    300: 'rgba(100, 150, 255, 0.35)',
    400: 'rgba(100, 150, 255, 0.5)',
    500: 'rgba(100, 150, 255, 0.7)',
  },
  
  purple: {
    50: 'rgba(150, 100, 255, 0.1)',
    100: 'rgba(150, 100, 255, 0.15)',
    200: 'rgba(150, 100, 255, 0.25)',
    300: 'rgba(150, 100, 255, 0.35)',
    400: 'rgba(150, 100, 255, 0.5)',
    500: 'rgba(150, 100, 255, 0.7)',
  },

  cyan: {
    50: 'rgba(100, 200, 255, 0.1)',
    200: 'rgba(100, 200, 255, 0.25)',
    400: 'rgba(100, 200, 255, 0.5)',
  },

  pink: {
    50: 'rgba(255, 100, 200, 0.1)',
    200: 'rgba(255, 100, 200, 0.25)',
    400: 'rgba(255, 100, 200, 0.5)',
  },
  
  gradient: {
    primary: 'linear-gradient(135deg, rgba(100, 150, 255, 0.5), rgba(150, 100, 255, 0.5))',
    secondary: 'linear-gradient(135deg, rgba(100, 200, 255, 0.4), rgba(100, 150, 255, 0.4))',
    accent: 'linear-gradient(135deg, rgba(255, 100, 200, 0.4), rgba(150, 100, 255, 0.4))',
    deep: 'linear-gradient(180deg, rgba(100, 150, 255, 0.15), rgba(150, 100, 255, 0.1), rgba(0, 0, 0, 0.8))',
    radial: 'radial-gradient(circle at center, rgba(100, 150, 255, 0.2), rgba(150, 100, 255, 0.1), transparent 70%)',
    shimmer: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
  },
} as const;

export const BORDER_CONFIG = {
  width: {
    desktop: '1px',
    mobile: '0.5px',
  },
  color: 'rgba(255, 255, 255, 0.2)',
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
} as const;

export const GLOW_CONFIG = {
  desktop: {
    primary: '0 0 20px rgba(100, 150, 255, 0.3), 0 0 40px rgba(150, 100, 255, 0.2), 0 0 60px rgba(100, 150, 255, 0.1)',
    secondary: '0 0 15px rgba(100, 200, 255, 0.25), 0 0 30px rgba(100, 150, 255, 0.15)',
    accent: '0 0 15px rgba(255, 100, 200, 0.25), 0 0 30px rgba(150, 100, 255, 0.15)',
    text: '0 0 10px rgba(100, 150, 255, 0.5), 0 0 20px rgba(150, 100, 255, 0.3)',
    subtle: '0 0 10px rgba(100, 150, 255, 0.15), 0 0 20px rgba(150, 100, 255, 0.08)',
  },
  mobile: {
    primary: '0 0 10px rgba(100, 150, 255, 0.2), 0 0 20px rgba(150, 100, 255, 0.12), 0 0 30px rgba(100, 150, 255, 0.06)',
    secondary: '0 0 8px rgba(100, 200, 255, 0.18), 0 0 16px rgba(100, 150, 255, 0.1)',
    accent: '0 0 8px rgba(255, 100, 200, 0.18), 0 0 16px rgba(150, 100, 255, 0.1)',
    text: '0 0 6px rgba(100, 150, 255, 0.4), 0 0 12px rgba(150, 100, 255, 0.2)',
    subtle: '0 0 6px rgba(100, 150, 255, 0.1), 0 0 12px rgba(150, 100, 255, 0.05)',
  },
} as const;
