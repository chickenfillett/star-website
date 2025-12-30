/**
 * 全局布局组件
 * 核心作用：定义网站的整体布局结构，包含星空背景、导航栏等
 * 关联界面/功能模块：所有页面
 * 依赖文件/接口：components/layout/, components/effects/, hooks/
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '星空 - 极简个人网站',
  description: '融合星空风格的极简个人网站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
