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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

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
  };
}
