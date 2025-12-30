/**
 * 响应式适配Hook
 * 核心作用：检测设备类型、屏幕尺寸，提供响应式工具
 * 关联界面/功能模块：所有需要响应式适配的组件
 * 依赖文件/接口：store/uiStore.ts
 */

'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/store/uiStore';

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { setMobile } = useUIStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenWidth(width);
      setScreenHeight(height);
      
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);
      setMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [mounted, setMobile]);

  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const getBreakpoint = () => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    screenHeight,
    isTouchDevice,
    getBreakpoint,
  };
}
