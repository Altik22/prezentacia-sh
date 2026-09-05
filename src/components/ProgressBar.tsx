import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';

interface ProgressBarProps {
  currentIndex: number;
  totalSlides: number;
  autoplayProgress?: number; // 0 to 100
  isAutoplay: boolean;
  onSelectSlide: (index: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalSlides,
  autoplayProgress = 0,
  isAutoplay,
  onSelectSlide,
}) => {
  // Percentage calculated from current slide index
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <div id="presentation-progress-section" className="w-full relative px-4 sm:px-10 py-2.5 z-20">
      {/* Container track with editorial gradient */}
      <div className="relative h-1.5 w-full bg-[#1A1A1A]/10 rounded-full overflow-hidden backdrop-blur-xs">
        {/* Main slide completion progress: #FFD1DC to #B9E9FF with #FF92A5 middle */}
        <motion.div
          id="slide-progress-fill"
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#FFD1DC] via-[#FF92A5] to-[#B9E9FF] shadow-[0_0_12px_rgba(255,146,165,0.4)]"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        />

        {/* Autoplay timer micro-progress line */}
        {isAutoplay && (
          <div
            id="autoplay-timer-indicator"
            className="absolute top-0 left-0 h-full bg-white/60 pointer-events-none transition-all duration-100 ease-linear"
            style={{ width: `${autoplayProgress}%` }}
          />
        )}
      </div>

      {/* Editorial segmented steps with numbers */}
      <div className="flex justify-between items-center mt-2 px-0.5">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentIndex;
          const isPassed = idx < currentIndex;
          const numStr = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={idx}
              id={`progress-milestone-step-${numStr}`}
              onClick={() => {
                soundManager.playSlideTransition();
                onSelectSlide(idx);
              }}
              className="group flex items-center gap-2 focus:outline-hidden cursor-pointer"
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-10 sm:w-14 bg-[#1A1A1A]'
                    : isPassed
                    ? 'w-6 sm:w-8 bg-[#FF92A5]'
                    : 'w-6 sm:w-8 bg-[#1A1A1A]/10 group-hover:bg-[#1A1A1A]/25'
                }`}
              />
              <span
                className={`text-[10px] font-mono tracking-wider transition-colors ${
                  isActive
                    ? 'text-[#1A1A1A] font-bold'
                    : isPassed
                    ? 'text-[#FF92A5] font-semibold'
                    : 'text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/60'
                }`}
              >
                {numStr}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
