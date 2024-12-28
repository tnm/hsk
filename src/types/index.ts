export interface Card {
  front: string;
  back: string;
  extra?: string;
  tags?: string[];
}

export interface DeckParser {
  parse: (content: string) => Card[];
  fileExtension: string;
  name: string;
}

export interface Deck {
  id: string;
  name: string;
  path: string;
}

export interface FlashcardProps {
  isFlipped: boolean;
  front?: string;
  back?: string;
  extra?: string;
  onFlip: () => void;
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>;
  focusMode: boolean;
  isKnown?: boolean;
  onMarkKnown?: () => void;
  onMarkUnknown?: () => void;
}

export interface DeckSelectorProps {
  currentDeckId: string;
  onDeckChange: (deckId: string) => void;
  availableDecks: Deck[];
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
