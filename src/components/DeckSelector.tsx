import { DeckSelectorProps } from '@/types';
import { Button } from './ui/button';

export function DeckSelector({
  currentDeckId,
  onDeckChange,
  availableDecks,
}: DeckSelectorProps) {
  return (
    <div className="flex gap-2 justify-center">
      {availableDecks.map((deck) => (
        <Button
          key={deck.id}
          variant={currentDeckId === deck.id ? 'default' : 'outline'}
          onClick={() => onDeckChange(deck.id)}
          className="w-16"
        >
          {deck.name.replace('HSK ', '')}
        </Button>
      ))}
    </div>
  );
}
