/**
 * 用户状态管理Store
 * 核心作用：管理用户认证、偏好设置、互动记录等
 * 关联界面/功能模块：私域验证、个人中心、点赞功能
 * 依赖文件/接口：无
 */

import { create } from 'zustand';

interface UserState {
  isAuthenticated: boolean;
  visitCount: number;
  consecutiveDays: number;
  lastVisitDate: string | null;
  likedPhotos: Set<string>;
  likedArticles: Set<string>;
  visitorNumber: number;
  achievements: string[];
  
  authenticate: (password: string) => Promise<boolean>;
  logout: () => void;
  incrementVisitCount: () => void;
  updateConsecutiveDays: () => void;
  togglePhotoLike: (photoId: string) => void;
  toggleArticleLike: (articleId: string) => void;
  setVisitorNumber: (number: number) => void;
  isPhotoLiked: (photoId: string) => boolean;
  isArticleLiked: (articleId: string) => boolean;
  unlockAchievement: (id: string) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  isAuthenticated: false,
  visitCount: 0,
  consecutiveDays: 0,
  lastVisitDate: null,
  likedPhotos: new Set(),
  likedArticles: new Set(),
  visitorNumber: 0,
  achievements: [],
  
  authenticate: async (password: string) => {
    const isValid = password === '123456';
    if (isValid) {
      set({ isAuthenticated: true });
    }
    return isValid;
  },
  
  logout: () => {
    set({ isAuthenticated: false });
  },
  
  incrementVisitCount: () => {
    set((state) => ({ visitCount: state.visitCount + 1 }));
  },
  
  updateConsecutiveDays: () => {
    const today = new Date().toDateString();
    const lastVisit = get().lastVisitDate;
    
    if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const todayDate = new Date(today);
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        set((state) => ({ consecutiveDays: state.consecutiveDays + 1 }));
      } else if (diffDays > 1) {
        set({ consecutiveDays: 1 });
      }
    } else {
      set({ consecutiveDays: 1 });
    }
    
    set({ lastVisitDate: today });
  },
  
  togglePhotoLike: (photoId: string) => {
    set((state) => {
      const newLikedPhotos = new Set(state.likedPhotos);
      if (newLikedPhotos.has(photoId)) {
        newLikedPhotos.delete(photoId);
      } else {
        newLikedPhotos.add(photoId);
      }
      return { likedPhotos: newLikedPhotos };
    });
  },
  
  toggleArticleLike: (articleId: string) => {
    set((state) => {
      const newLikedArticles = new Set(state.likedArticles);
      if (newLikedArticles.has(articleId)) {
        newLikedArticles.delete(articleId);
      } else {
        newLikedArticles.add(articleId);
      }
      return { likedArticles: newLikedArticles };
    });
  },
  
  setVisitorNumber: (number: number) => {
    set({ visitorNumber: number });
  },
  
  isPhotoLiked: (photoId: string) => {
    return get().likedPhotos.has(photoId);
  },
  
  isArticleLiked: (articleId: string) => {
    return get().likedArticles.has(articleId);
  },
  
  unlockAchievement: (id: string) => {
    set((state) => ({
      achievements: [...state.achievements, id]
    }));
  },
}));

