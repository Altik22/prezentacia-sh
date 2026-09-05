import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { InteractiveDemo } from '../types';
import {
  Sliders,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowRightLeft,
  Eye,
  BarChart3,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HardwareDemoProps {
  demo: InteractiveDemo;
}

export const InteractiveHardwareDemos: React.FC<HardwareDemoProps> = ({ demo }) => {
  // CPU Demo state
  const [cpuClockGhz, setCpuClockGhz] = useState<number>(4.8);

  // GPU Demo state
  const [isRayTracingOn, setIsRayTracingOn] = useState<boolean>(true);

  // RAM Demo state
  const [ramMode, setRamMode] = useState<'ddr4-single' | 'ddr5-dual'>('ddr5-dual');

  // SSD Demo state
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState<number>(0);
  const [benchmarkSpeed, setBenchmarkSpeed] = useState<number>(7450);

  // System Bus Demo state
  const [busActiveRoute, setBusActiveRoute] = useState<'cpu-ram' | 'gpu-pcie' | 'cpu-ssd'>('cpu-ram');

  // SSD Benchmark simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBenchmarking) {
      interval = setInterval(() => {
        setBenchmarkProgress((prev) => {
          if (prev >= 100) {
            setIsBenchmarking(false);
            return 100;
          }
          return prev + 12;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isBenchmarking]);

  const runSsdBenchmark = () => {
    soundManager.playToggleClick();
    setBenchmarkProgress(0);
    setIsBenchmarking(true);
    setBenchmarkSpeed(7200 + Math.floor(Math.random() * 320));
  };

  // Render CPU Clock Frequency Slider Demo
  if (demo.type === 'cpu-clock') {
    const powerWatts = Math.round(45 + Math.pow((cpuClockGhz - 2.8) / 3, 2) * 160);
    const tempCelsius = Math.round(38 + ((cpuClockGhz - 3.0) / 2.8) * 44);
    const gflopsScore = Math.round(cpuClockGhz * 16 * 18.2);

    return (
      <div className="p-4 sm:p-4.5 rounded-3xl bg-white/60 backdrop-blur-md border border-[#FFD1DC] shadow-[0_10px_30px_-10px_rgba(255,209,220,0.3)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#FFD1DC]/40 text-[#FF92A5]">
              <Sliders className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">
              {demo.labelKz}
            </h4>
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-[#1A1A1A] px-3 py-1 rounded-full bg-[#FFD1DC]/40 border border-[#FFD1DC]">
            {cpuClockGhz.toFixed(1)} GHz
          </span>
        </div>

        {/* Range Slider */}
        <div className="mb-3">
          <input
            type="range"
            min="3.0"
            max="5.8"
            step="0.1"
            value={cpuClockGhz}
            onChange={(e) => {
              setCpuClockGhz(parseFloat(e.target.value));
              soundManager.playToggleClick();
            }}
            className="w-full accent-[#1A1A1A] cursor-pointer h-2 bg-[#1A1A1A]/10 rounded-full"
          />
          <div className="flex justify-between text-[10px] text-[#555555] font-mono mt-1">
            <span>3.0 GHz (Эко-режим)</span>
            <span>4.5 GHz (Стандарт)</span>
            <span>5.8 GHz (Турбо-буст)</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-white/70 border border-[#B9E9FF]">
            <span className="text-[10px] text-[#555555] block">Есептеу қуаты</span>
            <span className="font-mono text-xs font-bold text-[#1A1A1A]">
              {gflopsScore} GFLOPS
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/70 border border-[#FFD1DC]">
            <span className="text-[10px] text-[#555555] flex items-center justify-center gap-0.5">
              <Flame className="w-3 h-3 text-[#FF92A5]" />
              Температура
            </span>
            <span className="font-mono text-xs font-bold text-[#1A1A1A]">
              {tempCelsius} °C
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/70 border border-[#1A1A1A]/10">
            <span className="text-[10px] text-[#555555] flex items-center justify-center gap-0.5">
              <Zap className="w-3 h-3 text-[#FF92A5]" />
              Қуат тұтыну
            </span>
            <span className="font-mono text-xs font-bold text-[#1A1A1A]">
              {powerWatts} Вт
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render GPU Ray Tracing Toggle Demo
  if (demo.type === 'gpu-raytracing') {
    return (
      <div className="p-4 sm:p-4.5 rounded-3xl bg-white/60 backdrop-blur-md border border-[#B9E9FF] shadow-[0_10px_30px_-10px_rgba(185,233,255,0.3)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#B9E9FF]/40 text-sky-700">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">
              {demo.labelKz}
            </h4>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => {
              setIsRayTracingOn(!isRayTracingOn);
              soundManager.playToggleClick();
            }}
            className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isRayTracingOn
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white/80 text-[#1A1A1A] border border-[#1A1A1A]/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isRayTracingOn ? 'Ray Tracing ҚОСУЛЫ' : 'Растеризация'}</span>
          </button>
        </div>

        {/* Comparison card preview */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            className={`p-3 rounded-2xl border transition-all ${
              isRayTracingOn
                ? 'bg-[#B9E9FF]/25 border-[#B9E9FF] text-[#1A1A1A]'
                : 'bg-white/50 border-[#1A1A1A]/10 text-[#555555]'
            }`}
          >
            <span className="text-[10px] font-bold block mb-1 uppercase tracking-wider text-[#1A1A1A]">
              Жарық пен шағылу физикасы
            </span>
            <p className="text-[11px] leading-relaxed text-[#555555]">
              {isRayTracingOn
                ? 'Әрбір фотон траекториясы мен шынайы көлеңкелер аппараттық RT ядролары арқылы есептелуде.'
                : 'Көлеңкелер алдын ала салынған текстуралар арқылы жуықтап көрсетіледі.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-[#FFD1DC] text-[#1A1A1A] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                Кадрлар жиілігі (FPS)
              </span>
              <span className="font-mono text-sm font-bold text-[#1A1A1A]">
                {isRayTracingOn ? '144+ FPS (DLSS 3.5)' : '165 FPS'}
              </span>
            </div>
            <div className="w-full bg-[#1A1A1A]/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF92A5] to-[#B9E9FF] rounded-full transition-all duration-500"
                style={{ width: isRayTracingOn ? '88%' : '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render RAM Bandwidth Demo
  if (demo.type === 'ram-bandwidth') {
    const isDdr5 = ramMode === 'ddr5-dual';
    const bandwidthGb = isDdr5 ? 102.4 : 25.6;

    return (
      <div className="p-4 sm:p-4.5 rounded-3xl bg-white/60 backdrop-blur-md border border-[#FFD1DC] shadow-[0_10px_30px_-10px_rgba(255,209,220,0.3)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#FFD1DC]/40 text-[#FF92A5]">
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">
              {demo.labelKz}
            </h4>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-full bg-white/80 p-0.5 border border-[#1A1A1A]/10">
            <button
              onClick={() => {
                setRamMode('ddr4-single');
                soundManager.playToggleClick();
              }}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
                ramMode === 'ddr4-single'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#555555] hover:text-[#1A1A1A]'
              }`}
            >
              DDR4 1-арна
            </button>
            <button
              onClick={() => {
                setRamMode('ddr5-dual');
                soundManager.playToggleClick();
              }}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
                ramMode === 'ddr5-dual'
                  ? 'bg-[#1A1A1A] text-white shadow-2xs'
                  : 'text-[#555555] hover:text-[#1A1A1A]'
              }`}
            >
              DDR5 2-арна
            </button>
          </div>
        </div>

        {/* Progress bars comparing speed */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#555555]">Таза өткізу қабілеті:</span>
              <span className="font-mono text-[#1A1A1A] font-bold">{bandwidthGb} ГБ/сек</span>
            </div>
            <div className="w-full bg-[#1A1A1A]/10 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFD1DC] via-[#FF92A5] to-[#B9E9FF] rounded-full"
                animate={{ width: isDdr5 ? '100%' : '26%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-[#555555] pt-1">
            <span>{isDdr5 ? '✓ 2x 32-биттік дербес шина' : '• 1x 64-биттік ескі арна'}</span>
            <span className="font-semibold text-[#FF92A5]">
              {isDdr5 ? '+300% Дерек жылдамдығы' : 'Базалық деңгей'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render SSD Benchmark Demo
  if (demo.type === 'ssd-benchmark') {
    return (
      <div className="p-4 sm:p-4.5 rounded-3xl bg-white/60 backdrop-blur-md border border-[#B9E9FF] shadow-[0_10px_30px_-10px_rgba(185,233,255,0.3)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#B9E9FF]/40 text-sky-700">
              <BarChart3 className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">
              {demo.labelKz}
            </h4>
          </div>

          <button
            onClick={runSsdBenchmark}
            disabled={isBenchmarking}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1A1A1A] text-white shadow-xs hover:bg-[#333333] transition-all cursor-pointer disabled:opacity-50"
          >
            {isBenchmarking ? (
              <>
                <RotateCcw className="w-3 h-3 animate-spin text-[#FF92A5]" />
                <span>Сынақ жүруде...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current text-[#B9E9FF]" />
                <span>Сынақты бастау</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-white/70 border border-[#B9E9FF] flex flex-col justify-between">
            <span className="text-[10px] text-[#555555]">NVMe Сынақ нәтижесі</span>
            <div className="font-mono text-base font-bold text-[#1A1A1A]">
              {isBenchmarking ? `${Math.round(benchmarkSpeed * (benchmarkProgress / 100))} МБ/с` : `${benchmarkSpeed} МБ/с`}
            </div>
            <div className="w-full bg-[#1A1A1A]/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FF92A5] to-[#B9E9FF] h-full transition-all duration-150 rounded-full"
                style={{ width: `${benchmarkProgress}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/70 border border-[#FFD1DC] flex flex-col justify-between">
            <span className="text-[10px] text-[#555555]">Windows 11 Жүктелу уақыты</span>
            <div className="flex items-center gap-1.5 text-[#1A1A1A] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#FF92A5]" />
              <span className="font-mono text-sm">2.4 секунд</span>
            </div>
            <span className="text-[10px] text-[#555555]">HDD дискісінде: ~48 секунд</span>
          </div>
        </div>
      </div>
    );
  }

  // Slide 1: System Bus Dataflow Route Simulator
  return (
    <div className="p-4 sm:p-4.5 rounded-3xl bg-white/60 backdrop-blur-md border border-[#FFD1DC] shadow-[0_10px_30px_-10px_rgba(255,209,220,0.3)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-full bg-[#FFD1DC]/40 text-[#FF92A5]">
            <Zap className="w-3.5 h-3.5" />
          </span>
          <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">
            {demo.labelKz}
          </h4>
        </div>
        <span className="text-[10px] font-semibold text-[#555555]">
          PCIe 5.0 / DMI 4.0
        </span>
      </div>

      <div className="flex gap-1.5 mb-2.5">
        <button
          onClick={() => {
            setBusActiveRoute('cpu-ram');
            soundManager.playToggleClick();
          }}
          className={`flex-1 py-1 px-2.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
            busActiveRoute === 'cpu-ram'
              ? 'bg-[#1A1A1A] text-white shadow-2xs'
              : 'bg-white/70 text-[#555555] hover:text-[#1A1A1A] border border-[#1A1A1A]/5'
          }`}
        >
          CPU ↔ RAM (Жедел жады)
        </button>
        <button
          onClick={() => {
            setBusActiveRoute('gpu-pcie');
            soundManager.playToggleClick();
          }}
          className={`flex-1 py-1 px-2.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
            busActiveRoute === 'gpu-pcie'
              ? 'bg-[#1A1A1A] text-white shadow-2xs'
              : 'bg-white/70 text-[#555555] hover:text-[#1A1A1A] border border-[#1A1A1A]/5'
          }`}
        >
          CPU ↔ GPU (PCIe x16)
        </button>
        <button
          onClick={() => {
            setBusActiveRoute('cpu-ssd');
            soundManager.playToggleClick();
          }}
          className={`flex-1 py-1 px-2.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
            busActiveRoute === 'cpu-ssd'
              ? 'bg-[#1A1A1A] text-white shadow-2xs'
              : 'bg-white/70 text-[#555555] hover:text-[#1A1A1A] border border-[#1A1A1A]/5'
          }`}
        >
          CPU ↔ SSD (M.2 NVMe)
        </button>
      </div>

      <div className="p-3 rounded-2xl bg-white/70 border border-[#1A1A1A]/5 text-[11px] text-[#555555] flex items-center justify-between">
        <span>
          {busActiveRoute === 'cpu-ram' && 'Жүйелік жады контроллері: 96 ГБ/с ағын, 55 нс ультра-төмен кідіріс.'}
          {busActiveRoute === 'gpu-pcie' && 'PCIe 5.0 x16 шинасы: 128 ГБ/с өткізу мүмкіндігі, DirectStorage қолдауы.'}
          {busActiveRoute === 'cpu-ssd' && 'PCIe 4.0 x4 M.2 протоколы: 7.5 ГБ/с тікелей оқу, нөлдік кідіріс.'}
        </span>
        <span className="w-2 h-2 rounded-full bg-[#FF92A5] animate-ping ml-2 shrink-0" />
      </div>
    </div>
  );
};
