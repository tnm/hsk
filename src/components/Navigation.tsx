import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationProps } from '@/types';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export function Navigation({
  onPrevious,
  onNext,
  currentIndex,
  totalCards,
  filterUnlearned,
  unlearnedCount,
}: NavigationProps) {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    setIsFlashing(true);
    const timer = setTimeout(() => setIsFlashing(false), 800);
    return () => clearTimeout(timer);
  }, [unlearnedCount]);

  return (
    <div className="mt-8 flex justify-between items-center px-2 sm:px-4">
      <Button
        onClick={onPrevious}
        variant="outline"
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-secondary/50 transition-colors"
      >
        <ChevronLeft />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <div className="text-sm sm:text-lg text-foreground/80 font-medium select-none">
        {currentIndex + 1}/{totalCards}
        {filterUnlearned && unlearnedCount !== undefined && (
          <span
            className={`ml-2 text-xs ${
              isFlashing ? 'text-green-500 dark:text-green-400' : 'text-primary'
            } transition-colors duration-500`}
          >
            ({unlearnedCount} unlearned)
          </span>
        )}
      </div>

      <Button
        onClick={onNext}
        variant="outline"
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-secondary/50 transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight />
      </Button>
    </div>
  );
}
