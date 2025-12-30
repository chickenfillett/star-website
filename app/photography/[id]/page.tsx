/**
 * 记忆详情页
 * 核心作用：展示高清照片、注解、音频播放控件
 * 关联界面/功能模块：记忆作品板块
 * 依赖文件/接口：store/contentStore.ts, store/userStore.ts
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon, ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';
import { useContentStore } from '@/store/contentStore';
import { useUserStore } from '@/store/userStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { formatDateTime } from '@/utils/format';

export default function PhotoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { photos } = useContentStore();
  const { togglePhotoLike, isPhotoLiked } = useUserStore();
  const { playButtonSound, playPermissionUnlockSound } = useSoundEffects();
  const { handlePhotoDetailEnter, handlePhotoDetailLeave, checkPhotoDetailEasterEgg, handleLike: handleEasterEggLike } = useEasterEggs();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const index = photos.findIndex((p) => p.id === params.id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
    handlePhotoDetailEnter();
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      checkPhotoDetailEasterEgg();
    }, 1000);

    return () => {
      handlePhotoDetailLeave();
      clearInterval(interval);
    };
  }, [params.id]);

  const photo = photos[currentIndex];

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/40">照片未找到</div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      router.push(`/photography/${photos[currentIndex - 1].id}`);
      playButtonSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      router.push(`/photography/${photos[currentIndex + 1].id}`);
      playButtonSound();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(1, Math.min(3, newScale)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    setScale(scale === 1 ? 2 : 1);
    setPosition({ x: 0, y: 0 });
  };

  const handleLike = () => {
    togglePhotoLike(photo.id);
    handleEasterEggLike('photo');
    playButtonSound();
    
    if (!isPhotoLiked(photo.id)) {
      playPermissionUnlockSound();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/photography"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            onClick={playButtonSound}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>返回</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 text-white/70 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="text-white/50 text-sm">
              {currentIndex + 1} / {photos.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === photos.length - 1}
              className="p-2 text-white/70 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16 min-h-screen flex flex-col">
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
          <motion.div
            animate={{
              scale,
              x: position.x,
              y: position.y,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative max-w-5xl max-h-[70vh]"
          >
            <img
              src={photo.url}
              alt="记忆"
              className="aspect-[4/5] w-full h-full object-contain bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 rounded-lg overflow-hidden"
            />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto w-full px-6 pb-20">
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-end mb-4">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-all ${isPhotoLiked(photo.id)
                  ? 'text-purple-400 bg-purple-400/10'
                  : 'text-white/30 hover:text-white/70'}`}
              >
                <StarIcon className={`w-6 h-6 ${isPhotoLiked(photo.id) ? 'fill-purple-400' : ''}`} />
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={() => {
                  setShowAnnotation(!showAnnotation);
                  playButtonSound();
                }}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-3"
              >
                <span>注解</span>
                {showAnnotation ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {showAnnotation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/80 leading-relaxed">
                      {photo.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
