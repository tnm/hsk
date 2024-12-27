import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FocusControlsProps } from '@/types';
import { Button } from './ui/button';

export function FocusControls({
  onPrevious,
  onNext,
  onExit,
  currentIndex,
  totalCards,
}: FocusControlsProps) {
  return (
    <>
      {/* Navigation controls - mobile only */}
      <div className="fixed bottom-4 left-0 right-0 flex md:hidden justify-between items-center px-6 w-full z-[60]">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={onNext}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Exit button */}
      <div className="fixed top-6 sm:top-4 left-4 z-[60]">
        <Button
          onClick={onExit}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="fixed bottom-20 left-0 right-0 text-center text-sm text-foreground/70">
        {currentIndex + 1} / {totalCards}
      </div>
    </>
  );
}
