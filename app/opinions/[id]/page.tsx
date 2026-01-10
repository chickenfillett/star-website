/**
 * 观点文章详情页
 * 核心作用：展示文章完整内容，支持点赞和分享
 * 关联界面/功能模块：观点分享板块
 * 依赖文件/接口：store/contentStore.ts, store/userStore.ts
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, Share2Icon, StarIcon, ChevronUpIcon, ChevronDownIcon } from '@/components/ui/Icons';
import { useContentStore } from '@/store/contentStore';
import { useUserStore } from '@/store/userStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { formatDateTime } from '@/utils/format';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { articles } = useContentStore();
  const { toggleArticleLike, isArticleLiked } = useUserStore();
  const { playButtonSound, playPermissionUnlockSound } = useSoundEffects();
  const { handleLike: handleEasterEggLike } = useEasterEggs();
  
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [articleStartTime, setArticleStartTime] = useState<number | null>(null);

  const article = articles.find((a) => a.id === params.id);

  useEffect(() => {
    if (article) {
      setArticleStartTime(Date.now());
    }
  }, [article]);

  useEffect(() => {
    if (articleStartTime && isArticleLiked(article?.id || '')) {
      const checkInteractionReminder = setTimeout(() => {
        if (Date.now() - articleStartTime >= 60000) {
        }
      }, 60000);

      return () => clearTimeout(checkInteractionReminder);
    }
  }, [articleStartTime, isArticleLiked, article?.id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/40">文章未找到</div>
      </div>
    );
  }

  const handleLike = () => {
    toggleArticleLike(article.id);
    handleEasterEggLike('article');
    playButtonSound();
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 500);

    if (!isArticleLiked(article.id)) {
      playPermissionUnlockSound();
    }
  };

  const handleShare = () => {
    setShowSharePanel(!showSharePanel);
    playButtonSound();
  };

  const sharePlatforms = [
    { name: 'Twitter', icon: '𝕏', color: 'bg-white' },
    { name: 'WeChat', icon: '💬', color: 'bg-green-500' },
    { name: 'Weibo', icon: '📱', color: 'bg-red-500' },
    { name: 'Copy', icon: '📋', color: 'bg-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/opinions"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            onClick={playButtonSound}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>返回</span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <Share2Icon className="w-5 h-5" />
            <span>分享</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {showSharePanel && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 bg-black border-b border-white/10"
          >
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex gap-3">
                {sharePlatforms.map((platform) => (
                  <motion.button
                    key={platform.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (platform.name === 'Copy') {
                        navigator.clipboard.writeText(window.location.href);
                      }
                      playButtonSound();
                    }}
                    className={`${platform.color} text-black px-4 py-2 rounded-lg text-sm font-medium`}
                  >
                    {platform.icon} {platform.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <article className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

          <div className="flex items-center gap-4 text-sm text-white/40 mb-6">
            <span>{formatDateTime(article.createdAt)}</span>
            <span>•</span>
            <span>{article.views} 阅读</span>
            <span>•</span>
            <span>{article.likes} 点赞</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              {article.summary}
            </p>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${
                isArticleLiked(article.id)
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-black'
                  : 'bg-black border border-white/20 text-white/70 hover:text-white'
              }`}
            >
              <motion.div
                animate={likeAnimation ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <StarIcon className={`w-6 h-6 ${isArticleLiked(article.id) ? 'fill-current' : ''}`} />
              </motion.div>
              <span className="font-medium">
                {isArticleLiked(article.id) ? '已点赞' : '点赞'}
              </span>
              <span className="text-white/60">({article.likes})</span>
            </motion.button>

            <div className="flex gap-3">
              <Link
                href="/opinions"
                className="px-6 py-3 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-white/40 transition-all"
                onClick={playButtonSound}
              >
                返回列表
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
