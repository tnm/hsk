import { Button } from './ui/button'

export function LevelSelector({ currentLevel, onLevelChange }) {
  return (
    <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-secondary rounded-lg shadow-inner dark:bg-secondary/50">
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <Button
          key={level}
          onClick={() => onLevelChange(level)}
          variant={currentLevel === level ? 'default' : 'outline'}
          className={`w-16 sm:w-20 ${
            currentLevel === level
              ? 'shadow-sm'
              : 'hover:bg-gray-50 dark:hover:text-foreground'
          }`}
        >
          HSK {level}
        </Button>
      ))}
    </div>
  )
}
