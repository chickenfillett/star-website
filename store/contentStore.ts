/**
 * 内容状态管理Store
 * 核心作用：管理摄影作品、观点文章等内容数据
 * 关联界面/功能模块：摄影板块、观点板块
 * 依赖文件/接口：无
 */

import { create } from 'zustand';

export interface Photo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  description: string;
  createdAt: string;
  audioUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
}

export interface Diary {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isPinned: boolean;
  images?: string[];
}

interface ContentState {
  photos: Photo[];
  articles: Article[];
  diaries: Diary[];
  selectedCategory: string;
  sortBy: 'time' | 'popularity';
  setPhotos: (photos: Photo[]) => void;
  setArticles: (articles: Article[]) => void;
  setDiaries: (diaries: Diary[]) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: 'time' | 'popularity') => void;
  addPhoto: (photo: Photo) => void;
  addArticle: (article: Article) => void;
  addDiary: (diary: Diary) => void;
  toggleDiaryPin: (id: string) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  photos: [],
  articles: [],
  diaries: [],
  selectedCategory: 'all',
  sortBy: 'time',
  
  setPhotos: (photos) => set({ photos }),
  
  setArticles: (articles) => set({ articles }),
  
  setDiaries: (diaries) => set({ diaries }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  
  addArticle: (article) => set((state) => ({ articles: [...state.articles, article] })),
  
  addDiary: (diary) => set((state) => ({ diaries: [...state.diaries, diary] })),
  
  toggleDiaryPin: (id) => set((state) => ({
    diaries: state.diaries.map((diary) =>
      diary.id === id ? { ...diary, isPinned: !diary.isPinned } : diary
    ),
  })),
}));
