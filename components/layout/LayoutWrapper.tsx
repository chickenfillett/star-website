'use client';

import { useEffect, useState } from 'react';
import StarField from '@/components/effects/StarField';
import EasterEggs from '@/components/effects/EasterEggs';
import CursorGlow from '@/components/effects/CursorGlow';
import ClickSparkEffect from '@/components/effects/ClickSparkEffect';
import SoundControl from '@/components/ui/SoundControl';
import DesktopNavigation from '@/components/layout/DesktopNavigation';
import MobileNavigation from '@/components/layout/MobileNavigation';
import { useResponsive } from '@/hooks/useResponsive';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsive();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <StarField />
      <EasterEggs />
      <ClickSparkEffect />
      {!isMobile && <CursorGlow />}
      <SoundControl />
      
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
      
      <main className={isMobile ? 'pb-20' : ''}>
        {children}
      </main>
    </div>
  );
}