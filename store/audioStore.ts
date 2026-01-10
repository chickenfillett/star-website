/**
 * 音频状态管理Store
 * 核心作用：管理全局音频播放状态，确保音频在不同页面间持续播放
 * 关联界面/功能模块：所有需要音频播放的页面
 * 依赖文件/接口：无
 */

import { create } from 'zustand';

interface AudioState {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  currentTrackIndex: number;
  tracks: string[];
  toggleAudio: () => Promise<void>;
  playNextTrack: () => void;
  initializeAudio: () => void;
  preloadAudio: () => void;
}

// 音乐列表
const TRACKS = [
  '/music/636015887.mp3',
  '/music/我记得.mp3',
  '/music/Kaori - 刚好遇见你.mp3'
];

export const useAudioStore = create<AudioState>((set, get) => ({
  audio: null,
  isPlaying: false,
  currentTrackIndex: 0,
  tracks: TRACKS,

  // 初始化音频对象
  initializeAudio: () => {
    const currentAudio = get().audio;
    if (!currentAudio) {
      const audio = new Audio(TRACKS[0]);
      audio.volume = 0.3;
      
      // 添加结束事件监听，自动播放下一首
      audio.addEventListener('ended', () => {
        get().playNextTrack();
      });
      
      set({ audio });
    }
  },

  // 预加载所有音频文件
  preloadAudio: () => {
    TRACKS.forEach(track => {
      const preloadAudio = new Audio();
      preloadAudio.src = track;
      preloadAudio.load();
    });
  },

  // 播放/暂停切换
  toggleAudio: async () => {
    const { audio, isPlaying } = get();
    if (!audio) {
      get().initializeAudio();
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        set({ isPlaying: false });
      } else {
        await audio.play();
        set({ isPlaying: true });
      }
    } catch (error) {
      console.error('音频播放失败:', error);
    }
  },

  // 播放下一首
  playNextTrack: () => {
    const { currentTrackIndex, tracks, audio, isPlaying } = get();
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    
    if (audio) {
      audio.src = tracks[nextIndex];
      if (isPlaying) {
        audio.play().catch(error => {
          console.error('音频播放失败:', error);
        });
      }
    }
    
    set({ currentTrackIndex: nextIndex });
  },
}));
