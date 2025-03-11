# Website Tech Stack Analyzer

A Chrome extension that analyzes and displays the technology stack used by websites you visit.

![Tech Stack Analyzer](screenshots/preview.png)

## Features

- Detects frontend technologies (JavaScript frameworks, libraries, etc.)
- Identifies backend technologies (server-side languages, frameworks)
- Recognizes other technologies (CMS, analytics tools, etc.)
- Dark mode support
- Responsive design
- Caching for faster repeated analysis

## Installation

### From Chrome Web Store

*(Coming soon)*

### Manual Installation (Development)

1. Clone this repository:
   ```
   git clone https://github.com/Chuskibot/TechStack_Analyzer.git
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your RapidAPI key to the `.env` file:
     ```
     RAPID_API_KEY=your_rapidapi_key_here
     ```

3. Install dependencies:
   ```
   npm install
   ```

4. Build the extension:
   ```
   npm run build
   ```

5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked" and select the extension directory

## API Key Setup

This extension uses the Technology Stack API from RapidAPI. To use it:

1. Sign up for a [RapidAPI](https://rapidapi.com/) account
2. Subscribe to the [Technology Stack API](https://rapidapi.com/search/technology-stack)
3. Get your API key from RapidAPI
4. Add it to your `.env` file

## Development

### Environment Setup

1. Create a `.env` file with your API keys:
   ```
   RAPID_API_KEY=your_rapidapi_key_here
   RAPID_API_HOST=technology-stack3.p.rapidapi.com
   RAPID_API_URL=https://technology-stack3.p.rapidapi.com/RAPItif9m11S3g5f/
   ```

2. Build the extension:
   ```
   npm run build
   ```

### GitHub Preparation

Before pushing to GitHub, run:
```
npm run prepare-github
```

This will create a clean version of the manifest without your API keys.

## How It Works

The extension uses multiple methods to detect technologies:

1. **API Detection**: Uses RapidAPI's Technology Stack API for comprehensive detection
2. **Local Detection**: Falls back to analyzing page source code if API is unavailable
3. **Caching**: Stores results to minimize repeated API calls

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Developed by C78
- Icon made by [Freepik](https://www.freepik.com) from [Flaticon](https://www.flaticon.com/)
- Uses [RapidAPI](https://rapidapi.com/) for enhanced technology detection 