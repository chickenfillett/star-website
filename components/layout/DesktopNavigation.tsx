/**
 * 桌面端导航栏组件
 * 核心作用：提供桌面端的顶部导航功能
 * 关联界面/功能模块：全局布局
 * 依赖文件/接口：store/uiStore.ts
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StarIcon, GlobeIcon, LockIcon } from '@/components/ui/Icons';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { NAV_ITEMS } from '@/constants/navigation';
import { ANIMATION } from '@/constants/animation';

export default function DesktopNavigation() {
  const pathname = usePathname();
  const { scrollY, language, setLanguage } = useUIStore();
  const [showTitle, setShowTitle] = useState(true);
  const { playButtonSound, playHoverSound } = useSoundEffects();

  useEffect(() => {
    setShowTitle(scrollY < 100);
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={ANIMATION.spring.snappy}
      className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group smooth-transition active-press"
          onClick={playButtonSound}
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            transition={ANIMATION.spring.snappy}
          >
            <StarIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </motion.div>
          {showTitle && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/70 font-medium overflow-hidden whitespace-nowrap group-hover:text-white transition-colors"
            >
              星空
            </motion.span>
          )}
        </Link>

        <div className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 smooth-transition active-press relative ${
                  isActive ? 'text-purple-400' : 'text-white/70 hover:text-white'
                }`}
                onClick={playButtonSound}
                onMouseEnter={playHoverSound}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={ANIMATION.spring.snappy}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : ''}`} />
                </motion.div>
                <span className={isActive ? 'text-purple-400' : ''}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                    initial={false}
                    transition={ANIMATION.spring.bouncy}
                  />
                )}
              </Link>
            );
          })}

          <Link
            href="/private"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors smooth-transition active-press"
            onClick={playButtonSound}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={ANIMATION.spring.snappy}
            >
              <LockIcon className="w-4 h-4" />
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={ANIMATION.spring.snappy}
            onClick={() => {
              setLanguage(language === 'zh' ? 'en' : 'zh');
              playButtonSound();
            }}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors smooth-transition active-press px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <motion.div
              animate={{ rotate: language === 'zh' ? 0 : 360 }}
              transition={{ duration: 0.5, ...ANIMATION.spring.medium }}
            >
              <GlobeIcon className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
