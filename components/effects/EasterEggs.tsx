/**
 * 彩蛋效果组件
 * 核心作用：显示所有彩蛋的视觉效果
 * 关联界面/功能模块：全局布局
 * 依赖文件/接口：hooks/useEasterEggs.ts
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { StarIcon, SparklesIcon } from '@/components/ui/Icons';

export default function EasterEggs() {
  const { activeEasterEggs, showNightMessage } = useEasterEggs();

  return (
    <>
      <AnimatePresence>
        {showNightMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-black text-white px-6 py-3 rounded-md text-sm">
              夜深了，好好休息
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeEasterEggs.map((easterEgg) => (
          <motion.div
            key={easterEgg.type}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            {easterEgg.type === 'nightLike' && (
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: 0,
                      scale: 2,
                      x: (i - 2) * 50,
                    }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <StarIcon className="w-6 h-6 text-purple-400 fill-purple-400" />
                  </motion.div>
                ))}
              </div>
            )}

            {easterEgg.type === 'consecutiveVisit' && (
              <div className="flex items-center gap-3 bg-black/80 px-6 py-4 rounded-lg">
                <SparklesIcon className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-lg font-medium text-white">
                    常客之星
                  </div>
                  <div className="text-sm text-gray-300">
                    欢迎回来！
                  </div>
                </div>
              </div>
            )}

            {easterEgg.type === 'visitorMilestone' && easterEgg.message && (
              <div className="bg-black/80 px-8 py-6 rounded-lg text-center">
                <SparklesIcon className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <div className="text-xl font-medium text-white">
                  {easterEgg.message}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
