import { ParseError } from 'papaparse';

export interface Card {
  character: string;
  pinyin: string;
  meaning: string;
}

export interface ControlsProps {
  shuffleMode: boolean;
  darkMode: boolean;
  focusMode: boolean;
  onShuffleToggle: () => void;
  onDarkModeToggle: () => void;
  onFocusModeToggle: () => void;
}

export interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
}

export interface FocusControlsProps extends NavigationProps {
  onExit: () => void;
}

export interface FlashcardProps {
  isFlipped: boolean;
  character?: string;
  pinyin?: string;
  meaning?: string;
  onFlip: () => void;
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>;
  focusMode: boolean;
  isKnown?: boolean;
  onMarkKnown?: () => void;
  onMarkUnknown?: () => void;
}

export interface ParseResult {
  data: string[][];
  errors: ParseError[];
}
