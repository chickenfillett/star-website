/**
 * 彩蛋触发Hook
 * 核心作用：管理所有彩蛋的触发逻辑和状态
 * 关联界面/功能模块：所有界面
 * 依赖文件/接口：constants/easterEggs.ts, utils/audio.ts
 */

import { useEffect, useRef, useState } from 'react';
import { EASTER_EGGS, EasterEggType } from '@/constants/easterEggs';
import { soundManager } from '@/utils/audio';
import { useUserStore } from '@/store/userStore';

interface EasterEggState {
  type: EasterEggType;
  isActive: boolean;
  message?: string;
}

export function useEasterEggs() {
  const [activeEasterEggs, setActiveEasterEggs] = useState<EasterEggState[]>([]);
  const [isNightTime, setIsNightTime] = useState(false);
  const [showNightMessage, setShowNightMessage] = useState(false);
  const pageLoadTime = useRef(Date.now());
  const photoDetailStartTime = useRef<number | null>(null);
  const articleLikeTime = useRef<number | null>(null);
  
  const { 
    consecutiveDays, 
    updateConsecutiveDays, 
    unlockAchievement,
    visitorNumber,
    setVisitorNumber
  } = useUserStore();

  useEffect(() => {
    updateConsecutiveDays();
    
    const newVisitorNumber = visitorNumber + 1;
    setVisitorNumber(newVisitorNumber);
    
    EASTER_EGGS.visitorMilestone.milestones.forEach((milestone) => {
      if (newVisitorNumber === milestone) {
        triggerEasterEgg('visitorMilestone', `恭喜你成为访问该网站的第${milestone}名用户`);
      }
    });

    if (consecutiveDays >= EASTER_EGGS.consecutiveVisit.requiredDays) {
      triggerEasterEgg('consecutiveVisit', EASTER_EGGS.consecutiveVisit.message);
    }
  }, []);

  useEffect(() => {
    const checkNightTime = () => {
      const hour = new Date().getHours();
      const isNight = hour >= EASTER_EGGS.nightMode.triggerTime.start || 
                     hour < EASTER_EGGS.nightMode.triggerTime.end;
      setIsNightTime(isNight);
      
      if (isNight && !showNightMessage) {
        setShowNightMessage(true);
        setTimeout(() => setShowNightMessage(false), 5000);
      }
    };

    checkNightTime();
    const interval = setInterval(checkNightTime, 60000);

    return () => clearInterval(interval);
  }, [showNightMessage]);

  const triggerEasterEgg = (type: EasterEggType, message?: string) => {
    setActiveEasterEggs((prev) => [...prev, { type, isActive: true, message }]);
    soundManager.play('easterEgg');

    setTimeout(() => {
      setActiveEasterEggs((prev) => prev.filter((e) => e.type !== type));
    }, 5000);
  };

  const handlePhotoDetailEnter = () => {
    photoDetailStartTime.current = Date.now();
  };

  const handlePhotoDetailLeave = () => {
    photoDetailStartTime.current = null;
  };

  const checkPhotoDetailEasterEgg = () => {
    if (!photoDetailStartTime.current) return;
    
    const duration = (Date.now() - photoDetailStartTime.current) / 1000;
    if (duration >= EASTER_EGGS.photoDetail.triggerDuration) {
      triggerEasterEgg('photoDetail');
    }
  };

  const handleLike = (contentType: 'photo' | 'article') => {
    if (isNightTime) {
      triggerEasterEgg('nightLike');
    }

    if (contentType === 'article') {
      articleLikeTime.current = Date.now();
      
      setTimeout(() => {
        if (articleLikeTime.current && 
            (Date.now() - articleLikeTime.current) / 1000 >= EASTER_EGGS.articleInteraction.triggerDuration / 60) {
          triggerEasterEgg('articleInteraction');
          articleLikeTime.current = null;
        }
      }, EASTER_EGGS.articleInteraction.triggerDuration * 1000);
    }
  };

  const handleDeviceTilt = (gamma: number, beta: number) => {
    if (Math.abs(gamma) > 10 || Math.abs(beta) > 10) {
      triggerEasterEgg('mobileTilt');
    }
  };

  return {
    activeEasterEggs,
    isNightTime,
    showNightMessage,
    triggerEasterEgg,
    handlePhotoDetailEnter,
    handlePhotoDetailLeave,
    checkPhotoDetailEasterEgg,
    handleLike,
    handleDeviceTilt,
  };
}
