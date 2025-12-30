/**
 * 关于我页面
 * 核心作用：展示个人简介、摄影相关、愿望清单、网站说明等模块
 * 关联界面/功能模块：关于我板块
 * 依赖文件/接口：无
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, Share2Icon, MailIcon } from '@/components/ui/Icons';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Module {
  id: string;
  title: string;
  content: string;
  defaultExpanded: boolean;
}

const modules: Module[] = [
  {
    id: 'intro',
    title: '个人简介',
    content: '暂无',
    defaultExpanded: true,
  },
  {
    id: 'wishlist',
    title: '愿望清单',
    content: '做自己想做的事',
    defaultExpanded: false,
  },
  {
    id: 'website',
    title: '网站说明',
    content: '这个网站采用极简设计风格，融合了星空元素。我希望通过这个平台分享我的作品和思考，与更多热爱生活的人建立连接。网站会持续更新，感谢你的关注。',
    defaultExpanded: false,
  },
];

export default function AboutPage() {
  const { playButtonSound } = useSoundEffects();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.filter((m) => m.defaultExpanded).map((m) => m.id))
  );
  const [showSharePanel, setShowSharePanel] = useState(false);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    playButtonSound();
  };

  const socialLinks = [
    { icon: MailIcon, href: 'mailto:nemonemo090522@qq.com', label: 'Email' },
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">关于我</h1>

        <div className="space-y-4 sm:space-y-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors touch-target"
              >
                <h2 className="text-lg sm:text-xl font-medium">{module.title}</h2>
                {expandedModules.has(module.id) ? (
                  <ChevronUpIcon className="w-5 h-5 text-white/50" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-white/50" />
                )}
              </button>

              <AnimatePresence>
                {expandedModules.has(module.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {module.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">社交账号</h2>
            <button
              onClick={() => {
                setShowSharePanel(!showSharePanel);
                playButtonSound();
              }}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-target"
            >
              <Share2Icon className="w-5 h-5" />
              <span className="text-sm sm:text-base">分享</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {socialLinks.map((link: typeof socialLinks[0]) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-black border border-white/10 rounded-lg hover:border-white/20 hover:scale-105 transition-all touch-target"
                  onClick={playButtonSound}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
                  <span className="text-xs sm:text-sm text-white/50">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {showSharePanel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 bg-black border border-white/10 rounded-lg"
            >
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">分享到社交媒体</h3>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {['Twitter', 'WeChat', 'Weibo', 'Copy Link'].map((platform) => (
                  <motion.button
                    key={platform}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (platform === 'Copy Link') {
                        navigator.clipboard.writeText(window.location.href);
                      }
                      playButtonSound();
                    }}
                    className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm hover:bg-white/10 transition-colors touch-target"
                  >
                    {platform}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
