/**
 * 动画配置常量定义
 * 核心作用：定义所有动画的时长、缓动曲线等参数
 * 关联界面/功能模块：所有动画效果
 * 依赖文件/接口：framer-motion配置, app/globals.css
 */

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.7,
    pageLoad: 2.5,
    starTwinkle: 3,
    shootingStar: 1,
    shimmer: 10,
  },
  
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    linear: 'linear',
    spring: [0.4, 0, 0.2, 1],
  },
  
  spring: {
    soft: { type: 'spring', stiffness: 200, damping: 25 },
    medium: { type: 'spring', stiffness: 300, damping: 25 },
    snappy: { type: 'spring', stiffness: 400, damping: 20 },
    bouncy: { type: 'spring', stiffness: 500, damping: 15 },
    gentle: { type: 'spring', stiffness: 150, damping: 30 },
  },
  
  scale: {
    hover: 1.05,
    click: 0.96,
    tap: 0.92,
  },
  
  opacity: {
    hidden: 0,
    visible: 1,
    low: 0.3,
    medium: 0.6,
  },
  
  frameRate: {
    standard: 60,
    high: 120,
  },
  
  transition: {
    fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const STAR_ANIMATION = {
  twinkleInterval: {
    min: 2000,
    max: 5000,
  },
  shootingStarFrequency: {
    min: 1500,
    max: 5000,
  },
  particleCount: {
    static: 250,
    dynamic: 50,
  },
  starSize: {
    min: 0.5,
    max: 4,
  },
  shootingStar: {
    trailLength: 150,
    speed: 8,
    maxConcurrent: 3,
  },
  colors: [
    'rgba(255, 255, 255, 1)',
    'rgba(200, 220, 255, 1)',
    'rgba(220, 200, 255, 1)',
    'rgba(255, 240, 220, 1)',
  ],
} as const;

export const CLICK_SPARK = {
  particleCount: 16,
  duration: 0.5,
  size: {
    min: 2,
    max: 5,
  },
  distance: {
    min: 40,
    max: 80,
  },
  delayMax: 0.08,
  throttle: 50,
  colors: [
    'rgba(100, 150, 255, 0.9)',
    'rgba(150, 100, 255, 0.9)',
    'rgba(100, 200, 255, 0.9)',
    'rgba(255, 255, 255, 0.95)',
    'rgba(255, 250, 240, 0.9)',
    'rgba(255, 215, 0, 0.8)',
    'rgba(255, 100, 200, 0.85)',
    'rgba(100, 255, 200, 0.85)',
  ],
  shapes: ['circle', 'star', 'diamond'],
} as const;

export const SOUND_SYNC = {
  maxError: 0.02,
  volume: {
    buttonClick: 0.3,
    pageLoad: 0.2,
    easterEgg: 0.4,
    audioControl: 0.2,
    contentInteraction: 0.15,
    permissionUnlock: 0.35,
    hover: 0.1,
    scroll: 0.08,
    notification: 0.3,
    success: 0.3,
    error: 0.25,
    typing: 0.12,
  },
  duration: {
    buttonClick: 0.15,
    pageLoad: 2.5,
    easterEgg: 0.12,
    audioControl: 0.08,
    contentInteraction: 0.1,
    permissionUnlock: 0.18,
    hover: 0.05,
    scroll: 0.03,
    notification: 0.3,
    success: 0.25,
    error: 0.2,
    typing: 0.04,
  },
} as const;
