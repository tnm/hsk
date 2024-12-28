import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { NavigationProps } from '@/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function Navigation({
  onPrevious,
  onNext,
  currentIndex,
  totalCards,
  knownCount,
  onClearLearned,
}: NavigationProps) {
  return (
    <div className="mt-8 flex justify-between items-center px-2 sm:px-4">
      <Button
        onClick={onPrevious}
        variant="outline"
        tabIndex={-1}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-secondary/50 transition-colors"
      >
        <ChevronLeft />
        <span className="hidden sm:inline">Previous</span>
      </Button>
      <div className="text-sm sm:text-lg text-foreground/80 font-medium flex items-center gap-2 sm:gap-4">
        <span>
          {currentIndex + 1}/{totalCards}
        </span>
        <span className="hidden sm:inline">·</span>
        <div className="flex items-center gap-1">
          <span>
            Learned:{' '}
            <span
              className={cn(
                justMarkedKnown &&
                  'text-green-500 dark:text-green-400 transition-colors duration-300'
              )}
            >
              {knownCount}
            </span>
          </span>
          <Button
            variant="ghost"
            size="icon"
            tabIndex={-1}
            onClick={onClearLearned}
            className="text-muted-foreground hover:text-foreground focus-visible:outline-none"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        onClick={onNext}
        variant="outline"
        tabIndex={-1}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight />
      </Button>
    </div>
  );
}
