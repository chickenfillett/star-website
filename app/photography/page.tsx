/**
 * 记忆页面
 * 核心作用：展示记忆作品瀑布流布局，支持分类筛选
 * 关联界面/功能模块：记忆作品板块
 * 依赖文件/接口：store/contentStore.ts
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContentStore } from '@/store/contentStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { formatRelativeTime } from '@/utils/format';
import { throttle } from '@/utils/helpers';
import PhotoCard from '@/components/photography/PhotoCard';

const categories = ['all'];

export default function PhotographyPage() {
  const { photos, selectedCategory, setSelectedCategory, setPhotos } = useContentStore();
  const { playButtonSound } = useSoundEffects();
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // 音乐列表，优先播放新添加的音乐
  const tracks = [
    '/music/636015887.mp3',
    '/music/我记得.mp3',
    '/music/Kaori - 刚好遇见你.mp3'
  ];
  
  // 初始化音频
  useEffect(() => {
    const newAudio = new Audio(tracks[currentTrackIndex]);
    newAudio.volume = 0.3;
    setAudio(newAudio);
    
    // 添加结束事件监听，切换到下一首
    const handleEnded = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };
    
    newAudio.addEventListener('ended', handleEnded);
    
    return () => {
      newAudio.removeEventListener('ended', handleEnded);
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, [currentTrackIndex]);
  
  // 当前轨道变化时更新音频源
  useEffect(() => {
    if (!audio) return;
    
    audio.src = tracks[currentTrackIndex];
    
    if (isPlaying) {
      audio.play().catch(error => {
        console.error('音频播放失败:', error);
      });
    }
  }, [audio, currentTrackIndex]);
  
  // 音频播放/暂停控制
  const toggleAudio = async () => {
    if (!audio) return;
    
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
      playButtonSound();
    } catch (error) {
      console.error('音频播放失败:', error);
    }
  };
  
  // 处理浏览器自动播放策略，等待用户交互
  useEffect(() => {
    if (!audio) return;
    
    const handleUserInteraction = async () => {
      try {
        if (!isPlaying) {
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('自动播放失败:', error);
      }
      
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    // 监听用户交互事件
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [audio, isPlaying]);

  const throttledSetCategory = throttle((category: string) => {
    setSelectedCategory(category);
  }, 300);

  useEffect(() => {
    const mockPhotos = [
        // 原有图片
        {
          id: '1',
          title: '',
          url: '/image/photo1.jpg',
          thumbnailUrl: '/image/photo1.jpg',
          category: 'landscape',
          tags: ['雪山', '滑雪', '运动', '自然', '户外'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: '2',
          title: '',
          url: '/image/photo2.jpg',
          thumbnailUrl: '/image/photo2.jpg',
          category: 'portrait',
          tags: ['人像', '宿舍', '生活', '日常', '室内'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        },
        {
          id: '3',
          title: '',
          url: '/image/photo3.jpg',
          thumbnailUrl: '/image/photo3.jpg',
          category: 'portrait',
          tags: ['人像', '学生', '课堂', '学习', '教室'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        },
        {
          id: '4',
          title: '',
          url: '/image/photo4.jpg',
          thumbnailUrl: '/image/photo4.jpg',
          category: 'nature',
          tags: ['花卉', '大丽花', '花朵', '植物', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        },
        {
          id: '5',
          title: '',
          url: '/image/photo5.jpg',
          thumbnailUrl: '/image/photo5.jpg',
          category: 'portrait',
          tags: ['人像', '学生', '合影', '团队', '青春'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        },
        // 新增图片 6.jpg - 24.jpg
        {
          id: '6',
          title: '',
          url: '/image/6.jpg',
          thumbnailUrl: '/image/6.jpg',
          category: 'landscape',
          tags: ['自然', '风景', '户外', '山脉', '森林'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 16).toISOString(),
        },
        {
          id: '7',
          title: '',
          url: '/image/7.jpg',
          thumbnailUrl: '/image/7.jpg',
          category: 'urban',
          tags: ['城市', '建筑', '街景', '现代', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 17).toISOString(),
        },
        {
          id: '8',
          title: '',
          url: '/image/8.jpg',
          thumbnailUrl: '/image/8.jpg',
          category: 'portrait',
          tags: ['人像', '表情', '特写', '情绪', '面部'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
        },
        {
          id: '9',
          title: '',
          url: '/image/9.jpg',
          thumbnailUrl: '/image/9.jpg',
          category: 'landscape',
          tags: ['山水', '风景', '自然', '湖泊', '倒影'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 19).toISOString(),
        },
        {
          id: '10',
          title: '',
          url: '/image/10.jpg',
          thumbnailUrl: '/image/10.jpg',
          category: 'landscape',
          tags: ['植物', '绿色', '自然', '森林', '树木'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
        },
        {
          id: '11',
          title: '',
          url: '/image/11.jpg',
          thumbnailUrl: '/image/11.jpg',
          category: 'urban',
          tags: ['城市', '夜景', '灯光', '都市', '夜晚'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 21).toISOString(),
        },
        {
          id: '12',
          title: '',
          url: '/image/12.jpg',
          thumbnailUrl: '/image/12.jpg',
          category: 'portrait',
          tags: ['人像', '生活', '日常', '休闲', '室内'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 22).toISOString(),
        },
        {
          id: '13',
          title: '',
          url: '/image/13.jpg',
          thumbnailUrl: '/image/13.jpg',
          category: 'nature',
          tags: ['天空', '云彩', '自然', '天气', '户外'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 23).toISOString(),
        },
        {
          id: '14',
          title: '',
          url: '/image/14.jpg',
          thumbnailUrl: '/image/14.jpg',
          category: 'urban',
          tags: ['城市', '交通', '街道', '车辆', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 24).toISOString(),
        },
        {
          id: '15',
          title: '',
          url: '/image/15.jpg',
          thumbnailUrl: '/image/15.jpg',
          category: 'landscape',
          tags: ['山脉', '风景', '户外', '自然', '徒步'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
        },
        {
          id: '16',
          title: '',
          url: '/image/16.jpg',
          thumbnailUrl: '/image/16.jpg',
          category: 'nature',
          tags: ['花卉', '春天', '花朵', '自然', '植物'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 26).toISOString(),
        },
        {
          id: '17',
          title: '',
          url: '/image/17.jpg',
          thumbnailUrl: '/image/17.jpg',
          category: 'portrait',
          tags: ['人像', '微笑', '青春', '快乐', '正面'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 27).toISOString(),
        },
        {
          id: '18',
          title: '',
          url: '/image/18.jpg',
          thumbnailUrl: '/image/18.jpg',
          category: 'urban',
          tags: ['城市', '建筑', '现代', '摩天大楼', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 28).toISOString(),
        },
        {
          id: '19',
          title: '',
          url: '/image/19.jpg',
          thumbnailUrl: '/image/19.jpg',
          category: 'landscape',
          tags: ['湖泊', '倒影', '风景', '自然', '平静'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 29).toISOString(),
        },
        {
          id: '20',
          title: '',
          url: '/image/20.jpg',
          thumbnailUrl: '/image/20.jpg',
          category: 'nature',
          tags: ['森林', '树木', '自然', '绿色', '户外'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        },
        {
          id: '21',
          title: '',
          url: '/image/21.jpg',
          thumbnailUrl: '/image/21.jpg',
          category: 'portrait',
          tags: ['人像', '沉思', '表情', '情绪', '思考'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 31).toISOString(),
        },
        {
          id: '22',
          title: '',
          url: '/image/22.jpg',
          thumbnailUrl: '/image/22.jpg',
          category: 'urban',
          tags: ['城市', '街拍', '行人', '生活', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 32).toISOString(),
        },
        {
          id: '23',
          title: '',
          url: '/image/23.jpg',
          thumbnailUrl: '/image/23.jpg',
          category: 'nature',
          tags: ['海洋', '海滩', '自然', '海浪', '沙滩'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 33).toISOString(),
        },
        {
          id: '24',
          title: '',
          url: '/image/24.jpg',
          thumbnailUrl: '/image/24.jpg',
          category: 'landscape',
          tags: ['日落', '天空', '风景', '自然', '黄昏'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 34).toISOString(),
        },
        // 新增图片 25.jpg - 40.jpg
        {
          id: '25',
          title: '',
          url: '/image/25.jpg',
          thumbnailUrl: '/image/25.jpg',
          category: 'nature',
          tags: ['森林', '树木', '自然', '阳光', '户外'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
        },
        {
          id: '26',
          title: '',
          url: '/image/26.jpg',
          thumbnailUrl: '/image/26.jpg',
          category: 'portrait',
          tags: ['人像', '特写', '表情', '眼神', '面部'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 36).toISOString(),
        },
        {
          id: '27',
          title: '',
          url: '/image/27.jpg',
          thumbnailUrl: '/image/27.jpg',
          category: 'urban',
          tags: ['城市', '建筑', '街景', '历史', '老建筑'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 37).toISOString(),
        },
        {
          id: '28',
          title: '',
          url: '/image/28.jpg',
          thumbnailUrl: '/image/28.jpg',
          category: 'nature',
          tags: ['花卉', '春天', '花朵', '粉色', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 38).toISOString(),
        },
        {
          id: '29',
          title: '',
          url: '/image/29.jpg',
          thumbnailUrl: '/image/29.jpg',
          category: 'landscape',
          tags: ['山脉', '户外', '风景', '自然', '高峰'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 39).toISOString(),
        },
        {
          id: '30',
          title: '',
          url: '/image/30.jpg',
          thumbnailUrl: '/image/30.jpg',
          category: 'portrait',
          tags: ['人像', '生活', '日常', '休闲', '放松'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 40).toISOString(),
        },
        {
          id: '31',
          title: '',
          url: '/image/31.jpg',
          thumbnailUrl: '/image/31.jpg',
          category: 'nature',
          tags: ['天空', '云彩', '自然', '蓝天', '户外'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 41).toISOString(),
        },
        {
          id: '32',
          title: '',
          url: '/image/32.jpg',
          thumbnailUrl: '/image/32.jpg',
          category: 'urban',
          tags: ['城市', '交通', '街道', '行人', '繁忙'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 42).toISOString(),
        },
        {
          id: '33',
          title: '',
          url: '/image/33.jpg',
          thumbnailUrl: '/image/33.jpg',
          category: 'landscape',
          tags: ['湖泊', '倒影', '风景', '自然', '宁静'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 43).toISOString(),
        },
        {
          id: '34',
          title: '',
          url: '/image/34.jpg',
          thumbnailUrl: '/image/34.jpg',
          category: 'nature',
          tags: ['海洋', '海滩', '海浪', '沙滩', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 44).toISOString(),
        },
        {
          id: '35',
          title: '',
          url: '/image/35.jpg',
          thumbnailUrl: '/image/35.jpg',
          category: 'portrait',
          tags: ['人像', '沉思', '表情', '安静', '思考'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
        },
        {
          id: '36',
          title: '',
          url: '/image/36.jpg',
          thumbnailUrl: '/image/36.jpg',
          category: 'urban',
          tags: ['城市', '街拍', '行人', '生活', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 46).toISOString(),
        },
        {
          id: '37',
          title: '',
          url: '/image/37.jpg',
          thumbnailUrl: '/image/37.jpg',
          category: 'nature',
          tags: ['植物', '绿色', '自然', '叶子', '清新'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 47).toISOString(),
        },
        {
          id: '38',
          title: '',
          url: '/image/38.jpg',
          thumbnailUrl: '/image/38.jpg',
          category: 'landscape',
          tags: ['山水', '风景', '自然', '山峰', '河流'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 48).toISOString(),
        },
        {
          id: '39',
          title: '',
          url: '/image/39.jpg',
          thumbnailUrl: '/image/39.jpg',
          category: 'portrait',
          tags: ['人像', '微笑', '青春', '活力', '快乐'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 49).toISOString(),
        },
        {
          id: '40',
          title: '',
          url: '/image/40.jpg',
          thumbnailUrl: '/image/40.jpg',
          category: 'urban',
          tags: ['城市', '建筑', '现代', '设计', '创意'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 50).toISOString(),
        },
        // 新增图片 41.jpg - 66.jpg
        {
          id: '41',
          title: '',
          url: '/image/41.jpg',
          thumbnailUrl: '/image/41.jpg',
          category: 'landscape',
          tags: ['风景', '自然', '户外', '山脉', '山峰'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 51).toISOString(),
        },
        {
          id: '42',
          title: '',
          url: '/image/42.jpg',
          thumbnailUrl: '/image/42.jpg',
          category: 'portrait',
          tags: ['人像', '微笑', '青春', '快乐', '正面'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 52).toISOString(),
        },
        {
          id: '43',
          title: '',
          url: '/image/43.jpg',
          thumbnailUrl: '/image/43.jpg',
          category: 'urban',
          tags: ['城市', '街道', '建筑', '街景', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 53).toISOString(),
        },
        {
          id: '45',
          title: '',
          url: '/image/45.jpg',
          thumbnailUrl: '/image/45.jpg',
          category: 'nature',
          tags: ['自然', '植物', '绿色', '叶子', '清新'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 54).toISOString(),
        },
        {
          id: '46',
          title: '',
          url: '/image/46.jpg',
          thumbnailUrl: '/image/46.jpg',
          category: 'portrait',
          tags: ['人像', '表情', '特写', '情绪', '面部'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 55).toISOString(),
        },
        {
          id: '47',
          title: '',
          url: '/image/47.jpg',
          thumbnailUrl: '/image/47.jpg',
          category: 'urban',
          tags: ['城市', '夜景', '灯光', '夜晚', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 56).toISOString(),
        },
        {
          id: '48',
          title: '',
          url: '/image/48.jpg',
          thumbnailUrl: '/image/48.jpg',
          category: 'landscape',
          tags: ['山水', '风景', '自然', '河流', '山脉'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 57).toISOString(),
        },
        {
          id: '49',
          title: '',
          url: '/image/49.jpg',
          thumbnailUrl: '/image/49.jpg',
          category: 'nature',
          tags: ['花卉', '花朵', '植物', '自然', '色彩'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 58).toISOString(),
        },
        {
          id: '50',
          title: '',
          url: '/image/50.jpg',
          thumbnailUrl: '/image/50.jpg',
          category: 'portrait',
          tags: ['人像', '生活', '日常', '休闲', '放松'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 59).toISOString(),
        },
        {
          id: '51',
          title: '',
          url: '/image/51.jpg',
          thumbnailUrl: '/image/51.jpg',
          category: 'urban',
          tags: ['城市', '建筑', '现代', '摩天大楼', '天际线'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
        },
        {
          id: '52',
          title: '',
          url: '/image/52.jpg',
          thumbnailUrl: '/image/52.jpg',
          category: 'nature',
          tags: ['海洋', '海滩', '海浪', '沙滩', '阳光'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 61).toISOString(),
        },
        {
          id: '53',
          title: '',
          url: '/image/53.jpg',
          thumbnailUrl: '/image/53.jpg',
          category: 'portrait',
          tags: ['人像', '沉思', '安静', '思考', '表情'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 62).toISOString(),
        },
        {
          id: '54',
          title: '',
          url: '/image/54.jpg',
          thumbnailUrl: '/image/54.jpg',
          category: 'landscape',
          tags: ['湖泊', '水面', '风景', '自然', '平静'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 63).toISOString(),
        },
        {
          id: '55',
          title: '',
          url: '/image/55.jpg',
          thumbnailUrl: '/image/55.jpg',
          category: 'nature',
          tags: ['森林', '树木', '自然', '绿色', '户外'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 64).toISOString(),
        },
        {
          id: '56',
          title: '',
          url: '/image/56.jpg',
          thumbnailUrl: '/image/56.jpg',
          category: 'urban',
          tags: ['城市', '街拍', '行人', '生活', '街头'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 65).toISOString(),
        },
        {
          id: '57',
          title: '',
          url: '/image/57.jpg',
          thumbnailUrl: '/image/57.jpg',
          category: 'landscape',
          tags: ['日落', '黄昏', '天空', '风景', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 66).toISOString(),
        },
        {
          id: '58',
          title: '',
          url: '/image/58.jpg',
          thumbnailUrl: '/image/58.jpg',
          category: 'nature',
          tags: ['花卉', '春天', '花朵', '粉色', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 67).toISOString(),
        },
        {
          id: '59',
          title: '',
          url: '/image/59.jpg',
          thumbnailUrl: '/image/59.jpg',
          category: 'portrait',
          tags: ['人像', '微笑', '快乐', '青春', '活力'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 68).toISOString(),
        },
        {
          id: '60',
          title: '',
          url: '/image/60.jpg',
          thumbnailUrl: '/image/60.jpg',
          category: 'urban',
          tags: ['城市', '建筑', '历史', '老建筑', '街景'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 69).toISOString(),
        },
        {
          id: '61',
          title: '',
          url: '/image/61.jpg',
          thumbnailUrl: '/image/61.jpg',
          category: 'nature',
          tags: ['自然', '植物', '叶子', '绿色', '清新'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 70).toISOString(),
        },
        {
          id: '62',
          title: '',
          url: '/image/62.jpg',
          thumbnailUrl: '/image/62.jpg',
          category: 'landscape',
          tags: ['山水', '风景', '自然', '山峰', '云雾'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 71).toISOString(),
        },
        {
          id: '63',
          title: '',
          url: '/image/63.jpg',
          thumbnailUrl: '/image/63.jpg',
          category: 'portrait',
          tags: ['人像', '表情', '特写', '眼神', '情绪'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 72).toISOString(),
        },
        {
          id: '64',
          title: '',
          url: '/image/64.jpg',
          thumbnailUrl: '/image/64.jpg',
          category: 'urban',
          tags: ['城市', '夜景', '灯光', '车流', '都市'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 73).toISOString(),
        },
        {
          id: '65',
          title: '',
          url: '/image/65.jpg',
          thumbnailUrl: '/image/65.jpg',
          category: 'nature',
          tags: ['海洋', '海浪', '海滩', '沙滩', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 74).toISOString(),
        },
        {
          id: '66',
          title: '',
          url: '/image/66.jpg',
          thumbnailUrl: '/image/66.jpg',
          category: 'landscape',
          tags: ['日落', '天空', '云彩', '风景', '自然'],
          description: '',
          createdAt: new Date(Date.now() - 86400000 * 75).toISOString(),
        },
      ];

    setPhotos(mockPhotos);
  }, [setPhotos]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter((photo) => photo.category === selectedCategory));
    }
  }, [selectedCategory, photos]);

  const categoryLabels: Record<string, string> = {
    all: '全部',
    landscape: '风景',
    urban: '城市',
    nature: '自然',
    portrait: '人像',
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 音频控制按钮 */}
        <div className="fixed top-32 right-6 z-50 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAudio}
            className="w-12 h-12 bg-black/95 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:border-white/30 transition-colors"
            aria-label={isPlaying ? "暂停音乐" : "播放音乐"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                {/* 简约音符 */}
                <path d="M12 4v16" strokeWidth="1.5" />
                <path d="M16 6v12" strokeWidth="1.5" />
                <path d="M8 8v8" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                {/* 简约音符 + 斜杠 */}
                <path d="M12 4v16" strokeWidth="1.5" />
                <path d="M16 6v12" strokeWidth="1.5" />
                <path d="M8 8v8" strokeWidth="1.5" />
                <path d="M2 2l20 20" />
              </svg>
            )}
          </motion.button>
          <span className="mt-1 text-xs text-white/50 whitespace-nowrap">music</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">记忆</h1>

        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                throttledSetCategory(category);
                playButtonSound();
              }}
              className={`px-4 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap transition-all touch-target ${selectedCategory === category
                ? 'bg-white text-black border border-white'
                : 'bg-black text-white/70 border border-white/20 hover:border-white/40'}`}
            >
              {categoryLabels[category]}
            </motion.button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              index={index} 
              onClick={playButtonSound} 
            />
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-white/40">
            暂无该分类的作品
          </div>
        )}
      </div>
    </div>
  );
}