import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotspot } from '../types';
import { Sparkles, Info, X, ChevronRight, Layers } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InteractiveComponentStageProps {
  imageSrc: string;
  imageAlt: string;
  componentTitleKz: string;
  hotspots: Hotspot[];
}

export const InteractiveComponentStage: React.FC<InteractiveComponentStageProps> = ({
  imageSrc,
  imageAlt,
  componentTitleKz,
  hotspots,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const handleHotspotClick = (hotspot: Hotspot) => {
    soundManager.playHotspotPing();
    if (selectedHotspot?.id === hotspot.id) {
      setSelectedHotspot(null);
    } else {
      setSelectedHotspot(hotspot);
    }
  };

  return (
    <div
      id="interactive-3d-component-stage"
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none"
    >
      {/* Background ambient radial glow orbs (Soft pastel pink & icy blue) */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl -top-10 -left-10 pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, #FFD1DC 0%, transparent 70%)' }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, #B9E9FF 0%, transparent 70%)' }}
      />

      {/* Floating 3D Component Frame with Editorial Shadow and Rounded Corners */}
      <motion.div
        className="relative w-full max-w-[440px] aspect-square flex items-center justify-center p-3 sm:p-4 rounded-[40px] sm:rounded-[48px] backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_40px_80px_-20px_rgba(255,209,220,0.4)]"
        animate={{
          y: [-6, 6, -6],
          rotateZ: [-0.6, 0.6, -0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
      >
        {/* The 3D Render Image */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-inner group">
          <img
            id="floating-component-3d-image"
            src={imageSrc}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-3xl transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gentle glossy overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD1DC]/10 via-transparent to-[#B9E9FF]/15 pointer-events-none" />

          {/* Interactive Glowing Hotspots */}
          {hotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                id={`hotspot-${hotspot.id}`}
                style={{
                  top: `${hotspot.yPercent}%`,
                  left: `${hotspot.xPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => handleHotspotClick(hotspot)}
                  aria-label={hotspot.titleKz}
                  className="relative group/btn flex items-center justify-center w-8 h-8 rounded-full cursor-pointer focus:outline-hidden"
                >
                  {/* Glowing pulsing ripple rings */}
                  <span className="absolute inset-0 rounded-full bg-[#FF92A5] opacity-75 animate-ping duration-1000" />
                  <span className="absolute -inset-1 rounded-full bg-[#B9E9FF]/50 blur-xs" />

                  {/* Core interactive node */}
                  <span
                    className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-[#1A1A1A] border-white text-white scale-125 ring-4 ring-[#FFD1DC]'
                        : 'bg-white/95 border-[#B9E9FF] text-[#1A1A1A] hover:bg-pink-50 hover:scale-110'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF92A5]" />
                  </span>

                  {/* Hover tooltip label */}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/btn:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] font-medium whitespace-nowrap shadow-lg pointer-events-none z-30">
                    <Sparkles className="w-3 h-3 text-[#FF92A5]" />
                    <span>{hotspot.titleKz}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Micro-Card Popover */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              id="hotspot-detail-card"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute -bottom-8 sm:-bottom-12 left-4 right-4 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-3xl backdrop-blur-xl bg-white/95 border border-[#FFD1DC] shadow-[0_20px_50px_rgba(255,209,220,0.25)] z-30"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-full bg-[#FFD1DC]/40 text-[#FF92A5]">
                    <Info className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#FF92A5]">
                      {selectedHotspot.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">
                      {selectedHotspot.titleKz}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 rounded-full text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#555555] mb-3 leading-relaxed">
                {selectedHotspot.shortDesc}
              </p>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#1A1A1A]/5">
                <span className="font-mono text-[11px] font-semibold text-[#1A1A1A] bg-[#B9E9FF]/40 px-3 py-1 rounded-full border border-[#B9E9FF]">
                  {selectedHotspot.techSpec}
                </span>
                <span className="text-[11px] text-[#FF92A5] font-semibold flex items-center gap-0.5">
                  Талдау аяқталды
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top-Right Badge: 3D Visualization */}
        <div
          id="badge-3d-model"
          className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#B9E9FF] text-[#1A1A1A] text-[11px] font-semibold shadow-xs"
        >
          <Layers className="w-3 h-3 text-[#FF92A5]" />
          <span>3D Рендер • 8K</span>
        </div>

        {/* Bottom-Left Hint */}
        <div
          id="badge-hotspot-hint"
          className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#FFD1DC] text-[#1A1A1A] text-[11px] font-medium shadow-xs pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF92A5] animate-ping" />
          <span className="text-[#FF92A5] font-semibold">Нүктелерді басыңыз</span>
        </div>
      </motion.div>
    </div>
  );
};
