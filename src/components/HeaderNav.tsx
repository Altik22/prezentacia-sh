import React from 'react';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Grid,
  FileText,
  Sparkles,
  Mic,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderNavProps {
  currentSlideIndex: number;
  totalSlides: number;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSpeakerNotes: () => void;
  onOpenOverview: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSlideIndex,
  totalSlides,
  isAutoplay,
  onToggleAutoplay,
  isFullscreen,
  onToggleFullscreen,
  isMuted,
  onToggleMute,
  onOpenSpeakerNotes,
  onOpenOverview,
}) => {
  const currentNumStr = String(currentSlideIndex + 1).padStart(2, '0');
  const totalNumStr = String(totalSlides).padStart(2, '0');

  return (
    <header
      id="header-navigation-bar"
      className="w-full px-4 sm:px-10 py-4 flex items-center justify-between backdrop-blur-xl bg-[#FCFBF9]/85 border-b border-[#1A1A1A]/5 shadow-[0_4px_30px_rgba(255,209,220,0.15)] sticky top-0 z-30 transition-all duration-300"
    >
      {/* Left: Lesson title and Presenter badge */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Editorial Course Headline */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF92A5] mb-0.5">
            Ғылыми Дәріс
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#1A1A1A]">
            Компьютерлік Архитектура
          </span>
        </div>

        {/* Presenter info pill */}
        <div
          id="presenter-badge"
          className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#FFD1DC] shadow-2xs"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD1DC]/40 border border-[#FF92A5] text-[#FF92A5] text-[10px] font-bold">
            АС
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#FCFBF9]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
              Айзере Сәбитқызы
            </span>
            <span className="text-[10px] text-[#555555] font-medium flex items-center gap-1">
              <Mic className="w-2.5 h-2.5 text-[#FF92A5]" />
              Спикер • Информатика
            </span>
          </div>
        </div>

        {/* System block badge */}
        <div
          id="lesson-topic-tag"
          className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-[#B9E9FF] text-[#1A1A1A] text-xs font-medium"
        >
          <div className="w-2 h-2 rounded-full bg-[#B9E9FF]" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1A1A1A]/80">
            Жүйелік блок
          </span>
        </div>
      </div>

      {/* Center: Editorial Slide Counter "01 / 05" in Serif Italic */}
      <div
        id="slide-counter-container"
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#FFD1DC] shadow-2xs"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FF92A5]">Слайд</span>
        <div className="font-editorial-serif italic text-lg sm:text-xl font-normal text-[#1A1A1A]/70 flex items-center gap-1">
          <span className="text-[#1A1A1A] font-semibold not-italic font-sans text-sm sm:text-base">
            {currentNumStr}
          </span>
          <span className="text-[#1A1A1A]/30">/</span>
          <span className="text-xs sm:text-sm font-sans text-[#555555]">{totalNumStr}</span>
        </div>
      </div>

      {/* Right: Controls (Speaker Notes, Overview, Autoplay, Mute, Fullscreen) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Slides Overview Grid Button */}
        <button
          id="btn-slides-overview"
          onClick={() => {
            soundManager.playToggleClick();
            onOpenOverview();
          }}
          title="Барлық слайдтар шолуы"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1A1A1A] bg-white/60 hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A]/10 transition-all shadow-2xs cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5 text-[#FF92A5]" />
          <span className="hidden xl:inline">Слайдтар</span>
        </button>

        {/* Speaker Notes Button */}
        <button
          id="btn-speaker-notes"
          onClick={() => {
            soundManager.playToggleClick();
            onOpenSpeakerNotes();
          }}
          title="Спикер жазбалары мен сұрақтары"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1A1A1A] bg-white/60 hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A]/10 transition-all shadow-2xs cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#FF92A5]" />
          <span className="hidden xl:inline">Спикер жазбалары</span>
        </button>

        {/* Autoplay toggle */}
        <button
          id="btn-toggle-autoplay"
          onClick={() => {
            soundManager.playToggleClick();
            onToggleAutoplay();
          }}
          title={isAutoplay ? 'Авто-өткізуді тоқтату' : 'Авто-өткізуді қосу'}
          className={`p-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isAutoplay
              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
              : 'bg-white/60 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border-[#1A1A1A]/10'
          }`}
        >
          {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Sound FX Mute toggle */}
        <button
          id="btn-toggle-sound"
          onClick={onToggleMute}
          title={isMuted ? 'Дыбысты қосу' : 'Дыбысты өшіру'}
          className="p-2 rounded-full text-xs font-medium bg-white/60 hover:bg-slate-100 text-[#1A1A1A] border border-[#1A1A1A]/10 transition-all cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#1A1A1A]/40" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
          )}
        </button>

        {/* Fullscreen toggle */}
        <button
          id="btn-toggle-fullscreen"
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Толық экраннан шығу' : 'Толық экран режимі (F)'}
          className="p-2 rounded-full text-xs font-medium bg-white/60 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-[#1A1A1A]/10 transition-all cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5 text-[#FF92A5]" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
          )}
        </button>
      </div>
    </header>
  );
};
