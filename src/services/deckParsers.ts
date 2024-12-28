import { DeckParser, Card } from '@/types';
import Papa from 'papaparse';

export const csvParser: DeckParser = {
  name: 'CSV',
  fileExtension: '.csv',
  parse: (content: string): Card[] => {
    const results = Papa.parse<string[]>(content, { header: false });
    return results.data
      .filter((row) => row.length >= 2)
      .map((row) => ({
        front: row[0],
        back: row[1],
        extra: row[2],
      }));
  },
};
