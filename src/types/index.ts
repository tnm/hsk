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

export interface FlashcardProps extends TouchHandlers {
  isFlipped: boolean;
  front?: string;
  back?: string;
  extra?: string;
  onFlip: () => void;
  focusMode: boolean;
  isKnown?: boolean;
  onMarkKnown?: () => void;
  onMarkUnknown?: () => void;
  justMarkedKnown?: boolean;
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
  unknownOnly: boolean;
  onShuffleToggle: () => void;
  onDarkModeToggle: () => void;
  onFocusModeToggle: () => void;
  onUnknownOnlyToggle: () => void;
}

export interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
  knownCount: number;
  onClearLearned: () => void;
  justMarkedKnown?: boolean;
}

export interface FocusControlsProps extends NavigationProps {
  onExit: () => void;
}
