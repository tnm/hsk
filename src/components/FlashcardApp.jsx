import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import _ from 'lodash';
import Papa from 'papaparse';

const FlashcardApp = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffleMode, setShuffleMode] = useState(false);
  
  const loadVocabulary = async () => {
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
  };

  useEffect(() => {
    loadVocabulary();
  }, [currentLevel]);

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

  const nextCard = () => {
    if (shuffleMode) {
      const nextIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(nextIndex);
    } else {
      setCurrentCardIndex((prev) => (prev + 1) % currentDeck.length);
    }
    setIsFlipped(false);
  };

  const previousCard = () => {
    if (shuffleMode) {
      const prevIndex = Math.floor(Math.random() * currentDeck.length);
      setCurrentCardIndex(prevIndex);
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length);
    }
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (event.code === 'ArrowLeft') {
        previousCard();
      } else if (event.code === 'ArrowRight') {
        nextCard();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shuffleMode, nextCard, previousCard, currentDeck.length]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            HSK Flashcards
          </h1>
          
          {/* HSK Level Selection */}
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-lg shadow-inner">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <Button
                key={level}
                onClick={() => {
                  setCurrentLevel(level);
                }}
                variant={currentLevel === level ? "default" : "outline"}
                className={`w-16 sm:w-20 ${
                  currentLevel === level 
                    ? "bg-white shadow-md" 
                    : "hover:bg-gray-50"
                }`}
              >
                HSK {level}
              </Button>
            ))}
          </div>

          {/* Shuffle Button */}
          <div className="flex justify-center">
            <Button
              onClick={shuffleDeck}
              variant={shuffleMode ? "default" : "outline"}
              className="flex items-center px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              <Shuffle className={`mr-2 h-4 w-4 ${
                shuffleMode 
                  ? "text-green-500" 
                  : "text-gray-700"
              }`} />
              {shuffleMode ? "Shuffle On" : "Shuffle Off"}
            </Button>
          </div>
        </header>

        {/* Flashcard */}
        <Card 
          className={`
            aspect-[5/3] sm:aspect-[2.2/1]
            cursor-pointer 
            transition-all duration-300 
            transform hover:shadow-sm 
            bg-white 
            rounded-xl 
            border-2 
            ${isFlipped ? 'border-blue-200' : 'border-transparent'}
          `}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardContent className="h-full flex items-center justify-center p-6">
            {!isFlipped ? (
              <div className="text-7xl sm:text-9xl font-bold text-gray-800 select-none">
                {currentDeck[currentCardIndex]?.character}
              </div>
            ) : (
              <div className="text-center space-y-4 select-none">
                <div className="text-4xl sm:text-6xl text-gray-700">
                  {currentDeck[currentCardIndex]?.pinyin}
                </div>
                <div className="text-2xl sm:text-4xl text-gray-600">
                  {currentDeck[currentCardIndex]?.meaning}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="mt-8 flex justify-between items-center px-4">
          <Button
            onClick={previousCard}
            variant="outline"
            className="flex items-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="mr-2" />
            Previous
          </Button>
          <div className="text-lg text-gray-600 font-medium">
            {currentCardIndex + 1} / {currentDeck.length}
          </div>
          <Button
            onClick={nextCard}
            variant="outline"
            className="flex items-center hover:bg-gray-50 transition-colors"
          >
            Next
            <ChevronRight className="ml-2" />
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-4 sm:mb-0">
              <ul className="mt-1 space-y-1">
                <li>← → Arrow keys: Navigate cards</li>
                <li>Space: Flip card</li>
              </ul>
            </div>
            <div className="text-center sm:text-right">
              <p>HSK Standard Course Vocabulary</p>
              <p className="mt-1">
                <a 
                  href="https://github.com/tnm/hsk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FlashcardApp;