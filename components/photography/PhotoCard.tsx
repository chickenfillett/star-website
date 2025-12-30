/**
 * 记忆作品卡片组件
 * 核心作用：展示单个记忆作品，支持悬停效果
 * 关联界面/功能模块：记忆作品页面
 * 依赖文件/接口：store/contentStore.ts
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PhotoCardProps {
  photo: {
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    category: string;
    tags: string[];
    description: string;
    createdAt: string;
  };
  index: number;
  onClick?: () => void;
}

function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
  return (
    <motion.div
      key={photo.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/photography/${photo.id}`}
        className="group block"
        onClick={onClick}
      >
        <div className="relative overflow-hidden rounded-lg border border-white/10 hover:border-white/20 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/10">
          <div 
            className="aspect-[4/5] bg-gradient-to-br from-purple-900/20 to-blue-900/20 bg-cover bg-center"
            style={{ backgroundImage: `url(${photo.url})` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

PhotoCard.displayName = 'PhotoCard';

export default memo(PhotoCard);
