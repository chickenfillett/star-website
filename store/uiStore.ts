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
  isMenuOpen: boolean;
  scrollY: number;
  isSearchOpen: boolean;
  setMobile: (isMobile: boolean) => void;
  setLanguage: (language: 'zh' | 'en') => void;
  setMenuOpen: (isOpen: boolean) => void;
  setScrollY: (scrollY: number) => void;
  setSearchOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobile: false,
  language: 'zh',
  isMenuOpen: false,
  scrollY: 0,
  isSearchOpen: false,
  
  setMobile: (isMobile) => set({ isMobile }),
  
  setLanguage: (language) => set({ language }),
  
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  
  setScrollY: (scrollY) => set({ scrollY }),
  
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
