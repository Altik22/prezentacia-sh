import React from 'react';
import { ChevronLeft, ChevronRight, Wind, Keyboard } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SlideControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  isMotionBlurActive: boolean;
  onToggleMotionBlur: () => void;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  isMotionBlurActive,
  onToggleMotionBlur,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <div
      id="slide-controls-dock"
      className="w-full px-4 sm:px-10 py-3.5 flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl bg-[#FCFBF9]/85 border-t border-[#1A1A1A]/5 shadow-[0_-4px_30px_rgba(255,209,220,0.15)] sticky bottom-0 z-20"
    >
      {/* Left: Futuristic Slide Transition Motion Blur indicator */}
      <div className="flex items-center gap-3">
        <button
          id="btn-toggle-motion-blur"
          onClick={() => {
            soundManager.playToggleClick();
            onToggleMotionBlur();
          }}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            isMotionBlurActive
              ? 'bg-white/80 border-[#FFD1DC] text-[#1A1A1A] shadow-2xs'
              : 'bg-white/40 border-[#1A1A1A]/10 text-[#555555]'
          }`}
          title="Слайд ауысуы кезіндегі футуристік қозғалыс эффектісін қосу/өшіру"
        >
          <Wind
            className={`w-3.5 h-3.5 ${
              isMotionBlurActive ? 'text-[#FF92A5] animate-pulse' : 'text-[#555555]'
            }`}
          />
          <span>Футуристік қозғалыс (Motion Blur)</span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isMotionBlurActive ? 'bg-[#FF92A5] ring-2 ring-[#FFD1DC]' : 'bg-slate-300'
            }`}
          />
        </button>

        {/* Keyboard shortcut hint */}
        <div
          id="keyboard-shortcuts-hint"
          className="hidden md:flex items-center gap-1 text-[11px] text-[#555555] font-medium"
        >
          <Keyboard className="w-3 h-3 text-[#555555]" />
          <span>Пернелер:</span>
          <kbd className="px-2 py-0.5 rounded-md bg-white/80 border border-[#1A1A1A]/10 font-mono text-[10px] text-[#1A1A1A]">
            ←
          </kbd>
          <kbd className="px-2 py-0.5 rounded-md bg-white/80 border border-[#1A1A1A]/10 font-mono text-[10px] text-[#1A1A1A]">
            →
          </kbd>
          <span className="text-[#1A1A1A]/20">•</span>
          <kbd className="px-2 py-0.5 rounded-md bg-white/80 border border-[#1A1A1A]/10 font-mono text-[10px] text-[#1A1A1A]">
            F (Толық экран)
          </kbd>
        </div>
      </div>

      {/* Right: Sleek Navigation Arrows */}
      <div className="flex items-center gap-2.5">
        {/* Previous Button */}
        <button
          id="btn-slide-prev"
          onClick={() => {
            if (!isFirst) {
              soundManager.playSlideTransition();
              onPrev();
            }
          }}
          disabled={isFirst}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-white/70 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border-[#1A1A1A]/10 shadow-2xs active:scale-98"
        >
          <ChevronLeft className="w-4 h-4 text-[#1A1A1A]/60 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
          <span>Алдыңғы</span>
        </button>

        {/* Next Button */}
        <button
          id="btn-slide-next"
          onClick={() => {
            if (!isLast) {
              soundManager.playSlideTransition();
              onNext();
            }
          }}
          disabled={isLast}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-[#1A1A1A] hover:bg-[#333333] text-white border-transparent shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-98"
        >
          <span>Келесі</span>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
