export function Footer() {
  return (
    <footer className="mt-12 border-t border-border pt-6 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/70">
        <div className="mb-4 sm:mb-0 text-center sm:text-left w-full">
          {/* Only show keyboard shortcuts on larger screens */}
          <ul className="mt-1 space-y-1 hidden sm:block">
            <li>
              <kbd>Space</kbd>: Flip card
            </li>
            <li>
              <kbd>←</kbd> <kbd>→</kbd> or <kbd>j</kbd> <kbd>k</kbd>: Navigate
              cards
            </li>
            <li>
              <kbd>f</kbd>: Mark learned • <kbd>d</kbd>: Mark unlearned
            </li>
            <li>
              <kbd>z</kbd>: Toggle focus mode
            </li>
          </ul>
          {/* Show touch instructions on mobile */}
          <ul className="mt-1 space-y-1 sm:hidden">
            <li>Tap card to flip</li>
            <li>Use arrows to navigate</li>
          </ul>
        </div>
        <div className="text-center w-full sm:text-right">
          <p>HSK Standard Course Vocabulary</p>
          <p className="mt-1">
            <a
              href="https://github.com/tnm/hsk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
