/**
 * 移动端底部导航栏组件
 * 核心作用：提供移动端的底部导航功能
 * 关联界面/功能模块：全局布局
 * 依赖文件/接口：store/uiStore.ts
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { PRIVATE_NAV_ITEMS } from '@/constants/navigation';
import { ANIMATION } from '@/constants/animation';

export default function MobileNavigation() {
  const pathname = usePathname();
  const { playButtonSound } = useSoundEffects();

  const categoryLabels: Record<string, string> = {
    '/': '首页',
    '/photography': '摄影',
    '/opinions': '观点',
    '/about': '关于',
    '/private': '私域',
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect-strong border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {PRIVATE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full smooth-transition active-press relative touch-target-lg ${
                isActive ? 'text-purple-400' : 'text-white/50'
              }`}
              onClick={playButtonSound}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={ANIMATION.spring.snappy}
                className={`relative ${item.href === '/private' ? 'w-7 h-7' : 'w-6 h-6'}`}
              >
                <Icon className={`w-full h-full ${isActive ? 'text-purple-400' : ''}`} />
                {isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full"
                    layoutId="activeNavMobile"
                    initial={false}
                    transition={ANIMATION.spring.bouncy}
                  />
                )}
              </motion.div>
              <motion.span
                className="text-xs mt-1 font-medium"
                animate={{ 
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.7
                }}
                transition={ANIMATION.spring.snappy}
              >
                {categoryLabels[item.href] || item.label}
              </motion.span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  initial={false}
                  transition={ANIMATION.spring.bouncy}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
