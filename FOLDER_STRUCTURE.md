/**
 * 文件夹说明注释文件
 * 
 * 本文档详细说明项目各文件夹的分工、文件间的关联逻辑、核心功能模块的代码分布
 */

## 项目整体结构

```
star-website/
├── app/                      # Next.js App Router页面目录
├── components/               # 可复用组件目录
├── hooks/                   # 自定义React Hooks目录
├── store/                   # Zustand状态管理目录
├── constants/               # 常量定义目录
├── utils/                   # 工具函数目录
├── public/                  # 静态资源目录
└── 配置文件                # 项目配置文件
```

## app/ - Next.js App Router页面目录

### 功能说明
存放所有页面组件，使用Next.js 15的App Router架构

### 文件分工
- `layout.tsx` - 全局布局组件，包含星空背景、导航栏
- `page.tsx` - 首页组件
- `photography/` - 摄影作品板块
  - `page.tsx` - 摄影作品列表页
  - `[id]/page.tsx` - 摄影作品详情页
- `opinions/` - 观点分享板块
  - `page.tsx` - 观点文章列表页
  - `[id]/page.tsx` - 观点文章详情页
- `about/` - 关于我板块
  - `page.tsx` - 关于我页面
- `private/` - 私域系统
  - `page.tsx` - 私域验证页
  - `home/page.tsx` - 私域首页
  - `diary/new/page.tsx` - 日记编辑页
- `not-found.tsx` - 404错误页
- `globals.css` - 全局样式

### 文件间关联逻辑
- 所有页面共享 `layout.tsx` 提供的全局布局
- 页面间通过 `<Link>` 组件进行导航
- 动态路由使用 `[id]` 参数传递ID

### 核心功能模块分布
- 首页轮播: `page.tsx`
- 摄影瀑布流: `photography/page.tsx`
- 文章搜索: `opinions/page.tsx`
- 私域验证: `private/page.tsx`

### 关键文件优先级
1. `layout.tsx` - 最高优先级，影响所有页面
2. `page.tsx` - 高优先级，网站入口
3. `globals.css` - 高优先级，全局样式

## components/ - 可复用组件目录

### 功能说明
存放所有可复用的React组件，按功能模块分类

### 文件分工
- `layout/` - 布局组件
  - `DesktopNavigation.tsx` - 桌面端导航栏
  - `MobileNavigation.tsx` - 移动端底部导航栏
- `effects/` - 特效组件
  - `StarField.tsx` - 星空背景组件
  - `EasterEggs.tsx` - 彩蛋效果组件
- `ui/` - 通用UI组件（预留）

### 文件间关联逻辑
- 布局组件在 `layout.tsx` 中引用
- 特效组件在 `layout.tsx` 中引用
- 组件间通过props传递数据

### 核心功能模块分布
- 星空背景渲染: `effects/StarField.tsx`
- 彩蛋效果显示: `effects/EasterEggs.tsx`
- 导航功能: `layout/DesktopNavigation.tsx`, `layout/MobileNavigation.tsx`

### 关键文件优先级
1. `effects/StarField.tsx` - 高优先级，核心视觉效果
2. `layout/DesktopNavigation.tsx` - 高优先级，桌面导航
3. `layout/MobileNavigation.tsx` - 高优先级，移动导航

## hooks/ - 自定义React Hooks目录

### 功能说明
封装可复用的逻辑，遵循React Hooks最佳实践

### 文件分工
- `useStarField.ts` - 星空背景逻辑
- `useEasterEggs.ts` - 彩蛋触发逻辑
- `useSoundEffects.ts` - 音效管理逻辑
- `useResponsive.ts` - 响应式适配逻辑

### 文件间关联逻辑
- Hooks被多个组件引用
- Hooks之间相互调用（如 `useEasterEggs` 调用 `useSoundEffects`）
- Hooks通过返回值提供数据和方法

### 核心功能模块分布
- 星空动画: `useStarField.ts`
- 彩蛋系统: `useEasterEggs.ts`
- 音效播放: `useSoundEffects.ts`
- 设备检测: `useResponsive.ts`

### 关键文件优先级
1. `useStarField.ts` - 高优先级，核心视觉效果
2. `useEasterEggs.ts` - 高优先级，彩蛋系统
3. `useSoundEffects.ts` - 中优先级，音效系统

## store/ - Zustand状态管理目录

### 功能说明
使用Zustand管理全局状态，包括UI、内容、用户状态

### 文件分工
- `uiStore.ts` - UI状态（语言、导航、滚动等）
- `contentStore.ts` - 内容状态（照片、文章、日记）
- `userStore.ts` - 用户状态（认证、点赞、成就）

### 文件间关联逻辑
- Store之间相对独立，通过组件组合使用
- Store在组件中通过 `useXxxStore()` hook引用
- Store状态通过actions修改

### 核心功能模块分布
- UI状态: `uiStore.ts`
- 内容管理: `contentStore.ts`
- 用户认证: `userStore.ts`

### 关键文件优先级
1. `userStore.ts` - 高优先级，用户相关功能
2. `contentStore.ts` - 高优先级，内容展示
3. `uiStore.ts` - 中优先级，UI状态

## constants/ - 常量定义目录

### 功能说明
定义项目中使用的常量，确保代码可维护性

### 文件分工
- `colors.ts` - 色彩体系常量
- `typography.ts` - 字体排版常量
- `easterEggs.ts` - 彩蛋配置常量
- `animation.ts` - 动画配置常量

### 文件间关联逻辑
- 常量被多个文件引用
- 常量之间相互独立
- 修改常量会影响所有引用处

### 核心功能模块分布
- 设计规范: `colors.ts`, `typography.ts`
- 彩蛋配置: `easterEggs.ts`
- 动画参数: `animation.ts`

### 关键文件优先级
1. `colors.ts` - 高优先级，设计基础
2. `easterEggs.ts` - 高优先级，彩蛋系统
3. `animation.ts` - 中优先级，动画效果

## utils/ - 工具函数目录

### 功能说明
提供纯函数工具，不依赖React

### 文件分工
- `audio.ts` - 音效工具类
- `format.ts` - 格式化工具函数

### 文件间关联逻辑
- 工具函数被多个文件引用
- 工具函数之间相对独立
- 工具函数不依赖React

### 核心功能模块分布
- 音效生成: `audio.ts`
- 日期格式化: `format.ts`

### 关键文件优先级
1. `audio.ts` - 高优先级，音效系统
2. `format.ts` - 中优先级，工具函数

## public/ - 静态资源目录

### 功能说明
存放静态资源文件，如图片、音效等

### 文件分工
- `images/` - 图片资源
- `sounds/` - 音效资源（预留）

### 文件间关联逻辑
- 静态资源通过 `/` 路径引用
- 资源文件独立存在

### 核心功能模块分布
- 图片展示: `images/`
- 音效播放: `sounds/`

### 关键文件优先级
1. `images/` - 高优先级，内容展示
2. `sounds/` - 中优先级，音效系统

## 修改注意事项

### 修改 `app/layout.tsx` 时
- 需同步检查所有页面的布局是否正常
- 可能影响导航栏和星空背景的显示

### 修改 `components/effects/StarField.tsx` 时
- 需同步检查星空动画性能
- 可能影响所有页面的视觉效果

### 修改 `hooks/useEasterEggs.ts` 时
- 需同步检查所有彩蛋触发逻辑
- 可能影响彩蛋功能的正常工作

### 修改 `store/userStore.ts` 时
- 需同步检查所有使用用户状态的组件
- 可能影响认证、点赞等功能

### 修改 `constants/colors.ts` 时
- 需同步检查所有使用颜色的组件
- 可能影响整体设计风格

### 修改 `utils/audio.ts` 时
- 需同步检查所有音效播放逻辑
- 可能影响音效系统的正常工作
