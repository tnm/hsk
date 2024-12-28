export interface FlashcardProps {
  isFlipped: boolean;
  character?: string;
  pinyin?: string;
  meaning?: string;
  onFlip: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  focusMode: boolean;
  isSeen?: boolean;
}

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

export interface FocusControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
  currentIndex: number;
  totalCards: number;
}

export interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
}
