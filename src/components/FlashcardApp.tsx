import _ from 'lodash';
import Papa, { ParseResult as PapaParseResult } from 'papaparse';
import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/types';
import { Controls } from './Controls';
import { Flashcard } from './Flashcard';
import { FocusControls } from './FocusControls';
import { Footer } from './Footer';
import { Header } from './Header';
import { LevelSelector } from './LevelSelector';
import { Navigation } from './Navigation';
import { Button } from './ui/button';

export default function FlashcardApp() {
  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    const stored = localStorage.getItem('hskLevel');
    return stored ? parseInt(stored) : 1;
  });
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentDeck, setCurrentDeck] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shuffleMode, setShuffleMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const loadVocabulary = useCallback(async () => {
    try {
      setLoading(true);
      const filePath = `/data/hsk${currentLevel}.csv`;
      console.log('Attempting to load file:', filePath);

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log('File content first 100 chars:', text.slice(0, 100));

      Papa.parse<string[]>(text, {
        header: false,
        complete: (results: PapaParseResult<string[]>) => {
          const cards: Card[] = results.data
            .filter((row: string[]) => row.length >= 3)
            .map((row: string[]) => ({
              character: row[0],
              pinyin: row[1],
              meaning: row[2],
            }));
          setCurrentDeck(cards);
          setLoading(false);
        },
        error: (error: Error) => {
          setError(error.message);
          setLoading(false);
        },
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load data');
      setLoading(false);
    }
  }, [currentLevel]);

  useEffect(() => {
    loadVocabulary();
  }, [loadVocabulary]);

  const shuffleDeck = () => {
    setShuffleMode((prev) => !prev);
    if (!shuffleMode) {
      setCurrentDeck(_.shuffle([...currentDeck]));
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } else {
      loadVocabulary();
    }
  };

  const nextCard = useCallback(() => {
    if (shuffleMode) {
      const nextIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(nextIndex);
    } else {
      setCurrentCardIndex((prev) => (prev + 1) % currentDeck.length);
    }
    setIsFlipped(false);
  }, [shuffleMode, currentDeck.length]);

  const previousCard = useCallback(() => {
    if (shuffleMode) {
      const prevIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(prevIndex);
    } else {
      setCurrentCardIndex(
        (prev) => (prev - 1 + currentDeck.length) % currentDeck.length
      );
    }
    setIsFlipped(false);
  }, [shuffleMode, currentDeck.length]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (event.code === 'ArrowLeft') {
        previousCard();
      } else if (event.code === 'ArrowRight') {
        nextCard();
      } else if (event.code === 'Escape' && focusMode) {
        setFocusMode(false);
      } else if (event.code === 'KeyF') {
        setFocusMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shuffleMode, nextCard, previousCard, currentDeck.length, focusMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      previousCard();
    }
  };

  useEffect(() => {
    localStorage.setItem('hskLevel', String(currentLevel));
  }, [currentLevel]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen text-foreground/80">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        <div>Loading HSK {currentLevel}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-red-500 mb-4">{error}</div>
        <Button onClick={() => setCurrentLevel(1)}>Return to HSK 1</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {!focusMode && (
          <header className="text-center space-y-6">
            <Header />
            <LevelSelector
              currentLevel={currentLevel}
              onLevelChange={setCurrentLevel}
            />
            <Controls
              shuffleMode={shuffleMode}
              darkMode={darkMode}
              focusMode={focusMode}
              onShuffleToggle={shuffleDeck}
              onDarkModeToggle={() => setDarkMode((prev) => !prev)}
              onFocusModeToggle={() => setFocusMode((prev) => !prev)}
            />
          </header>
        )}

        <Flashcard
          isFlipped={isFlipped}
          character={currentDeck[currentCardIndex]?.character}
          pinyin={currentDeck[currentCardIndex]?.pinyin}
          meaning={currentDeck[currentCardIndex]?.meaning}
          onFlip={() => setIsFlipped(!isFlipped)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          focusMode={focusMode}
        />

        {!focusMode && (
          <Navigation
            onPrevious={previousCard}
            onNext={nextCard}
            currentIndex={currentCardIndex}
            totalCards={currentDeck.length}
          />
        )}

        {!focusMode && <Footer />}

        {focusMode && (
          <FocusControls
            onPrevious={previousCard}
            onNext={nextCard}
            onExit={() => setFocusMode(false)}
            currentIndex={currentCardIndex}
            totalCards={currentDeck.length}
          />
        )}
      </div>
    </div>
  );
}