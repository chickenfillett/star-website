/**
 * 观点分享页面
 * 核心作用：展示文章列表，支持搜索和排序
 * 关联界面/功能模块：观点分享板块
 * 依赖文件/接口：store/contentStore.ts
 */

'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchIcon, ClockIcon, FlameIcon } from '@/components/ui/Icons';
import { useContentStore } from '@/store/contentStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { formatRelativeTime } from '@/utils/format';

export default function OpinionsPage() {
  const { articles, sortBy, setSortBy, setArticles } = useContentStore();
  const { playButtonSound } = useSoundEffects();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (searchQuery) {
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (sortBy === 'time') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [searchQuery, sortBy, articles]);

  useEffect(() => {
    const mockArticles = [
      {
        id: '1',
        title: '想说的话',
        summary: '一个多月前，我对编程——尤其是网页前端设计还一窍不通。那时，我只会用豆包生成一些简单的、能在浏览器中直接打开的 HTML 文件。经过这段时间的学习，我已经能够创建需要安装依赖、具备交互功能的真正网页。从对 AI 开发一知半解，到了解并开始学习 Trae 和 Kiro，我从曾经完全不懂 HTML、CSS 和 JS，到如今能借助人工智能工具快速学习，并一步步实现自己长久以来的愿望。虽然这个网页还不完善，AI 也时常需要人工干预，如由于出现错误，需要重新清除 npm 缓存并再次运行 npm install，但这些过程本身也让我对前端设计有了更深的理解。每一次调试、每一次尝试，都让我真切地感受到：未来正在到来。',
        content: '一个多月前，我对编程——尤其是网页前端设计还一窍不通。那时，我只会用豆包生成一些简单的、能在浏览器中直接打开的 HTML 文件。经过这段时间的学习，我已经能够创建需要安装依赖、具备交互功能的真正网页。从对 AI 开发一知半解，到了解并开始学习 Trae 和 Kiro，我从曾经完全不懂 HTML、CSS 和 JS，到如今能借助人工智能工具快速学习，并一步步实现自己长久以来的愿望。虽然这个网页还不完善，AI 也时常需要人工干预，如由于出现错误，需要重新清除 npm 缓存并再次运行 npm install，但这些过程本身也让我对前端设计有了更深的理解。每一次调试、每一次尝试，都让我真切地感受到：未来正在到来。',
        tags: ['个人感悟', '编程学习', 'AI开发', '前端设计'],
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      },
    ];

    setArticles(mockArticles);
  }, [setArticles]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">观点分享</h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors text-base"
            />
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSortBy('time');
                playButtonSound();
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 rounded-lg transition-all touch-target ${
                sortBy === 'time'
                  ? 'bg-white text-black'
                  : 'bg-black text-white/70 border border-white/10 hover:border-white/20'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm sm:text-base">时间</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSortBy('popularity');
                playButtonSound();
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-3 rounded-lg transition-all touch-target ${
                sortBy === 'popularity'
                  ? 'bg-white text-black'
                  : 'bg-black text-white/70 border border-white/10 hover:border-white/20'
              }`}
            >
              <FlameIcon className="w-4 h-4" />
              <span className="text-sm sm:text-base">热度</span>
            </motion.button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/opinions/${article.id}`}
                className="group block"
                onClick={playButtonSound}
              >
                <div className="bg-black border border-white/10 rounded-lg p-4 sm:p-6 hover:border-white/20 hover:bg-white/5 transition-all">
                  <h2 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-white/60 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                    {article.summary}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/40 flex-wrap">
                    <span>{formatRelativeTime(article.createdAt)}</span>
                    <span>•</span>
                    <span>{article.views} 阅读</span>
                    <span>•</span>
                    <span>{article.likes} 点赞</span>
                  </div>

                  <div className="flex gap-2 mt-3 sm:mt-4 flex-wrap">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20 text-white/40">
            未找到相关文章
          </div>
        )}
      </div>
    </div>
  );
}
