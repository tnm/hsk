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
