/**
 * 首页组件
 * 核心作用：展示精选内容
 * 关联界面/功能模块：首页
 * 依赖文件/接口：components/ui/, store/contentStore.ts
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { StarIcon, CameraIcon, UserIcon } from '@/components/ui/Icons';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function HomePage() {
  const { playButtonSound, playPageLoadSound } = useSoundEffects();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    playPageLoadSound();

    const updateDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const dayName = dayNames[now.getDay()];
      setCurrentDate(`${year}年${month}月${date}日 ${dayName}`);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [playPageLoadSound]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playButtonSound();
  };

  return (
    <div className="min-h-screen">
      <section className="h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-md w-full px-6 py-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="inline-block px-6 py-3 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {currentDate}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed mb-2">
                    Welcome
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed">
                    Merry Christmas
                  </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          <Link
            href="/photography"
            className="group block"
            onClick={playButtonSound}
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black border border-white/10 rounded-lg p-4 sm:p-6 hover:border-white/20 transition-all smooth-transition active-press hover-lift hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="mb-4 text-center">
                <motion.div
                    whileHover={{ rotate: 360, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block w-16 h-16 bg-white/10 rounded-full flex items-center justify-center"
                  >
                    <CameraIcon className="w-8 h-8 text-purple-400" />
                  </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 text-white">记忆空间</h3>
              <p className="text-white/60 text-center leading-relaxed">
                探索我的记忆空间，记录生活中的美好瞬间
              </p>
            </motion.div>
          </Link>

          <Link
            href="/about"
            className="group block"
            onClick={playButtonSound}
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black border border-white/10 rounded-lg p-4 sm:p-6 hover:border-white/20 transition-all smooth-transition active-press hover-lift hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="mb-4 text-center">
                <motion.div
                    whileHover={{ rotate: 360, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block w-16 h-16 bg-white/10 rounded-full flex items-center justify-center"
                  >
                    <UserIcon className="w-8 h-8 text-blue-400" />
                  </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 text-white">关于我</h3>
              <p className="text-white/60 text-center leading-relaxed">
                了解更多关于我的故事、兴趣和经历
              </p>
            </motion.div>
          </Link>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center">
          <p className="text-white/30 text-sm">© 2025 All Rights Reserved</p>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 sm:bottom-8 right-4 sm:right-6 w-12 h-12 bg-black/95 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center hover:border-white/40 transition-all z-30 touch-target smooth-transition active-press"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <StarIcon className="w-5 h-5 text-white/70" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
