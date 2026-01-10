/**
 * UI状态管理Store
 * 核心作用：管理全局UI状态，包括导航、语言、主题等
 * 关联界面/功能模块：所有界面组件
 * 依赖文件/接口：无
 */

import { create } from 'zustand';

interface UIState {
  isMobile: boolean;
  language: 'zh' | 'en';
  scrollY: number;
  setMobile: (isMobile: boolean) => void;
  setLanguage: (language: 'zh' | 'en') => void;
  setScrollY: (scrollY: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobile: false,
  language: 'zh',
  scrollY: 0,
  
  setMobile: (isMobile) => set({ isMobile }),
  
  setLanguage: (language) => set({ language }),
  
  setScrollY: (scrollY) => set({ scrollY }),
}));
