import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, Shuffle, Sun, Moon, Maximize2, BookOpen } from 'lucide-react';
import _ from 'lodash';
import Papa from 'papaparse';
import { cn } from '../lib/utils';

const FlashcardApp = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [focusMode, setFocusMode] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
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
      
      Papa.parse(text, {
        header: false,
        complete: (results) => {
          console.log('Parse results:', {
            rowCount: results.data.length,
            sampleRow: results.data[0],
            errors: results.errors
          });
          
          const vocabulary = results.data
            .filter(row => row.length === 3) // Ensure we have all three columns
            .map(([character, pinyin, meaning]) => ({
              character,
              pinyin,
              meaning
            }));
          
          console.log('Processed vocabulary:', {
            total: vocabulary.length,
            sample: vocabulary[0]
          });
          
          setCurrentDeck(vocabulary);
          setCurrentCardIndex(0);
          setIsFlipped(false);
          setLoading(false);
        },
        error: (error) => {
          console.error('Papa parse error:', error);
          setError(`Error parsing CSV file: ${error.message}`);
          setLoading(false);
        }
      });
    } catch (err) {
      console.error('Load vocabulary error:', err);
      setError(`Error loading HSK ${currentLevel} vocabulary file: ${err.message}`);
      setLoading(false);
    }
  }, [currentLevel]);

  useEffect(() => {
    loadVocabulary();
  }, [loadVocabulary]);

  const shuffleDeck = () => {
    setShuffleMode(prev => !prev);
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
      setCurrentCardIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length);
    }
    setIsFlipped(false);
  }, [shuffleMode, currentDeck.length]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (event.code === 'ArrowLeft') {
        previousCard();
      } else if (event.code === 'ArrowRight') {
        nextCard();
      } else if (event.code === 'Escape' && focusMode) {
        setFocusMode(false);
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
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading HSK {currentLevel}...</div>
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
            <div className="flex items-center justify-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-primary/80" />
              <h1 className="text-2xl font-medium tracking-tight text-foreground">
                HSK <span className="font-light">Cards</span>
              </h1>
            </div>
            
            {/* HSK Level Selection */}
            <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-secondary rounded-lg shadow-inner dark:bg-secondary/50">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <Button
                  key={level}
                  onClick={() => {
                    setCurrentLevel(level);
                  }}
                  variant={currentLevel === level ? "default" : "outline"}
                  className={`w-16 sm:w-20 ${
                    currentLevel === level 
                      ? "shadow-sm"
                      : "hover:bg-gray-50 dark:hover:text-foreground"
                  }`}
                >
                  HSK {level}
                </Button>
              ))}
            </div>

            {/* Shuffle Button */}
            <div className="flex justify-center gap-2">
              <Button
                onClick={shuffleDeck}
                variant={shuffleMode ? "default" : "secondary"}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
              >
                <Shuffle className={shuffleMode 
                  ? "text-green-500 dark:text-green-400" 
                  : "text-gray-700 dark:text-gray-300"
                } />
                {shuffleMode ? "Shuffle On" : "Shuffle Off"}
              </Button>
              
              <Button
                onClick={() => setDarkMode(prev => !prev)}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <Button
                onClick={() => setFocusMode(prev => !prev)}
                variant={focusMode ? "default" : "outline"}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
              >
                <Maximize2 className={focusMode ? "text-green-500 dark:text-green-400" : ""} />
              </Button>
            </div>
          </header>
        )}

        {/* Flashcard */}
        <div className={cn(
          "transition-all duration-500",
          focusMode && "fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50 p-4"
        )}>
          <Card 
            className={cn(
              "transition-all duration-300",
              "hover:shadow-md",
              "cursor-pointer",
              "min-h-[400px] w-full max-w-4xl",
              "bg-card text-card-foreground",
              "flex items-center justify-center",
              isFlipped && "ring-2 ring-primary/20"
            )}
            onClick={() => setIsFlipped(!isFlipped)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <CardContent className="w-full h-full flex items-center justify-center p-6">
              {!isFlipped ? (
                <div className="text-8xl sm:text-[10rem] font-bold text-foreground select-none">
                  {currentDeck[currentCardIndex]?.character}
                </div>
              ) : (
                <div className="text-center space-y-6 select-none">
                  <div className="text-5xl sm:text-7xl text-foreground/90">
                    {currentDeck[currentCardIndex]?.pinyin}
                  </div>
                  <div className="text-3xl sm:text-5xl text-foreground/80">
                    {currentDeck[currentCardIndex]?.meaning}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        {!focusMode && (
          <div className="mt-8 flex justify-between items-center px-4">
            <Button
              onClick={previousCard}
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-secondary/50 transition-colors"
            >
              <ChevronLeft />
              Previous
            </Button>
            <div className="text-lg text-foreground/80 font-medium">
              {currentCardIndex + 1} / {currentDeck.length}
            </div>
            <Button
              onClick={nextCard}
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        )}

        {/* Footer */}
        {!focusMode && (
          <footer className="mt-12 border-t border-border pt-6 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/70">
              <div className="mb-4 sm:mb-0 text-center sm:text-left w-full">
                <ul className="mt-1 space-y-1">
                  <li>← → Arrow keys: Navigate cards</li>
                  <li>Space: Flip card</li>
                </ul>
              </div>
              <div className="text-center w-full sm:text-right">
                <p>HSK Standard Course Vocabulary</p>
                <p className="mt-1">
                  <a 
                    href="https://github.com/tnm/hsk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    View on GitHub
                  </a>
                </p>
              </div>
            </div>
          </footer>
        )}

        {/* Focus mode controls */}
        {focusMode && (
          <div className="fixed bottom-4 left-0 right-0 flex justify-between items-center px-6 w-full">
            <Button
              onClick={previousCard}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              onClick={() => setFocusMode(false)}
              variant="outline"
              className="rounded-full bg-background/50 backdrop-blur-sm px-4"
            >
              Exit
            </Button>

            <Button
              onClick={nextCard}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardApp;