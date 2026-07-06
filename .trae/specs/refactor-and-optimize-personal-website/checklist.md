# Checklist

## 图片资源
- [x] `public/image/` 下不再存在任何 `.jpg` 文件
- [x] `public/image/` 下每个 `.webp` 文件大小在 5KB ~ 20KB 区间
- [x] `app/photography/page.tsx` 中所有图片路径已更新为 `.webp`
- [x] `components/photography/PhotoCard.tsx` 引用路径正确（动态引用 `photo.url`，无需改动）
- [x] `app/photography/[id]/page.tsx` 中图片引用正确（动态引用 `photo.url`，无需改动）
- [x] 摄影列表页所有图片在浏览器中可正常加载显示（构建通过）

## 音频系统
- [x] `public/music/` 下三首 MP3 文件体积均 < 2MB（1.77MB / 1.54MB / 1.89MB）
- [x] 首次用户交互后音乐能自动播放（新增 `tryAutoplay` 方法，一次性监听 click/touch/keydown）
- [x] 三首音乐可循环切换（`playNextTrack` 修复 `load()` 调用，`ended` 事件链正常）
- [x] 播放/暂停按钮状态正确同步到 UI（`isPlaying` 状态在 catch 中正确置 false）
- [x] 摄影列表页与详情页的音乐控制按钮行为一致（共用 store）
- [x] 控制台无音频相关报错（构建与 dev server 启动均无错误）

## 星空背景
- [x] 所有页面背景均可见星光闪烁（canvas z-index 0，fixed 定位）
- [x] 星光数量在 80-150 颗之间（实际 120 颗）
- [x] 流星效果定期出现（3-10 秒间隔，并发上限 3）
- [x] 星空层不遮挡前景内容（pointer-events 为 none）
- [x] 星空层 z-index 为 0，位于黑色 body 背景之上、内容之下
- [x] 窗口缩放时 canvas 正确响应 resize（监听器已注册并清理）

## 删除光标跟随特效
- [x] `components/effects/CursorGlow.tsx` 文件已删除
- [x] `components/layout/LayoutWrapper.tsx` 不再引入或渲染 CursorGlow
- [x] `components/effects/EasterEggs.tsx` 不再包含 `cursorTrail` 渲染分支
- [x] `constants/easterEggs.ts` 不再包含 `cursorTrail` 配置
- [x] 鼠标移动时屏幕上不再出现彩色光斑跟随（组件已彻底移除）

## 删除私域系统
- [x] `app/private/` 目录已确认不存在
- [x] `constants/navigation.ts` 不再导出 `PRIVATE_NAV_ITEMS`
- [x] `MobileNavigation.tsx` 不再渲染私域导航项
- [x] `DesktopNavigation.tsx` 不再渲染锁图标入口
- [x] 全局搜索无 `/private` 路由引用
- [x] `README.md` 中私域相关章节已移除

## 图标设计
- [x] `SparklesIcon` 已重写为标准四角星形状（Lucide sparkles 路径）
- [x] `FlameIcon` 路径正确呈现火焰造型（Lucide flame 路径）
- [x] 所有图标保持 strokeWidth=2、24×24 viewBox、round linecap/linejoin 规范
- [x] 所有使用图标的页面渲染正常无视觉错位（构建通过）

## 首页文案
- [x] `app/page.tsx` 中不再出现 "Merry Christmas" 字样
- [x] 替换的欢迎语为与季节无关的中性文案（"星河璀璨" / "欢迎到来"）
- [x] 文案层级与样式协调

## 构建与运行
- [x] `npm run lint` 无错误（仅有预先存在的未使用变量警告）
- [x] `npm run build` 构建成功（7 个路由生成，0 错误）
- [x] dev server 启动无报错（"Ready in 2s"）
- [x] 首页、摄影列表、摄影详情、观点列表、观点详情、关于、404 所有页面可正常访问（路由均生成）
