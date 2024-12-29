import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Card, Deck } from '@/types';
import { csvParser } from '@/services/deckParsers';
import { Controls } from './Controls';
import { Flashcard } from './Flashcard';
import { FocusControls } from './FocusControls';
import { Footer } from './Footer';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Button } from './ui/button';
import { DeckSelector } from './DeckSelector';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';

const availableDecks: Deck[] = [
  { id: 'hsk1', name: 'HSK 1', path: '/data/hsk1.csv' },
  { id: 'hsk2', name: 'HSK 2', path: '/data/hsk2.csv' },
  { id: 'hsk3', name: 'HSK 3', path: '/data/hsk3.csv' },
  { id: 'hsk4', name: 'HSK 4', path: '/data/hsk4.csv' },
  { id: 'hsk5', name: 'HSK 5', path: '/data/hsk5.csv' },
  { id: 'hsk6', name: 'HSK 6', path: '/data/hsk6.csv' },
];

export default function FlashcardApp() {
  const [currentDeckId, setCurrentDeckId] = useState<string>(() => {
    const stored = localStorage.getItem('currentDeck');
    return stored || 'hsk1';
  });
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentDeck, setCurrentDeck] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [shuffleMode, setShuffleMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(`knownCards-${currentDeckId}`);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [filterUnlearned, setFilterUnlearned] = useState<boolean>(false);

  const currentCard = useMemo(() => {
    return currentDeck[currentCardIndex];
  }, [currentDeck, currentCardIndex]);

  const loadDeck = useCallback(async () => {
    try {
      const deck = availableDecks.find(
        (d): d is Deck => d.id === currentDeckId
      );
      if (!deck) throw new Error('Deck not found');

      const response = await fetch(deck.path);
      const text = await response.text();
      const cards = csvParser.parse(text);
      setCurrentDeck(cards);
      setCurrentCardIndex(0);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error('Failed to load deck')
      );
      setLoading(false);
    }
  }, [currentDeckId]);

  useEffect(() => {
    if (loading) {
      loadDeck();
    }
  }, [loading, loadDeck]);

  const shuffleDeck = () => {
    setShuffleMode((prev) => !prev);
    if (!shuffleMode) {
      const randomIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(randomIndex);
      setIsFlipped(false);
    } else {
      loadDeck();
    }
  };

  const findNextUnlearned = useCallback(
    (startIndex: number, direction: 1 | -1 = 1) => {
      let index = startIndex;
      for (let i = 0; i < currentDeck.length; i++) {
        index = (index + direction + currentDeck.length) % currentDeck.length;
        if (!knownCards.has(currentDeck[index].front)) {
          return index;
        }
      }
      return startIndex;
    },
    [currentDeck, knownCards]
  );

  const handleNextCard = useCallback(() => {
    if (shuffleMode) {
      const nextIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(nextIndex);
    } else {
      const nextIndex = (currentCardIndex + 1) % currentDeck.length;
      if (filterUnlearned && knownCards.has(currentDeck[nextIndex].front)) {
        setCurrentCardIndex(findNextUnlearned(nextIndex));
      } else {
        setCurrentCardIndex(nextIndex);
      }
    }
    setIsFlipped(false);
  }, [
    shuffleMode,
    filterUnlearned,
    knownCards,
    findNextUnlearned,
    currentCardIndex,
    currentDeck,
  ]);

  const handlePreviousCard = useCallback(() => {
    if (shuffleMode) {
      const prevIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(prevIndex);
    } else {
      if (filterUnlearned) {
        setCurrentCardIndex(findNextUnlearned(currentCardIndex, -1));
      } else {
        setCurrentCardIndex(
          (prev) => (prev - 1 + currentDeck.length) % currentDeck.length
        );
      }
    }
    setIsFlipped(false);
  }, [
    shuffleMode,
    currentDeck.length,
    filterUnlearned,
    findNextUnlearned,
    currentCardIndex,
  ]);

  const handleMarkKnown = useCallback(() => {
    const card = currentDeck[currentCardIndex];
    if (card) {
      setKnownCards((prev) => new Set(prev).add(card.front));
      if (filterUnlearned) {
        const nextIndex = findNextUnlearned(currentCardIndex);
        setCurrentCardIndex(nextIndex);
      }
    }
  }, [currentCardIndex, currentDeck, filterUnlearned, findNextUnlearned]);

  const handleMarkUnknown = useCallback(() => {
    const card = currentDeck[currentCardIndex];
    if (card) {
      const newKnownCards = new Set(knownCards);
      newKnownCards.delete(card.front);
      setKnownCards(newKnownCards);
    }
  }, [currentCardIndex, currentDeck, knownCards]);

  const handleChangeDeck = useCallback((level: number) => {
    const deckId = `hsk${level}`;
    setCurrentDeckId(deckId);
    setLoading(true);
    setIsFlipped(false);
    setCurrentCardIndex(0);
  }, []);

  const handleFilterToggle = useCallback(() => {
    if (!filterUnlearned && currentCard && knownCards.has(currentCard.front)) {
      const nextIndex = findNextUnlearned(currentCardIndex);
      setCurrentCardIndex(nextIndex);
      setFilterUnlearned(true);
    } else {
      setFilterUnlearned((prev) => !prev);
    }
  }, [
    currentCard,
    knownCards,
    currentCardIndex,
    findNextUnlearned,
    filterUnlearned,
  ]);

  useKeyboardControls({
    onFlip: () => setIsFlipped((prev) => !prev),
    onNext: handleNextCard,
    onPrevious: handlePreviousCard,
    onMarkKnown: handleMarkKnown,
    onMarkUnknown: handleMarkUnknown,
    onToggleFocus: () => setFocusMode((prev) => !prev),
    onChangeDeck: handleChangeDeck,
    focusMode,
    onExitFocus: () => setFocusMode(false),
    currentCard,
    knownCards,
    onFilterUnlearnedToggle: handleFilterToggle,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      `knownCards-${currentDeckId}`,
      JSON.stringify(Array.from(knownCards))
    );
  }, [knownCards, currentDeckId]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setShowLoading(true);
      }, 500);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  const unlearnedCount = useMemo(() => {
    return currentDeck.filter((card) => !knownCards.has(card.front)).length;
  }, [currentDeck, knownCards]);

  if (showLoading) {
    const currentDeck = availableDecks.find(
      (d): d is Deck => d.id === currentDeckId
    );
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen text-foreground/80">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        <div>Loading {currentDeck?.name}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-red-500 mb-4">{error.message}</div>
        <Button onClick={() => setCurrentDeckId('hsk1')}>
          Return to HSK 1
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {!focusMode && (
          <header className="text-center space-y-6">
            <Header />
            <DeckSelector
              currentDeckId={currentDeckId}
              onDeckChange={(deckId: string) => {
                setCurrentDeckId(deckId);
                setLoading(true);
                setIsFlipped(false);
                setCurrentCardIndex(0);
              }}
              availableDecks={availableDecks}
            />
            <Controls
              shuffleMode={shuffleMode}
              darkMode={darkMode}
              focusMode={focusMode}
              filterUnlearned={filterUnlearned}
              onShuffleToggle={shuffleDeck}
              onDarkModeToggle={() => setDarkMode((prev) => !prev)}
              onFocusModeToggle={() => setFocusMode((prev) => !prev)}
              onFilterUnlearnedToggle={handleFilterToggle}
            />
          </header>
        )}

        <Flashcard
          isFlipped={isFlipped}
          front={currentCard?.front}
          back={currentCard?.back}
          extra={currentCard?.extra}
          onFlip={() => {
            setIsFlipped(!isFlipped);
          }}
          onNext={handleNextCard}
          onPrevious={handlePreviousCard}
          focusMode={focusMode}
          isKnown={knownCards.has(currentCard?.front)}
          onMarkKnown={handleMarkKnown}
          onMarkUnknown={handleMarkUnknown}
        />

        {!focusMode && (
          <Navigation
            onPrevious={handlePreviousCard}
            onNext={handleNextCard}
            currentIndex={currentCardIndex}
            totalCards={currentDeck.length}
            filterUnlearned={filterUnlearned}
            unlearnedCount={unlearnedCount}
          />
        )}

        {!focusMode && <Footer />}

        {focusMode && (
          <FocusControls
            onPrevious={handlePreviousCard}
            onNext={handleNextCard}
            onExit={() => setFocusMode(false)}
            currentIndex={currentCardIndex}
            totalCards={currentDeck.length}
            knownCount={knownCards.size}
            onClearLearned={() => setKnownCards(new Set())}
          />
        )}
      </div>
    </div>
  );
}
