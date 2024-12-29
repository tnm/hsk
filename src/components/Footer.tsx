export function Footer() {
  return (
    <footer className="mt-12 border-t border-border pt-6 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/70">
        <div className="mb-4 sm:mb-0 text-center sm:text-left w-full">
          <ul className="mt-1 space-y-1 hidden sm:block">
            <li>
              <code className="font-mono text-sm">←/→</code> or{' '}
              <code className="font-mono text-sm">j/k</code>: Navigate cards
            </li>
            <li>
              <code className="font-mono text-sm">f</code>: Toggle learned/unlearned
            </li>
            <li>
              <code className="font-mono text-sm">space</code>: Flip card
            </li>
          </ul>
          <ul className="mt-1 space-y-1 sm:hidden">
            <li>Tap card to flip</li>
            <li>Use arrows or swipe to navigate</li>
          </ul>
        </div>
        <div className="text-center w-full sm:text-right">
          <ul className="space-y-1">
            <li>
              <code className="font-mono text-sm">z</code>: Toggle focus mode
            </li>
            <li>
              <code className="font-mono text-sm">1</code>-
              <code className="font-mono text-sm">6</code>: Switch deck
            </li>
            <li>
              <a
                href="https://github.com/tnm/flashcards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                View on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
