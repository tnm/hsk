import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      <div className="fixed bottom-4 left-0 right-0 flex justify-between items-center px-6 w-full">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={onExit}
          variant="outline"
          className="rounded-full bg-background/50 backdrop-blur-sm px-4"
        >
          Exit
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

      <div className="fixed bottom-20 left-0 right-0 text-center text-sm text-foreground/70">
        {currentIndex + 1} / {totalCards}
      </div>
    </>
  );
}
