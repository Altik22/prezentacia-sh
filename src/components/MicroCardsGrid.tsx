import React from 'react';
import { motion } from 'motion/react';
import { MicroCard } from '../types';
import { Cpu, Zap, Activity, ShieldCheck, Gauge } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MicroCardsGridProps {
  cards: MicroCard[];
}

export const MicroCardsGrid: React.FC<MicroCardsGridProps> = ({ cards }) => {
  const getIcon = (index: number) => {
    switch (index % 5) {
      case 0:
        return <Gauge className="w-3.5 h-3.5" />;
      case 1:
        return <Zap className="w-3.5 h-3.5" />;
      case 2:
        return <Cpu className="w-3.5 h-3.5" />;
      case 3:
        return <Activity className="w-3.5 h-3.5" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'pink':
        return {
          border: 'border-[#FFD1DC] hover:border-[#FF92A5]',
          bg: 'bg-white/60 hover:bg-white/80',
          badgeBg: 'bg-[#FFD1DC]/40 text-[#FF92A5] border-[#FFD1DC]',
          valColor: 'text-[#1A1A1A]',
          glow: 'group-hover:shadow-[0_12px_24px_rgba(255,209,220,0.4)]',
          iconColor: 'text-[#FF92A5]',
        };
      case 'blue':
        return {
          border: 'border-[#B9E9FF] hover:border-sky-300',
          bg: 'bg-white/60 hover:bg-white/80',
          badgeBg: 'bg-[#B9E9FF]/40 text-[#1A1A1A] border-[#B9E9FF]',
          valColor: 'text-[#1A1A1A]',
          glow: 'group-hover:shadow-[0_12px_24px_rgba(185,233,255,0.4)]',
          iconColor: 'text-sky-600',
        };
      default: // purple
        return {
          border: 'border-[#1A1A1A]/10 hover:border-[#FFD1DC]',
          bg: 'bg-white/60 hover:bg-white/80',
          badgeBg: 'bg-white/80 text-[#1A1A1A] border-[#1A1A1A]/10',
          valColor: 'text-[#1A1A1A]',
          glow: 'group-hover:shadow-[0_12px_24px_rgba(255,209,220,0.3)]',
          iconColor: 'text-[#FF92A5]',
        };
    }
  };

  return (
    <div
      id="micro-cards-specs-grid"
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
    >
      {cards.map((card, idx) => {
        const styles = getColorStyles(card.accentColor);

        return (
          <motion.div
            key={card.id}
            id={`micro-card-${card.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => soundManager.playToggleClick()}
            className={`group relative p-3.5 rounded-2xl backdrop-blur-xl border ${styles.border} ${styles.bg} shadow-[0_4px_16px_rgba(0,0,0,0.02)] ${styles.glow} transition-all duration-300 cursor-pointer overflow-hidden`}
          >
            {/* Ambient corner light gradient */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFD1DC]/30 via-[#B9E9FF]/20 to-transparent rounded-bl-full pointer-events-none" />

            {/* Top row: Label & Tag */}
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[11px] font-semibold text-[#1A1A1A]/60 truncate">
                {card.titleKz}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${styles.badgeBg}`}
              >
                <span className={styles.iconColor}>{getIcon(idx)}</span>
                <span>{card.tagKz}</span>
              </span>
            </div>

            {/* Main Value & Unit */}
            <div className="flex items-baseline gap-1.5 mb-1">
              <span
                className={`font-mono text-2xl font-bold tracking-tight ${styles.valColor}`}
              >
                {card.value}
              </span>
              {card.unit && (
                <span className="text-xs font-semibold text-[#555555]">
                  {card.unit}
                </span>
              )}
            </div>

            {/* Detail explanation in Kazakh */}
            <p className="text-[11px] text-[#555555] line-clamp-1 group-hover:line-clamp-none transition-all leading-snug">
              {card.detailKz}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
