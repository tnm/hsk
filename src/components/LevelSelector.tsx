import { Button } from './ui/button';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

export function LevelSelector({
  currentLevel,
  onLevelChange,
}: LevelSelectorProps) {
  return (
    <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-secondary rounded-lg shadow-inner dark:bg-secondary/50">
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <Button
          key={level}
          onClick={() => onLevelChange(level)}
          variant={currentLevel === level ? 'default' : 'outline'}
          className={`${level === 1 ? 'w-16' : 'w-10'} sm:w-20 ${
            currentLevel === level
              ? 'shadow-sm'
              : 'hover:bg-gray-50 dark:hover:text-foreground'
          }`}
        >
          <span className="sm:hidden">{level === 1 ? 'HSK 1' : level}</span>
          <span className="hidden sm:inline">HSK {level}</span>
        </Button>
      ))}
    </div>
  );
}
