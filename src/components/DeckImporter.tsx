import { Card } from '@/types';
import { csvParser } from '@/services/deckParsers';

interface DeckImporterProps {
  onDeckLoad: (cards: Card[]) => void;
}

export function DeckImporter({ onDeckLoad }: DeckImporterProps) {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const cards = csvParser.parse(text);
    onDeckLoad(cards);
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv,.txt"
        onChange={handleFileUpload}
      />
    </div>
  );
} 