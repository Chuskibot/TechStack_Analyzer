# <img src="icons/icon48.png" alt="Logo" width="30"/> Website Tech Stack Analyzer

<div align="center">

![GitHub release (latest by date)](https://img.shields.io/github/v/release/Chuskibot/TechStack_Analyzer?style=for-the-badge&color=4a6cf7&label=Latest%20Release)
![GitHub stars](https://img.shields.io/github/stars/Chuskibot/TechStack_Analyzer?style=for-the-badge&color=4a6cf7)
![GitHub forks](https://img.shields.io/github/forks/Chuskibot/TechStack_Analyzer?style=for-the-badge&color=4a6cf7)
![GitHub license](https://img.shields.io/github/license/Chuskibot/TechStack_Analyzer?style=for-the-badge&color=4a6cf7)

<p align="center">
  <img src="https://i.imgur.com/8tHnuHr.gif" alt="Tech Stack Analyzer Demo" width="600"/>
</p>

<h3>🔍 Instantly discover the technologies powering any website with a single click!</h3>

<p>
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-development">Development</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://i.imgur.com/JvVrT8c.png" width="64" height="64"/>
        <br>Frontend Detection
      </td>
      <td align="center">
        <img src="https://i.imgur.com/5WfIVs5.png" width="64" height="64"/>
        <br>Backend Analysis
      </td>
      <td align="center">
        <img src="https://i.imgur.com/Hy8MsYA.png" width="64" height="64"/>
        <br>CMS Recognition
      </td>
      <td align="center">
        <img src="https://i.imgur.com/Hy3Lqhe.png" width="64" height="64"/>
        <br>Dark Mode
      </td>
    </tr>
  </table>
</div>

- 🚀 **Comprehensive Detection** - Identifies frameworks, libraries, and languages
- 🔄 **Multi-layered Analysis** - Uses both API and local detection methods
- 💾 **Smart Caching** - Stores results for faster repeated analysis
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🔒 **Privacy Focused** - No data collection or tracking

## 🔧 Installation

### From Chrome Web Store

<p align="center">
  <a href="#"><img src="https://i.imgur.com/q9uVqNV.png" alt="Available in the Chrome Web Store" width="250"/></a>
</p>

*(Coming soon)*

### Manual Installation (Development)

<details>
<summary>Click to expand installation steps</summary>

1. Clone this repository:
   ```bash
   git clone https://github.com/Chuskibot/TechStack_Analyzer.git
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your RapidAPI key to the `.env` file:
     ```
     RAPID_API_KEY=your_rapidapi_key_here
     ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the extension:
   ```bash
   npm run build
   ```

5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked" and select the extension directory
</details>

## 🔑 API Key Setup

<details>
<summary>Click to expand API setup instructions</summary>

This extension uses the Technology Stack API from RapidAPI for enhanced detection:

1. Sign up for a [RapidAPI](https://rapidapi.com/) account
2. Subscribe to the [Technology Stack API](https://rapidapi.com/search/technology-stack)
3. Get your API key from RapidAPI
4. Add it to your `.env` file
</details>

## ⚙️ How It Works

<div align="center">
  <img src="https://i.imgur.com/JvbcXfw.png" alt="How it works" width="700"/>
</div>

The extension employs a sophisticated multi-layered approach to detect technologies:

1. **🔍 API Detection** - Uses RapidAPI's Technology Stack API for comprehensive detection
2. **📝 Local Detection** - Falls back to analyzing page source code if API is unavailable
3. **📦 Caching System** - Stores results to minimize repeated API calls and improve performance

## 💻 Development

### Environment Setup

<details>
<summary>Click to expand development setup</summary>

1. Create a `.env` file with your API keys:
   ```
   RAPID_API_KEY=your_rapidapi_key_here
   RAPID_API_HOST=technology-stack3.p.rapidapi.com
   RAPID_API_URL=https://technology-stack3.p.rapidapi.com/RAPItif9m11S3g5f/
   ```

2. Build the extension:
   ```bash
   npm run build
   ```
</details>

### GitHub Preparation

<details>
<summary>Click to expand GitHub preparation steps</summary>

Before pushing to GitHub, run:
```bash
npm run prepare-github
```
or
```bash
./prepare-for-github.sh  # Unix/Mac
prepare-for-github.bat   # Windows
```

This will create a clean version of the manifest without your API keys.
</details>

## 🤝 Contributing

<details>
<summary>Click to expand contribution guidelines</summary>

We welcome contributions to improve the Tech Stack Analyzer! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
</details>

## 📋 Technology Detection

The extension can identify a wide range of technologies, including:

<div align="center">
  <table>
    <tr>
      <th>Frontend</th>
      <th>Backend</th>
      <th>Other</th>
    </tr>
    <tr>
      <td>
        <ul>
          <li>React</li>
          <li>Angular</li>
          <li>Vue.js</li>
          <li>jQuery</li>
          <li>Bootstrap</li>
          <li>Tailwind CSS</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>Django</li>
          <li>Ruby on Rails</li>
          <li>PHP</li>
          <li>ASP.NET</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>WordPress</li>
          <li>Shopify</li>
          <li>Google Analytics</li>
          <li>Cloudflare</li>
          <li>Netlify</li>
          <li>Vercel</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 📜 License

<div align="center">

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

</div>

## 👨‍💻 Developed By

<div align="center">
  <a href="https://github.com/Chuskibot">
    <img src="https://i.imgur.com/8WKyPBX.png" alt="C78 Logo" width="150"/>
  </a>
  <h3>C78</h3>
  <p>Made with ❤️ and JavaScript</p>
</div>

## 🙏 Acknowledgments

<div align="center">
  <p>
    <a href="https://www.flaticon.com">Icons by Flaticon</a> •
    <a href="https://rapidapi.com">API by RapidAPI</a> •
    <a href="https://shields.io">Badges by Shields.io</a>
  </p>
</div>

---

<div align="center">
  <p>If you found this useful, please consider giving it a ⭐!</p>
  <a href="https://github.com/Chuskibot/TechStack_Analyzer/stargazers">
    <img src="https://img.shields.io/github/stars/Chuskibot/TechStack_Analyzer?style=social" alt="GitHub stars"/>
  </a>
</div> 