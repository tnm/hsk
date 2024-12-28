import { useState } from 'react';

interface SwipeControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  minSwipeDistance?: number;
}

export function useSwipeControls({
  onNext,
  onPrevious,
  minSwipeDistance = 50,
}: SwipeControlsProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isSwiping, setIsSwiping] = useState(false);
  const [hasMovedEnough, setHasMovedEnough] = useState(false);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsSwiping(false);
    setHasMovedEnough(false);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!touchStart) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    setTouchEnd({ x, y });

    const dx = Math.abs(x - touchStart.x);
    const dy = Math.abs(y - touchStart.y);

    // Only set swiping true if we've moved a significant distance
    if (dx > 10 || dy > 10) {
      setIsSwiping(true);
    }

    if (dx > minSwipeDistance) {
      setHasMovedEnough(true);
    }
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !touchEnd) return;

    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = Math.abs(touchStart.y - touchEnd.y);

    // Only prevent default if we detect a horizontal swipe
    if (Math.abs(horizontalDistance) > verticalDistance && hasMovedEnough) {
      e.preventDefault();
    }

    // Ignore swipe if vertical movement is too large
    if (verticalDistance > 50) return;

    const isLeftSwipe = horizontalDistance > minSwipeDistance;
    const isRightSwipe = horizontalDistance < -minSwipeDistance;

    if (isLeftSwipe) {
      onPrevious();
    }
    if (isRightSwipe) {
      onNext();
    }

    // Reset states
    setTouchStart(null);
    setTouchEnd(null);
    setHasMovedEnough(false);
    // Keep isSwiping true if it was a successful swipe
    if (!isLeftSwipe && !isRightSwipe) {
      setIsSwiping(false);
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    style: { touchAction: 'pan-y' } as const,
    isSwiping,
  };
}
