import { useCallback, useEffect } from 'react';

interface KeyboardControlsProps {
  onFlip: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onMarkKnown: () => void;
  onMarkUnknown: () => void;
  onToggleFocus: () => void;
  onChangeDeck: (level: number) => void;
  focusMode: boolean;
  onExitFocus: () => void;
}

export function useKeyboardControls({
  onFlip,
  onNext,
  onPrevious,
  onMarkKnown,
  onMarkUnknown,
  onToggleFocus,
  onChangeDeck,
  focusMode,
  onExitFocus,
}: KeyboardControlsProps) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Prevent space from focusing buttons
      if (event.code === 'Space') {
        event.preventDefault();
        onFlip();
        return;
      }

      // Prevent default for other navigation keys
      if (
        [
          'ArrowLeft',
          'ArrowRight',
          'KeyJ',
          'KeyK',
          'KeyF',
          'KeyD',
          'KeyZ',
        ].includes(event.code)
      ) {
        event.preventDefault();
      }

      const keyActionMap: Record<string, (() => void) | undefined> = {
        ArrowLeft: onPrevious,
        KeyJ: onPrevious,
        ArrowRight: onNext,
        KeyK: onNext,
        KeyF: onMarkKnown,
        KeyD: onMarkUnknown,
        KeyZ: onToggleFocus,
      };

      // Special cases handled separately
      const action = keyActionMap[event.code];
      if (action) {
        action();
      } else if (event.code === 'Escape' && focusMode) {
        onExitFocus();
      } else if (event.code.match(/^Digit[1-6]$/)) {
        const level = parseInt(event.code.replace('Digit', ''));
        onChangeDeck(level);
      }
    },
    [
      onFlip,
      onNext,
      onPrevious,
      onMarkKnown,
      onMarkUnknown,
      onToggleFocus,
      onChangeDeck,
      focusMode,
      onExitFocus,
    ]
  );

  useEffect(() => {
    const preventButtonFocus = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLButtonElement) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', preventButtonFocus, true);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keydown', preventButtonFocus, true);
    };
  }, [handleKeyPress]);
}
