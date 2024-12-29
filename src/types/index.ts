export interface Card {
  front: string;
  back: string;
  extra?: string;
  tags?: string[];
}

export interface Deck {
  id: string;
  name: string;
  path: string;
}

export interface DeckParser {
  parse: (content: string) => Card[];
  fileExtension: string;
  name: string;
}

export interface TouchHandlers {
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>;
}

export interface FlashcardProps {
  isFlipped: boolean;
  front?: string;
  back?: string;
  extra?: string;
  onFlip: () => void;
  onNext: () => void;
  onPrevious: () => void;
  focusMode: boolean;
  isKnown?: boolean;
  onMarkKnown?: () => void;
  onMarkUnknown?: () => void;
}

export interface DeckSelectorProps {
  currentDeckId: string;
  onDeckChange: (deckId: string) => void;
  availableDecks: ReadonlyArray<Deck>;
}

export interface ControlsProps {
  shuffleMode: boolean;
  darkMode: boolean;
  focusMode: boolean;
  filterUnlearned: boolean;
  onShuffleToggle: () => void;
  onDarkModeToggle: () => void;
  onFocusModeToggle: () => void;
  onFilterUnlearnedToggle: () => void;
}

export interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
  filterUnlearned?: boolean;
  unlearnedCount?: number;
}

export interface FocusControlsProps extends NavigationProps {
  onExit: () => void;
  knownCount: number;
  onClearLearned: () => void;
}
