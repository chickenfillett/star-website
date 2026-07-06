# 星空风格极简个人网站

一个融合星空风格的极简个人网站，采用 Next.js + TypeScript + Tailwind CSS 构建。

## 功能特性

### 核心功能
- 🌟 **星空背景** - 静态星光、动态闪烁、流星划过效果
- 📱 **响应式设计** - 桌面端顶部导航，移动端底部导航
- 🎨 **极简设计** - 纯黑背景、低饱和度强调色、极简边框
- 🔊 **音效系统** - 按钮点击、页面加载、彩蛋触发等音效
- 🎁 **彩蛋系统** - 7个精心设计的彩蛋效果

### 页面模块
1. **首页** - 精选内容轮播、社交媒体图标
2. **摄影作品** - 瀑布流布局、分类筛选、照片详情页
3. **观点分享** - 文章列表、搜索排序、文章详情页
4. **关于我** - 可折叠模块、社交联动

### 彩蛋列表
1. 📸 **照片详情停留彩蛋** - 停留30秒后浮现极光效果
2. 🌙 **深夜点赞彩蛋** - 深夜时段点赞触发星星扩散
3. ⭐ **深夜模式彩蛋** - 深夜时段降低边框透明度，增强流星
4. 🏆 **连续访问彩蛋** - 连续3天访问显示常客之星
5. 💬 **文章互动彩蛋** - 点赞后停留1分钟推送提醒
6. 🎉 **访客里程碑彩蛋** - 访客量达到10/100/500/1000时触发
7. 📱 **移动端倾斜彩蛋** - 设备倾斜时星空粒子流动

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **状态管理**: Zustand
- **图标**: Lucide React

## 项目结构

```
star-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # 全局布局
│   ├── page.tsx              # 首页
│   ├── photography/           # 摄影作品
│   ├── opinions/             # 观点分享
│   ├── about/                # 关于我
│   └── not-found.tsx         # 404页面
├── components/               # 组件
│   ├── layout/              # 布局组件
│   ├── effects/             # 特效组件
│   └── ui/                 # UI组件
├── hooks/                   # 自定义Hooks
│   ├── useStarField.ts      # 星空背景
│   ├── useEasterEggs.ts    # 彩蛋触发
│   ├── useSoundEffects.ts   # 音效管理
│   └── useResponsive.ts    # 响应式适配
├── store/                   # 状态管理
│   ├── uiStore.ts          # UI状态
│   ├── contentStore.ts     # 内容状态
│   └── userStore.ts        # 用户状态
├── constants/               # 常量定义
│   ├── colors.ts           # 色彩体系
│   ├── typography.ts       # 字体规范
│   ├── easterEggs.ts      # 彩蛋配置
│   └── animation.ts       # 动画配置
├── utils/                   # 工具函数
│   ├── audio.ts            # 音效工具
│   └── format.ts          # 格式化工具
└── public/                  # 静态资源
```

## 快速开始

### 安装依赖
```bash
npm install
```

### 运行开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 设计规范

### 色彩体系
- 主背景: 纯黑色 (#000000)
- 主文字: 纯白色 (#FFFFFF)
- 辅助文字: 低透明度浅灰色
- 强调色: 低饱和度蓝、紫 (30%-40%饱和度)

### 字体规范
- 英文: SF Pro Text/Display
- 中文: PingFang SC
- 字重: Regular, Medium, Semibold, Bold
- 行间距: 1.4-1.5倍

### 布局规范
- 圆角: 小图标8px, 卡片12px, 错误页16px
- 边框: 桌面1px, 移动0.5px
- 光晕: 淡蓝紫渐变，10秒循环

## 音效说明

所有音效音量低于系统默认30%，包括：
- 按钮点击音效 (0.12s)
- 页面加载音效 (2s)
- 彩蛋触发音效 (0.1s)
- 音频控制音效 (0.06s)
- 内容交互音效 (0.08s)
- 权限解锁音效 (0.15s)

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

- 音效需要用户交互后才能播放（浏览器限制）
- 移动端倾斜彩蛋需要设备支持重力感应
