import { ReactNode } from 'react';
import { ParseError } from 'papaparse';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface InteractiveProps extends BaseProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
  onTouchMove?: React.TouchEventHandler<HTMLElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLElement>;
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

export interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
}

export interface FocusControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
  currentIndex: number;
  totalCards: number;
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
  isSeen?: boolean;
}

export interface ParseResult {
  data: string[][];
  errors: ParseError[];
}

export interface TouchCoordinates {
  x: number;
  y: number;
}
