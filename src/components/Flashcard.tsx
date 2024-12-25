import { FlashcardProps } from '@/types';
import { cn } from '../lib/utils';
import { Card, CardContent } from './ui/card';

export function Flashcard({
  isFlipped,
  character,
  pinyin,
  meaning,
  onFlip,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  focusMode,
}: FlashcardProps) {
  return (
    <div
      className={cn(
        'transition-all duration-500',
        focusMode &&
          'fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50 p-4'
      )}
    >
      <Card
        className={cn(
          'transition-all duration-300',
          'hover:shadow-md',
          'cursor-pointer',
          'min-h-[400px] w-full max-w-4xl',
          'bg-card text-card-foreground',
          'flex items-center justify-center',
          isFlipped && 'ring-2 ring-primary/20'
        )}
        onClick={onFlip}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <CardContent className="w-full h-full flex items-center justify-center p-6">
          {!isFlipped ? (
            <div className="text-8xl sm:text-[10rem] font-bold text-foreground select-none">
              {character}
            </div>
          ) : (
            <div className="text-center space-y-6 select-none">
              <div className="text-5xl sm:text-7xl text-foreground/90">
                {pinyin}
              </div>
              <div className="text-3xl sm:text-5xl text-foreground/80">
                {meaning}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
