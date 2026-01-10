/**
 * 音效管理Hook
 * 核心作用：提供音效播放的便捷接口
 * 关联界面/功能模块：所有需要音效的组件
 * 依赖文件/接口：utils/audio.ts
 */

import { useCallback } from 'react';
import { soundManager } from '@/utils/audio';

export function useSoundEffects() {
  const playButtonSound = useCallback(() => {
    soundManager.play('buttonClick');
  }, []);

  const playPageLoadSound = useCallback(() => {
    soundManager.play('pageLoad');
  }, []);

  const playPermissionUnlockSound = useCallback(() => {
    soundManager.play('permissionUnlock');
  }, []);

  const playHoverSound = useCallback(() => {
    soundManager.play('hover');
  }, []);

  const getVolume = useCallback(() => {
    return soundManager.getVolume();
  }, []);

  const getIsMuted = useCallback(() => {
    return soundManager.getIsMuted();
  }, []);

  const toggleMute = useCallback(() => {
    soundManager.toggleMute();
  }, []);

  const setVolume = useCallback((volume: number) => {
    soundManager.setVolume(volume);
  }, []);

  return {
    playButtonSound,
    playPageLoadSound,
    playPermissionUnlockSound,
    playHoverSound,
    getVolume,
    getIsMuted,
    toggleMute,
    setVolume,
  };
}
