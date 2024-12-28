import { FlashcardProps } from '@/types';
import { cn } from '../lib/utils';
import { Card, CardContent } from './ui/card';

export function Flashcard({
  isFlipped,
  front,
  back,
  extra,
  onFlip,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  focusMode,
  isKnown,
  isSwiping,
}: FlashcardProps) {
  const touchHandlers = {
    onTouchStart,
    onTouchMove,
    style: { touchAction: focusMode ? 'none' : 'pan-y' },
  };

  const handleClick = () => onFlip();

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    onTouchEnd(e);
    if (!isSwiping) {
      onFlip();
    }
  };

  return (
    <div
      className={cn(
        'transition-all duration-500',
        focusMode &&
          'fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50 p-4 sm:p-8 overflow-hidden'
      )}
      style={focusMode ? { touchAction: 'none' } : undefined}
    >
      <Card
        tabIndex={-1}
        className={cn(
          'transition-all duration-300',
          'hover:shadow-md',
          'cursor-pointer',
          'min-h-[350px] sm:min-h-[400px] w-full max-w-4xl',
          'bg-card text-card-foreground',
          'flex items-center justify-center relative',
          'focus:outline-none focus-visible:outline-none focus:ring-0',
          focusMode && 'mt-8 mb-10 sm:my-0'
        )}
        onClick={handleClick}
        {...touchHandlers}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {isKnown ? (
            <div className="w-8 h-2 rounded-full bg-green-500/80 dark:bg-green-400/80" />
          ) : (
            <div className="w-8 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          )}
        </div>

        <CardContent className="w-full h-full flex items-center justify-center p-6">
          {!isFlipped ? (
            <div className="text-7xl sm:text-[10rem] font-bold text-foreground select-none">
              {front}
            </div>
          ) : (
            <div className="text-center space-y-4 sm:space-y-6 select-none">
              <div className="text-4xl sm:text-7xl text-foreground/90">
                {back}
              </div>
              {extra && (
                <div className="text-2xl sm:text-5xl text-foreground/80">
                  {extra}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
