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
- `Space`: Flip card
- `←` `→`: Navigate between cards
- `Esc`: Exit focus mode

### Mobile Controls
- Tap to flip card
- Swipe left/right to navigate
- All buttons are touch-friendly

### Modes
- Focus mode: Hide all buttons and navigation. Escape to exit.
- Shuffle mode: Randomize the order of cards. Arrows still work to navigate.
- Dark mode: Toggle with the button in the top right. Preference is saved.

Mix and match to find the best way to study for you.

## Getting Started on desktop

1. Clone the repository:
   ```bash
   git clone https://github.com/tnm/hsk.git
   cd hsk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

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

- Allow users to mark cards as known/unknown for personalized practice
- Add colors to represent each tone in Pinyin for better visual distinction
- Implement a progress tracker to show study stats
- Open to other ideas

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

