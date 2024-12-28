# HSK Cards

A minimalist, responsive web application with modern features for studying HSK (Chinese Proficiency Test) vocabulary using flashcards.

## Features

- 📚 All HSK levels (1-6) vocabulary included
- 🎯 Focus mode for distraction-free study
- 🌗 Dark mode support (with auto-save preference)
- 🔄 Shuffle mode for randomized practice
- 📱 Responsive design with touch support
- ⌨️ Keyboard shortcuts for quick navigation

<img width="1986" alt="Screenshot" src="https://github.com/user-attachments/assets/e3333b30-bad8-465e-aea9-7cfdca2676eb" />

## Usage

### Website

Live at [https://hskcards.app](https://hskcards.app)

### Desktop Controls

- <kbd>Space</kbd>: Flip card
- <kbd>←</kbd> <kbd>→</kbd> or <kbd>j</kbd> <kbd>k</kbd>: Navigate between cards
- <kbd>1</kbd>-<kbd>6</kbd>: Switch HSK level
- <kbd>f</kbd>: Toggle focus mode
- <kbd>Esc</kbd>: Exit focus mode
- Buttons also available

### Mobile Controls

- Tap to flip card
- Swipe left/right to navigate, or use next/previous buttons

### Modes

- Focus mode: Hide most buttons and settings. <kbd>esc</kbd> to exit on desktop.
- Shuffle mode: Randomize the order of cards. Arrows still work to navigate.
- Dark mode: Toggle with the button in the top right. Preference is saved.

![mobile](https://github.com/user-attachments/assets/de762f28-6e97-43c6-afcd-1109aff31d2d)

Mix and match to find the best way to study for you.

## Development

This project uses:

- Vite for fast development and optimized builds
- React 18 for the UI
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
