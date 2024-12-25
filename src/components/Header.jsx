import { BookOpen } from 'lucide-react'

export function Header() {
  return (
    <div className="flex items-center gap-2 py-3 px-4">
      <BookOpen className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
      <h1 className="font-medium tracking-tight text-lg text-zinc-700 dark:text-zinc-300">
        HSK <span className="font-light">Cards</span>
      </h1>
    </div>
  )
} 