import { BookOpen } from 'lucide-react'

export function Header() {
  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      <BookOpen className="h-6 w-6 text-primary/80" />
      <h1 className="text-2xl font-medium tracking-tight text-foreground">
        HSK <span className="font-light">Cards</span>
      </h1>
    </div>
  )
} 