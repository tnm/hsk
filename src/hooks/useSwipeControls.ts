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
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!touchStart || !touchEnd) return;

    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = Math.abs(touchStart.y - touchEnd.y);

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
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    style: { touchAction: 'none' } as const,  // Prevent default touch behaviors
  };
}
