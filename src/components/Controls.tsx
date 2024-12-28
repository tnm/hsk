import { Shuffle, Sun, Moon, Maximize } from 'lucide-react';
import { ControlsProps } from '@/types';
import { Button } from './ui/button';

export function Controls({
  shuffleMode,
  darkMode,
  focusMode,
  onShuffleToggle,
  onDarkModeToggle,
  onFocusModeToggle,
}: ControlsProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={onShuffleToggle}
        tabIndex={-1}
        variant={shuffleMode ? 'default' : 'secondary'}
        className="flex items-center gap-2 px-4 py-2 rounded-full"
      >
        <Shuffle
          className={
            shuffleMode
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'
          }
        />
        {shuffleMode ? 'Shuffle On' : 'Shuffle Off'}
      </Button>

      <Button
        onClick={onDarkModeToggle}
        tabIndex={-1}
        variant="outline"
        className="flex items-center gap-2 px-4 py-2 rounded-full"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <Button
        onClick={onFocusModeToggle}
        tabIndex={-1}
        variant={focusMode ? 'default' : 'outline'}
        className="flex items-center gap-2 px-4 py-2 rounded-full"
      >
        <Maximize
          className={focusMode ? 'text-green-500 dark:text-green-400' : ''}
        />
      </Button>
    </div>
  );
}
