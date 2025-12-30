/**
 * 404错误页面
 * 核心作用：显示404错误信息，提供返回首页的按钮
 * 关联界面/功能模块：错误处理
 * 依赖文件/接口：无
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HomeIcon, StarIcon } from '@/components/ui/Icons';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function NotFound() {
  const { playButtonSound } = useSoundEffects();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white/5 rounded-full border border-white/10 mb-6">
            <StarIcon className="w-16 h-16 text-white/30" />
          </div>
          <h1 className="text-8xl font-bold text-white/20 mb-4">404</h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-medium text-white/70 mb-4"
        >
          页面未找到
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/40 mb-8"
        >
          你访问的页面可能已被移除或不存在
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            onClick={playButtonSound}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black border border-purple-400/50 rounded-lg text-white hover:border-purple-400 transition-all"
          >
            <HomeIcon className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
