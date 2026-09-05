import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, MessageSquare, CheckCircle, HelpCircle, BookOpen } from 'lucide-react';
import { SlideData } from '../types';
import { soundManager } from '../utils/audio';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: SlideData;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="speaker-notes-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          id="speaker-notes-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FCFBF9] backdrop-blur-2xl border border-[#FFD1DC] shadow-[0_24px_60px_rgba(255,209,220,0.3)] p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD1DC]/50 border border-[#FF92A5] flex items-center justify-center text-[#FF92A5] shadow-xs">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#FF92A5] uppercase tracking-[0.2em]">
                  Баяндамашыға арналған нұсқаулық • Слайд {currentSlide.slideNumber}
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {currentSlide.titleKz}
                </h3>
              </div>
            </div>

            <button
              id="btn-close-speaker-notes"
              onClick={() => {
                soundManager.playToggleClick();
                onClose();
              }}
              className="p-2 rounded-full text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {/* Speech Intro Prompt */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#FFD1DC]">
              <div className="flex items-center gap-2 mb-2 text-[#FF92A5] text-xs font-bold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-[#FF92A5]" />
                <span>Баяндама сөзі (Спикер үшін мәтін)</span>
              </div>
              <p className="text-sm text-[#1A1A1A] italic leading-relaxed font-editorial-serif text-[15px]">
                "{currentSlide.speakerNotesKz.speechPrompt}"
              </p>
            </div>

            {/* Key Pedagogical Points */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#B9E9FF]">
              <div className="flex items-center gap-2 mb-2.5 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-sky-600" />
                <span>Басты назар аударатын тезистер</span>
              </div>
              <ul className="space-y-2">
                {currentSlide.speakerNotesKz.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#555555]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B9E9FF] mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Audience Question */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#1A1A1A]/10">
              <div className="flex items-center gap-2 mb-1.5 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-[#FF92A5]" />
                <span>Аудиториямен интерактив (Талқылау сұрағы)</span>
              </div>
              <p className="text-xs text-[#555555] font-medium leading-relaxed">
                {currentSlide.speakerNotesKz.audienceQuestion}
              </p>
            </div>

            {/* Hardware Quote / Scientific Rule */}
            <div className="p-3.5 rounded-2xl bg-white/60 border border-[#1A1A1A]/10 text-[#555555] flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-[#1A1A1A]/40 mt-0.5 shrink-0" />
              <div className="text-[11px] leading-relaxed">
                <strong className="text-[#1A1A1A]">{currentSlide.formulaOrQuote.badge}: </strong>
                <span>{currentSlide.formulaOrQuote.statement}</span>
                <p className="text-[#555555] mt-0.5">{currentSlide.formulaOrQuote.annotation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                soundManager.playToggleClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white hover:bg-[#333333] transition-colors cursor-pointer"
            >
              Түсінікті, сабақты жалғастыру
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
