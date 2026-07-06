# 个人网站重构与优化 Spec

## Why

这是用户去年 11 月初学代码时制作的第一个网站。回头看存在多个核心问题：图片体积过大导致加载缓慢、音频系统损坏无法播放、首页星空背景缺失、光标跟随特效丑陋、私域系统冗余、自定义 SVG 图标设计粗糙、首页残留过时圣诞文案。需要本次重构让网站达到可用、美观、流畅的状态。

## What Changes

### 图片资源优化
- 将 `public/image/` 下所有 JPG 图片（共 65 张：`6.jpg` ~ `66.jpg` + `photo1.jpg` ~ `photo5.jpg`）转换为 WebP 格式
- 每张压缩至 5~20KB 区间（使用 cwebp 或 sharp，质量参数自适应）
- 删除原始 JPG 文件，仅保留 WebP
- 更新 `app/photography/page.tsx` 中所有图片路径引用（`/image/xxx.jpg` → `/image/xxx.webp`）
- 更新 `components/photography/PhotoCard.tsx` 及 `app/photography/[id]/page.tsx` 中的图片引用

### 音频系统修复与优化
- 检查并修复 `store/audioStore.ts` 中音频播放错误（`toggleAudio` 状态管理、`ended` 事件链、自动播放策略）
- 优化 `public/music/` 下三首 MP3 文件体积（`636015887.mp3`、`Kaori - 刚好遇见你.mp3`、`我记得.mp3`）
- 转码为低码率（建议 64kbps 以下，单文件目标 < 2MB）
- 实现合理的自动播放策略：浏览器策略允许时自动播放，否则在用户首次交互后播放
- 确保三首音乐可正常切换、循环、暂停/恢复

### 首页星空背景修复
- 修复 `components/effects/StarField.tsx`，确保 canvas 正确挂载并显示在背景层
- 实现静态星光闪烁效果（粒子大小、闪烁周期、透明度变化）
- 实现流星划过效果（轨迹、渐变、随机生成间隔）
- 确保 z-index 与全屏覆盖正确（不遮挡内容、不被遮挡）
- 确认 `components/layout/LayoutWrapper.tsx` 中 StarField 正常渲染

### 删除光标跟随特效
- 删除 `components/effects/CursorGlow.tsx` 文件
- 从 `components/layout/LayoutWrapper.tsx` 中移除 CursorGlow 引入与渲染
- 移除 `components/effects/EasterEggs.tsx` 中 `cursorTrail` 彩蛋渲染分支
- 移除 `constants/easterEggs.ts` 中 `cursorTrail` 配置项
- 移除 `hooks/useEasterEggs.ts` 中相关 cursorTrail 逻辑（如有）

### 删除私域系统
- 删除 `app/private/` 目录（如存在）
- 从 `constants/navigation.ts` 中移除 `PRIVATE_NAV_ITEMS`
- 从 `components/layout/MobileNavigation.tsx` 中移除私域导航项与 `/private` 标签
- 从 `components/layout/DesktopNavigation.tsx` 中移除私域锁图标入口
- 从 `README.md` 中移除私域相关说明（如私域访问密码部分）
- 移除 `components/ui/Icons.tsx` 中 `LockIcon`（若不再使用）

### 替换丑陋的 SUV 图标
- 重写 `components/ui/Icons.tsx` 中设计错误的 SVG 路径，特别是 `SparklesIcon`（当前路径 `M12 3v10l-1-1 3-3 5 2-2 5 1-1 4 4h-9` 不是合理的 sparkles 形状）
- 重写其他可能造型粗糙的图标（FlameIcon 等），确保所有图标符合 Lucide / Feather 风格
- 保留图标 API（`{ className }: IconProps`）不变，仅修正 SVG 内部路径

### 首页文案更新
- 修改 `app/page.tsx` 中 "Merry Christmas" 文案，替换为与季节无关的中性欢迎语（例如"愿繁星照亮你的夜空"或"星河璀璨，欢迎到来"）
- 调整副标题文案使其与整体极简星空主题一致

## Impact

### 受影响范围
- **图片资源**：`public/image/` 全部 65 张图片 + 4 处引用代码
- **音频资源与逻辑**：`public/music/` 3 首音频 + `store/audioStore.ts` + `app/photography/page.tsx` + `app/photography/[id]/page.tsx`
- **特效组件**：`components/effects/StarField.tsx`、`components/effects/CursorGlow.tsx`、`components/effects/EasterEggs.tsx`
- **布局组件**：`components/layout/LayoutWrapper.tsx`、`DesktopNavigation.tsx`、`MobileNavigation.tsx`
- **常量**：`constants/navigation.ts`、`constants/easterEggs.ts`
- **图标库**：`components/ui/Icons.tsx`
- **首页**：`app/page.tsx`
- **README**：`README.md`

### 兼容性影响
- 删除 CursorGlow、私域系统属于**BREAKING**，但用户明确要求删除，不影响对外承诺功能
- 图片格式从 JPG → WebP 不影响现代浏览器支持（Chrome/Firefox/Safari/Edge 均支持）

## ADDED Requirements

### Requirement: 图片资源 WebP 化
系统 SHALL 将 `public/image/` 目录下所有 JPG 图片转换为 WebP 格式，每张文件大小控制在 5KB 至 20KB 区间。

#### Scenario: 转换成功
- **WHEN** 执行转换脚本
- **THEN** `public/image/` 下不再有 `.jpg` 文件
- **AND** 所有原始图片都有对应的 `.webp` 文件
- **AND** 每个 `.webp` 文件大小在 5KB ~ 20KB 区间

#### Scenario: 引用同步更新
- **WHEN** 转换完成
- **THEN** 代码中所有 `/image/xxx.jpg` 引用更新为 `/image/xxx.webp`
- **AND** 摄影列表页、详情页、PhotoCard 组件图片正常加载

### Requirement: 星空背景可见且具备动效
系统 SHALL 在所有页面渲染纯黑底色之上的星空背景，包含静态闪烁星光和随机流星划过效果。

#### Scenario: 首次加载显示星空
- **WHEN** 用户进入任意页面
- **THEN** 背景出现 ≥ 80 颗静态星光
- **AND** 星光按周期透明度变化（闪烁）
- **AND** 每隔 3-10 秒随机出现一颗流星划过

#### Scenario: 星空不遮挡内容
- **WHEN** 星空渲染
- **THEN** 星空层 `pointer-events: none` 且 z-index 为负值
- **AND** 前景内容可正常交互

### Requirement: 音频自动播放与手动控制
系统 SHALL 在用户首次交互后自动播放背景音乐，并提供播放/暂停/切换轨道控件。

#### Scenario: 自动播放
- **WHEN** 页面加载且用户首次发生 click/touch/keydown 事件
- **THEN** 第一首音乐自动播放
- **AND** `isPlaying` 状态变为 true

#### Scenario: 切换轨道
- **WHEN** 当前音乐播放结束
- **THEN** 自动播放下一首（循环到第一首）
- **AND** `currentTrackIndex` 正确更新

#### Scenario: 手动控制
- **WHEN** 用户点击音乐控制按钮
- **THEN** 在播放/暂停状态之间切换
- **AND** 状态正确反映到 UI

### Requirement: 首页中性欢迎文案
系统 SHALL 在首页显示与季节无关的中文欢迎语。

#### Scenario: 显示文案
- **WHEN** 用户访问首页
- **THEN** 显示中性欢迎语（如"星河璀璨，欢迎到来"）
- **AND** 不再显示 "Merry Christmas" 字样

## MODIFIED Requirements

### Requirement: 移动端导航项
移动端底部导航 SHALL 仅包含首页、摄影作品、观点分享、关于我 四个入口，不再包含私域入口。

### Requirement: 桌面端导航项
桌面端顶部导航 SHALL 仅包含 Logo、四个主入口、语言切换；移除私域锁图标入口。

### Requirement: 图标设计规范
`components/ui/Icons.tsx` 中所有图标 SHALL 采用符合 Lucide / Feather 风格的 SVG 路径，遵循 24×24 viewBox、strokeWidth 2、stroke-linecap round、stroke-linejoin round 规范。

## REMOVED Requirements

### Requirement: 光标跟随特效
**Reason**: 用户认为该特效丑陋、影响观感
**Migration**: 直接删除组件文件与所有引用，无替代方案

### Requirement: 私域系统
**Reason**: 用户要求彻底移除该功能
**Migration**: 删除 `app/private/` 目录与所有导航入口、`PRIVATE_NAV_ITEMS` 常量、`README.md` 中私域说明。涉及密码 `123456` 的内容全部废弃。

### Requirement: cursorTrail 彩蛋
**Reason**: 依赖已删除的光标跟随特效
**Migration**: 从 `constants/easterEggs.ts` 与 `EasterEggs.tsx` 中移除该彩蛋分支
