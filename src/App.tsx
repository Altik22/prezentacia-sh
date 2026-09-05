import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { slidesData } from './data/slidesData';
import { HeaderNav } from './components/HeaderNav';
import { ProgressBar } from './components/ProgressBar';
import { SlideContent } from './components/SlideContent';
import { SlideControls } from './components/SlideControls';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { SlideOverviewModal } from './components/SlideOverviewModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [autoplayProgress, setAutoplayProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMotionBlurActive, setIsMotionBlurActive] = useState<boolean>(true);
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);

  const totalSlides = slidesData.length;
  const currentSlide = slidesData[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setAutoplayProgress(0);
    } else if (isAutoplay) {
      // Loop back to first slide in autoplay
      setDirection(1);
      setCurrentIndex(0);
      setAutoplayProgress(0);
    }
  }, [currentIndex, totalSlides, isAutoplay]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setAutoplayProgress(0);
    }
  }, [currentIndex]);

  const handleSelectSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setAutoplayProgress(0);
    }
  }, [currentIndex, totalSlides]);

  // Fullscreen toggle handler
  const handleToggleFullscreen = useCallback(() => {
    soundManager.playToggleClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fullscreen API may be blocked in iframe
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, []);

  // Listen to fullscreen changes (e.g. user hits Escape)
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input or if modal is open
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        soundManager.playSlideTransition();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        soundManager.playSlideTransition();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.key === 'Escape') {
        setIsSpeakerNotesOpen(false);
        setIsOverviewOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleToggleFullscreen]);

  // Autoplay progression timer
  useEffect(() => {
    if (!isAutoplay) {
      setAutoplayProgress(0);
      return;
    }

    const slideDurationMs = 8000;
    const intervalMs = 100;
    const stepIncrement = (intervalMs / slideDurationMs) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoplay, handleNext]);

  // Mute audio toggle
  const handleToggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    soundManager.setMuted(newMute);
    if (!newMute) {
      soundManager.playToggleClick();
    }
  };

  return (
    <div
      id="app-root-slide-deck"
      className="min-h-screen w-full flex flex-col justify-between bg-[#FCFBF9] text-[#1A1A1A] relative overflow-x-hidden selection:bg-[#FFD1DC] selection:text-[#1A1A1A]"
    >
      {/* Editorial Aesthetic ambient lighting glow layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft pastel pink ambient glow (#FFD1DC) */}
        <div
          className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FFD1DC 0%, transparent 70%)' }}
        />
        {/* Bright icy blue ambient glow (#B9E9FF) */}
        <div
          className="absolute -bottom-[100px] -right-[100px] w-[550px] h-[550px] rounded-full blur-[120px] opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #B9E9FF 0%, transparent 70%)' }}
        />
      </div>

      {/* Main Slide Deck Structure */}
      <div className="relative z-10 flex flex-col flex-1 min-h-screen justify-between">
        {/* 1. Sleek Glassmorphism Header Nav */}
        <HeaderNav
          currentSlideIndex={currentIndex}
          totalSlides={totalSlides}
          isAutoplay={isAutoplay}
          onToggleAutoplay={() => setIsAutoplay((prev) => !prev)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenSpeakerNotes={() => setIsSpeakerNotesOpen(true)}
          onOpenOverview={() => setIsOverviewOpen(true)}
        />

        {/* 2. Top Sleek Progress Bar */}
        <ProgressBar
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          autoplayProgress={autoplayProgress}
          isAutoplay={isAutoplay}
          onSelectSlide={handleSelectSlide}
        />

        {/* 3. Main Slide Presentation Content Area */}
        <main id="main-slide-presentation-area" className="flex-1 flex items-center justify-center my-auto">
          <AnimatePresence mode="wait">
            <SlideContent
              key={currentSlide.id}
              slide={currentSlide}
              isMotionBlurActive={isMotionBlurActive}
              direction={direction}
            />
          </AnimatePresence>
        </main>

        {/* 4. Bottom Sleek Controls Dock */}
        <SlideControls
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
          isMotionBlurActive={isMotionBlurActive}
          onToggleMotionBlur={() => setIsMotionBlurActive((prev) => !prev)}
        />
      </div>

      {/* Speaker Notes Drawer / Modal */}
      <SpeakerNotesModal
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
        currentSlide={currentSlide}
      />

      {/* All Slides Overview Gallery Modal */}
      <SlideOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        slides={slidesData}
        currentIndex={currentIndex}
        onSelectSlide={handleSelectSlide}
      />
    </div>
  );
}
