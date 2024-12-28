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
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isForwardSwipe = distance > minSwipeDistance;
    const isBackwardSwipe = distance < -minSwipeDistance;

    if (isForwardSwipe) {
      onNext();
    }
    if (isBackwardSwipe) {
      onPrevious();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
