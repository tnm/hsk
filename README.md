# HSK Cards

A minimalist, responsive web application with modern features for studying HSK (Chinese Proficiency Test) vocabulary using flashcards.

## Features

- 📚 All HSK levels (1-6) vocabulary included
- 🎯 Focus mode for distraction-free study
- ✓ Track learned/unlearned cards
- ⌨️ Fast keyboard navigation
- 📱 Responsive design with touch support
- 🌗 Dark mode support
- 🔄 Shuffle mode for randomized practice

![Desktop screenshot](https://github.com/user-attachments/assets/bab554d1-354b-487b-93c1-b089f08c55fe)

## Usage

### Website

Live at [https://hskcards.app](https://hskcards.app)

### Desktop Controls

- <kbd>Space</kbd>: Flip card
- <kbd>←</kbd> <kbd>→</kbd> or <kbd>j</kbd> <kbd>k</kbd>: Navigate cards
- <kbd>1</kbd>-<kbd>6</kbd>: Switch HSK level
- <kbd>f</kbd>: Mark learned
- <kbd>d</kbd>: Mark unlearned
- <kbd>z</kbd>: Toggle focus mode
- <kbd>esc</kbd>: Exit focus mode

### Mobile Controls

- Tap to flip card
- Swipe left/right to navigate
- Tap buttons to mark learned/unlearned

### Modes

- Focus mode: Hide most buttons and settings for distraction-free study
- Shuffle mode: Randomize the order of cards
- Dark mode: Toggle with the button in the top right. Preference is saved.
- Learning progress: Track which cards you've learned across sessions

![mobile](https://github.com/user-attachments/assets/de762f28-6e97-43c6-afcd-1109aff31d2d)

Mix and match to find the best way to study for you.

## Development

This project uses:

- Vite for fast development and optimized builds
- React
- Tailwind CSS for styling
- Local storage for persisting preferences

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

### Preview Production Build

```bash
npm run preview
```

## Ideas

- Add traditional characters
- Allow users to mark cards as known/unknown for personalized practice
- Add colors to represent each tone in Pinyin for better visual distinction
- Implement a progress tracker to show study stats

## Note on CSV format

The vocabulary data is stored in header-less CSV files with
character, pinyin, and English:

```
跳舞,tiào wǔ,to dance
外,wài,outside
```

You could fork and adapt for other languages.
Please do!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
