'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2Icon, VolumeXIcon } from '@/components/ui/Icons';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function SoundControl() {
  const { getVolume, toggleMute, getIsMuted, setVolume } = useSoundEffects();
  const [isOpen, setIsOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volume = getVolume();
  const isMuted = getIsMuted();

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-2 p-4 bg-black/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Volume2Icon className="w-5 h-5 text-white/70" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-32 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, rgba(100, 150, 255, 0.5) 0%, rgba(100, 150, 255, 0.5) ${volume * 100}%)`,
                }}
              />
              <span className="text-white/70 text-sm w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          toggleMute();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className="w-12 h-12 bg-black/95 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:border-white/30 transition-colors"
      >
        {isMuted ? (
          <VolumeXIcon className="w-5 h-5 text-white/70" />
        ) : (
          <Volume2Icon className="w-5 h-5 text-white/70" />
        )}
      </motion.button>
    </div>
  );
}