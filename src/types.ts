export type AccentColor = 'pink' | 'blue' | 'purple' | 'cyan';

export interface Hotspot {
  id: string;
  titleKz: string;
  xPercent: number;
  yPercent: number;
  shortDesc: string;
  techSpec: string;
  category: string;
}

export interface MicroCard {
  id: string;
  titleKz: string;
  value: string;
  unit?: string;
  detailKz: string;
  accentColor: AccentColor;
  tagKz: string;
}

export interface InteractiveDemo {
  type: 'cpu-clock' | 'gpu-raytracing' | 'ram-bandwidth' | 'ssd-benchmark' | 'system-bus';
  labelKz: string;
  descriptionKz: string;
}

export interface SlideData {
  id: string;
  slideNumber: string; // e.g. "01", "02", ...
  totalSlides: string; // e.g. "05"
  categoryKz: string;
  titleKz: string;
  subTitleKz: string;
  imageSrc: string;
  imageAlt: string;
  conceptSummaryKz: string;
  highlightsKz: string[];
  formulaOrQuote: {
    badge: string;
    statement: string;
    annotation: string;
  };
  hotspots: Hotspot[];
  microCards: MicroCard[];
  demo: InteractiveDemo;
  speakerNotesKz: {
    speechPrompt: string;
    keyPoints: string[];
    audienceQuestion: string;
  };
}
