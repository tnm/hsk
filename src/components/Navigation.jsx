import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './ui/button'

export function Navigation({ onPrevious, onNext, currentIndex, totalCards }) {
  return (
    <div className="mt-8 flex justify-between items-center px-4">
      <Button
        onClick={onPrevious}
        variant="outline"
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-secondary/50 transition-colors"
      >
        <ChevronLeft />
        Previous
      </Button>
      <div className="text-lg text-foreground/80 font-medium">
        {currentIndex + 1} / {totalCards}
      </div>
      <Button
        onClick={onNext}
        variant="outline"
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  )
}
