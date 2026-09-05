import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../types';
import { InteractiveComponentStage } from './InteractiveComponentStage';
import { MicroCardsGrid } from './MicroCardsGrid';
import { InteractiveHardwareDemos } from './InteractiveHardwareDemos';
import { Sparkles, Quote, CheckCircle2 } from 'lucide-react';

interface SlideContentProps {
  slide: SlideData;
  isMotionBlurActive: boolean;
  direction: number; // -1 for prev, 1 for next
}

export const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  isMotionBlurActive,
  direction,
}) => {
  return (
    <motion.div
      key={slide.id}
      id={`slide-viewport-${slide.slideNumber}`}
      initial={{
        opacity: 0,
        x: direction * 40,
        filter: isMotionBlurActive ? 'blur(8px)' : 'blur(0px)',
      }}
      animate={{
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        x: -direction * 40,
        filter: isMotionBlurActive ? 'blur(8px)' : 'blur(0px)',
      }}
      transition={{
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-4 sm:py-6 max-w-7xl mx-auto"
    >
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Educational Content, Kazakh Typography, Interactive Widget & Micro-cards (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
          {/* Category Eyebrow Pill */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD1DC] bg-white/60 backdrop-blur-sm text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF92A5] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF92A5]" />
              <span>{slide.categoryKz}</span>
            </div>
          </div>

          {/* Main Title & Subtitle with Editorial Typography */}
          <div>
            <h1
              id="slide-headline"
              className="text-3xl sm:text-5xl lg:text-5.5xl font-bold leading-[1.06] tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#1A1A1A] to-[#4A4A4A]"
            >
              {slide.titleKz}
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] font-medium mt-2 leading-relaxed max-w-xl">
              {slide.subTitleKz}
            </p>
          </div>

          {/* Educational Concept Summary */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/65 backdrop-blur-md border border-white/80 shadow-[0_20px_40px_-15px_rgba(255,209,220,0.3)]">
            <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
              {slide.conceptSummaryKz}
            </p>

            {/* Highlights List */}
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3.5 border-t border-[#1A1A1A]/5">
              {slide.highlightsKz.map((h, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#555555]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF92A5] shrink-0 mt-0.5" />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Formula / Axiom Box */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#FFD1DC] text-xs text-[#1A1A1A] shadow-2xs">
            <Quote className="w-4 h-4 text-[#FF92A5] shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#FF92A5] uppercase tracking-[0.15em]">
                  {slide.formulaOrQuote.badge}:
                </span>
                <span className="font-semibold text-[#1A1A1A] text-[11px]">
                  {slide.formulaOrQuote.statement}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Hardware Feature Demo Widget */}
          <InteractiveHardwareDemos demo={slide.demo} />

          {/* Floating Micro-Cards with Technical Specs */}
          <MicroCardsGrid cards={slide.microCards} />
        </div>

        {/* Right Column: 3D Floating Component Stage with Hotspots (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <InteractiveComponentStage
            imageSrc={slide.imageSrc}
            imageAlt={slide.imageAlt}
            componentTitleKz={slide.titleKz}
            hotspots={slide.hotspots}
          />
        </div>
      </div>
    </motion.div>
  );
};
