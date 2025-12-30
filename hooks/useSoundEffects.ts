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

  const playEasterEggSound = useCallback(() => {
    soundManager.play('easterEgg');
  }, []);

  const playAudioControlSound = useCallback(() => {
    soundManager.play('audioControl');
  }, []);

  const playContentInteractionSound = useCallback(() => {
    soundManager.play('contentInteraction');
  }, []);

  const playPermissionUnlockSound = useCallback(() => {
    soundManager.play('permissionUnlock');
  }, []);

  const playHoverSound = useCallback(() => {
    soundManager.play('hover');
  }, []);

  const playScrollSound = useCallback(() => {
    soundManager.play('scroll');
  }, []);

  const playNotificationSound = useCallback(() => {
    soundManager.play('notification');
  }, []);

  const playSuccessSound = useCallback(() => {
    soundManager.play('success');
  }, []);

  const playErrorSound = useCallback(() => {
    soundManager.play('error');
  }, []);

  const playTypingSound = useCallback(() => {
    soundManager.play('typing');
  }, []);

  const initializeAudio = useCallback(() => {
    soundManager.initialize();
  }, []);

  const setVolume = useCallback((volume: number) => {
    soundManager.setVolume(volume);
  }, []);

  const toggleMute = useCallback(() => {
    soundManager.toggleMute();
  }, []);

  const getVolume = useCallback(() => {
    return soundManager.getVolume();
  }, []);

  const getIsMuted = useCallback(() => {
    return soundManager.getIsMuted();
  }, []);

  return {
    playButtonSound,
    playPageLoadSound,
    playEasterEggSound,
    playAudioControlSound,
    playContentInteractionSound,
    playPermissionUnlockSound,
    playHoverSound,
    playScrollSound,
    playNotificationSound,
    playSuccessSound,
    playErrorSound,
    playTypingSound,
    initializeAudio,
    setVolume,
    toggleMute,
    getVolume,
    getIsMuted,
    isNightTime: () => soundManager.isNightTime(),
  };
}
