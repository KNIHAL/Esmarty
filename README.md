# Smart Assistant Chrome Extension 🚀

A lightweight Chrome Extension that allows you to ask questions, reference past queries, and even explain selected text directly from any webpage.

> This project is for **personal use only** and not intended for commercial purposes without permission.

---

## ✨ Features

* 🖼 Floating button with extension icon
* 📝 Clean input box with black text
* 🔢 Contextual Q&A 
* 📌 Highlight text → click on extension icon → get explanation with AI
* 🔑 Works with your own API key

---

## 📂 Installation (From GitHub → Chrome)

1. Clone this repository:

   ```bash
   git clone https://github.com/KNIHAL/ESmarty.git
   ```
2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```
3. Enable **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the cloned project folder.
   ✅ Extension will now appear in your Chrome toolbar.

---

## 🔑 Using Your Own API Key

This extension requires an API key (e.g., OpenAI or other model API).

1. Open the file:

   ```
   api.js
   ```
2. Replace the placeholder key with your own:

   ```js
   const API_KEY = "your-api-key-here";
   const API_URL = "your-api-endpoint-url";
   ```
3. Save the file and reload the extension from `chrome://extensions/`.

---


## 🤝 Contributing

Contributions are welcome! Please check [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.

---

## 📜 License

This project is licensed for **personal use only**.
See [LICENSE](./LICENSE) for full details.
