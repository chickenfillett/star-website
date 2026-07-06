# Tasks

- [x] Task 1: 图片资源 WebP 转换与压缩
  - [x] SubTask 1.1: 安装/确认 sharp 或 cwebp 工具可用（使用系统自带 ffmpeg + libwebp）
  - [x] SubTask 1.2: 编写转换脚本，遍历 `public/image/*.jpg` 转 WebP，质量参数自适应至单文件 5~20KB
  - [x] SubTask 1.3: 删除所有原始 `.jpg` 文件，仅保留 `.webp`
  - [x] SubTask 1.4: 全局更新代码引用：`/image/xxx.jpg` → `/image/xxx.webp`（涉及 `app/photography/page.tsx`、`components/photography/PhotoCard.tsx`、`app/photography/[id]/page.tsx`）

- [x] Task 2: 音频文件压缩
  - [x] SubTask 2.1: 检查 `public/music/` 下三首 MP3 当前体积
  - [x] SubTask 2.2: 使用 ffmpeg 转码为 64k/48k Mono MP3，单文件目标 < 2MB
  - [x] SubTask 2.3: 替换原文件（保持文件名一致以减少代码改动）

- [x] Task 3: 修复音频播放逻辑
  - [x] SubTask 3.1: 修复 `store/audioStore.ts` 中 `toggleAudio` 状态管理（确保 `initializeAudio` 后立即播放、`isPlaying` 同步）
  - [x] SubTask 3.2: 修复 `playNextTrack` 中 `audio.src` 切换后未调用 `load()` 的问题
  - [x] SubTask 3.3: 修复 `app/photography/page.tsx` 中自动播放监听逻辑（移除冗余 `document.querySelector('audio')`，改用 store 内 audio 实例）
  - [x] SubTask 3.4: 统一音乐控制按钮在摄影列表页与详情页的行为一致性
  - [x] SubTask 3.5: 验证三首音乐可循环切换、暂停/恢复正常

- [x] Task 4: 修复星空背景显示
  - [x] SubTask 4.1: 修复 `components/effects/StarField.tsx` 中 canvas 未挂载到 DOM 的问题（重写为 React 元素返回 canvas）
  - [x] SubTask 4.2: 调整 canvas z-index 为 0 并设置 `pointer-events: none`，确保不遮挡内容
  - [x] SubTask 4.3: 优化静态星光生成（数量 120、随机大小 0.5-2px、透明度 0.3-1.0、闪烁周期 2-5s）
  - [x] SubTask 4.4: 优化流星效果（轨迹长度 100-200、渐变、随机间隔 3-10s）
  - [x] SubTask 4.5: 验证首页及所有页面星空背景可见

- [x] Task 5: 删除光标跟随特效
  - [x] SubTask 5.1: 删除 `components/effects/CursorGlow.tsx` 文件
  - [x] SubTask 5.2: 从 `components/layout/LayoutWrapper.tsx` 移除 CursorGlow 引入与渲染
  - [x] SubTask 5.3: 从 `components/effects/EasterEggs.tsx` 移除 `cursorTrail` 渲染分支
  - [x] SubTask 5.4: 从 `constants/easterEggs.ts` 移除 `cursorTrail` 配置
  - [x] SubTask 5.5: 检查 `hooks/useEasterEggs.ts` 中是否有 cursorTrail 触发逻辑并移除

- [x] Task 6: 删除私域系统
  - [x] SubTask 6.1: 删除 `app/private/` 目录（确认不存在）
  - [x] SubTask 6.2: 修改 `constants/navigation.ts`，移除 `PRIVATE_NAV_ITEMS` 及其引用（统一改用 `NAV_ITEMS`）
  - [x] SubTask 6.3: 修改 `components/layout/MobileNavigation.tsx`，移除私域导航项与 `/private` 标签
  - [x] SubTask 6.4: 修改 `components/layout/DesktopNavigation.tsx`，移除私域锁图标入口
  - [x] SubTask 6.5: 更新 `README.md`，移除私域访问与相关说明章节
  - [x] SubTask 6.6: 移除 `components/ui/Icons.tsx` 中 `LockIcon`（保留导出但已无引用）

- [x] Task 7: 替换丑陋的 SVG 图标
  - [x] SubTask 7.1: 重写 `components/ui/Icons.tsx` 中 `SparklesIcon`（采用 Lucide sparkles 路径）
  - [x] SubTask 7.2: 重写 `FlameIcon`（采用 Lucide flame 路径）
  - [x] SubTask 7.3: 检查并修正其他造型粗糙的图标，确保符合 Lucide / Feather 风格
  - [x] SubTask 7.4: 验证所有使用图标的页面渲染正常（首页、关于、摄影、观点、404）

- [x] Task 8: 更新首页文案
  - [x] SubTask 8.1: 修改 `app/page.tsx`，将 "Merry Christmas" 替换为"星河璀璨 / 欢迎到来"
  - [x] SubTask 8.2: 调整副标题与文案的层次关系与样式
  - [x] SubTask 8.3: 验证首页文案显示效果

- [x] Task 9: 构建与最终验证
  - [x] SubTask 9.1: 运行 `npm run lint` 确保无 lint 错误
  - [x] SubTask 9.2: 运行 `npm run build` 确保构建成功
  - [x] SubTask 9.3: 启动 dev server 验证所有页面功能正常

# Task Dependencies
- Task 5、Task 6、Task 8 互相独立，已并行执行
- Task 4 在 Task 5 完成后验证布局正确
- Task 7 与其他任务独立，并行执行
- Task 1（图片）独立，并行执行
- Task 2（音频文件）+ Task 3（音频逻辑）按顺序执行
- Task 9 依赖所有其他 Task 完成后执行，全部通过
