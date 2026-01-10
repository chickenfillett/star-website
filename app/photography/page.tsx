/**
 * 记忆页面
 * 核心作用：展示记忆作品瀑布流布局，支持分类筛选
 * 关联界面/功能模块：记忆作品板块
 * 依赖文件/接口：store/contentStore.ts
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '@/store/contentStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { throttle } from '@/utils/helpers';
import PhotoCard from '@/components/photography/PhotoCard';
import { mockPhotos } from '@/data/mockPhotos';

const categories = ['all', 'landscape', 'urban', 'nature', 'portrait'];

export default function PhotographyPage() {
  const { photos, selectedCategory, setSelectedCategory, setPhotos } = useContentStore();
  const { playButtonSound } = useSoundEffects();
  const [filteredPhotos, setFilteredPhotos] = useState(photos);

  const throttledSetCategory = throttle((category: string) => {
    setSelectedCategory(category);
  }, 300);

  useEffect(() => {
    setPhotos(mockPhotos);
  }, [setPhotos]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter((photo) => photo.category === selectedCategory));
    }
  }, [selectedCategory, photos]);

  const categoryLabels: Record<string, string> = {
    all: '全部',
    landscape: '风景',
    urban: '城市',
    nature: '自然',
    portrait: '人像',
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">记忆</h1>

        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                throttledSetCategory(category);
                playButtonSound();
              }}
              className={`px-4 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-all touch-target ${selectedCategory === category
                ? 'bg-white text-black border border-white'
                : 'bg-black text-white/70 border border-white/20 hover:border-white/40'}`}
            >
              {categoryLabels[category]}
            </motion.button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              index={index} 
              onClick={playButtonSound} 
            />
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-white/40">
            暂无该分类的作品
          </div>
        )}
      </div>
    </div>
  );
}
