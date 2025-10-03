# 🧠 Esmarty - AI-Powered Chrome Extension

> **Bringing the Power of AI to Your Browser** - A lightweight Chrome Extension that transforms how you interact with web content using Google Gemini AI.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/KNIHAL/Esmarty)
[![Google Gemini](https://img.shields.io/badge/Powered_by-Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://gemini.google.com)


---

## 🎯 Problem Statement

In today's information-rich web environment, users face several challenges:
- **Information Overload**: Reading lengthy articles and documentation is time-consuming
- **Context Switching**: Moving between browser tabs and AI tools disrupts workflow
- **Code Debugging**: Developers need quick explanations for complex code snippets
- **Content Understanding**: Users struggle to grasp difficult concepts while browsing

**Esmarty solves these problems by embedding AI directly into your browsing experience.**

---

## ✨ Features

### 🖼️ **Floating AI Assistant**
- Always-accessible floating button with extension icon
- Non-intrusive design that doesn't interrupt your workflow
- Quick access to AI capabilities on any webpage

### 📝 **Smart Text Input**
- Clean, intuitive input box with optimized readability
- Natural language processing for questions and commands
- Instant AI-powered responses

### 🔢 **Contextual Q&A with Memory**
- Ask follow-up questions that reference previous conversations
- Short-term memory system maintains conversation context
- Seamless multi-turn dialogues without losing context

### 📌 **Highlight & Explain**
- Select any text on a webpage
- Click the extension icon
- Get instant AI-powered explanations, summaries, or analysis

### 🐛 **AI-Powered Debugging**
- Debug code snippets directly in your browser
- Get explanations for error messages
- Receive optimization suggestions

### 📊 **Smart Summarization**
- Summarize long articles, documentation, or research papers
- Extract key points and insights
- Save time while retaining important information

### 🔑 **Privacy-First Approach**
- Works with your own Google Gemini API key
- No data stored on external servers
- Complete control over your AI interactions

---

## 🏗️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Model**: Google Gemini API
- **Chrome APIs**: Extension APIs, Storage API, Content Scripts
- **Architecture**: Modular design with separated concerns
  - `utils/api.js` - API configuration and endpoint management
  - `utils/memory.js` - Short-term memory implementation
  - Content scripts for webpage interaction
  - Background service worker for persistent functionality

---

## 🚀 Installation

### Prerequisites
- Google Chrome browser (version 88 or higher)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Step 1: Clone the Repository
```bash
git clone https://github.com/KNIHAL/ESmarty.git
cd ESmarty
```

### Step 2: Configure API Key
1. Navigate to `utils/api.js`
2. Replace the placeholder with your API credentials:
```javascript
const API_KEY = "your-google-gemini-api-key-here";
const API_URL = "your-api-endpoint-url";
```

### Step 3: Load Extension in Chrome
1. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```
2. Enable **Developer mode** (toggle in top right corner)
3. Click **Load unpacked**
4. Select the cloned `ESmarty` project folder
5. ✅ Extension will now appear in your Chrome toolbar!

---

## 💡 How to Use

### Basic Q&A
1. Click the ESmarty floating button on any webpage
2. Type your question in the input box
3. Get instant AI-powered responses

### Text Explanation
1. **Highlight** any text on a webpage
2. **Click** the ESmarty extension icon
3. **Receive** AI explanation, translation, or summary

### Debugging Code
1. Select code snippet on any webpage
2. Click ESmarty icon
3. Ask for debugging help, explanation, or optimization

### Conversational Context
- Ask follow-up questions naturally
- Reference previous queries in the same session
- Build on previous responses for deeper understanding

---

## 🏆 What Makes ESmarty Special

### 🌟 Innovation
- **Seamless Integration**: AI capabilities embedded directly in browsing workflow
- **Context-Aware**: Maintains conversation history for meaningful interactions
- **Universal Applicability**: Works on any webpage, any content

### 💪 Technical Excellence
- **Modular Architecture**: Clean, maintainable code structure
- **Memory Management**: Efficient short-term memory implementation
- **Performance Optimized**: Lightweight and fast response times
- **Privacy Focused**: No server-side data storage

### 🎯 User Experience
- **Intuitive Design**: Minimal learning curve
- **Non-Intrusive**: Doesn't disrupt normal browsing
- **Versatile Use Cases**: From learning to debugging to summarization

---

## 🛠️ Project Structure

```
ESmarty/
├── manifest.json          # Extension configuration
├── utils/
│   ├── api.js            # API configuration & endpoint management
│   ├── memory.js         # Short-term memory implementation
├── content/              # Content scripts
├── background/           # Background service worker
├── popup/                # Extension popup UI
├── assets/                # Extension icons
└── README.md            # Documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please check [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📋 Future Enhancements

- [ ] Support for multiple AI models (OpenAI, Claude, etc.)
- [ ] Long-term memory with conversation history
- [ ] Custom prompt templates
- [ ] Voice input/output support
- [ ] Multi-language support
- [ ] Browser sync across devices
- [ ] Advanced code analysis features
- [ ] Document upload and analysis

---

## 📝 License

This project is licensed for **personal use only**. See [LICENSE](LICENSE) for full details.

**Note**: This project is for personal and educational purposes and not intended for commercial use without permission.

---

## 👨‍💻 Author

**KNIHAL**
- GitHub: [@KNIHAL](https://github.com/KNIHAL)

---

## 🙏 Acknowledgments

- Google Gemini API for powering the AI capabilities
- Chrome Extension documentation and community
- All contributors and testers

---

## 📞 Support

If you encounter any issues or have questions:
- Open an [Issue](https://github.com/KNIHAL/Esmarty/issues)
- Check existing issues for solutions
- Contribute to discussions

---

## 🌟 Show Your Support

If you find ESmarty helpful, please:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest new features
- 🤝 Contribute to the project

---

<div align="center">

**Made with ❤️ for Chrome Hackathon**

**Empowering browsing with AI, one webpage at a time.**

</div>
