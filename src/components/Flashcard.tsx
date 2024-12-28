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
  isSeen,
}: FlashcardProps) {
  return (
    <div
      className={cn(
        'transition-all duration-500',
        focusMode &&
          'fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50 p-4 sm:p-8 overflow-hidden'
      )}
    >
      <Card
        className={cn(
          'transition-all duration-300',
          'hover:shadow-md',
          'cursor-pointer',
          'min-h-[350px] sm:min-h-[400px] w-full max-w-4xl',
          'bg-card text-card-foreground',
          'flex items-center justify-center',
          focusMode && 'mt-8 mb-10 sm:my-0',
          isFlipped && 'ring-2 ring-primary/20',
          isSeen && 'border-primary/20'
        )}
        onClick={onFlip}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isSeen && (
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
          </div>
        )}
        <CardContent className="w-full h-full flex items-center justify-center p-6">
          {!isFlipped ? (
            <div className="text-7xl sm:text-[10rem] font-bold text-foreground select-none">
              {character}
            </div>
          ) : (
            <div className="text-center space-y-4 sm:space-y-6 select-none">
              <div className="text-4xl sm:text-7xl text-foreground/90">
                {pinyin}
              </div>
              <div className="text-2xl sm:text-5xl text-foreground/80">
                {meaning}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
