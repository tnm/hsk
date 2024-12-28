import { DeckSelectorProps, Deck } from '@/types';
import { Button } from './ui/button';

export function DeckSelector({
  currentDeckId,
  onDeckChange,
  availableDecks,
}: DeckSelectorProps) {
  return (
    <div className="flex gap-2 justify-center">
      {availableDecks.map((deck: Deck) => (
        <Button
          key={deck.id}
          variant={currentDeckId === deck.id ? 'default' : 'outline'}
          onClick={() => onDeckChange(deck.id)}
          className="w-16"
        >
          {deck.name.startsWith('HSK ') && !deck.name.includes('1')
            ? deck.name.replace('HSK ', '')
            : deck.name}
        </Button>
      ))}
    </div>
  );
}
