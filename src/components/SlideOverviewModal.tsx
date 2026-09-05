import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Sparkles } from 'lucide-react';
import { SlideData } from '../types';
import { soundManager } from '../utils/audio';

interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="slide-overview-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          id="slide-overview-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#FCFBF9] backdrop-blur-2xl border border-[#B9E9FF] shadow-[0_24px_60px_rgba(185,233,255,0.35)] p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B9E9FF]/40 border border-[#B9E9FF] flex items-center justify-center text-sky-800 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-sky-800 uppercase tracking-[0.2em]">
                  Презентация құрылымы • 5 Слайд
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  Дәріс слайдтарының шолуы
                </h3>
              </div>
            </div>

            <button
              id="btn-close-overview"
              onClick={() => {
                soundManager.playToggleClick();
                onClose();
              }}
              className="p-2 rounded-full text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid of slides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;

              return (
                <div
                  key={slide.id}
                  id={`overview-slide-card-${slide.slideNumber}`}
                  onClick={() => {
                    soundManager.playSlideTransition();
                    onSelectSlide(idx);
                    onClose();
                  }}
                  className={`group relative rounded-3xl p-3.5 border transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-white border-[#FFD1DC] ring-2 ring-[#FFD1DC] shadow-md'
                      : 'bg-white/70 hover:bg-white border-[#1A1A1A]/10 hover:border-[#B9E9FF] shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Image preview box */}
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3 bg-[#FCFBF9] border border-[#1A1A1A]/5">
                    <img
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#1A1A1A]/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold">
                      {slide.slideNumber}
                    </span>
                    {isActive && (
                      <span className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-semibold shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 text-[#FFD1DC]" />
                        Ағымдағы
                      </span>
                    )}
                  </div>

                  {/* Title & category */}
                  <span className="text-[10px] uppercase font-bold text-[#FF92A5] tracking-[0.15em] block truncate">
                    {slide.categoryKz}
                  </span>
                  <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF92A5] transition-colors truncate">
                    {slide.titleKz}
                  </h4>
                  <p className="text-[11px] text-[#555555] line-clamp-2 mt-1 leading-relaxed">
                    {slide.conceptSummaryKz}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
