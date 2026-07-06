/**
 * 彩蛋配置常量定义
 * 核心作用：定义所有彩蛋的触发条件和参数
 * 关联界面/功能模块：hooks/useEasterEggs.ts
 * 依赖文件/接口：components/effects/EasterEggs.tsx
 */

export const EASTER_EGGS = {
  photoDetail: {
    name: 'photoDetail',
    triggerDuration: 30,
    effect: 'aurora',
    description: '照片详情页停留30秒后，边缘浮现淡蓝紫极光渐变效果',
  },
  
  nightLike: {
    name: 'nightLike',
    triggerTime: {
      start: 23,
      end: 6,
    },
    effect: 'starBurst',
    description: '深夜时段点赞时，额外触发3颗微型星星扩散特效',
  },
  
  nightMode: {
    name: 'nightMode',
    triggerTime: {
      start: 23,
      end: 5,
    },
    effects: {
      borderOpacity: 0.15,
      meteorFrequency: 'random',
      message: '夜深了，好好休息',
    },
    description: '深夜时段降低边框透明度，增强流星效果',
  },
  
  consecutiveVisit: {
    name: 'consecutiveVisit',
    requiredDays: 3,
    effect: 'regularStar',
    icon: 'star',
    message: '常客之星',
    description: '连续3天访问并浏览新内容，显示常客之星图标',
  },
  
  articleInteraction: {
    name: 'articleInteraction',
    triggerDuration: 60,
    effect: 'interactionReminder',
    description: '点赞观点文章后停留1分钟，推送低干扰互动提醒',
  },
  
  visitorMilestone: {
    name: 'visitorMilestone',
    milestones: [10, 100, 500, 1000],
    effect: 'globalCelebration',
    description: '访客量达到里程碑时，触发全局特效并显示提示',
  },
  
  mobileTilt: {
    name: 'mobileTilt',
    platform: 'mobile',
    effect: 'parallaxStars',
    description: '移动端倾斜设备时，星空粒子随倾斜方向流动',
  },
} as const;

export type EasterEggType = keyof typeof EASTER_EGGS;
